from django.http import Http404
from django.contrib.auth.decorators import login_required

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from main.models.track import Track
from main.serializers import TrackSerializer, TrackCreateSerializer


class TrackList(APIView):
    """
    List all tracks, or create a new track.
    """

    def get(self, request, format=None):
        # get user group --> get users in group --> create array of user objects --> pass to submitter
        tracks = Track.objects.filter(projects__collaborators__id=request.user.id)
        serializer = TrackSerializer(tracks, many=True)
        return Response(serializer.data)

    def post(self, request, format=None):
        serializer = TrackCreateSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(submitter=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



class TrackDetail(APIView):
    """
    Retrieve, update or delete a code track.
    """
    def get_object(self, pk):
        try:
            track = Track.objects.get(pk=pk)
            return track
        except Track.DoesNotExist:
            return Http404

    def get(self, request, pk, format=None):
        track = self.get_object(pk)
        serializer = TrackSerializer(track)
        return Response(serializer.data)

    def put(self, request, pk, format=None):
        track = self.get_object(pk)
        print(request)
        print(request.data)
        track.audio_file.name = request.data['track_path']
        serializer = TrackSerializer(track, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk, format=None):
        track = self.get_object(pk)
        track.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
