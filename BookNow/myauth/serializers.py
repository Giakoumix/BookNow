
from django.contrib.auth.models import User
from rest_framework.serializers import ModelSerializer
from .models import *

class TenantSerializer(ModelSerializer):
    class Meta:
        model = Tenant
        fields = '__all__'

class HostSerializer(ModelSerializer):
    class Meta:
        model = Host
        fields = '__all__'

class ProfileSerializer(ModelSerializer):
    class Meta:
        model = Profile
        fields = '__all__'

class UserSerializer(ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'

class HostAwaitingSerializer(ModelSerializer):
    class Meta:
        model = HostAwaiting
        fields = '__all__'