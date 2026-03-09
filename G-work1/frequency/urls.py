from django.urls import path
from .views import frequency_view

urlpatterns = [
    path("count/", frequency_view),
]