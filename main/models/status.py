from django.db import models

# what stage is the track in
class Status(models.Model):
    stage = models.CharField(max_length=50, blank=False)
    position = models.IntegerField(blank=False)

    def __str__(self):
        return self.stage
