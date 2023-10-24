from django.shortcuts import render
from django.contrib.auth.models import User
from django.contrib.auth.hashers import make_password
from django.core.files import File
from django.core.mail import send_mail
from rest_framework.response import Response
from rest_framework.decorators import api_view, parser_classes
from rest_framework.parsers import FileUploadParser
from rest_framework import status

from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView

from .serializers import TenantSerializer, HostSerializer, ProfileSerializer, UserSerializer, HostAwaitingSerializer
from .models import *

# Create your views here.

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        # Add custom claims
        token['username'] = user.username
        token['password'] = user.password
        # ...

        return token
    
class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer

@api_view(['POST'])
def create_tenant(request):
    if request.method == 'POST':
        user_ser = UserSerializer(data=request.data)
        
        user_ser.is_valid()

        userdata = user_ser.validated_data
        user = User(**userdata)
        user.password = make_password(user.password)
        user.save()

        profile = Profile.objects.create(
            user_id=user,
            permissions="T"
        )

        Tenant.objects.create(
            user=user
        )

        user_ser = UserSerializer(user, many=False)
        return Response({
            'user': user_ser.data,
        }, status=status.HTTP_201_CREATED)

@api_view(['POST'])
def upload_users_image(request, id):
    if request.method == 'POST':
        print("HELLO file ", request.data)
        user = User.objects.get(pk=id)
        profile = Profile.objects.get(user_id=user.pk)

        profile.profile_image = request.data['file']
        profile.save()

        # profile_ser = ProfileSerializer(profile, many=False)
        # profile_ser.is_valid()

        return Response({})

@api_view(['POST'])
def create_host_awaiting(request):
    if request.method == 'POST':
        host_awaiting = HostAwaiting.objects.create(
            username=request.data['username'],
            password=request.data['password'], 
            email=request.data['email'],
            # image=request.data['file'],
            host_location=request.data['host_location'],
            host_about=request.data['host_about'],
            host_neighbourhood=request.data['host_neighbourhood'],
            host_verifications=request.data['host_verifications'],
            tenant=request.data['tenant'],
        )

        host_awaiting_ser = HostAwaitingSerializer(host_awaiting, many=False)
        # host_awaiting_ser.is_valid()
        return Response(host_awaiting_ser.data)

@api_view(['POST'])
def upload_host_awaiting_image(request, id):
    if request.method == 'POST':
        print("HELLO file ", request.data)
        host_awaiting = HostAwaiting.objects.get(host_awaiting_id=id)

        host_awaiting.image = request.data['file']
        host_awaiting.save()

        # profile_ser = ProfileSerializer(profile, many=False)
        # profile_ser.is_valid()

        return Response({})

@api_view(['POST'])
def create_host(request):
    if request.method == 'POST':
        pass



@api_view(['GET'])
def get_user_from_host_id(request, host_id):
    if request.method == 'GET':
        try: 
            host = Host.objects.get(host_id=host_id)
        except Host.DoesNotExist:
            print("Not Found")
            Response(status=status.HTTP_404_NOT_FOUND)

        user = User.objects.get(host__user=host.user)
        profile = Profile.objects.get(user_id=user.pk)

        host_ser = HostSerializer(host, many=False)
        user_ser = UserSerializer(user, many=False)
        profile_ser = ProfileSerializer(profile, many=False)

        return Response({
            'host': host_ser.data,
            'user': user_ser.data,
            'profile': profile_ser.data
        })
    
@api_view(['GET'])
def get_all_hosts(request):
    if request.method == 'GET':
        # users = User.objects.all()
        # profiles = Profile.objects.all()
        hosts = Host.objects.all()

        users = []
        profiles = []
        for host in hosts:
            user = User.objects.get(host__user=host.user)
            users.append(user)
            profiles.append(Profile.objects.get(user_id=user.id))

        users_ser = UserSerializer(users, many=True)
        profiles_ser = ProfileSerializer(profiles, many=True)
        hosts_ser = HostSerializer(hosts, many=True)

        return Response({'users': users_ser.data,
                        'profiles': profiles_ser.data,
                        'hosts': hosts_ser.data})

@api_view(['DELETE'])
def delete_host(request, id):
    if request.method == 'POST':
        host = Host.objects.get(host_id=id)
        host.delete()

        return Response(status=status.HTTP_200_OK)

@api_view(['GET'])
def get_all_hosts_awaiting(request):
    if request.method == 'GET':
        hosts_awaiting = HostAwaiting.objects.all()
        hosts_awaiting_ser = HostAwaitingSerializer(hosts_awaiting, many=True)

        return Response(hosts_awaiting_ser.data)

@api_view(['POST'])
def insert_host_awaiting(request):
    if request.method == 'POST':
        print("THE ID IS ", request.data['id'])
        host_awaiting = HostAwaiting.objects.get(host_awaiting_id=request.data['id'])
        permission = "B" if host_awaiting.tenant else "H"
        print('HOST', host_awaiting.username)

        user = User.objects.create(
            username=host_awaiting.username,
            password=make_password(host_awaiting.password),
            email=host_awaiting.email
        )

        profile = Profile.objects.create(
            profile_image=host_awaiting.image, 
            permissions=permission,
            user_id=user
        )

        host = Host.objects.create(
            host_location=host_awaiting.host_location,
            host_about=host_awaiting.host_about,
            host_neighbourhood=host_awaiting.host_neighbourhood,
            host_verifications=host_awaiting.host_verifications,
            user=user
        )

        # host_awaiting_ser = HostAwaitingSerializer(host_awaiting, many=False)
        user_ser = UserSerializer(user, many=False)
        profile_ser = ProfileSerializer(profile, many=False)
        host_ser = HostSerializer(host, many=False)

        return Response({
            "user": user_ser.data,
            "profile": profile_ser.data,
            "host": host_ser.data,
            # "host_awaiting": host_awaiting_ser,
        })

@api_view(['DELETE']) 
def delete_host_awaiting(request, id):
    if request.method == 'DELETE':
        host_awaiting = HostAwaiting(host_awaiting_id=id)
        host_awaiting.delete()

        return Response(status=status.HTTP_200_OK)
    
@api_view(['GET'])
def get_profile_by_user(request, user_id):
    if request.method == 'GET':
        profile = Profile.objects.get(user_id=user_id)
        profile_ser = ProfileSerializer(profile, many=False)

        return Response(profile_ser.data, status=status.HTTP_200_OK)


@api_view(['GET'])
def get_host_by_user(request, user_id):
    if request.method == 'GET':
        host = Host.objects.get(user=user_id)
        host_ser = HostSerializer(host, many=False)

        return Response(host_ser.data, status=status.HTTP_200_OK)
    
@api_view(['GET'])
def get_tenant_by_user(request, user_id):
    if request.method == 'GET':
        tenant = Tenant.objects.get(user=user_id)
        tenant_ser = TenantSerializer(tenant, many=False)

        return Response(tenant_ser.data, status=status.HTTP_200_OK)
    
@api_view(['POST'])
def send_email_to_tenant(request):
    if request.method == 'POST':
        print('EMAIL DATA', request.data)
        subject = 'BookNow Reservation'
        message = request.data['message']
        from_email = 'giakoumis2002@gmail.com'
        recipient_list = [request.data['email']]

        send_mail(subject, message, from_email, recipient_list)
        
@api_view(['POST'])
def get_user_from_id(request, id):
    if request.method == 'POST':
        user = User.objects.get(id=id)
        serializer = UserSerializer(user, many=False)

        Response(serializer.data)