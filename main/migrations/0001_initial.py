# -*- coding: utf-8 -*-
# Generated by Django 1.11.6 on 2017-10-14 14:43
from __future__ import unicode_literals

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Genre',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('genre', models.CharField(max_length=50)),
            ],
        ),
        migrations.CreateModel(
            name='Key',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('key', models.CharField(max_length=50)),
            ],
        ),
        migrations.CreateModel(
            name='Stage',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('stage', models.CharField(max_length=50)),
                ('position', models.IntegerField()),
            ],
        ),
        migrations.CreateModel(
            name='Track',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('pub_date', models.DateTimeField()),
                ('title', models.CharField(max_length=250)),
                ('bpm', models.IntegerField(blank=True)),
                ('date_recorded', models.DateTimeField()),
                ('genre', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='main.Genre')),
                ('key', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='main.Key')),
                ('stage', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='main.Stage')),
            ],
        ),
    ]
