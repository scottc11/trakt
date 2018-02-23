# -*- coding: utf-8 -*-
# Generated by Django 1.11.6 on 2018-02-23 02:11
from __future__ import unicode_literals

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('main', '0008_auto_20180218_2014'),
    ]

    operations = [
        migrations.AddField(
            model_name='trackfile',
            name='uploader',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, related_name='audio_files', to=settings.AUTH_USER_MODEL),
        ),
    ]