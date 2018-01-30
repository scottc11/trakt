from django.db import models

# what stage is the track in
class Status(models.Model):
    title = models.CharField(max_length=50, blank=False)
    hex_code = models.CharField(max_length=10, blank=False)

    def __str__(self):
        return self.title
