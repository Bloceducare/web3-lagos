from rest_framework import permissions
from rest_framework.exceptions import AuthenticationFailed, APIException, PermissionDenied
import requests
from django.conf import settings


ADMIN_ROLES = {'admin', 'staff', 'superadmin', 'superuser'}


def _extract_bearer_token(authorization_header: str) -> str:
    value = (authorization_header or '').strip()
    if not value:
        return ''
    parts = value.split()
    if len(parts) == 2 and parts[0].lower() == 'bearer':
        return parts[1].strip()
    return value


def _verify_auth_server_token(authorization_header: str) -> dict | None:
    """Return user info when auth server accepts the token."""
    if not settings.AUTH_SERVER_URL:
        return None

    raw_token = _extract_bearer_token(authorization_header)
    if not raw_token:
        return None

    url = f"{settings.AUTH_SERVER_URL}/api/token/verify/"
    candidates = [
        {'json': {'token': raw_token}},
        {'json': {'token': f'Bearer {raw_token}'}},
        {'headers': {'Authorization': f'Bearer {raw_token}'}},
        {'headers': {'Authorization': raw_token}},
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
            if data and 'detail' not in data and 'code' not in data:
                return data

        return {'verified': True}

    return None


def _truthy(value) -> bool:
    if isinstance(value, bool):
        return value
    if isinstance(value, (int, float)):
        return value != 0
    if isinstance(value, str):
        return value.strip().lower() in {'1', 'true', 'yes', 'y'}
    return False


def is_admin_user(user_data: dict | None) -> bool:
    """
    Only admin-like accounts may use the W3LC admin console / mutating APIs.
    Accepts common auth-server role / flag shapes.
    Explicit non-admin roles are denied. Username/email-only payloads from a
    successful auth-server login are allowed (matches existing admin console).
    """
    if not user_data or not isinstance(user_data, dict):
        return False

    # Bare verify ACK without user payload is not enough for admin access.
    if set(user_data.keys()) <= {'verified'}:
        return False

    role = user_data.get('role') or user_data.get('user_role') or user_data.get('type')
    if role is not None and str(role).strip():
        return str(role).strip().lower() in ADMIN_ROLES

    for key in ('is_admin', 'is_staff', 'is_superuser', 'admin', 'staff'):
        if key in user_data and _truthy(user_data.get(key)):
            return True

    nested = user_data.get('permissions') or user_data.get('meta')
    if isinstance(nested, dict):
        for key in ('is_admin', 'is_staff', 'is_superuser', 'admin'):
            if key in nested and _truthy(nested.get(key)):
                return True
        nested_role = nested.get('role')
        if nested_role and str(nested_role).strip():
            return str(nested_role).strip().lower() in ADMIN_ROLES

    # Successful auth-server user object without an explicit role.
    return bool(
        user_data.get('username')
        or user_data.get('email')
        or user_data.get('id')
        or user_data.get('name')
    )


def require_auth_server_admin(authorization_header: str) -> dict:
    """Verify token with auth server and ensure the account is admin."""
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
    """
    Public read; writes require an auth-server admin token.
    """

    def has_permission(self, request, view):
        if request.method in permissions.SAFE_METHODS:
            return True

        user_data = require_auth_server_admin(request.headers.get('Authorization', ''))
        request.auth_user = user_data
        return True


class IsRegistrationAdmin(permissions.BasePermission):
    """Admin-only access (list/update/delete) via auth-server token."""

    def has_permission(self, request, view):
        user_data = require_auth_server_admin(request.headers.get('Authorization', ''))
        request.registration_admin = user_data
        request.auth_user = user_data
        return True


class IsAuthServerAdmin(permissions.BasePermission):
    """Strict admin-only for every method (e.g. /api/admin/me/)."""

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
