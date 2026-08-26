from rest_framework import permissions
from rest_framework.exceptions import AuthenticationFailed, APIException
import requests
from django.conf import settings


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


def _verify_auth_server_admin(authorization_header: str) -> dict | None:
    return _verify_auth_server_token(authorization_header)


def _is_admin_role(user_data: dict | None) -> bool:
    """Accept verified tokens; if a role is present, require an admin-like role."""
    if not user_data or not isinstance(user_data, dict):
        return False
    role = user_data.get('role')
    if role is None:
        # Auth server verified the token but did not return a role (same as registration admin).
        return True
    return str(role).lower() in {'admin', 'staff', 'superadmin', 'superuser'}


class IsAuthenticatedByAuthServer(permissions.BasePermission):
    """
    Public read; writes require a token verified by the auth server.
    Uses the same resilient verify flow as registration admin so
    /api/admin/login/ tokens work for halls/conferences/sessions.
    """

    def has_permission(self, request, view):
        if request.method in permissions.SAFE_METHODS:
            return True

        auth_header = request.headers.get('Authorization', '')
        if not auth_header:
            raise AuthenticationFailed("Authentication token not provided")

        try:
            user_data = _verify_auth_server_token(auth_header)
        except Exception as e:
            raise APIException(f"Error communicating with auth server: {str(e)}")

        if not user_data:
            raise AuthenticationFailed("Admin authentication required")

        if not _is_admin_role(user_data):
            return False

        request.auth_user = user_data
        return True


class IsRegistrationAdmin(permissions.BasePermission):
    """Admin access for registration management via auth-server token."""

    def has_permission(self, request, view):
        auth_header = request.headers.get('Authorization', '')
        if not auth_header:
            raise AuthenticationFailed("Authentication token not provided")

        user_data = _verify_auth_server_admin(auth_header)
        if user_data:
            request.registration_admin = user_data
            return True

        raise AuthenticationFailed("Admin authentication required")


class IsAdminOrReadOnly(permissions.BasePermission):
    """
    Custom permission to only allow admins to edit resources.
    """
    def has_permission(self, request, view):
        if request.method in permissions.SAFE_METHODS:
            return True

        return request.user and request.user.is_staff
