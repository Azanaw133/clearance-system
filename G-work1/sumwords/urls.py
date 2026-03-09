from django.urls import path
from .views import sum_words_view

urlpatterns = [
    path("sum/", sum_words_view),
]