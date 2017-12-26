
from google.oauth2 import service_account
from google.cloud import storage

import base64
import time
import urllib
from oauth2client.service_account import ServiceAccountCredentials
from datetime import datetime, timedelta
from django.conf import settings
from django.shortcuts import render, get_object_or_404
from django.contrib.auth.decorators import login_required
from django.http import JsonResponse

from main.models.track import Track

GOOGLE_SERVICE_CREDENTIALS = 'google-service-credentials.json'



def sign_url(method, filename, expiration, content_type, track_id):

    expiration = int(expiration)
    type = content_type
    track_obj = Track.objects.get(id=track_id)
    storage_client = storage.Client(project=settings.PROJECT_ID)

    # create the path to the file in gcloud using associated Track object
    blob_path = '{0}/tracks/{1}/{2}'.format(track_obj.submitter, track_obj.slug, filename)

    creds = service_account.Credentials.from_service_account_file(GOOGLE_SERVICE_CREDENTIALS)
    bucket = storage_client.get_bucket(settings.CLOUD_STORAGE_BUCKET)
    blob = bucket.blob(settings.MEDIA_PREFIX + blob_path)

    expiration_dt = datetime.utcnow() + timedelta(minutes=expiration)
    expiration = int(time.mktime( expiration_dt.timetuple() ))

    signed_url = blob.generate_signed_url(method='PUT', expiration=expiration, content_type=type, credentials=creds)

    return signed_url, blob.name





@login_required()
def get_signed_url(request):
    filename = request.GET.get('filename')
    expiration = request.GET.get('expiration')
    type = request.GET.get('type')
    track_id = request.GET.get('track_id')

    signed_url, path = sign_url('PUT', filename, expiration, type, track_id)

    return JsonResponse({ 'signed_url': signed_url, 'file_path': path })
