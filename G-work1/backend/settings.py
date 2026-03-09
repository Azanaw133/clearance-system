"""
Django settings for backend project.
"""

from pathlib import Path

# ----------------------------------
# BASE DIRECTORY
# ----------------------------------
BASE_DIR = Path(__file__).resolve().parent.parent

# ----------------------------------
# SECURITY
# ----------------------------------
SECRET_KEY = 'django-insecure-REPLACE_WITH_YOUR_OWN_SECRET_KEY'
DEBUG = True  # Turn False in production
ALLOWED_HOSTS = []  # Add your domain in production

# ----------------------------------
# INSTALLED APPS
# ----------------------------------
INSTALLED_APPS = [
    'corsheaders',          # <-- for React frontend
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',

    'stopwords',   
    'stemming',
    'tokenizer',
    'sumwords',  
    'uniquewords', 
    'frequency',
    'youtube',

   
]

# ----------------------------------
# MIDDLEWARE
# ----------------------------------
MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware',  # must be at top
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

# ----------------------------------
# URL CONFIG
# ----------------------------------
ROOT_URLCONF = 'backend.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],  # Add template folders if needed
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'backend.wsgi.application'

# ----------------------------------
# DATABASE (SQLite for development)
# ----------------------------------
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': BASE_DIR / 'db.sqlite3',
    }
}

# ----------------------------------
# PASSWORD VALIDATION
# ----------------------------------
AUTH_PASSWORD_VALIDATORS = [
    {'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',},
    {'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',},
    {'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',},
    {'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',},
]

# ----------------------------------
# INTERNATIONALIZATION
# ----------------------------------
LANGUAGE_CODE = 'en-us'
TIME_ZONE = 'UTC'
USE_I18N = True
USE_TZ = True

# ----------------------------------
# STATIC FILES
# ----------------------------------
STATIC_URL = 'static/'
STATICFILES_DIRS = [
    BASE_DIR / "static",
]

# ----------------------------------
# MEDIA FILES (File Uploads)
# ----------------------------------
MEDIA_URL = '/media/'
MEDIA_ROOT = BASE_DIR / 'media'

# ----------------------------------
# DEFAULT AUTO FIELD
# ----------------------------------
DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'

# ----------------------------------
# CORS SETTINGS (React Frontend)
# ----------------------------------
# Development: allow all origins
CORS_ALLOW_ALL_ORIGINS = True

# Production (replace with your frontend URLs)
# CORS_ALLOWED_ORIGINS = [
#     "http://localhost:5173",
#     "http://127.0.0.1:5173",
# ]