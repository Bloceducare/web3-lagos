from django.db import models
from django.db import models

class SpeakerRegistration(models.Model):
    firstname = models.CharField(max_length=100)
    other_name = models.CharField(max_length=100, blank=True, null=True)
    last_name = models.CharField(max_length=100, blank=True, null=True)
    email = models.EmailField(unique=True)
    phone_number = models.CharField(max_length=15)
    company_name = models.CharField(max_length=100)
    session_type = models.CharField(max_length=100, default="Workshop 1hr")
    website_or_portfolio = models.URLField(blank=True, null=True)
    x_handle = models.CharField(max_length=100, blank=True, null=True)
    lecture_title = models.CharField(max_length=200)
    category = models.CharField(max_length=200, blank=True, null=True)
    session_abstract = models.TextField()
    web3_role = models.CharField(max_length=100)
    available_at_any_day = models.BooleanField(default=False)
    location = models.CharField(max_length=200, blank=True, null=True)
    telegram_id = models.CharField(max_length=100, blank=True, null=True)
    pitch_story = models.TextField(blank=True, null=True)
    spoken_at_web3_before = models.BooleanField(default=False)
    gender = models.CharField(max_length=50, blank=True, null=True)
    profilepicurl = models.URLField(max_length=300, blank=True)

class GeneralRegistration(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField(unique=True)
    phone = models.CharField(max_length=15)
    country = models.CharField(max_length=100)  
    location = models.CharField(max_length=200, null=True)
    gender = models.CharField(max_length=200, null=True)
    telegramusername = models.CharField(max_length=200, null=True)
    xhandle = models.CharField(max_length=200, null=True)
    role = models.CharField(max_length=2000, null=True)
    unique_code = models.CharField(max_length=200, blank=True, null=True)

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
