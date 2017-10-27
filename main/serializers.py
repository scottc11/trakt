from rest_framework import serializers
from main.models.track import Track

class TrackSerializer(serializers.ModelSerializer):
    submitter = serializers.StringRelatedField(many=False)
    genre = serializers.StringRelatedField(many=False)
    key = serializers.StringRelatedField(many=False)
    stage = serializers.StringRelatedField(many=False)

    class Meta:
        model = Track
        fields = ('id', 'submitter', 'pub_date', 'title', 'bpm', 'date_recorded', 'key', 'genre', 'stage', 'audio_file')
