from rest_framework import routers
from .views import TweetViewSet
from django.urls import path, include
from .auth import RegisterView, LogoutView, UserView

router = routers.DefaultRouter()
router.register(r'tweets', TweetViewSet, basename='tweet')

urlpatterns = [
    path('', include(router.urls)),
    path('auth/register/', RegisterView.as_view(), name='register'),
    path('auth/logout/', LogoutView.as_view(), name='logout'),
    path('auth/user/', UserView.as_view(), name='user'),
]
