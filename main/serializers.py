from rest_framework import serializers
from rest_framework.fields import CurrentUserDefault
from django.contrib.auth.models import User
from main.models.track import Track
from main.models.project import Project
from main.models.genre import Genre

class TrackSerializer(serializers.ModelSerializer):
    submitter = serializers.StringRelatedField(many=False)
    genre = serializers.StringRelatedField(many=False)
    key = serializers.StringRelatedField(many=False)
    status = serializers.SlugRelatedField(many=False, read_only=True, slug_field='position')

    class Meta:
        model = Track
        fields = ('id', 'submitter', 'pub_date', 'title', 'bpm', 'date_recorded', 'key', 'genre', 'status', 'audio_file', 'projects')


# NOTE: this serializer is used specifically for POSTing new tracks to the api,
# since it doesn't 'serialize' all the foreign key relationships, it will just
# return the 'id' of each foreign key object, which is what we want.

class TrackCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Track
        fields = ('id', 'submitter', 'pub_date', 'title', 'bpm', 'date_recorded', 'key', 'genre', 'status', 'audio_file', 'projects')

    # def create(self, validated_data):
    #     user_id = self.context.get('user_id')
    #     track = Track.objects.create(**validated_data)
    #     track.submitter = user_id
    #     return track

    # def save(self):
    #     self.submitter = self.context.get('user_id')
    #
    # def get_serializer_context(self):
    #     return {'user_id': self.request.user.id}


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
