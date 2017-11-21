import base64
import time
import urllib
import Crypto.Hash.SHA256 as SHA256
import Crypto.PublicKey.RSA as RSA
import Crypto.Signature.PKCS1_v1_5 as PKCS1_v1_5
from oauth2client.service_account import ServiceAccountCredentials
from datetime import datetime, timedelta
from django.conf import settings
from django.shortcuts import render, get_object_or_404
from django.contrib.auth.decorators import login_required
from django.http import JsonResponse

GOOGLE_SERVICE_CREDENTIALS = 'google-service-credentials.json'

@login_required()
def get_signed_url(request):
    filename = request.GET.get('filename')
    expiration = request.GET.get('expiration')
    type = request.GET.get('type')
    signed_url = CloudStorageSignedURL(
                method='PUT',
                file_name=filename,
                expiration_m=expiration,
                content_type=type
                )
    signed_url = signed_url.sign_url()

    return JsonResponse({ 'signed_url': signed_url })



class CloudStorageSignedURL(object):

    def __init__(self, method, file_name, expiration_m, content_type):
        self.HTTP_method = method
        self.content_type = content_type
        self.expiration = int(expiration_m)
        self.file_name = file_name

    def sign_url(self):

        expiration_dt = datetime.utcnow() + timedelta(minutes=self.expiration)
        expiration = int(time.mktime( expiration_dt.timetuple() ))
        bucket_path = '/' + settings.CLOUD_STORAGE_BUCKET + '/dev/tests/' + self.file_name
        signature_string = self.HTTP_method + '\n' + '\n' + self.content_type + "\n" + str(expiration) + '\n' + bucket_path
        print(signature_string)
        creds = ServiceAccountCredentials.from_json_keyfile_name(GOOGLE_SERVICE_CREDENTIALS)
        client_email = creds.service_account_email
        signature = creds.sign_blob(signature_string)[1]


        """Signs and returns a base64-encoded SHA256 digest."""
        # shahash = SHA256.new(signature_string.encode('utf-8'))
        # private_key = RSA.importKey(creds.private_key)
        # signer = PKCS1_v1_5.new(self.key)
        # signature_bytes = signer.sign(shahash)
        """ above is all new and not working yet. """


        encoded_signature = str(base64.urlsafe_b64encode(signature), 'utf-8')
        base_url = settings.CLOUD_STORAGE_ROOT + 'dev/tests/' + self.file_name
        print(encoded_signature)
        return base_url + '?GoogleAccessId=' + client_email + '&Expires=' + str(expiration) + '&Signature=' + encoded_signature
