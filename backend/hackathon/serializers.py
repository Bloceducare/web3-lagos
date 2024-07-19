from rest_framework import serializers
from .models import Team

class TeamSerializer(serializers.ModelSerializer):
    class Meta:
        model = Team
        fields = ['id', 'name', 'creator', 'members', 'joining_code']
        read_only_fields = ['creator', 'members', 'joining_code']
