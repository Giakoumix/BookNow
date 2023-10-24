from django.contrib import admin
from .models import Host, Tenant, Profile, HostAwaiting

# Register your models here.

admin.site.register(Host)
admin.site.register(Tenant)
admin.site.register(Profile)
admin.site.register(HostAwaiting)
