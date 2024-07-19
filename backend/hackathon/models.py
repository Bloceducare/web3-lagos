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
