from rest_framework import serializers
from .models import Conference, Hall, ScheduleItem

class ConferenceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Conference
        fields = '__all__'

class HallSerializer(serializers.ModelSerializer):
    class Meta:
        model = Hall
        fields = '__all__'

class ScheduleItemSerializer(serializers.ModelSerializer):
    is_archived = serializers.ReadOnlyField()
    # Include nested conference and hall data
    conference_name = serializers.CharField(source='conference.name', read_only=True)
    conference_year = serializers.IntegerField(source='conference.year', read_only=True)
    hall_name = serializers.CharField(source='hall.name', read_only=True)
    hall_slug = serializers.CharField(source='hall.slug', read_only=True)
    
    class Meta:
        model = ScheduleItem
        fields = [
            'id', 'topic', 'description', 'type', 'conference', 'hall',
            'conference_name', 'conference_year', 'hall_name', 'hall_slug',
            'start_datetime', 'end_datetime', 'speaker', 'speaker_bio', 
            'speaker_image', 'youtube_id', 'video_thumbnail', 
            'created_at', 'updated_at', 'is_archived'
        ]

class ScheduleItemCreateSerializer(serializers.ModelSerializer):
    """Serializer for creating schedule items"""
    
    class Meta:
        model = ScheduleItem
        fields = [
            'topic', 'description', 'type', 'conference', 'hall',
            'start_datetime', 'end_datetime', 'speaker', 'speaker_bio', 
            'speaker_image', 'youtube_id', 'video_thumbnail'
        ]

# Nested serializers for complete schedule data
class HallWithSessionsSerializer(serializers.ModelSerializer):
    sessions = ScheduleItemSerializer(many=True, read_only=True)
    
    class Meta:
        model = Hall
        fields = ['id', 'name', 'slug', 'embed_url', 'sessions']

class ConferenceWithScheduleSerializer(serializers.ModelSerializer):
    halls = HallWithSessionsSerializer(many=True, read_only=True)
    
    class Meta:
        model = Conference
        fields = '__all__'