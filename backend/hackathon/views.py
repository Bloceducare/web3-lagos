from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework import viewsets, permissions, status
from django.core.mail import send_mail
from django.conf import settings
from .serializers import TeamSerializer
from .models import Team
from users.models import CustomUser

class TeamViewSet(viewsets.ModelViewSet):
    queryset = Team.objects.all()
    serializer_class = TeamSerializer
    permission_classes = [permissions.IsAuthenticated]

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        creator = request.user

        if Team.objects.filter(members=creator).exists():
            return Response({"error": "User is already part of a team and cannot create or join another team."}, status=status.HTTP_400_BAD_REQUEST)

        team = serializer.save(creator=creator)
        team.members.add(creator)
        team.save()

        self.send_confirmation_email(team)

        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)

    @action(detail=False, methods=['post'], url_path='join')
    def join_team(self, request, *args, **kwargs):
        joining_code = request.data.get('joining_code')
        user = request.user

        if not joining_code:
            return Response({"error": "Joining code is required."}, status=status.HTTP_400_BAD_REQUEST)

        try:
            team = Team.objects.get(joining_code=joining_code)
        except Team.DoesNotExist:
            return Response({"error": "Invalid joining code."}, status=status.HTTP_400_BAD_REQUEST)

        if Team.objects.filter(members=user).exists():
            return Response({"error": "User is already part of a team and cannot join another team."}, status=status.HTTP_400_BAD_REQUEST)

        team.members.add(user)
        team.save()

        return Response({"message": "Successfully joined the team."}, status=status.HTTP_200_OK)

    def send_confirmation_email(self, instance):
        subject = 'Team Creation Confirmation'
        message = f'Thank you for creating the team, {instance.creator.first_name}. Your team joining code is {instance.joining_code}.'
        recipient_list = [instance.creator.email]
        send_mail(subject, message, settings.DEFAULT_FROM_EMAIL, recipient_list)
