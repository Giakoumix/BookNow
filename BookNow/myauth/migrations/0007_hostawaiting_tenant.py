# Generated by Django 4.0.6 on 2023-10-11 05:15

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('myauth', '0006_hostawaiting'),
    ]

    operations = [
        migrations.AddField(
            model_name='hostawaiting',
            name='tenant',
            field=models.BooleanField(null=True),
        ),
    ]
