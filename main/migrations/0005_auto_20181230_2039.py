# -*- coding: utf-8 -*-
# Generated by Django 1.11.6 on 2018-12-30 20:39
from __future__ import unicode_literals

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0004_track_tags'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='track',
            options={'ordering': ('-pub_date',)},
        ),
    ]
