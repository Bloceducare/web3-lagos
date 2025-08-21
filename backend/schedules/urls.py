from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ConferenceViewSet, HallViewSet, ScheduleItemViewSet

router = DefaultRouter()
router.register(r'conferences', ConferenceViewSet)
router.register(r'halls', HallViewSet)
router.register(r'sessions', ScheduleItemViewSet)

urlpatterns = [
    path('api/', include(router.urls)),
]