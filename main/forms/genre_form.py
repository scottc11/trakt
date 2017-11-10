from django.utils.translation import ugettext_lazy as _
from django.contrib.admin import widgets
from django.forms import Form, ModelForm
from main.models.genre import Genre

class NewGenre(ModelForm):
    class Meta:
        model = Genre
        fields = ['genre']
