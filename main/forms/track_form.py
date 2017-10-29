
from django.utils.translation import ugettext_lazy as _
from django.contrib.admin import widgets
from django.forms import Form, ModelForm
from main.models.track import Track

class TrackSubmition(ModelForm):
    class Meta:
        model = Track
        exclude = ['submitter', 'pub_date', 'slug']
        help_texts = {
            'date_recorded': _('ex. 2006-10-25'),
        }
