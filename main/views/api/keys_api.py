from django.http import Http404
from django.contrib.auth.decorators import login_required

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from main.models.key import Key
from main.serializers import KeySerializer


class KeyList(APIView):
    """
    List all keys, or create a new key.
    """

    def get(self, request, format=None):
        keys = Key.objects.all()
        serializer = KeySerializer(keys, many=True)
        return Response(serializer.data)

    def post(self, request, format=None):
        serializer = KeySerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class KeyDetail(APIView):
    """
    Retrieve, update or delete a key.
    """
    def get_object(self, pk):
        try:
            key = Key.objects.get(pk=pk)
            return key
        except Key.DoesNotExist:
            return Http404

    def get(self, request, pk, format=None):
        key = self.get_object(pk)
        serializer = KeySerializer(key)
        return Response(serializer.data)

    def put(self, request, pk, format=None):
        key = self.get_object(pk)
        serializer = KeySerializer(key, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk, format=None):
        key = self.get_object(pk)
        key.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
