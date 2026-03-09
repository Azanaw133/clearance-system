from django.urls import path
from .views import extract_comments

urlpatterns = [
    path("extract-comments/", extract_comments, name="extract-comments"),
]