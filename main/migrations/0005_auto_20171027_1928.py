# -*- coding: utf-8 -*-
# Generated by Django 1.11.6 on 2017-10-27 19:28
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0004_track_user'),
    ]

    operations = [
        migrations.AlterField(
            model_name='track',
            name='date_recorded',
            field=models.DateField(),
        ),
    ]