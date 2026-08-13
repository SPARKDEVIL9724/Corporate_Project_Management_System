from django.contrib import admin
from .models import Tasks

# Register your models here.

class TaskAdmin(admin.ModelAdmin):
    list_display=('title', 'project', 'assignee', 'status', 'priority', 'due_date')
    list_filter=('status', 'priority', 'project')
    search_fields=('title', 'assignee_username')

admin.site.register(Tasks, TaskAdmin)