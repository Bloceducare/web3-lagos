from rest_framework import serializers

from .models import Attendance, Team, SpeakerRegistration, GeneralRegistration, HackathonRegistration, RoadToWeb3LagosRegistration

class GeneralRegistrationSerializer(serializers.ModelSerializer):
    class Meta:
        model = GeneralRegistration
        fields = '__all__'

class TeamSerializer(serializers.ModelSerializer):
    members = serializers.PrimaryKeyRelatedField(many=True, queryset=GeneralRegistration.objects.all())

    class Meta:
        model = Team
        fields = '__all__'

class AttendanceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Attendance
        fields = '__all__'

class SpeakerRegistrationSerializer(serializers.ModelSerializer):
    class Meta:
        model = SpeakerRegistration
        fields = '__all__'



class HackathonRegistrationSerializer(serializers.ModelSerializer):
    class Meta:
        model = HackathonRegistration
        fields = '__all__'

class RoadToWeb3LagosRegistrationSerializer(serializers.ModelSerializer):
    class Meta:
        model = RoadToWeb3LagosRegistration
        fields = '__all__'
