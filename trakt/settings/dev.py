
import os
import dj_database_url
from .base import *
from YamJam import yamjam

print('settings: development ')

CFG = yamjam()['trakt']

SECRET_KEY = CFG['django_secret_key']

DEBUG = True


DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': os.path.join(BASE_DIR, 'db.sqlite3'),
    },
    'test': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': CFG['cloud_sql']['database_name'],
        'USER': CFG['cloud_sql']['user']['name'],
        'PASSWORD': CFG['cloud_sql']['user']['pass'],
        'PORT': '5432',
        'HOST': '127.0.0.1'
    }
}

# GOOGLE CLOUD
# ----------------------------------------------------------------------------

PROJECT_ID = 'trakt-183713'
CLOUD_STORAGE_BUCKET = 'trakt'
MEDIA_PREFIX = "dev/users/"

CLOUD_STORAGE_ROOT = "https://storage.googleapis.com/{bucket_name}/".format(
    bucket_name=CLOUD_STORAGE_BUCKET
)

MEDIA_URL = "{gcs_root}{prefix}/".format(
    gcs_root=CLOUD_STORAGE_ROOT,
    prefix=MEDIA_PREFIX,
)
