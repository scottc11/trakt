from rest_framework import serializers
from rest_framework.fields import CurrentUserDefault
from django.contrib.auth.models import User
from main.models.track import Track
from main.models.track_file import TrackFile
from main.models.track_session import TrackSession
from main.models.project import Project
from main.models.genre import Genre


class TrackFileSerializer(serializers.ModelSerializer):
    class Meta:
        model = TrackFile
        fields = ('id', 'title', 'file', 'track', 'pub_date')


class SessionFileSerializer(serializers.ModelSerializer):
    class Meta:
        model = TrackSession
        fields = ('id', 'title', 'file', 'track', 'pub_date', 'date')


class TrackSerializer(serializers.ModelSerializer):
    submitter = serializers.StringRelatedField(many=False)
    genre = serializers.StringRelatedField(many=False)
    key = serializers.StringRelatedField(many=False)
    status = serializers.SlugRelatedField(many=False, read_only=True, slug_field='position')
    audio_files = TrackFileSerializer(many=True)
    sessions = SessionFileSerializer(many=True)

    class Meta:
        model = Track
        fields = (
                'id', 'submitter', 'pub_date',
                'title', 'bpm', 'date_recorded', 'key',
                'genre', 'status', 'projects', 'audio_files',
                'sessions'
                )





# NOTE: this serializer is used specifically for POSTing new tracks to the api,
# since it doesn't 'serialize' all the foreign key relationships, it will just
# return the 'id' of each foreign key object, which is what we want.

class TrackCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Track
        fields = (
                'id', 'submitter', 'pub_date',
                'title', 'bpm', 'date_recorded',
                'key', 'genre', 'status', 'projects'
                )



class ProjectSerializer(serializers.ModelSerializer):
    collaborators = serializers.StringRelatedField(many=True)
    tracks = TrackSerializer(many=True)

    class Meta:
        model = Project
        fields = ('id', 'title', 'collaborators', 'tracks')

# not yet implemented
class UserSerializer(serializers.ModelSerializer):
    projects = ProjectSerializer(many=True)

    class Meta:
        model = User
        fields = ('id', 'username', 'projects')


class GenreSerializer(serializers.ModelSerializer):
    class Meta:
        model = Genre
        fields = ('id', 'genre')
