# -*- coding: utf-8 -*-
# Generated by Django 1.11.6 on 2018-02-18 20:14
from __future__ import unicode_literals

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0007_auto_20180202_1304'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='trackfile',
            options={'ordering': ('-pub_date',)},
        ),
    ]