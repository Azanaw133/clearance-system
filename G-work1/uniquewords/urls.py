from django.urls import path
from .views import unique_words_view

urlpatterns = [
    path("unique/", unique_words_view),
]