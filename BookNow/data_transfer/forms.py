
from django.contrib.auth.models import User
from django import forms

from myauth.models import Host, Tenant, Profile

class UserForm(forms.Form):
    class Meta:
        model = User
        fields = '__all__'

class TenantForm(forms.Form):
    class Meta:
        model = Tenant
        fields = '__all__'

class HostForm(forms.Form):
    class Meta:
        model = Host
        fields = '__all__'

class ProfileForm(forms.Form):
    class Meta:
        model = Profile
        fields = '__all__'