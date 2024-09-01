from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ResourcesViewset, TeamViewSet,ProjectViewSet

# Create a router and register our viewsets with it.
router = DefaultRouter()
router.register(r'teams', TeamViewSet)
router.register(r'project', ProjectViewSet)
router.register(r'resources', ResourcesViewset)

# The API URLs are now determined automatically by the router.
urlpatterns = [
    path('', include(router.urls)),
]
