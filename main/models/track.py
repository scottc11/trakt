from django.db.models.signals import pre_save
from django.dispatch import receiver
from django.template.defaultfilters import slugify
from django.contrib.auth.models import User
from django.db import models
from main.models.key import Key
from main.models.genre import Genre
from main.models.status import Status
from main.models.project import Project
from trakt.storage import GoogleCloudStorage

# you are going to need to keep this function around for your migrations....
def format_storage_path(instance, filename):
    title_slug = instance.slug
    username = instance.submitter
    return '{0}/tracks/{1}/{2}'.format(username, title_slug, filename)

def format_file_storage_path(instance, filename):
    title_slug = instance.track.slug
    username = instance.track.submitter
    return '{0}/tracks/{1}/{2}'.format(username, title_slug, filename)

def get_superuser():
    return User.objects.get(is_superuser=True).id


# TODO: 'tracks' field is kinda weird... when Track.model.projects 'related_name' does not equal 'tracks', things break.

class Track(models.Model):
    submitter = models.ForeignKey(User, related_name='tracks', on_delete=models.CASCADE, default=get_superuser )
    pub_date = models.DateTimeField(auto_now_add=True)
    title = models.CharField(max_length=250, blank=False, unique_for_date="pub_date")
    slug = models.SlugField(default='', blank=False)
    bpm = models.FloatField(blank=False)
    date_recorded = models.DateField()
    key = models.ForeignKey(Key, on_delete=models.SET_NULL, blank=False, null=True)
    genre = models.ForeignKey(Genre, on_delete=models.SET_NULL, blank=True, null=True)
    status = models.ForeignKey(Status, on_delete=models.SET_NULL, blank=False, null=True)
    projects = models.ManyToManyField(Project, blank=True, related_name='tracks')

    def __str__(self):
        return self.title

    def pub_date_pretty(self):
        return self.pub_date.strftime('%b %e %Y')

    def save(self, *args, **kwargs):
        if not self.id:
            self.slug = slugify(self.title)
        super(Track, self).save(*args, **kwargs)

    def delete(self, *args, **kwargs):
        for file in self.audio_files.all():
            file.delete()
        super(Track, self).delete(*args, **kwargs)



class TrackFile(models.Model):
    title = models.CharField(max_length=250, blank=False)
    file = models.FileField(upload_to=format_file_storage_path, storage=GoogleCloudStorage(), max_length=300, blank=True)
    track = models.ForeignKey(Track, related_name='audio_files')
    pub_date = models.DateTimeField(auto_now_add=True)


class TrackSession(models.Model):
    title = models.CharField(max_length=250, blank=False)
    file = models.FileField(upload_to=format_file_storage_path, storage=GoogleCloudStorage(), max_length=300, blank=True)
    track = models.ForeignKey(Track, related_name='sessions')
    pub_date = models.DateTimeField(auto_now_add=True)
    date = models.DateField(auto_now_add=True)
