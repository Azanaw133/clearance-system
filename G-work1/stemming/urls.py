# stemming/urls.py
from django.urls import path
from .views import upload_file

urlpatterns = [
    path('stem/', upload_file, name='stem'),
]