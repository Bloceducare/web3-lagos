from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (SpeakerRegistrationViewSet, GeneralRegistrationViewSet, HackathonRegistrationViewSet, RoadToWeb3LagosRegistrationViewSet, TeamViewSet)

router = DefaultRouter()
router.register(r'speaker-registrations', SpeakerRegistrationViewSet)
router.register(r'general-registrations', GeneralRegistrationViewSet)
router.register(r'hackathon-registrations', HackathonRegistrationViewSet)
router.register(r'road-to-web3-lagos-registrations', RoadToWeb3LagosRegistrationViewSet)
router.register(r'teams', TeamViewSet, basename='team')

urlpatterns = [
    path('', include(router.urls)),
]
