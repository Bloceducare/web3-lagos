from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import TeamViewSet, HackathonRegistrationViewSet

# Create a router and register our viewsets with it.
router = DefaultRouter()
router.register(r'teams', TeamViewSet)
router.register(r'hackathon_registrations', HackathonRegistrationViewSet)

# The API URLs are now determined automatically by the router.
urlpatterns = [
    path('', include(router.urls)),
]
