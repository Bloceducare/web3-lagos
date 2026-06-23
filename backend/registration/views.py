from rest_framework.response import Response
from backend.permissions import IsRegistrationAdmin
from rest_framework import viewsets, permissions, status, mixins
from rest_framework.views import APIView
from django.utils import timezone
from django.core.mail import send_mail, EmailMultiAlternatives
from django.template.loader import render_to_string
from django.conf import settings
import requests
from .serializers import (
    GeneralRegistrationSerializer,
    AttendanceSerializer,
    VerifyCodeSerializer,
    SpeakerRegistrationSerializer,
    RoadToWeb3LagosRegistrationSerializer,
    SpeakerNominationSerializer,
)
from .models import (
    SpeakerRegistration,
    GeneralRegistration,
    Attendance,
    RoadToWeb3LagosRegistration,
    SpeakerNomination,
)
import uuid






class SpeakerNominationViewSet(mixins.CreateModelMixin, mixins.ListModelMixin, mixins.RetrieveModelMixin, viewsets.GenericViewSet):
    """Public POST for community speaker suggestions (nomination form)."""

    queryset = SpeakerNomination.objects.all()
    serializer_class = SpeakerNominationSerializer
    permission_classes = [permissions.AllowAny]


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
            'name': instance.firstname +" " + instance.other_name,
        }

        message_html = render_to_string('registration/speaker_registration_email.html', context)
        email = EmailMultiAlternatives(subject, '', settings.DEFAULT_FROM_EMAIL, [instance.email])
        email.attach_alternative(message_html, 'text/html')
        email.send()


















class AdminLoginView(APIView):
    """Authenticate registration dashboard admins via the auth server."""

    permission_classes = [permissions.AllowAny]

    def post(self, request):
        username = (request.data.get('username') or '').strip()
        password = request.data.get('password', '')

        if not username or not password:
            return Response(
                {'error': 'Username and password are required.'},
                status=status.HTTP_400_BAD_REQUEST,
            )

        if not settings.AUTH_SERVER_URL:
            return Response(
                {'error': 'Auth server is not configured.'},
                status=status.HTTP_503_SERVICE_UNAVAILABLE,
            )

        try:
            login_response = requests.post(
                f"{settings.AUTH_SERVER_URL}/api/token/",
                json={'username': username, 'password': password},
                timeout=10,
            )
        except requests.RequestException:
            return Response(
                {'error': 'Could not reach auth server.'},
                status=status.HTTP_502_BAD_GATEWAY,
            )

        if login_response.status_code != 200:
            return Response(
                {'error': 'Invalid credentials.'},
                status=status.HTTP_401_UNAUTHORIZED,
            )

        login_data = login_response.json()
        token = (
            login_data.get('token')
            or login_data.get('access')
            or login_data.get('access_token')
        )
        if not token:
            return Response(
                {'error': 'Auth server did not return a token.'},
                status=status.HTTP_502_BAD_GATEWAY,
            )

        clean_token = str(token).replace('Bearer ', '', 1).strip()
        user_data = login_data.get('user') or {'username': username}

        return Response(
            {
                'token': clean_token,
                'user': user_data,
            },
            status=status.HTTP_200_OK,
        )


class GeneralRegistrationViewSet(viewsets.ModelViewSet):
    queryset = GeneralRegistration.objects.all().order_by('-submitted_at', '-id')
    serializer_class = GeneralRegistrationSerializer

    def get_permissions(self):
        if self.action == 'create':
            self.permission_classes = [permissions.AllowAny]
        else:
            self.permission_classes = [IsRegistrationAdmin]
        return super().get_permissions()

    def perform_update(self, serializer):
        admin = getattr(self.request, 'registration_admin', None) or {}
        extra = {}
        if 'status' in serializer.validated_data:
            extra['reviewed_at'] = timezone.now()
            extra['reviewed_by'] = admin.get('name') or admin.get('email') or 'Admin'
        serializer.save(**extra)

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
