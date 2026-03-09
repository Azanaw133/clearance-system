# backend/urls.py
from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('stopwords.urls')),
    path('api/stemming/', include('stemming.urls')),
    path('api/tokenizer/', include('tokenizer.urls')),
    path("api/sumwords/", include("sumwords.urls")),
    path("api/uniquewords/", include("uniquewords.urls")),
    path("api/frequency/", include("frequency.urls")),
    path('api/youtube/', include('youtube.urls')),
]