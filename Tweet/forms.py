from django import forms
from .models import Tweet

class TweetForms(forms.ModelForm):
    class Meta:
        model = Tweet
        fields = ['text', 'photo']
            