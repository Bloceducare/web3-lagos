from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework import viewsets, permissions, status
from django.core.mail import send_mail
from django.conf import settings
from .serializers import InviteSerializer, JoinTeamSerializer, TeamSerializer, ProjectSerializer
from .models import Team, Project
from users.models import CustomUser
from django.db import models
from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi

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

    @swagger_auto_schema(
        request_body=JoinTeamSerializer,
        responses={200: openapi.Response('Successfully joined the team.'),
                   400: openapi.Response('Invalid joining code or already part of a team.')}
    )
    @action(detail=False, methods=['post'], url_path='join')
    def join_team(self, request, *args, **kwargs):
        serializer = JoinTeamSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        joining_code = serializer.validated_data.get('joining_code')
        user = request.user

        try:
            team = Team.objects.get(joining_code=joining_code)
        except Team.DoesNotExist:
            return Response({"error": "Invalid joining code."}, status=status.HTTP_400_BAD_REQUEST)

        if Team.objects.filter(members=user).exists():
            return Response({"error": "User is already part of a team and cannot join another team."}, status=status.HTTP_400_BAD_REQUEST)

        team.members.add(user)
        team.save()

        return Response({"message": "Successfully joined the team."}, status=status.HTTP_200_OK)


    @action(detail=False, methods=['get'], url_path='my-teams')
    def my_teams(self, request, *args, **kwargs):
        user = request.user
        teams = Team.objects.filter(creator=user) | Team.objects.filter(members=user)
        serializer = self.get_serializer(teams, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    
    @swagger_auto_schema(
        request_body=InviteSerializer,
        responses={200: openapi.Response('Invitations sent successfully.'),
                   403: openapi.Response('Only team members or the creator can invite others.')}
    )
    @action(detail=True, methods=['post'], url_path='invite')
    def invite_to_team(self, request, pk=None):
        team = self.get_object()
        user = request.user

        if user not in team.members.all() and user != team.creator:
            return Response({"error": "Only team members or the creator can invite others."}, status=status.HTTP_403_FORBIDDEN)

        serializer = InviteSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        emails = serializer.validated_data.get('emails', [])

        for email in emails:
            self.send_invite_email(email, team)

        return Response({"message": "Invitations sent successfully."}, status=status.HTTP_200_OK)

    def send_confirmation_email(self, instance):
        subject = 'Team Creation Confirmation'
        message = f'successful team creation, {instance.creator.first_name}. Your team joining code is {instance.joining_code}.'
        recipient_list = [instance.creator.email]
        send_mail(subject, message, settings.DEFAULT_FROM_EMAIL, recipient_list)

    def send_invite_email(self, email, team):
        subject = 'Team Invitation'
        message = f'You have been invited to join the team {team.name}. Use the following joining code to join the team: {team.joining_code}. https://event.web3bridge.com/hackathon/team'
        send_mail(subject, message, settings.DEFAULT_FROM_EMAIL, [email])



class ProjectViewSet(viewsets.ModelViewSet):
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer
    permission_classes = [permissions.IsAuthenticated]

    def view(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance)
        return Response(serializer.data)

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        # Fetch the team from the request.user's teams (either as a creator or member)
        try:
            team = Team.objects.filter(
                models.Q(creator=request.user) | models.Q(members=request.user)
            ).distinct().get()
        except Team.DoesNotExist:
            return Response({"error": "You must belong to a team to create a project."}, status=status.HTTP_400_BAD_REQUEST)
        except Team.MultipleObjectsReturned:
            return Response({"error": "You belong to multiple teams. Please specify a team."}, status=status.HTTP_400_BAD_REQUEST)

        # Check if the team already has a project
        if Project.objects.filter(team=team).exists():
            return Response({"error": "This team already has a project. You can only update or delete the existing project."}, status=status.HTTP_400_BAD_REQUEST)

        # Save the project with the associated team
        project = serializer.save(team=team)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)

    def update(self, request, *args, **kwargs):
        partial = kwargs.pop('partial', False)
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)

        # Ensure only the team creator can update the project
        if request.user != instance.team.creator:
            return Response({"error": "Only the team creator can update the project."}, status=status.HTTP_400_BAD_REQUEST)

        self.perform_update(serializer)
        return Response(serializer.data)

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()

        # Ensure only the team creator can delete the project
        if request.user != instance.team.creator:
            return Response({"error": "Only the team creator can delete the project."}, status=status.HTTP_400_BAD_REQUEST)

        self.perform_destroy(instance)
        return Response(status=status.HTTP_204_NO_CONTENT)
