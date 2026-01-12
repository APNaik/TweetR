from rest_framework import viewsets, permissions, status
from rest_framework.decorators import action
from rest_framework.response import Response
from Tweet.models import Tweet, Like, UserActivity
from .serializers import TweetSerializer, UserSerializer
from rest_framework.parsers import MultiPartParser, FormParser
from django.contrib.auth.models import User
from django.utils import timezone
from datetime import timedelta


class IsOwnerOrReadOnly(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        # Read permissions are allowed to any request
        if request.method in permissions.SAFE_METHODS:
            return True
        # Write permissions only to the owner
        return obj.user == request.user


class TweetViewSet(viewsets.ModelViewSet):
    queryset = Tweet.objects.all().order_by('-created_at')
    serializer_class = TweetSerializer
    permission_classes = [IsOwnerOrReadOnly]
    parser_classes = [MultiPartParser, FormParser]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

    def get_serializer_context(self):
        context = super().get_serializer_context()
        context['request'] = self.request
        return context

    @action(detail=True, methods=['post'], permission_classes=[permissions.IsAuthenticated])
    def like(self, request, pk=None):
        tweet = self.get_object()
        user = request.user
        
        # Update user activity
        UserActivity.objects.update_or_create(user=user, defaults={'last_activity': timezone.now()})
        
        like, created = Like.objects.get_or_create(user=user, tweet=tweet)
        if created:
            return Response({'status': 'liked', 'likes_count': tweet.likes_count()}, status=status.HTTP_201_CREATED)
        else:
            return Response({'status': 'already liked', 'likes_count': tweet.likes_count()}, status=status.HTTP_200_OK)

    @action(detail=True, methods=['post'], permission_classes=[permissions.IsAuthenticated])
    def unlike(self, request, pk=None):
        tweet = self.get_object()
        user = request.user
        
        # Update user activity
        UserActivity.objects.update_or_create(user=user, defaults={'last_activity': timezone.now()})
        
        try:
            like = Like.objects.get(user=user, tweet=tweet)
            like.delete()
            return Response({'status': 'unliked', 'likes_count': tweet.likes_count()}, status=status.HTTP_200_OK)
        except Like.DoesNotExist:
            return Response({'status': 'not liked'}, status=status.HTTP_400_BAD_REQUEST)


class OnlineUsersViewSet(viewsets.ViewSet):
    permission_classes = [permissions.IsAuthenticated]

    def list(self, request):
        # Update current user activity
        UserActivity.objects.update_or_create(user=request.user, defaults={'last_activity': timezone.now()})
        
        # Get users active in the last 5 minutes
        time_threshold = timezone.now() - timedelta(minutes=5)
        active_users = UserActivity.objects.filter(last_activity__gte=time_threshold).select_related('user')
        
        users_data = [
            {'id': ua.user.id, 'username': ua.user.username, 'last_activity': ua.last_activity}
            for ua in active_users
        ]
        
        return Response(users_data)
