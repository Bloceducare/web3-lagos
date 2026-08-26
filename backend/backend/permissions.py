from rest_framework import permissions
from rest_framework.exceptions import AuthenticationFailed, APIException, PermissionDenied
import requests
from django.conf import settings


# Normalized forms (lowercase, spaces/underscores/hyphens collapsed).
ADMIN_ROLE_TOKENS = {
    'admin',
    'staff',
    'superadmin',
    'super admin',
    'super_admin',
    'super-admin',
    'superuser',
    'super user',
}
NON_ADMIN_ROLE_TOKENS = {
    'user',
    'member',
    'attendee',
    'guest',
    'student',
    'speaker',
    'participant',
}


def _extract_bearer_token(authorization_header: str) -> str:
    value = (authorization_header or '').strip()
    if not value:
        return ''
    parts = value.split()
    if len(parts) == 2 and parts[0].lower() == 'bearer':
        return parts[1].strip()
    return value


def _normalize_role(role) -> str:
    return ' '.join(str(role).strip().lower().replace('_', ' ').replace('-', ' ').split())


def _compact_role(role_norm: str) -> str:
    return role_norm.replace(' ', '')


def _role_is_admin(role) -> bool | None:
    """
    True = admin, False = explicit non-admin, None = unknown / empty.
    Handles auth-server values like "super admin".
    """
    if role is None:
        return None
    text = str(role).strip()
    if not text:
        return None

    norm = _normalize_role(text)
    compact = _compact_role(norm)

    if norm in NON_ADMIN_ROLE_TOKENS or compact in NON_ADMIN_ROLE_TOKENS:
        return False
    if norm in ADMIN_ROLE_TOKENS or compact in {_compact_role(r) for r in ADMIN_ROLE_TOKENS}:
        return True
    # e.g. "super admin", "conference admin"
    if 'admin' in norm:
        return True
    return None


def _collect_roles(user_data: dict) -> list:
    roles = []
    for key in ('role', 'user_role', 'type'):
        value = user_data.get(key)
        if value is not None and str(value).strip():
            roles.append(value)

    raw_roles = user_data.get('roles')
    if isinstance(raw_roles, (list, tuple)):
        roles.extend(raw_roles)
    elif isinstance(raw_roles, str) and raw_roles.strip():
        roles.append(raw_roles)

    nested = user_data.get('permissions') or user_data.get('meta')
    if isinstance(nested, dict):
        if nested.get('role'):
            roles.append(nested.get('role'))
        nested_roles = nested.get('roles')
        if isinstance(nested_roles, (list, tuple)):
            roles.extend(nested_roles)

    return roles


def _verify_auth_server_token(authorization_header: str) -> dict | None:
    """
    Ask the separate AUTH_SERVER_URL to verify the JWT.
    Auth server returns { user: { role, roles, ... }, access_token, message }.
    """
    if not settings.AUTH_SERVER_URL:
        return None

    raw_token = _extract_bearer_token(authorization_header)
    if not raw_token:
        return None

    base = settings.AUTH_SERVER_URL.rstrip('/')
    url = f"{base}/api/token/verify/"
    # Auth server's documented verify body is {"token": "<jwt>"}.
    candidates = [
        {'json': {'token': raw_token}},
        {'json': {'token': f'Bearer {raw_token}'}},
        {'headers': {'Authorization': f'Bearer {raw_token}'}},
    ]

    for kwargs in candidates:
        try:
            response = requests.post(url, timeout=10, **kwargs)
        except requests.RequestException:
            continue
        if response.status_code != 200:
            continue

        try:
            data = response.json()
        except ValueError:
            data = {}

        if isinstance(data, dict):
            user = data.get('user')
            if isinstance(user, dict) and user:
                return user
            if data.get('username') or data.get('email') or data.get('role'):
                return data

        return {'verified': True}

    return None


def is_admin_user(user_data: dict | None) -> bool:
    """
    Require an admin-capable role from the auth server when present.
    Accepts role="super admin" and roles=["super admin"].
    """
    if not user_data or not isinstance(user_data, dict):
        return False

    # Bare verify ACK with no user — not enough once we know the API returns roles.
    if set(user_data.keys()) <= {'verified'}:
        return False

    decisions = [_role_is_admin(r) for r in _collect_roles(user_data)]
    if any(d is True for d in decisions):
        return True
    if decisions and all(d is False for d in decisions):
        return False

    # No role fields at all (older payloads): allow username-bearing auth-server users.
    if not _collect_roles(user_data):
        return bool(
            user_data.get('username')
            or user_data.get('email')
            or user_data.get('id')
            or user_data.get('name')
        )

    return False


def require_auth_server_admin(authorization_header: str) -> dict:
    """Verify JWT with AUTH_SERVER_URL and require an admin role."""
    if not authorization_header:
        raise AuthenticationFailed("Authentication token not provided")

    try:
        user_data = _verify_auth_server_token(authorization_header)
    except Exception as e:
        raise APIException(f"Error communicating with auth server: {str(e)}")

    if not user_data:
        raise AuthenticationFailed("Admin authentication required")

    if not is_admin_user(user_data):
        raise PermissionDenied("Admin role required")

    return user_data


class IsAuthenticatedByAuthServer(permissions.BasePermission):
    """Public read; writes require a token verified by the auth server."""

    def has_permission(self, request, view):
        if request.method in permissions.SAFE_METHODS:
            return True

        user_data = require_auth_server_admin(request.headers.get('Authorization', ''))
        request.auth_user = user_data
        return True


class IsRegistrationAdmin(permissions.BasePermission):
    """Admin access via auth-server token (not local Django login)."""

    def has_permission(self, request, view):
        user_data = require_auth_server_admin(request.headers.get('Authorization', ''))
        request.registration_admin = user_data
        request.auth_user = user_data
        return True


class IsAuthServerAdmin(permissions.BasePermission):
    """Auth-server token required for every method (e.g. /api/admin/me/)."""

    def has_permission(self, request, view):
        user_data = require_auth_server_admin(request.headers.get('Authorization', ''))
        request.auth_user = user_data
        return True


class IsAdminOrReadOnly(permissions.BasePermission):
    """Django staff user for writes; public read."""

    def has_permission(self, request, view):
        if request.method in permissions.SAFE_METHODS:
            return True
        return bool(request.user and request.user.is_staff)
