from django.http import Http404
from django.contrib.auth.decorators import login_required

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from main.models.track import TrackFile
from main.serializers import TrackFileSerializer


class TrackFileList(APIView):
    """
    List all files, or create a new genre.
    """

    def get(self, request, format=None):
        files = TrackFile.objects.all()
        serializer = TrackFileSerializer(files, many=True)
        return Response(serializer.data)

    def post(self, request, format=None):
        serializer = TrackFileSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class TrackFileDetail(APIView):
    """
    Retrieve, update or delete a genre.
    """
    def get_object(self, pk):
        try:
            genre = TrackFile.objects.get(pk=pk)
            return genre
        except TrackFile.DoesNotExist:
            return Http404

    def get(self, request, pk, format=None):
        genre = self.get_object(pk)
        serializer = TrackFileSerializer(genre)
        return Response(serializer.data)

    def put(self, request, pk, format=None):
        genre = self.get_object(pk)
        serializer = TrackFileSerializer(genre, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk, format=None):
        genre = self.get_object(pk)
        genre.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)