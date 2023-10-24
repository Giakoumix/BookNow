# Generated by Django 4.0.6 on 2023-09-29 23:11

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0004_rename_property_type_spacedetails_room_type_and_more'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='reviews',
            name='ratings_id',
        ),
        migrations.AddField(
            model_name='accomodation',
            name='ratings_id',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='api.ratings'),
        ),
        migrations.AddField(
            model_name='ratings',
            name='rating',
            field=models.FloatField(default=None),
        ),
    ]
