from django.contrib.auth.models import User
from django.db import models

# TODO: permissions
# add permission for who can edit the name and who can add colaborators

class Project(models.Model):
    label = models.CharField(max_length=50, blank=False)
    collaborators = models.ManyToManyField(User, related_name='projects')

    def __str__(self):
        return self.label

    class Meta:
        ordering = ('label',)
