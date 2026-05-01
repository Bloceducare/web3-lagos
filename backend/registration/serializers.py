from rest_framework import serializers

from .models import (
    Attendance,
    GeneralRegistration,
    RoadToWeb3LagosRegistration,
    SpeakerNomination,
    SpeakerRegistration,
)

class GeneralRegistrationSerializer(serializers.ModelSerializer):
    class Meta:
        model = GeneralRegistration
        exclude = ['unique_code']


class AttendanceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Attendance
        fields = '__all__'

class SpeakerNominationSerializer(serializers.ModelSerializer):
    """Accepts camelCase keys from the static HTML/frontend form."""

    speakerName = serializers.CharField(source='speaker_name', max_length=200)
    speakerHandle = serializers.CharField(
        source='speaker_handle', required=False, allow_blank=True, max_length=500
    )
    speakerOrg = serializers.CharField(
        source='speaker_org', required=False, allow_blank=True, max_length=200
    )
    speakerLocation = serializers.CharField(
        source='speaker_location', required=False, allow_blank=True, max_length=200
    )
    topic = serializers.CharField(max_length=200)
    suggestedTalk = serializers.CharField(
        source='suggested_talk', required=False, allow_blank=True, max_length=500
    )
    reason = serializers.CharField()
    reference = serializers.CharField(required=False, allow_blank=True, max_length=500)
    yourName = serializers.CharField(source='your_name', max_length=200)
    yourEmail = serializers.EmailField(source='your_email')
    yourRole = serializers.CharField(
        source='your_role', required=False, allow_blank=True, max_length=200
    )

    class Meta:
        model = SpeakerNomination
        fields = [
            'speakerName',
            'speakerHandle',
            'speakerOrg',
            'speakerLocation',
            'topic',
            'suggestedTalk',
            'reason',
            'reference',
            'yourName',
            'yourEmail',
            'yourRole',
        ]


class SpeakerRegistrationSerializer(serializers.ModelSerializer):
    class Meta:
        model = SpeakerRegistration
        fields = '__all__'




class RoadToWeb3LagosRegistrationSerializer(serializers.ModelSerializer):
    class Meta:
        model = RoadToWeb3LagosRegistration
        fields = '__all__'

class VerifyCodeSerializer(serializers.Serializer):
    code = serializers.CharField(required=True)

    class Meta:
        fields = 'code'