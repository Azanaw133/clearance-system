# stopwords/urls.py
from django.urls import path
from .views import upload_file_nlp
from .views import upload_file_nlp, get_stopwords

urlpatterns = [
    path("upload/", upload_file_nlp, name="upload_file_nlp"),
    path("stopwords/", get_stopwords, name="get_stopwords"),
]