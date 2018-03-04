from django.db import models
from main.models.track import Track
from trakt.storage import GoogleCloudStorage, build_file_storage_path


class TrackSession(models.Model):
    title = models.CharField(max_length=250, blank=False)
    file = models.FileField(upload_to=build_file_storage_path, storage=GoogleCloudStorage(), max_length=300, blank=True)
    track = models.ForeignKey(Track, related_name='sessions')
    pub_date = models.DateTimeField(auto_now_add=True)
    date = models.DateField(auto_now_add=True)

    def __str__(self):
        return self.title
