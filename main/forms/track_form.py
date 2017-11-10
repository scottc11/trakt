from datetime import date
from django.utils.translation import ugettext_lazy as _
from django.contrib.admin import widgets
from django.forms import Form, ModelForm
from main.models.track import Track
from main.models.project import Project

class TrackSubmition(ModelForm):
    class Meta:
        model = Track
        exclude = ['submitter', 'slug']
        help_texts = {
            'date_recorded': _('ex. 2006-10-25'),
            'projects': _('Hold down COMMAND to assign track to more than one Project')
        }


    def __init__(self, *args, **kwargs):
            user = kwargs.pop('user')
            super(TrackSubmition, self).__init__(*args, **kwargs)
            self.fields['date_recorded'].initial = date.today()
            self.fields['projects'].queryset = Project.objects.filter(collaborators__id=user.id)
