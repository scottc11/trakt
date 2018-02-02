from django.utils.translation import ugettext_lazy as _
from django.contrib.admin import widgets
from django.forms import Form, ModelForm
from main.models.key import Key

class NewKey(ModelForm):
    class Meta:
        model = Key
        fields = ['label']
