from django.db import models
class SpeakerRegistration(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField(unique=True)
    topic = models.CharField(max_length=200)
    bio = models.TextField(blank=True)

class GeneralRegistration(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField(unique=True)
    phone = models.CharField(max_length=15)
    country = models.CharField(max_length=100)  
    location = models.CharField(max_length=200, null=True)
    telegramusername = models.CharField(max_length=200, null=True)
    xhandle = models.CharField(max_length=200, null=True)
    role = models.CharField(max_length=2000, null=True)

class Attendance(models.Model):
    participant = models.ForeignKey(GeneralRegistration, on_delete=models.CASCADE)
    day = models.PositiveSmallIntegerField(default=1)
    present = models.BooleanField(default=False)
    class Meta:
        unique_together = ('participant', 'day')

class Team(models.Model):
    name = models.CharField(max_length=100)
    creator = models.ForeignKey(GeneralRegistration, on_delete=models.CASCADE)
    description = models.TextField(blank=True, max_length=1000)
    project_repository = models.URLField(blank=True)
    live_link = models.URLField(blank=True)  
    members = models.ManyToManyField(GeneralRegistration, related_name='teams', blank=True)

class HackathonRegistration(models.Model):
    participant = models.ForeignKey(GeneralRegistration, on_delete=models.CASCADE)
    stack = models.CharField(max_length=200)
    personal_github = models.URLField(blank=True)
    team = models.ForeignKey(Team, on_delete=models.CASCADE)

class RoadToWeb3LagosRegistration(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField(unique=True)
    blockchain_experience = models.CharField(max_length=200)
    motivation = models.TextField(blank=True)
    status = models.BooleanField(default=False)
