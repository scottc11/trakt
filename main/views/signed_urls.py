
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

GOOGLE_SERVICE_CREDENTIALS = 'google-service-credentials.json'



def sign_url(method, filename, expiration, content_type):
    file_name = filename
    expiration = int(expiration)
    type = content_type

    creds = service_account.Credentials.from_service_account_file(GOOGLE_SERVICE_CREDENTIALS)
    bucket = storage.Client().get_bucket('trakt')
    blob = bucket.blob('dev/tests/' + file_name)

    expiration_dt = datetime.utcnow() + timedelta(minutes=expiration)
    expiration = int(time.mktime( expiration_dt.timetuple() ))

    signed_url = blob.generate_signed_url(method='PUT', expiration=expiration, content_type=type, credentials=creds)

    return signed_url





@login_required()
def get_signed_url(request):
    filename = request.GET.get('filename')
    expiration = request.GET.get('expiration')
    type = request.GET.get('type')
    signed_url = sign_url('PUT', filename, expiration, type)

    return JsonResponse({ 'signed_url': signed_url })
