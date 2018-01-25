import os
import dj_database_url
from .base import *

print('settings: production ')

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = os.environ['DJANGO_SECRET_KEY']

DEBUG = True

ALLOWED_HOSTS = ['*']

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': os.environ['DB_NAME'],
        'USER': os.environ['DB_USER'],
        'PASSWORD': os.environ['DB_PASS'],
        'PORT': '5432',
        'HOST': 'ec2-54-235-220-220.compute-1.amazonaws.com',
    }
}

# google postrgres HOST = /cloudsql/trakt-183713:us-central1:trakt-prod-db-1

STATIC_URL = 'https://storage.googleapis.com/{}/static/'.format(os.environ['GC_STORAGE_BUCKET'])

# GOOGLE CLOUD
# ----------------------------------------------------------------------------

PROJECT_ID = os.environ['GC_PROJECT_ID']
CLOUD_STORAGE_BUCKET = os.environ['GC_STORAGE_BUCKET']
MEDIA_PREFIX = "prod/users/"

CLOUD_STORAGE_ROOT = "https://storage.googleapis.com/{bucket_name}/".format(
    bucket_name=CLOUD_STORAGE_BUCKET
)

MEDIA_URL = "{gcs_root}{prefix}/".format(
    gcs_root=CLOUD_STORAGE_ROOT,
    prefix=MEDIA_PREFIX,
)
