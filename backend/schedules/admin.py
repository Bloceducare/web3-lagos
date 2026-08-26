from django.contrib import admin
from .models import Conference, Hall, ScheduleItem


@admin.register(Conference)
class ConferenceAdmin(admin.ModelAdmin):
    list_display = ('name', 'year', 'start_date', 'end_date', 'venue')
    list_filter = ('year',)
    search_fields = ('name', 'venue')
    ordering = ('-year',)


@admin.register(Hall)
class HallAdmin(admin.ModelAdmin):
    list_display = ('name', 'slug', 'conference', 'is_live', 'embed_url')
    list_filter = ('conference', 'is_live')
    search_fields = ('name', 'slug')
    list_editable = ('is_live',)
    prepopulated_fields = {'slug': ('name',)}


@admin.register(ScheduleItem)
class ScheduleItemAdmin(admin.ModelAdmin):
    list_display = ('topic', 'speaker', 'hall', 'conference', 'start_datetime', 'type')
    list_filter = ('conference', 'hall', 'type')
    search_fields = ('topic', 'speaker')
    date_hierarchy = 'start_datetime'
