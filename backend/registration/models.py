from django.db import models

class SpeakerNomination(models.Model):
    """Community suggestion for who should speak at Web3Lagos (nomination form)."""

    speaker_name = models.CharField(max_length=200)
    speaker_handle = models.CharField(max_length=500, blank=True)
    speaker_org = models.CharField(max_length=200, blank=True)
    speaker_location = models.CharField(max_length=200, blank=True)
    topic = models.CharField(max_length=200)
    suggested_talk = models.CharField(max_length=500, blank=True)
    reason = models.TextField()
    reference = models.CharField(max_length=500, blank=True)
    your_name = models.CharField(max_length=200)
    your_email = models.EmailField()
    your_role = models.CharField(max_length=200, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f"{self.speaker_name} (by {self.your_email})"


class SpeakerRegistration(models.Model):
    firstname = models.CharField(max_length=100)
    title = models.CharField(max_length=100, blank=True, null=True)
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
    github = models.URLField(max_length=100, null=True)
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



class RoadToWeb3LagosRegistration(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField(unique=True)
    blockchain_experience = models.CharField(max_length=200)
    motivation = models.TextField(blank=True)
    status = models.BooleanField(default=False)
