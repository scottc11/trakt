# -*- coding: utf-8 -*-
# Generated by Django 1.11.6 on 2018-01-28 19:35
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0002_auto_20180128_1906'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='status',
            name='position',
        ),
        migrations.AddField(
            model_name='status',
            name='color',
            field=models.CharField(default='#A8ADBB', max_length=10),
            preserve_default=False,
        ),
    ]