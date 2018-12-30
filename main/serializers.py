from rest_framework import serializers
from rest_framework.fields import CurrentUserDefault
from django.contrib.auth.models import User
from notifications.models import Notification
from main.models import Track
from main.models import TrackFile
from main.models import TrackSession
from main.models import Project
from main.models import Genre
from main.models import Key
from main.models import Status
from main.models import Profile
from main.models import Tag, TagColor

class TagColorSerializer(serializers.ModelSerializer):
    class Meta:
        model = TagColor
        fields = ('id', 'hex_code')


class TagSerializer(serializers.ModelSerializer):
    color = TagColorSerializer(many=False)

    class Meta:
        model = Tag
        fields = ('id', 'label', 'color')


class StatusSerializer(serializers.ModelSerializer):
    class Meta:
        model = Status
        fields = ('id', 'label', 'hex_code')


class TrackFileSerializer(serializers.ModelSerializer):
    class Meta:
        model = TrackFile
        fields = ('id', 'title', 'file', 'track', 'pub_date', 'uploader')

class TrackFileCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = TrackFile
        fields = ('id', 'title', 'track', 'uploader')


class SessionFileSerializer(serializers.ModelSerializer):
    class Meta:
        model = TrackSession
        fields = ('id', 'title', 'file', 'track', 'pub_date', 'date')


class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = ('hex_code',)

class UserSerializer(serializers.ModelSerializer):
    profile = ProfileSerializer(many=False)

    class Meta:
        model = User
        fields = ('id', 'username', 'profile')


class TrackSerializer(serializers.ModelSerializer):
    submitter = UserSerializer(many=False)
    genre = serializers.StringRelatedField(many=False)
    key = serializers.StringRelatedField(many=False)
    status = StatusSerializer(many=False, read_only=True)
    audio_files = TrackFileSerializer(many=True)
    sessions = SessionFileSerializer(many=True)
    activeFileIndex = serializers.IntegerField(min_value=0, default=0)
    projects = serializers.StringRelatedField(many=True)

    class Meta:
        model = Track
        fields = (
                'id', 'activeFileIndex', 'submitter', 'pub_date',
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
    class Meta:
        model = Project
        fields = ('id', 'label',)


class ProjectDetailSerializer(serializers.ModelSerializer):
    collaborators = UserSerializer(many=True)
    tracks = TrackSerializer(many=True)

    class Meta:
        model = Project
        fields = ('id', 'label', 'collaborators', 'tracks')


class UserSerializer(serializers.ModelSerializer):
    projects = ProjectSerializer(many=True)
    profile = ProfileSerializer(many=False)
    class Meta:
        model = User
        fields = ('id', 'username', 'projects', 'profile')

class ActiveUserSerializer(serializers.ModelSerializer):
    profile = ProfileSerializer(many=False)

    class Meta:
        model = User
        fields = ('id', 'username', 'profile')


class GenreSerializer(serializers.ModelSerializer):
    class Meta:
        model = Genre
        fields = ('id', 'label')


class KeySerializer(serializers.ModelSerializer):
    class Meta:
        model = Key
        fields = ('id', 'label')



class GenericNotificationRelatedField(serializers.RelatedField):

    def to_representation(self, value):
        if isinstance(value, TrackFile):
            serializer = TrackFileSerializer(value)
        if isinstance(value, Track):
            serializer = TrackCreateSerializer(value)
        if isinstance(value, User):
            serializer = ActiveUserSerializer(value)

        return serializer.data


class NotificationSerializer(serializers.Serializer):
    recipient = ActiveUserSerializer(User, read_only=True)
    unread = serializers.BooleanField(read_only=True)
    actor = GenericNotificationRelatedField(read_only=True)
    verb = serializers.CharField(read_only=True)
    target = GenericNotificationRelatedField(read_only=True)
    timestamp = serializers.DateTimeField(read_only=True)
    id = serializers.IntegerField(read_only=True)

    class Meta:
        model = Notification
        fields = ('id', 'recipient', 'unread', 'actor', 'verb', 'target', 'timestamp')
