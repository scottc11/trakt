from django.utils.translation import ugettext_lazy as _
from django.contrib.admin import widgets
from django.forms import Form, ModelForm
from main.models.track import TrackSession, Track


class SessionUpload(ModelForm):
    class Meta:
        model = TrackSession
        exclude = ['file', 'pub_date']
        help_texts = {
            'title': _('Title should be something which describes the upload in context to the associated Track. ex. "Version 1", or "MIX[B]". Dont worry about dates.'),
            'track': _('Which track should this audio file be associated with?'),
            'date': _('The date this session was created.')
        }
