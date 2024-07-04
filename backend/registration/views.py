from rest_framework.response import Response
from backend.permissions import IsAuthenticatedByAuthServer
from rest_framework import viewsets, permissions, status
from rest_framework.views import APIView
from django.core.mail import send_mail, EmailMultiAlternatives
from django.template.loader import render_to_string
from django.conf import settings
from .serializers import GeneralRegistrationSerializer, AttendanceSerializer, VerifyCodeSerializer
from.models import SpeakerRegistration, Team, GeneralRegistration, Attendance, HackathonRegistration, RoadToWeb3LagosRegistration
from.serializers import (SpeakerRegistrationSerializer, GeneralRegistrationSerializer, TeamSerializer, HackathonRegistrationSerializer, RoadToWeb3LagosRegistrationSerializer)
import uuid






class SpeakerRegistrationViewSet(viewsets.ModelViewSet):
    queryset = SpeakerRegistration.objects.all()
    serializer_class = SpeakerRegistrationSerializer

    def perform_update(self, serializer):
        instance = self.get_object()
        for attr, value in serializer.validated_data.items():
            setattr(instance, attr, value)
        instance.save()

    def perform_create(self, serializer):
        instance = serializer.save()
        self.send_confirmation_email(instance)

    def send_confirmation_email(self, instance):
        subject = 'Speaker Registration Confirmation'

        context = {
            'name': instance.name,
        }

        message_html = render_to_string('registration/speaker_registration_email.html', context)
        email = EmailMultiAlternatives(subject, '', settings.DEFAULT_FROM_EMAIL, [instance.email])
        email.attach_alternative(message_html, 'text/html')
        email.send()


















class GeneralRegistrationViewSet(viewsets.ModelViewSet):
    queryset = GeneralRegistration.objects.all()
    serializer_class = GeneralRegistrationSerializer

    def get_permissions(self):
        if self.action == 'destroy':
            self.permission_classes = [IsAuthenticatedByAuthServer]
        elif self.action in ['create', 'list', 'retrieve']:
            self.permission_classes = [permissions.AllowAny]
        else:
            self.permission_classes = [permissions.IsAuthenticated]
        return super().get_permissions()

    def perform_update(self, serializer):
        instance = self.get_object()
        for attr, value in serializer.validated_data.items():
            if hasattr(instance, attr):
                setattr(instance, attr, value)
        instance.save()
        return Response(serializer.data)

    def destroy(self, request, *args, **kwargs):
        self.check_object_permissions(request, self.get_object())
        instance = self.get_object()
        self.perform_destroy(instance)
        return Response(status=204)

    def perform_destroy(self, instance):
        instance.delete()

    def perform_create(self, serializer):
        instance = serializer.save()
        self.send_confirmation_email(instance)

    def send_confirmation_email(self, instance):
        subject = 'Registration Confirmation'
        registration_count = GeneralRegistration.objects.count()
        unique_code = None

        if registration_count <= 500:
            unique_code = str(uuid.uuid4()) + str(uuid.uuid4())
            instance.unique_code = unique_code
            instance.save()

        context = {
            'name': instance.name,
            'unique_code': unique_code,
        }

        message_html = render_to_string('registration/general_registration_confirmation_email.html', context)
        email = EmailMultiAlternatives(subject, '', settings.DEFAULT_FROM_EMAIL, [instance.email])
        email.attach_alternative(message_html, 'text/html')
        email.send()


class VerifyCodeView(viewsets.ViewSet):
    serializer_class = VerifyCodeSerializer
    def create(self, request, *args, **kwargs):
        serializer = VerifyCodeSerializer(data=request.data)
        if serializer.is_valid():
            code = serializer.validated_data['code']
            try:
                registration = GeneralRegistration.objects.get(unique_code=code)
                return Response({"message": "Code is valid", "name": registration.name, "email": registration.email}, status=status.HTTP_200_OK)
            except GeneralRegistration.DoesNotExist:
                return Response({"error": "Invalid code"}, status=status.HTTP_400_BAD_REQUEST)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

















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
            creator = GeneralRegistration.objects.get(id=creator_id)
        except GeneralRegistration.DoesNotExist:
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



class AttendanceViewSet(viewsets.ModelViewSet):
    queryset = Attendance.objects.all()
    serializer_class = AttendanceSerializer
    permission_classes = [permissions.IsAuthenticated]

    def list(self, request, *args, **kwargs):
        queryset = self.filter_queryset(self.get_queryset())

        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)

        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=201, headers=headers)

    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance)
        return Response(serializer.data)

    def update(self, request, *args, **kwargs):
        partial = kwargs.pop('partial', False)
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)
        return Response(serializer.data)

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        self.perform_destroy(instance)
        return Response(status=204)

    def perform_create(self, serializer):
        instance = serializer.save()
        self.send_confirmation_email(instance)

    def send_confirmation_email(self, instance):
        subject = 'Attendance Confirmation'
        message = f'Thank you for your attendance, {instance.attendee.name}.'
        recipient_list = [instance.attendee.email]
        send_mail(subject, message, settings.DEFAULT_FROM_EMAIL, recipient_list)


class HackathonRegistrationViewSet(viewsets.ModelViewSet):
    queryset = HackathonRegistration.objects.all()
    serializer_class = HackathonRegistrationSerializer

    def perform_create(self, serializer):
        instance = serializer.save()
        self.send_confirmation_email(instance)

    def send_confirmation_email(self, instance):
        subject = 'Hackathon Registration Confirmation'
        message = f'Thank you for registering for the hackathon, {instance.name}.'
        recipient_list = [instance.email]
        send_mail(subject, message, settings.DEFAULT_FROM_EMAIL, recipient_list)


class RoadToWeb3LagosRegistrationViewSet(viewsets.ModelViewSet):
    queryset = RoadToWeb3LagosRegistration.objects.all()
    serializer_class = RoadToWeb3LagosRegistrationSerializer

    def perform_create(self, serializer):
        instance = serializer.save()
        self.send_confirmation_email(instance)

    def send_confirmation_email(self, instance):
        subject = 'Road to Web3 Lagos Registration Confirmation'
        message = f'Thank you for registering for Road to Web3 Lagos, {instance.name}.'
        recipient_list = [instance.email]
        send_mail(subject, message, settings.DEFAULT_FROM_EMAIL, recipient_list)
