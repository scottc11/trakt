# -*- coding: utf-8 -*-
# Generated by Django 1.11.6 on 2017-12-09 16:58
from __future__ import unicode_literals

from django.db import migrations, models
import main.models.track
import trakt.storage


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0026_auto_20171209_1230'),
    ]

    operations = [
        migrations.AlterField(
            model_name='trackfile',
            name='file',
            field=models.FileField(blank=True, max_length=300, storage=trakt.storage.GoogleCloudStorage(), upload_to=main.models.track.format_file_storage_path),
        ),
    ]
