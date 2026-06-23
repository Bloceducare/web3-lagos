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


class IsAuthenticatedByAuthServer(permissions.BasePermission):
    """
    Custom permission to allow access only to authenticated users
    whose credentials are validated by the authentication server.
    """

    def has_permission(self, request, view):
        token = request.headers.get('Authorization')
        if request.method in permissions.SAFE_METHODS:
            return True

        if not token:
            raise AuthenticationFailed("Authentication token not provided")
        try:
            response = requests.post(
                f"{settings.AUTH_SERVER_URL}/api/token/verify/",
                json={"token": token},
                timeout=10,
            )
            if response.status_code != 200:
                raise AuthenticationFailed("Error authenticating with auth server")

            response_data = response.json()
            user_data = response_data.get("user", {})

            if user_data.get("role") == "admin":
                return True
            return False

        except requests.RequestException as e:
            raise APIException(f"Error communicating with auth server: {str(e)}")

        except Exception as e:
            raise APIException(f"Unexpected error: {str(e)}")


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
