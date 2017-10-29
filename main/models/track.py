
from django.template.defaultfilters import slugify
from django.contrib.auth.models import User
from django.db import models
from main.models.key import Key
from main.models.genre import Genre
from main.models.stage import Stage
from main.models.project import Project
from trakt.storage import GoogleCloudStorage


def format_storage_path(instance, filename):
    title_slug = instance.slug
    username = instance.submitter
    return '{0}/tracks/{1}/{2}'.format(username, title_slug, filename)


def get_superuser():
    return User.objects.get(is_superuser=True).id


class Track(models.Model):
    submitter = models.ForeignKey(User, related_name='tracks', on_delete=models.CASCADE, default=get_superuser )
    pub_date = models.DateTimeField(auto_now_add=True)
    title = models.CharField(max_length=250, blank=False)
    slug = models.SlugField(default='', blank=False)
    bpm = models.IntegerField(blank=False)
    date_recorded = models.DateField()
    key = models.ForeignKey(Key, on_delete=models.SET_NULL, blank=False, null=True)
    genre = models.ForeignKey(Genre, on_delete=models.SET_NULL, blank=True, null=True)
    stage = models.ForeignKey(Stage, on_delete=models.SET_NULL, blank=False, null=True)
    audio_file = models.FileField(upload_to=format_storage_path, storage=GoogleCloudStorage(), default='')
    projects = models.ManyToManyField(Project, blank=True, related_name='tracks')

    def __str__(self):
        return self.title

    def pub_date_pretty(self):
        return self.pub_date.strftime('%b %e %Y')

    def save(self, *args, **kwargs):
        self.slug = slugify(self.title)
        super(Track, self).save(*args, **kwargs)

    def delete(self, *args, **kwargs):
        self.audio_file.delete()
        super(Track, self).delete(*args, **kwargs)
