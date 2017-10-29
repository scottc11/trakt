from rest_framework import serializers
from django.contrib.auth.models import User
from main.models.track import Track
from main.models.project import Project

class TrackSerializer(serializers.ModelSerializer):
    submitter = serializers.StringRelatedField(many=False)
    genre = serializers.StringRelatedField(many=False)
    key = serializers.StringRelatedField(many=False)
    stage = serializers.StringRelatedField(many=False)

    class Meta:
        model = Track
        fields = ('id', 'submitter', 'pub_date', 'title', 'bpm', 'date_recorded', 'key', 'genre', 'stage', 'audio_file')


class ProjectSerializer(serializers.ModelSerializer):
    collaborators = serializers.StringRelatedField(many=True)
    tracks = TrackSerializer(many=True)

    class Meta:
        model = Project
        fields = ('id', 'title', 'collaborators', 'tracks')

# not yet implemented
class UserSerializer(serializers.ModelSerializer):
    tracks = TrackSerializer(many=True)
    projects = ProjectSerializer(many=True)

    class Meta:
        model = User
        fields = ('id', 'username', 'tracks', 'projects')
