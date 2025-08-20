from rest_framework import viewsets, permissions
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from .models import Conference, Hall, ScheduleItem
from .serializers import ConferenceSerializer, HallSerializer, ScheduleItemSerializer


class ConferenceViewSet(viewsets.ModelViewSet): 
    queryset = Conference.objects.all()
    serializer_class = ConferenceSerializer
    authentication_classes = [JWTAuthentication]  
    
    def get_permissions(self):
        if self.action in ['list', 'retrieve']:
            # Anyone can read conferences
            permission_classes = [permissions.AllowAny]
        else:
            # Only staff can create/update/delete conferences
            permission_classes = [permissions.IsAuthenticated, IsStaffUser]
        
        return [permission() for permission in permission_classes]

class HallViewSet(viewsets.ModelViewSet): 
    queryset = Hall.objects.all()
    serializer_class = HallSerializer
    authentication_classes = [JWTAuthentication]  
    
    def get_permissions(self):
        if self.action in ['list', 'retrieve']:
            permission_classes = [permissions.AllowAny]
        else:
            permission_classes = [permissions.IsAuthenticated, IsStaffUser]
        
        return [permission() for permission in permission_classes]

class ScheduleItemViewSet(viewsets.ModelViewSet):
    queryset = ScheduleItem.objects.all()
    serializer_class = ScheduleItemSerializer
    authentication_classes = [JWTAuthentication]
    
    def get_permissions(self):
        if self.action in ['list', 'retrieve']:
            permission_classes = [permissions.AllowAny]
        else:
            permission_classes = [permissions.IsAuthenticated, IsStaffUser]
        
        return [permission() for permission in permission_classes]
    
    def get_queryset(self):
        queryset = ScheduleItem.objects.all()
        
        conference_id = self.request.query_params.get('conference', None)
        if conference_id:
            queryset = queryset.filter(conference_id=conference_id)
        
        hall_id = self.request.query_params.get('hall', None)
        if hall_id:
            queryset = queryset.filter(hall_id=hall_id)
            
        # Filter archived sessions
        is_archived = self.request.query_params.get('is_archived', None)
        if is_archived is not None:
            queryset = queryset.filter(is_archived=is_archived.lower() == 'true')
            
        return queryset

# Custom permission class
class IsStaffUser(permissions.BasePermission):
    def has_permission(self, request, view):
        return request.user.is_authenticated and request.user.is_staff