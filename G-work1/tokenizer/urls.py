# toknize/urls.py
from django.urls import path
from .views import tokenize

urlpatterns = [
     path('tokenize/', tokenize, name='tokenize'),
]