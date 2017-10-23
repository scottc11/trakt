# -*- coding: utf-8 -*-
# Generated by Django 1.11.6 on 2017-10-22 14:18
from __future__ import unicode_literals

from django.db import migrations, models
import main.models.track
import trakt.storage


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0002_auto_20171022_1413'),
    ]

    operations = [
        migrations.AlterField(
            model_name='track',
            name='audio_file',
            field=models.FileField(default='', storage=trakt.storage.GoogleCloudStorage(), upload_to=main.models.track.format_storage_path),
        ),
    ]