from django.shortcuts import render, redirect
from django.shortcuts import get_object_or_404
from .models import Tweet
from .forms import TweetForms

# Create your views here.

def index(request):
    return render(request, 'index.html')

def tweet_list(request):
    tweets = Tweet.objects.all().order_by('-created_at')
    return render(request, 'tweets_list.html', {'Tweets -- ': tweets})

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

    return render(request, 'create_tweets.html', {'form -- ': form})

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
    return render(request, 'create_tweets.html', {'form -- ': form})

def delete_tweet(request, t_id):
    tweet = get_object_or_404(Tweet, pk=t_id, user=request.user)
    if request.metho== 'POST':
        tweet.delete()
        return redirect('tweet_list')
    return render(request, 'tweet_confirm_delete.html', {'tweet -- ': tweet})
