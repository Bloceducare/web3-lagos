from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (SpeakerRegistrationViewSet, VerifyCodeView, GeneralRegistrationViewSet,  RoadToWeb3LagosRegistrationViewSet)

router = DefaultRouter()
router.register(r'speaker-registrations', SpeakerRegistrationViewSet)
router.register(r'general-registrations', GeneralRegistrationViewSet)
router.register(r'road-to-web3-lagos-registrations', RoadToWeb3LagosRegistrationViewSet)


urlpatterns = [
    path('', include(router.urls)),
    path('verify-code/', VerifyCodeView.as_view({'post': 'create'}), name='verify-code'),

]
