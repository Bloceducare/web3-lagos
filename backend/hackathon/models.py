import random
import string
from django.db import models
from users.models import CustomUser

class Team(models.Model):
    name = models.CharField(max_length=100)
    creator = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name='created_teams')
    members = models.ManyToManyField(CustomUser, related_name='teams')
    joining_code = models.CharField(max_length=7, unique=True, editable=False)

    def save(self, *args, **kwargs):
        if not self.joining_code:
            self.joining_code = ''.join(random.choices(string.ascii_uppercase + string.digits, k=7))
        super().save(*args, **kwargs)

    def __str__(self):
        return self.name



class Project(models.Model):
    """
    Project name 
    Category, description , live link , demo video and GitHub URL
    """
    name = models.CharField(max_length=100)
    category = models.CharField(max_length=100)
    description = models.TextField()
    live_link = models.URLField(blank=True)
    demo_video = models.URLField(blank=True)
    github_url = models.URLField(blank=True)
    team = models.ForeignKey(Team, on_delete=models.CASCADE, related_name='projects')

    def __str__(self):
        return self.name
    


class Resources(models.Model):
    """
        Workshop resources
    """
    title = models.CharField(max_length=1000, default='n/a')
    link = models.URLField(blank=True)
    content = models.TextField(blank=True)
    description = models.TextField(blank=True)  # Updated
    author = models.CharField(max_length=1000, blank=True)

