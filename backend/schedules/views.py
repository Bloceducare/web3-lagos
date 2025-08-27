from rest_framework import viewsets, permissions
from rest_framework.pagination import PageNumberPagination
from .models import Conference, Hall, ScheduleItem
from .serializers import ConferenceSerializer, HallSerializer, ScheduleItemSerializer
from backend.permissions import IsAuthenticatedByAuthServer

class ConferenceViewSet(viewsets.ModelViewSet): 
    queryset = Conference.objects.all()
    serializer_class = ConferenceSerializer
    permission_classes = [IsAuthenticatedByAuthServer]  

class HallViewSet(viewsets.ModelViewSet): 
    queryset = Hall.objects.all()
    serializer_class = HallSerializer
    permission_classes = [IsAuthenticatedByAuthServer]  

    def get_queryset(self):
        queryset = Hall.objects.all()
        
        conference_id = self.request.query_params.get('conference', None)
        if conference_id:
            queryset = queryset.filter(conference_id=conference_id)
            
        return queryset

class OptionalPagination(PageNumberPagination):
    page_size = 20
    page_size_query_param = 'page_size'
    max_page_size = 1000
    
    def paginate_queryset(self, queryset, request, view=None):
        if request.query_params.get('all') == 'true':
            return None
        return super().paginate_queryset(queryset, request, view)

class ScheduleItemViewSet(viewsets.ModelViewSet):
    queryset = ScheduleItem.objects.all()
    serializer_class = ScheduleItemSerializer
    pagination_class = OptionalPagination  # Add this
    permission_classes = [IsAuthenticatedByAuthServer]  
    
    def get_queryset(self):
        queryset = ScheduleItem.objects.all()
        
        conference_id = self.request.query_params.get('conference', None)
        if conference_id:
            queryset = queryset.filter(conference_id=conference_id)
        
        hall_id = self.request.query_params.get('hall', None)
        if hall_id:
            queryset = queryset.filter(hall_id=hall_id)
            
        is_archived = self.request.query_params.get('is_archived', None)
        if is_archived is not None:
            if is_archived.lower() == 'true':
                # Show only sessions with youtube_id (archived sessions)
                queryset = queryset.exclude(youtube_id='').exclude(youtube_id__isnull=True)
            else:
                queryset = queryset.filter(youtube_id='') | queryset.filter(youtube_id__isnull=True)
            
        return queryset