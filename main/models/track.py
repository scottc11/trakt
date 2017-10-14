from django.db import models
from main.models.key import Key
from main.models.genre import Genre
from main.models.stage import Stage

class Track(models.Model):
    pub_date = models.DateTimeField()
    title = models.CharField(max_length=250, blank=False)
    bpm = models.IntegerField(blank=True)
    date_recorded = models.DateTimeField()
    key = models.ForeignKey(Key, on_delete=models.SET_NULL, null=True)
    genre = models.ForeignKey(Genre, on_delete=models.SET_NULL, null=True)
    stage = models.ForeignKey(Stage, on_delete=models.SET_NULL, null=True)

    def __str__(self):
        return self.title
