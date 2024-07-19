from rest_framework import serializers
from users.models import CustomUser
from .models import HackathonRegistration, Team

class HackathonRegistrationSerializer(serializers.ModelSerializer):
    class Meta:
        model = HackathonRegistration
        fields = '__all__'

class TeamSerializer(serializers.ModelSerializer):
    members = serializers.PrimaryKeyRelatedField(many=True, queryset=CustomUser.objects.all())

    class Meta:
        model = Team
        fields = '__all__'
