from rest_framework import permissions
from rest_framework.exceptions import AuthenticationFailed, APIException
import requests
from django.conf import settings


class IsAuthenticatedByAuthServer(permissions.BasePermission):
    """
    Custom permission to allow access only to authenticated users
    whose credentials are validated by the authentication server.
    """

    def has_permission(self, request, view):
        token = request.headers.get('Authorization')
        if not token:
            raise AuthenticationFailed("Authentication token not provided")

        try:
            # Verify token against authentication server
            response = requests.post(
                f"{settings.AUTH_SERVER_URL}/api/token/verify/",
                json={"token": token}
            )
            
            if response.status_code != 200:
                raise AuthenticationFailed("Error authenticating with auth server")

            response_data = response.json()
            user_data = response_data.get("user", {})

            # Check if the user has admin role
            if user_data.get("role") == "admin":
                return True
            else:
                return False

        except requests.exceptions.RequestException as e:
            raise APIException(f"Error communicating with auth server: {str(e)}")

        except Exception as e:
            raise APIException(f"Unexpected error: {str(e)}")
