from django.shortcuts import render, get_object_or_404
from datetime import date
from django.utils.translation import ugettext_lazy as _
from django.contrib.admin import widgets
from django.forms import Form, ModelForm
from main.models.track import Track
from main.models.track_file import TrackFile


class TrackFileSubmition(ModelForm):
    class Meta:
        model = TrackFile
        exclude = ['file', 'pub_date']
        help_texts = {
            'title': _('Title should be something which describes the upload in context to the associated Track. ex. "Version 1", or "MIX[B]". Dont worry about dates.'),
            'track': _('Which track should this audio file be associated with?')
        }
