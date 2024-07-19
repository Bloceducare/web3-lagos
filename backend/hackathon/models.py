from django.db import models
from users.models import CustomUser

class Team(models.Model):
    name = models.CharField(max_length=100)
    creator = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    description = models.TextField(blank=True, max_length=1000)
    project_repository = models.URLField(blank=True)
    live_link = models.URLField(blank=True)
    members = models.ManyToManyField(CustomUser, related_name='teams', blank=True)

class HackathonRegistration(models.Model):
    participant = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    stack = models.CharField(max_length=200)
    personal_github = models.URLField(blank=True)
    team = models.ForeignKey(Team, on_delete=models.CASCADE, null=True)
