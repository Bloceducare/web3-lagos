from rest_framework.response import Response
from rest_framework import viewsets, permissions, status
from django.core.mail import send_mail
from django.conf import settings
from .serializers import TeamSerializer, HackathonRegistrationSerializer
from .models import Team, HackathonRegistration
from users.models import CustomUser

class TeamViewSet(viewsets.ModelViewSet):
    queryset = Team.objects.all()
    serializer_class = TeamSerializer
    permission_classes = [permissions.IsAuthenticated]

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        # Get the creator ID from request data
        creator_id = serializer.validated_data.get('creator_id')

        # Check if the creator ID is valid
        try:
            creator = CustomUser.objects.get(id=creator_id)
        except CustomUser.DoesNotExist:
            return Response({"error": "Invalid creator ID"}, status=status.HTTP_400_BAD_REQUEST)

        # Create the team with the specified creator
        team = serializer.save(creator=creator)

        self.send_confirmation_email(team)

        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)

    def send_confirmation_email(self, instance):
        subject = 'Team Creation Confirmation'
        message = f'Thank you for creating the team, {instance.creator.name}.'
        recipient_list = [instance.creator.email]
        send_mail(subject, message, settings.DEFAULT_FROM_EMAIL, recipient_list)

class HackathonRegistrationViewSet(viewsets.ModelViewSet):
    queryset = HackathonRegistration.objects.all()
    serializer_class = HackathonRegistrationSerializer

    def perform_create(self, serializer):
        instance = serializer.save()
        self.send_confirmation_email(instance)

    def send_confirmation_email(self, instance):
        subject = 'Hackathon Registration Confirmation'
        message = f'Thank you for registering for the hackathon, {instance.participant.name}.'
        recipient_list = [instance.participant.email]
        send_mail(subject, message, settings.DEFAULT_FROM_EMAIL, recipient_list)
