from django.contrib import admin
from .models import Project

# Register your models here.

class Projectadmin(admin.ModelAdmin):
    list_display = ('title', 'creator', 'created_at')
    search_fields = ('title', 'creator_username')
    list_filter = ('created_at',)

admin.site.register(Project, Projectadmin)