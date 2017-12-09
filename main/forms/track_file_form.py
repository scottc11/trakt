from django.shortcuts import render, get_object_or_404
from datetime import date
from django.utils.translation import ugettext_lazy as _
from django.contrib.admin import widgets
from django.forms import Form, ModelForm
from main.models.track import TrackFile, Track


class TrackFileSubmition(ModelForm):
    class Meta:
        model = TrackFile
        exclude = ['file']
        help_texts = {
            'title': _('Something describing the upload ex. mix 1 OR mix 2 OR chorus (no drums)')
        }
