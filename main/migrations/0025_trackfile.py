# -*- coding: utf-8 -*-
# Generated by Django 1.11.6 on 2017-12-09 10:51
from __future__ import unicode_literals

from django.db import migrations, models
import django.db.models.deletion
import main.models.track
import trakt.storage


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0024_auto_20171208_1440'),
    ]

    operations = [
        migrations.CreateModel(
            name='TrackFile',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=250)),
                ('file', models.FileField(max_length=300, storage=trakt.storage.GoogleCloudStorage(), upload_to=main.models.track.format_storage_path)),
                ('track', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='audio_files', to='main.Track')),
            ],
        ),
    ]
