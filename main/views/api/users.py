from django.http import Http404
from django.contrib.auth.models import User
from rest_framework.generics import ListAPIView, RetrieveAPIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView

from main.models.track import Track
from main.serializers import ActiveUserSerializer


class UserList(ListAPIView):
    queryset = User.objects.all()
    serializer_class = ActiveUserSerializer


class UserDetail(RetrieveAPIView):
    queryset = User.objects.all()
    serializer_class = ActiveUserSerializer

class CurrentUser(APIView):

    def get(self, request, format=None):
        serializer = ActiveUserSerializer(request.user)
        return Response(serializer.data)
