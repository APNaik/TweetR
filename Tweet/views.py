from django.shortcuts import render, redirect
from django.shortcuts import get_object_or_404
from .models import Tweet
from .forms import TweetForms, User, UserRegistrationForm
from django.contrib.auth.decorators import login_required
from django.contrib.auth import login
# Create your views here.

def index(request):
    return render(request, 'index.html')

def tweet_list(request):
    tweets = Tweet.objects.all().order_by('-created_at')
    return render(request, 'tweets_list.html', {'tweets': tweets})

@login_required
def create_tweet(request):
    if request.method == 'POST':
        form = TweetForms(request.POST, request.FILES)
        if form.is_valid():
            tweet = form.save(commit=False)
            tweet.user = request.user
            tweet.save()
            return redirect('tweet_list')
    else:
        form = TweetForms()

    return render(request, 'create_tweets.html', {'form': form})

@login_required
def edit_tweet(request, t_id):
    tweet = get_object_or_404(Tweet, pk=t_id, user=request.user)    # this tweet is the model and pk is primary key and we will allow user to edit only if it's his own tweet
    if request.method == 'POST':
        form = TweetForms(request.POST, request.FILES, instance=tweet)  # Dont create new form, instead edit the exisitng one using the instance
        if form.is_valid():
            tweet = form.save(commit=False)
            tweet.user = request.user
            tweet.save()
            return redirect('tweet_list')
    else:
        form = TweetForms(instance=tweet)
    return render(request, 'create_tweets.html', {'form': form})

@login_required
def delete_tweet(request, t_id):
    tweet = get_object_or_404(Tweet, pk=t_id, user=request.user)
    if request.method == 'POST':
        tweet.delete()
        return redirect('tweet_list')
    return render(request, 'tweet_confirm_delete.html', {'tweet': tweet})

def register(request):
    if request.method == 'POST':
        form = UserRegistrationForm(request.POST)
        if form.is_valid():
            user = form.save(commit=False)
            user.set_password(form.cleaned_data['password1'])
            user.save()
            login(request, user)
            return redirect('tweer_list')
    else:
        form = UserRegistrationForm()
    return render(request, 'registration/register.html', {'form': form})