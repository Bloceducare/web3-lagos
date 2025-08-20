from django.db import models
from django.utils import timezone
from django.utils.text import slugify

class Conference(models.Model):
    name = models.CharField(max_length=200)
    year = models.IntegerField()
    start_date = models.DateField()
    end_date = models.DateField()
    venue = models.CharField(max_length=200)
    description = models.TextField(blank=True)
    
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        ordering = ['-year']
        unique_together = ['name', 'year']
    
    def __str__(self):
        return f"{self.name} {self.year}"

class Hall(models.Model):
    name = models.CharField(max_length=100)  # "Main Stage", "Hall 1", "Hall 2"
    slug = models.SlugField(max_length=100, blank=True, null=True, help_text="URL-friendly identifier like 'main-stage', 'hall-2'")
    conference = models.ForeignKey(Conference, on_delete=models.CASCADE, related_name='halls')
    embed_url = models.URLField(blank=True, help_text="YouTube embed URL for this hall's live stream")
    
    class Meta:
        unique_together = ['slug', 'conference']
    
    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.name)
        super().save(*args, **kwargs)
    
    def __str__(self):
        return f"{self.name} - {self.conference.name}"

class ScheduleItem(models.Model):
    TALK_TYPES = [
        ('talk', 'Talk'),
        ('workshop', 'Workshop'),
        ('panel', 'Panel Discussion'),
        ('break', 'Break'),
        ('registration', 'Registration'),
        ('networking', 'Networking'),
    ]
  
    # Relationships
    conference = models.ForeignKey(Conference, on_delete=models.CASCADE, related_name='sessions')
    hall = models.ForeignKey(Hall, on_delete=models.CASCADE, related_name='sessions')
    
   

    topic = models.CharField(max_length=500)
    description = models.TextField(blank=True)
    type = models.CharField(max_length=20, choices=TALK_TYPES, default='talk')
    start_datetime = models.DateTimeField()
    end_datetime = models.DateTimeField()
    
    speaker = models.CharField(max_length=200, blank=True)
    speaker_bio = models.TextField(blank=True)
    speaker_image = models.URLField(blank=True)
    
    youtube_id = models.CharField(max_length=50, blank=True)  # For archived videos
    video_thumbnail = models.URLField(blank=True)
    
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        ordering = ['start_datetime']
    
    def __str__(self):
        return f"{self.topic} - {self.speaker or 'No Speaker'}"
    
    @property
    def is_archived(self):
        return bool(self.youtube_id)