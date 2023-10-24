from django.shortcuts import render
# from django.core.mail import send_mail
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status 

from .serializers import *
from .models import GeneralDescription
from myauth.models import Host
from myauth.serializers import HostSerializer 

# Create your views here.

# Descriptions Api
@api_view(['GET', 'POST'])
def description_list(request):
    if request.method == 'GET':
        description = GeneralDescription.objects.all() 
        serializer = DescriptionSerializer(description, many=True)

        return Response(serializer.data)
    
    if request.method == 'POST':
        serializer = DescriptionSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
    
@api_view(['GET', 'PUT', 'DELETE'])
def description_api(request, id):
    try:
        description = GeneralDescription.objects.get(description_id=id)
    except GeneralDescription.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    
    if request.method == 'GET':
        serializer = DescriptionSerializer(description)
        return Response(serializer.data)
    
    if request.method == 'PUT':
        serializer = DescriptionSerializer(description, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.error, status=status.HTTP_400_BAD_REQUEST)
    
    if request.method == 'DELETE':
        description.delete()
        return Response(status=status.HTTP_200_OK)
        
# Space Details Api
@api_view(['GET', 'POST'])
def space_details_list(request):
    if request.method == 'GET':
        space_details = SpaceDetails.objects.all()
        serializer = SpaceDetailsSerializer(space_details, many=True)

        return Response(serializer.data)

    if request.method == 'POST':
        serializer = SpaceDetailsSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        
@api_view(['GET', 'PUT', 'DELETE'])
def space_details_api(request, id):
    try:
        space_details = SpaceDetails.objects.get(space_id=id)
    except SpaceDetails.DoesNotExist:
        Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = SpaceDetailsSerializer(space_details)
        return Response(serializer.data)
    elif request.method == 'PUT':
        serializer = SpaceDetailsSerializer(space_details, data=request.data)
        
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.error, status=status.HTTP_400_BAD_REQUEST)
    elif request.method == 'DELETE':
        space_details.delete()
        return Response(status=status.HTTP_200_OK)
    
# Area Details Api
@api_view(['GET', 'POST'])
def area_details_list(request):
    if request.method == 'GET':
        area_details = AreaDetails.objects.all() 
        serializer = AreaDetailsSerializer(area_details, many=True)

        return Response(serializer.data)
    
    if request.method == 'POST':
        serializer = AreaDetailsSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)

@api_view(['GET', 'PUT', 'DELETE'])
def area_details_api(request, id):
    try:
        area_details = AreaDetails.objects.get(area_id=id)
    except AreaDetails.DoesNotExist:
        Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = AreaDetailsSerializer(area_details)
        return Response(serializer.data)
    elif request.method == 'PUT':
        serializer = AreaDetailsSerializer(area_details, data=request.data)
        
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.error, status=status.HTTP_400_BAD_REQUEST)
    elif request.method == 'DELETE':
        area_details.delete()
        return Response(status=status.HTTP_200_OK)
    
# Charge Api
@api_view(['GET', 'POST'])
def charge_list(request):
    if request.method == 'GET':
        charge = Charge.objects.all() 
        serializer = ChargeSerializer(charge, many=True)

        return Response(serializer.data)
    
    if request.method == 'POST':
        serializer = ChargeSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)

@api_view(['GET', 'PUT', 'DELETE'])
def charge_api(request, id):
    try:
        charge = Charge.objects.get(charge_id=id)
    except Charge.DoesNotExist:
        Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = ChargeSerializer(charge)
        return Response(serializer.data)
    elif request.method == 'PUT':
        serializer = ChargeSerializer(charge, data=request.data)
        
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.error, status=status.HTTP_400_BAD_REQUEST)
    elif request.method == 'DELETE':
        charge.delete()
        return Response(status=status.HTTP_200_OK)
    
# Ratings Api
@api_view(['GET', 'POST'])
def ratings_list(request):
    if request.method == 'GET':
        ratings = Ratings.objects.all() 
        serializer = RatingsSerializer(ratings, many=True)

        return Response(serializer.data)
    
    if request.method == 'POST':
        serializer = RatingsSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)

@api_view(['GET', 'PUT', 'DELETE'])
def ratings_api(request, id):
    try:
        rating = Ratings.objects.get(ratings_id=id)
    except Ratings.DoesNotExist:
        Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = RatingsSerializer(rating)
        return Response(serializer.data)
    elif request.method == 'PUT':
        serializer = RatingsSerializer(rating, data=request.data)
        
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.error, status=status.HTTP_400_BAD_REQUEST)
    elif request.method == 'DELETE':
        rating.delete()
        return Response(status=status.HTTP_200_OK)
    
# Accomodation Api
@api_view(['GET', 'POST'])
def accomodation_list(request):
    if request.method == 'GET':
        accomodation = Accomodation.objects.all() 
        serializer = AccomodationSerializer(accomodation, many=True)

        return Response(serializer.data)
    
    if request.method == 'POST':
        serializer = AccomodationSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)

@api_view(['GET', 'PUT', 'DELETE'])
def accomodation_api(request, id):
    try:
        accomodation = Accomodation.objects.get(accomodation_id=id)
    except Accomodation.DoesNotExist:
        Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = AccomodationSerializer(accomodation)
        return Response(serializer.data)
    elif request.method == 'PUT':
        serializer = AccomodationSerializer(accomodation, data=request.data)
        
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.error, status=status.HTTP_400_BAD_REQUEST)
    elif request.method == 'DELETE':
        accomodation.delete()
        return Response(status=status.HTTP_200_OK)
    
@api_view(['GET'])
def get_accomodation(request, id):
    if request.method == 'GET':
        try:
            accomodation = Accomodation.objects.get(accomodation_id=id)
        except Accomodation.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        
        description = GeneralDescription.objects.get(accomodation__general_description_id=accomodation.general_description_id)
        space_details = SpaceDetails.objects.get(accomodation__space_details_id=accomodation.space_details_id)
        area_details = AreaDetails.objects.get(accomodation__area_details_id=accomodation.area_details_id)
        charge = Charge.objects.get(accomodation__charge_id=accomodation.charge_id)
        ratings = Ratings.objects.get(accomodation__ratings_id=accomodation.ratings_id)
        host = Host.objects.filter(accomodation__host_id=accomodation.host_id)[0]

        accomodation_ser = AccomodationSerializer(accomodation, many=False)
        description_ser = DescriptionSerializer(description, many=False)
        space_details_ser = SpaceDetailsSerializer(space_details, many=False)
        area_details_ser = AreaDetailsSerializer(area_details, many=False)
        charge_ser = ChargeSerializer(charge, many=False)
        ratings_ser = RatingsSerializer(ratings, many=False)
        host_ser = HostSerializer(host, many=False)

        return Response({
            'accomodation': accomodation_ser.data,
            'description': description_ser.data,
            'space_details': space_details_ser.data,
            'area_details': area_details_ser.data,
            'charge': charge_ser.data,
            'ratings': ratings_ser.data,
            'host': host_ser.data,
        })

@api_view(['POST'])
def create_reservation(request):
    if request.method == 'POST':
        reservation = ReservationSerializer(data=request.data)
        if reservation.is_valid():
            reservation.save()
            return Response(reservation.data, status=status.HTTP_201_CREATED)
        return Response(status=status.HTTP_404_NOT_FOUND)
