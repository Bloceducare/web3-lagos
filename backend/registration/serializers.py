from rest_framework import serializers

from .models import Attendance, SpeakerRegistration, GeneralRegistration, RoadToWeb3LagosRegistration

class GeneralRegistrationSerializer(serializers.ModelSerializer):
    class Meta:
        model = GeneralRegistration
        exclude = ['unique_code']


class AttendanceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Attendance
        fields = '__all__'

class SpeakerRegistrationSerializer(serializers.ModelSerializer):
    class Meta:
        model = SpeakerRegistration
        fields = '__all__'




class RoadToWeb3LagosRegistrationSerializer(serializers.ModelSerializer):
    class Meta:
        model = RoadToWeb3LagosRegistration
        fields = '__all__'

class VerifyCodeSerializer(serializers.Serializer):
    code = serializers.CharField(required=True)

    class Meta:
        fields = 'code'