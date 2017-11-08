
from django.utils.translation import ugettext_lazy as _
from django.contrib.admin import widgets
from django.forms import Form, ModelForm
from main.models.project import Project

class NewProject(ModelForm):
    class Meta:
        model = Project
        fields = ['title', 'collaborators']
