# -*- coding: utf-8 -*-
# Generated by Django 1.11.6 on 2017-10-29 19:53
from __future__ import unicode_literals

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0014_auto_20171029_1635'),
    ]

    operations = [
        migrations.AlterField(
            model_name='track',
            name='submitter',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='tracks', to=settings.AUTH_USER_MODEL),
        ),
    ]
