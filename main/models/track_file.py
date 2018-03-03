from django.db import models
from django.db.models.signals import post_save
from django.dispatch import receiver
from django.contrib.auth.models import User
from notifications.signals import notify
from main.models.track import Track
from trakt.storage import GoogleCloudStorage, build_file_storage_path


class TrackFile(models.Model):
    title = models.CharField(max_length=250, blank=False)
    file = models.FileField(upload_to=build_file_storage_path, storage=GoogleCloudStorage(), max_length=300, blank=True)
    track = models.ForeignKey(Track, related_name='audio_files')
    uploader = models.ForeignKey(User, related_name='audio_files', on_delete=models.CASCADE, default=1)
    pub_date = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title

    class Meta:
        ordering = ('-pub_date',)



# Notifications
@receiver(post_save, sender=TrackFile)
def track_uploaded(sender, instance, created, **kwargs):
    print('----------------------------------------------------')
    print(sender)
    print(instance)
    print(created)

    users = User.objects.filter(id=0)
    for project in instance.track.projects.all():
        users = users | project.collaborators.all()

    # delete duplicates
    users = users.distinct()
    verb = "uploaded {} to".format(instance.title)
    notify.send(instance.uploader, recipient=users, verb=verb, target=instance.track)
