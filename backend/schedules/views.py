from rest_framework import viewsets, permissions
from rest_framework.pagination import PageNumberPagination
from rest_framework.response import Response
from .models import Conference, Hall, ScheduleItem
from .serializers import ConferenceSerializer, HallSerializer, ScheduleItemSerializer
from backend.permissions import IsAuthenticatedByAuthServer
from django.core.cache import cache
from django.utils.decorators import method_decorator
from django.views.decorators.cache import cache_page

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
    queryset = ScheduleItem.objects.select_related('conference', 'hall').all()
    serializer_class = ScheduleItemSerializer
    pagination_class = OptionalPagination  
    permission_classes = [IsAuthenticatedByAuthServer]  
    
    def get_queryset(self):
        # Use select_related to join related tables in single query
        queryset = ScheduleItem.objects.select_related('conference', 'hall').all()
        
        conference_id = self.request.query_params.get('conference', None)
        if conference_id:
            queryset = queryset.filter(conference_id=conference_id)
        
        hall_id = self.request.query_params.get('hall', None)
        if hall_id:
            queryset = queryset.filter(hall_id=hall_id)
            
        is_archived = self.request.query_params.get('is_archived', None)
        if is_archived is not None:
            if is_archived.lower() == 'true':
                queryset = queryset.exclude(youtube_id='').exclude(youtube_id__isnull=True)
            else:
                queryset = queryset.filter(youtube_id='') | queryset.filter(youtube_id__isnull=True)
            
        return queryset.order_by('-created_at')
    
    def list(self, request, *args, **kwargs):
        cache_key = f"sessions_{hash(str(sorted(request.query_params.items())))}"
        
        # Cache archived sessions
        is_archived = request.query_params.get('is_archived', '').lower() == 'true'
        cache_timeout = 60 * 15 if is_archived else 60 * 2  # 15 min 
        
        # Check cache first
        cached_data = cache.get(cache_key)
        if cached_data is not None:
            return Response(cached_data)
        
        # Get the queryset and serialize the data
        queryset = self.filter_queryset(self.get_queryset())
        
        # Handle pagination
        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            paginated_data = self.get_paginated_response(serializer.data).data
            
            # Cache the paginated data
            cache.set(cache_key, paginated_data, cache_timeout)
            return Response(paginated_data)
        
        # No pagination
        serializer = self.get_serializer(queryset, many=True)
        data = serializer.data
        
        # Cache the serialized data
        cache.set(cache_key, data, cache_timeout)
        return Response(data)