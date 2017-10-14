from django.db import models

# what stage is the track in
class Stage(models.Model):
    stage = models.CharField(max_length=50, blank=False)
    position = models.IntegerField(blank=False)

    def __str__(self):
        return self.stage
