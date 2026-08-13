from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import CustomUser

# Register your models here.

class CustomUserAdmin(UserAdmin):
    list_display = ('username', 'email', 'role', 'employee_id', 'is_staff')
    list_filter = ('role', 'is_staff', 'is_superuser')

    # Configure the fields shown when editing a new profile
    fieldsets = UserAdmin.fieldsets + (
        ('Corporate Details', {'fields': ('role', 'employee_id')}),
    )

admin.site.register(CustomUser, CustomUserAdmin)