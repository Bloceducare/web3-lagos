from rest_framework import serializers
from .models import Conference, Hall, ScheduleItem


def normalize_youtube_embed_url(value: str) -> str:
    """Accept watch/youtu.be/embed URLs and normalize to youtube.com/embed/..."""
    if not value:
        return value

    url = value.strip()
    if not url:
        return ''

    # Already an embed URL
    if 'youtube.com/embed/' in url or 'youtube-nocookie.com/embed/' in url:
        return url

    video_id = ''
    if 'youtu.be/' in url:
        video_id = url.split('youtu.be/')[-1].split('?')[0].split('/')[0]
    elif 'youtube.com/watch' in url and 'v=' in url:
        video_id = url.split('v=')[1].split('&')[0]
    elif 'youtube.com/live/' in url:
        video_id = url.split('youtube.com/live/')[-1].split('?')[0].split('/')[0]

    if video_id:
        return f'https://www.youtube.com/embed/{video_id}'

    return url


class ConferenceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Conference
        fields = '__all__'


class HallSerializer(serializers.ModelSerializer):
    stream_active = serializers.ReadOnlyField()

    class Meta:
        model = Hall
        fields = '__all__'

    def validate_embed_url(self, value):
        return normalize_youtube_embed_url(value or '')


class ScheduleItemSerializer(serializers.ModelSerializer):
    is_archived = serializers.ReadOnlyField()
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


class HallWithSessionsSerializer(serializers.ModelSerializer):
    sessions = ScheduleItemSerializer(many=True, read_only=True)
    stream_active = serializers.ReadOnlyField()

    class Meta:
        model = Hall
        fields = ['id', 'name', 'slug', 'embed_url', 'is_live', 'stream_active', 'sessions']


class ConferenceWithScheduleSerializer(serializers.ModelSerializer):
    halls = HallWithSessionsSerializer(many=True, read_only=True)

    class Meta:
        model = Conference
        fields = '__all__'
