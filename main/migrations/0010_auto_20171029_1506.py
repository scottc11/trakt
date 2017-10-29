# -*- coding: utf-8 -*-
# Generated by Django 1.11.6 on 2017-10-29 15:06
from __future__ import unicode_literals

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0009_auto_20171029_1457'),
    ]

    operations = [
        migrations.AlterField(
            model_name='track',
            name='bpm',
            field=models.IntegerField(),
        ),
        migrations.AlterField(
            model_name='track',
            name='genre',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to='main.Genre'),
        ),
        migrations.AlterField(
            model_name='track',
            name='projects',
            field=models.ManyToManyField(blank=True, null=True, to='main.Project'),
        ),
    ]
