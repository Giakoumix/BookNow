
from django.contrib.auth.models import User

from import_export import resources
from myauth.models import Host, Tenant, Profile

class UserResource(resources.ModelResource):
    class Meta:
        model = User

class TenantResource(resources.ModelResource):
    class Meta:
        model = Tenant

class HostResource(resources.ModelResource):
    class Meta:
        model = Host

class ProfileResource(resources.ModelResource):
    class Meta:
        model = Profile


