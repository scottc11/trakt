from django.core.management.base import BaseCommand, CommandError
from main.models.track import Track, TrackFile

class Command(BaseCommand):
    help = 'Copies Track object audio_file to a new TrackFile object, and adds Track foreignKey to new TrackFile object.'

    def handle(self, *args, **options):
        tracks = Track.objects.all()
        for track in tracks:
            file = TrackFile.objects.create(title=track.title, file=track.audio_file, track=track)
            file.save()
            self.stdout.write(self.style.SUCCESS('Successfully created TrackFile relationship woth "%s"' % track.title))
