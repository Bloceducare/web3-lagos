from rest_framework import serializers
from .models import Team, Project

class TeamSerializer(serializers.ModelSerializer):
    class Meta:
        model = Team
        fields = ['id', 'name', 'creator', 'members', 'joining_code']
        read_only_fields = ['creator', 'members', 'joining_code']



class ProjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Project
        fields = ['id', 'name', 'category', 'description', 'live_link', 'demo_video', 'github_url', 'team']
        read_only_fields = ['team']

