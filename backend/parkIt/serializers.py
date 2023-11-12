from rest_framework import serializers
from django.contrib.auth.models import User
from . import models

class PostSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Post
        fields = '__all__'

class FavoritePostSerializer(serializers.ModelSerializer):
    post = PostSerializer()
    class Meta:
        model = models.FavoritePost
        exclude = ['id', 'user']


class UserSerializer(serializers.ModelSerializer):
    favorite_posts = FavoritePostSerializer(many = True, read_only=True)
    class Meta:
        model = User
        fields = ['username', 'password', 'email', 'favorite_posts']
        extra_kwargs = {'password' : {'write_only':True}}

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user