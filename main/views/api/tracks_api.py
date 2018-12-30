from django.http import Http404
from django.contrib.auth.decorators import login_required

from rest_framework import viewsets, permissions
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from main.models import Track, Project
from main.serializers import TrackSerializer, TrackCreateSerializer


class TrackViewset(viewsets.ModelViewSet):
    queryset = Track.objects.all()
    serializer_class = TrackSerializer
    permission_classes = (permissions.IsAuthenticated,)

    def get_queryset(self):
        if self.request.GET.get('project'):
            project = Project.objects.get(id=self.request.GET.get('project'))
            queryset = Track.objects.filter(projects__collaborators__id=self.request.user.id, projects__in=[project])
        else:
            queryset = Track.objects.filter(projects__collaborators__id=self.request.user.id)

        queryset = TrackSerializer.setup_eager_loading(queryset)
        return queryset

    def create(self, request, *args, **kwargs):
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
