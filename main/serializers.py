from rest_framework import serializers
from main.models.track import Track

class TrackSerializer(serializers.ModelSerializer):
    class Meta:
        model = Track
        fields = ('id', 'pub_date', 'title', 'bpm', 'date_recorded', 'key', 'genre', 'stage')
