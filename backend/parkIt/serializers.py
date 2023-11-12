from rest_framework import serializers
from django.contrib.auth.models import User
from . import models

class PostSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Post
        fields = '__all__'

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username', 'password', 'email']
        extra_kwargs = {'password' : {'write_only':True}}

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user