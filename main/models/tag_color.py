from django.db import models

class TagColor(models.Model):
    hex_code = models.CharField(max_length=20, blank=True)

    def __str__(self):
        return self.hex_code

    class Meta:
        ordering = ('hex_code',)
