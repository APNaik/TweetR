from django.urls import path
from . import views

urlpatterns = [
    path('tweet_list/', views.tweet_list, name='tweet_list'),
    path('create/', views.create_tweet, name='create_tweet'),
    path('<int:t_id>/edit/', views.edit_tweet, name='edit_tweet'),
    path('<int:t_id>/delete/', views.delete_tweet, name='delete_tweet')
]