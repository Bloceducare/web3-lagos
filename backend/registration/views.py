from rest_framework.response import Response
from backend.permissions import IsAuthenticatedByAuthServer
from rest_framework import viewsets, permissions
from rest_framework.decorators import action
from .serializers import GeneralRegistrationSerializer, AttendanceSerializer
from.models import SpeakerRegistration, GeneralRegistration, Attendance, HackathonRegistration, RoadToWeb3LagosRegistration
from.serializers import (SpeakerRegistrationSerializer, GeneralRegistrationSerializer, HackathonRegistrationSerializer, RoadToWeb3LagosRegistrationSerializer)






class SpeakerRegistrationViewSet(viewsets.ModelViewSet):
    queryset = SpeakerRegistration.objects.all()
    serializer_class = SpeakerRegistrationSerializer

    def perform_update(self, serializer):
        instance = self.get_object()
        for attr, value in serializer.validated_data.items():
            setattr(instance, attr, value)
        instance.save()



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
        serializer.save()

    def perform_update(self, serializer):
        serializer.save()

    def perform_destroy(self, instance):
        instance.delete()


class HackathonRegistrationViewSet(viewsets.ModelViewSet):
    queryset = HackathonRegistration.objects.all()
    serializer_class = HackathonRegistrationSerializer

    def perform_update(self, serializer):
        instance = self.get_object()
        for attr, value in serializer.validated_data.items():
            if hasattr(instance, attr):  
                setattr(instance, attr, value)
        instance.save()

class RoadToWeb3LagosRegistrationViewSet(viewsets.ModelViewSet):
    queryset = RoadToWeb3LagosRegistration.objects.all()
    serializer_class = RoadToWeb3LagosRegistrationSerializer

    def perform_update(self, serializer):
        instance = self.get_object()
        for attr, value in serializer.validated_data.items():
            if hasattr(instance, attr):  
                setattr(instance, attr, value)
        instance.save()
