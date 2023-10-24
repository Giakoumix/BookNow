from django.db import models
from django.contrib.auth.models import User

# Create your models here.

class Profile(models.Model):
    # options = ["T", "H", "B"]

    profile_id = models.AutoField(primary_key=True)

    permissions = models.CharField(max_length=10, null=True) # Changed
    # image = models.ImageField(upload_to='images', default="χατζητομ.jpg", null=True, blank=True)
    image = models.CharField(max_length=1024, null=True)
    profile_image = models.ImageField(upload_to='images', default=None, null=True)

    user_id = models.ForeignKey(User, on_delete=models.CASCADE)

class Tenant(models.Model):
    tenant_id = models.AutoField(primary_key=True, null=False) # AutoField
    
    user = models.ForeignKey(User, on_delete=models.CASCADE, default=None)

class Host(models.Model):
    host_id = models.AutoField(primary_key=True, null=False) # AutoField
    
    host_since = models.DateField(auto_now_add=True) # auto_now_add
    host_location = models.CharField(max_length=512, null=True)
    host_about = models.TextField(null=True, blank=True)
    response_time = models.CharField(max_length=200, null=True)
    
    host_neighbourhood = models.CharField(max_length=200, null=True)
    listings_count = models.IntegerField(null=True)
    host_verifications = models.CharField(max_length=200, null=True)

    user = models.ForeignKey(User, on_delete=models.CASCADE, default=None)

class HostAwaiting(models.Model):
    host_awaiting_id = models.AutoField(primary_key=True, null=False)
    username = models.CharField(max_length=255, null=False)
    password = models.CharField(max_length=255, null=False)
    email = models.CharField(max_length=255, null=True)
    image = models.ImageField(upload_to='images', default=None)
    host_location = models.CharField(max_length=512, null=True)
    host_about = models.TextField(null=True, blank=True)
    host_neighbourhood = models.CharField(max_length=200, null=True)
    host_verifications = models.CharField(max_length=200, null=True)
    tenant = models.BooleanField(null=True)
