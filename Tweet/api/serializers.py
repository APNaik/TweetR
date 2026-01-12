from rest_framework import serializers
from Tweet.models import Tweet, Like
from django.contrib.auth.models import User


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username')


class TweetSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    likes_count = serializers.IntegerField(read_only=True)
    is_liked = serializers.SerializerMethodField()

    class Meta:
        model = Tweet
        fields = ('id', 'user', 'text', 'photo', 'created_at', 'updated_at', 'likes_count', 'is_liked')
        read_only_fields = ('id', 'user', 'created_at', 'updated_at', 'likes_count', 'is_liked')

    def get_is_liked(self, obj):
        request = self.context.get('request')
        if request and request.user.is_authenticated:
            return obj.is_liked_by(request.user)
        return False


class LikeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Like
        fields = ('id', 'user', 'tweet', 'created_at')
        read_only_fields = ('id', 'user', 'created_at')
