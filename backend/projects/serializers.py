from rest_framework import serializers
from .models import Project
from accounts.serializers import UserProfileSerializer


class ProjectSerializer(serializers.ModelSerializer):

    members = UserProfileSerializer(many=True, read_only=True)
    class Meta:
        model = Project

        fields = ['id', 'title', 'description', 'created_at', 'creator', 'members']

        read_only_fields = ['id', 'creator', 'created_at']

        extra_kwargs = {
            'members': {'required': False, 'allow_empty':True}
        }