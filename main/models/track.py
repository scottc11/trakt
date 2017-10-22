
from django.template.defaultfilters import slugify

from django.db import models
from main.models.key import Key
from main.models.genre import Genre
from main.models.stage import Stage
from trakt.storage import GoogleCloudStorage


def format_storage_path(instance, filename):
    title_slug = instance.slug
    return 'tracks/{0}/{1}'.format(title_slug, filename)


class Track(models.Model):
    pub_date = models.DateTimeField()
    title = models.CharField(max_length=250, blank=False)
    slug = models.SlugField(default='', blank=True)
    bpm = models.IntegerField(blank=True)
    date_recorded = models.DateTimeField()
    key = models.ForeignKey(Key, on_delete=models.SET_NULL, null=True)
    genre = models.ForeignKey(Genre, on_delete=models.SET_NULL, null=True)
    stage = models.ForeignKey(Stage, on_delete=models.SET_NULL, null=True)
    audio_file = models.FileField(upload_to=format_storage_path, storage=GoogleCloudStorage(), default='')


    def __str__(self):
        return self.title

    def pub_date_pretty(self):
        return self.pub_date.strftime('%b %e %Y')

    def save(self, *args, **kwargs):
        if not self.id:
            self.slug = slugify(self.title)
        super(Track, self).save(*args, **kwargs)

    def delete(self, *args, **kwargs):
        self.audio_file.delete()
        super(Track, self).delete(*args, **kwargs)
