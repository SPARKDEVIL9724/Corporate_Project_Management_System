from rest_framework import serializers
from django.db.models import Q
from django.contrib.auth import authenticate
from .models import CustomUser


class UserProfileSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, min_length=8)

    class Meta:
        model = CustomUser
        fields = ['id', 'username', 'email', 'password', 'role']
        extra_kwargs = {
            'email': {'required': True},
        }

    def create(self, validated_data):
        password = validated_data.pop('password')
        user = CustomUser.objects.create_user(password=password, **validated_data)
        return user


class LoginSerializer(serializers.Serializer):
    identifier = serializers.CharField()
    password = serializers.CharField(write_only=True)

    def validate(self, attrs):
        identifier = attrs['identifier']
        password = attrs.pop('password')
        user = None

        try:
            user = CustomUser.objects.get(Q(username=identifier) | Q(email=identifier))
        except CustomUser.DoesNotExist:
            raise serializers.ValidationError('Invalid credentials')

        user = authenticate(username=user.username, password=password)
        if user is None:
            raise serializers.ValidationError('Invalid credentials')

        attrs['user'] = user
        return attrs


class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ['id', 'username', 'email', 'role', 'employee_id']
