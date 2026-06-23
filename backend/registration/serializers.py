from rest_framework import serializers

from .models import (
    Attendance,
    GeneralRegistration,
    RoadToWeb3LagosRegistration,
    SpeakerNomination,
    SpeakerRegistration,
)

class GeneralRegistrationSerializer(serializers.ModelSerializer):
    location = serializers.CharField(
        required=False, allow_blank=True, allow_null=True, max_length=200
    )
    gender = serializers.CharField(
        required=False, allow_blank=True, allow_null=True, max_length=200
    )
    github = serializers.CharField(
        required=False, allow_blank=True, allow_null=True, max_length=100
    )
    telegramusername = serializers.CharField(
        required=False, allow_blank=True, allow_null=True, max_length=200
    )
    xhandle = serializers.CharField(
        required=False, allow_blank=True, allow_null=True, max_length=200
    )
    role = serializers.CharField(
        required=False, allow_blank=True, allow_null=True, max_length=2000
    )
    organisation = serializers.CharField(
        required=False, allow_blank=True, allow_null=True, max_length=200
    )
    track = serializers.CharField(
        required=False, allow_blank=True, allow_null=True, max_length=100
    )
    attend_type = serializers.CharField(
        required=False, allow_blank=True, allow_null=True, max_length=50
    )
    visa_needed = serializers.BooleanField(required=False, default=False)
    notes = serializers.CharField(
        required=False, allow_blank=True, allow_null=True
    )
    status = serializers.ChoiceField(
        choices=GeneralRegistration.STATUS_CHOICES,
        required=False,
        default=GeneralRegistration.STATUS_PENDING,
    )
    reviewed_at = serializers.DateTimeField(required=False, allow_null=True)
    reviewed_by = serializers.CharField(
        required=False, allow_blank=True, allow_null=True, max_length=200
    )

    class Meta:
        model = GeneralRegistration
        exclude = ['unique_code']
        read_only_fields = ['submitted_at']

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        request = self.context.get('request')
        is_admin_update = (
            request
            and request.method in ('PUT', 'PATCH')
            and getattr(request, 'registration_admin', None)
        )
        if not is_admin_update:
            self.fields['status'].read_only = True
            self.fields['reviewed_at'].read_only = True
            self.fields['reviewed_by'].read_only = True


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