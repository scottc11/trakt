from django.db import models

class Key(models.Model):
    label = models.CharField(max_length=50, blank=False, unique=True)

    def __str__(self):
        return self.label
