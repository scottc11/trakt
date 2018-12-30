from django.db import models
from main.models.tag_color import TagColor

class Tag(models.Model):
    label = models.CharField(max_length=50, blank=False)
    color = models.ForeignKey(TagColor, blank=True)

    def __str__(self):
        return self.label

    class Meta:
        ordering = ('label',)
