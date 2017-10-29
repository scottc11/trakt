from django.http import Http404
from django.contrib.auth.decorators import login_required

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from main.models.track import Track
from main.serializers import TrackSerializer


class TrackList(APIView):
    """
    List all tracks, or create a new track.
    """

    def get(self, request, format=None):
        tracks = Track.objects.filter(submitter=request.user)
        serializer = TrackSerializer(tracks, many=True)
        return Response(serializer.data)

    def post(self, request, format=None):
        serializer = TrackSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



class TrackDetail(APIView):
    """
    Retrieve, update or delete a code track.
    """
    def get_object(self, pk):
        try:
            track = Track.objects.get(pk=pk)
        except Track.DoesNotExist:
            return Http404

    def get(self, request, pk, format=None):
        track = self.get_object(pk)
        serializer = TrackSerializer(track)
        return Response(serializer.data)

    def put(self, request, pk, format=None):
        track = self.get_object(pk)
        serializer = TrackSerializer(track, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk, format=None):
        track = self.get_object(pk)
        track.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
