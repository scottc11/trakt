from django.utils.translation import ugettext_lazy as _
from django.contrib.admin import widgets
from django.forms import Form, ModelForm
from main.models.status import Status

class NewStatus(ModelForm):
    class Meta:
        model = Status
        fields = ['label']
