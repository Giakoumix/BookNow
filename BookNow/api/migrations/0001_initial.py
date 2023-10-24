# Generated by Django 4.0.6 on 2023-09-29 13:54

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('myauth', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Accomodation',
            fields=[
                ('accomodation_id', models.IntegerField(primary_key=True, serialize=False)),
                ('name', models.CharField(max_length=45)),
                ('property_type', models.CharField(max_length=100)),
                ('guests_included', models.IntegerField()),
                ('minimum_nights', models.IntegerField()),
                ('maximum_night', models.IntegerField()),
                ('cancelation_policy', models.CharField(max_length=100)),
                ('requires_guest_phone_verification', models.CharField(max_length=100)),
            ],
        ),
        migrations.CreateModel(
            name='AreaDetails',
            fields=[
                ('area_id', models.IntegerField(primary_key=True, serialize=False)),
                ('street', models.CharField(max_length=200)),
                ('neighbourhood', models.CharField(max_length=200)),
                ('city', models.CharField(max_length=100)),
                ('state', models.CharField(max_length=200)),
                ('zip_code', models.IntegerField()),
                ('country', models.CharField(max_length=100)),
                ('latitude', models.FloatField()),
                ('longtitude', models.FloatField()),
            ],
        ),
        migrations.CreateModel(
            name='Charge',
            fields=[
                ('charge_id', models.IntegerField(primary_key=True, serialize=False)),
                ('price', models.FloatField()),
                ('weekly_price', models.FloatField()),
                ('monthly_price', models.FloatField()),
                ('security_deposit', models.FloatField()),
                ('cleaning_fee', models.FloatField()),
                ('extra_people_price', models.FloatField()),
            ],
        ),
        migrations.CreateModel(
            name='GeneralDescription',
            fields=[
                ('description_id', models.IntegerField(primary_key=True, serialize=False)),
                ('summary', models.TextField(blank=True, null=True)),
                ('space', models.TextField(blank=True, null=True)),
                ('description', models.TextField(blank=True, null=True)),
                ('neighbourhoood_overview', models.TextField(blank=True, null=True)),
                ('notes', models.TextField(blank=True, null=True)),
                ('transit', models.TextField(blank=True, null=True)),
            ],
        ),
        migrations.CreateModel(
            name='Ratings',
            fields=[
                ('ratings_id', models.IntegerField(primary_key=True, serialize=False)),
                ('accuracy', models.FloatField()),
                ('cleanliness', models.FloatField()),
                ('check_in', models.FloatField()),
                ('communication', models.FloatField()),
                ('location', models.FloatField()),
                ('value', models.FloatField()),
            ],
        ),
        migrations.CreateModel(
            name='SpaceDetails',
            fields=[
                ('space_id', models.IntegerField(primary_key=True, serialize=False)),
                ('room_type', models.CharField(max_length=50)),
                ('accomodates', models.IntegerField()),
                ('bathroom', models.IntegerField()),
                ('bedrooms', models.IntegerField()),
                ('beds', models.IntegerField()),
                ('bed_type', models.CharField(max_length=50)),
                ('amenities', models.CharField(max_length=200)),
                ('square_feet', models.IntegerField()),
            ],
        ),
        migrations.CreateModel(
            name='Reviews',
            fields=[
                ('reviews_id', models.IntegerField(primary_key=True, serialize=False)),
                ('date', models.DateField()),
                ('reviewer_name', models.CharField(max_length=50)),
                ('comment', models.TextField()),
                ('accomodation_id', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='api.accomodation')),
                ('ratings_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.ratings')),
                ('tenants_id', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='myauth.tenant')),
            ],
        ),
        migrations.CreateModel(
            name='Calendar',
            fields=[
                ('calendar_id', models.IntegerField(primary_key=True, serialize=False)),
                ('date', models.DateField()),
                ('available', models.CharField(max_length=10)),
                ('price', models.FloatField()),
                ('accomodation_id', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='api.accomodation')),
            ],
        ),
        migrations.AddField(
            model_name='accomodation',
            name='area_details_id',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='api.areadetails'),
        ),
        migrations.AddField(
            model_name='accomodation',
            name='charge_id',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='api.charge'),
        ),
        migrations.AddField(
            model_name='accomodation',
            name='general_description_id',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='api.generaldescription'),
        ),
        migrations.AddField(
            model_name='accomodation',
            name='host_id',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='myauth.host'),
        ),
        migrations.AddField(
            model_name='accomodation',
            name='space_details_id',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='api.spacedetails'),
        ),
    ]
