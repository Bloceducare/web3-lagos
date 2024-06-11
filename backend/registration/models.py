from django.db import models

class SpeakerRegistration(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField(unique=True)
    topic = models.CharField(max_length=200)
    bio = models.TextField()

class GeneralRegistration(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField(unique=True)
    phone = models.CharField(max_length=15)
    country = models.CharField(max_length=100)  
    organization = models.CharField(max_length=200)

class Attendance(models.Model):
    participant = models.ForeignKey(GeneralRegistration, on_delete=models.CASCADE)
    day = models.PositiveSmallIntegerField()
    present = models.BooleanField(default=False)

    class Meta:
        unique_together = ('participant', 'day')

class Team(models.Model):
    name = models.CharField(max_length=100)
    creator = models.ForeignKey(GeneralRegistration, on_delete=models.CASCADE)  
    members = models.ManyToManyField(GeneralRegistration, related_name='teams', blank=True)

class HackathonRegistration(models.Model):
    participant = models.ForeignKey(GeneralRegistration, on_delete=models.CASCADE)
    project_name = models.CharField(max_length=200)
    project_description = models.TextField()
    team = models.ForeignKey(Team, on_delete=models.CASCADE)

class RoadToWeb3LagosRegistration(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField(unique=True)
    blockchain_experience = models.CharField(max_length=200)
    motivation = models.TextField()
    status = models.BooleanField(default=False)
