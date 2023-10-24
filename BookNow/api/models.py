from django.db import models
from django.contrib.auth.models import User
from myauth.models import Host, Tenant

max_std_length = 200

# Create your models here.

class GeneralDescription(models.Model):
    description_id = models.AutoField(primary_key=True, null=False)
    summary = models.TextField(null=True, blank=True)
    space = models.TextField(null=True, blank=True)
    description = models.TextField(null=True, blank=True)
    neighbourhoood_overview = models.TextField(null=True, blank=True)
    notes = models.TextField(null=True, blank=True)
    transit = models.TextField(null=True, blank=True)

    def __str__(self):
        return self.description
    
class SpaceDetails(models.Model):
    space_id = models.AutoField(primary_key=True, null=False)
    room_type = models.CharField(max_length=100)
    accomodates = models.IntegerField(null=True)
    bathroom = models.IntegerField(null=True)
    bedrooms = models.IntegerField(null=True)
    beds = models.IntegerField(null=True)
    bed_type = models.CharField(max_length=100, null=True)
    amenities = models.CharField(max_length=512, null=True)
    square_feet = models.IntegerField(null=True)

    def __str__(self):
        return f"""Room Type: {self.room_type}"""
    
class AreaDetails(models.Model):
    area_id = models.AutoField(primary_key=True, null=False)
    street = models.CharField(max_length=max_std_length, null=True)
    neighbourhood = models.CharField(max_length=max_std_length, null=True)
    city = models.CharField(max_length=100) 
    state = models.CharField(max_length=max_std_length, null=True)
    zip_code = models.CharField(max_length=100, null=True)
    country = models.CharField(max_length=100) 
    latitude = models.FloatField()
    longtitude = models.FloatField()

    def __str__(self):
        return f"""State: {self.state}, City: {self.city} Street: {self.street} Zip Code: {self.zip_code}"""

class Charge(models.Model):
    charge_id = models.AutoField(primary_key=True, null=False)
    price = models.CharField(max_length=100)
    weekly_price = models.CharField(max_length=100, null=True)
    monthly_price = models.CharField(max_length=100, null=True)
    security_deposit = models.CharField(max_length=100, null=True)
    cleaning_fee = models.CharField(max_length=100, null=True)
    extra_people_price = models.CharField(max_length=100, null=True)

class Ratings(models.Model):
    ratings_id = models.AutoField(primary_key=True, null=False)
    rating = models.FloatField(default=None, null=True)
    accuracy = models.FloatField(null=True)
    cleanliness = models.FloatField(null=True)
    check_in = models.FloatField(null=True)
    communication = models.FloatField(null=True)
    location = models.FloatField(null=True)
    value = models.FloatField(null=True)

class Accomodation(models.Model):
    accomodation_id = models.AutoField(primary_key=True, null=False)
    name = models.CharField(max_length=200)
    property_type = models.CharField(max_length=200, null=True)
    guests_included = models.IntegerField(null=True)
    minimum_nights = models.IntegerField(null=True)
    maximum_nights = models.IntegerField(null=True)
    cancelation_policy = models.CharField(max_length=200, null=True)
    requires_guest_phone_verification = models.CharField(max_length=200, null=True)
    image = models.CharField(max_length=1024, default=None, null=True)

    # Foreign Keys
    space_details_id = models.ForeignKey(SpaceDetails, on_delete=models.SET_NULL, null=True)
    general_description_id = models.ForeignKey(GeneralDescription, on_delete=models.SET_NULL, null=True)
    host_id = models.ForeignKey(Host, on_delete=models.SET_NULL, null=True)
    area_details_id = models.ForeignKey(AreaDetails, on_delete=models.SET_NULL, null=True)
    charge_id = models.ForeignKey(Charge, on_delete=models.SET_NULL, null=True) 
    ratings_id = models.ForeignKey(Ratings, on_delete=models.SET_NULL, null=True)

class Calendar(models.Model):
    calendar_id = models.AutoField(primary_key=True, null=False)
    date = models.DateField() # auto_now
    # available = models.CharField(max_length=10)
    price = models.FloatField()

    # Foreign Key
    accomodation_id = models.ForeignKey(Accomodation, on_delete=models.SET_NULL, null=True)

class Reviews(models.Model):
    reviews_id = models.AutoField(primary_key=True, null=False)
    date = models.DateField() # auto now
    reviewer_name = models.CharField(max_length=50)
    comment = models.TextField()

    # Foreign Keys
    tenants_id = models.ForeignKey(Tenant, on_delete=models.SET_NULL, null=True)
    accomodation_id = models.ForeignKey(Accomodation, on_delete=models.SET_NULL, null=True)

class Reservation(models.Model):
    reservation_id = models.AutoField(primary_key=True, null=False)

    date_from = models.DateField(null=False)
    date_to = models.DateField(null=False)
    price_per_night = models.FloatField(null=False)

    accomodation_id = models.ForeignKey(Accomodation, on_delete=models.SET_NULL, null=True)
    tenant_id = models.ForeignKey(Tenant, on_delete=models.SET_NULL, null=True)


