from django.db import models
from django.contrib.auth.models import AbstractUser

# Create your models here.
class CustomUser(AbstractUser):
    ROLE_CHOICES = [
        ('MANAGER', 'Project Manager'),
        ('DEVELOPER', 'Developer'),
        ('QA', 'Qualified Assurance'),
    ]
    role = models.CharField(max_length=20, choices=ROLE_CHOICES, default='DEVELOPER')
    employee_id = models.CharField(max_length=15, unique=True, blank=True, null=True)
    def __str__(self):
        return f"{self.username} ({self.role})"