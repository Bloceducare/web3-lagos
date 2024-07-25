from rest_framework import serializers
from .models import Team, Project

class ProjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Project
        fields = ['id', 'name', 'category', 'description', 'live_link', 'demo_video', 'github_url']
        read_only_fields = ['team']

class TeamSerializer(serializers.ModelSerializer):
    projects = ProjectSerializer(many=True, read_only=True)
    class Meta:
        model = Team
        fields = ['id','name', 'creator', 'members', 'joining_code', 'projects']
        read_only_fields = ['creator', 'members', 'joining_code']


class JoinTeamSerializer(serializers.Serializer):
    joining_code = serializers.CharField()
class InviteSerializer(serializers.Serializer):
    emails = serializers.ListField(
        child=serializers.EmailField(),
        max_length=4
    )


