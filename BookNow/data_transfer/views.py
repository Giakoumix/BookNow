from django.shortcuts import render
from django.contrib.auth.models import User
from django.contrib.auth.hashers import make_password

# Create your views here.

from tablib import Dataset
from .resourses import *
from datetime import datetime

from myauth.models import Tenant, Host, Profile
from api.models import *

def check_host_duplicates(hosts):
    duplicates = {}
    for host in hosts:
        duplicates[host[16]] = (host[16], host[18], host[19], host[20], host[21], host[22], host[23], host[28], host[29], host[31], host[27])
    
    removed = []
    for key, host in duplicates.items():
        removed.append(host)
    
    return removed

def make_host_users(host_data):
    for data in host_data:
        username = data[1]

        try:
            user = User.objects.get(username=username)
        except User.DoesNotExist:
            user = None

        if user != None:
            username += str(data[0])
                
        User.objects.create(
            pk=data[0],
            username=username,
            password=make_password(str(data[0]))
        )

def make_host_profile(host_data):
    for data in host_data:
        try:
            profile = Profile.objects.get(user_id=data[0])
        except Profile.DoesNotExist:
            profile = None

        if profile != None:
            if profile.permissions == "T":
                profile.permissions == "B"
                profile.save()
            continue
        
        Profile.objects.create(
            permissions = "H",
            image=data[10],
            user_id=User.objects.get(pk=data[0])
        )

def make_host(host_data):
    for data in host_data:
        try:
            host = Host.objects.get(host_id=data[0])
        except Host.DoesNotExist:
            host = None

        if host != None:
            continue

        Host.objects.create(
            host_id=data[0],
            host_since=data[2],
            host_location=data[3],
            host_about=data[4],
            response_time=data[5],
            host_neighbourhood=data[7],
            listings_count=data[8],
            host_verifications=data[9],
            user=User.objects.get(pk=data[0])
        )

def make_listings(listings_data):
    for data in listings_data:
        general_description = GeneralDescription.objects.create(
            summary=data[5],
            space=data[6],
            description=data[7],
            neighbourhoood_overview=data[9],
            notes=data[10],
            transit=[11]
        )
        space_details = SpaceDetails.objects.create(
            room_type=data[48],
            accomodates=data[49],
            bathroom=data[50],
            bedrooms=data[51],
            beds=data[52],
            bed_type=data[53],
            amenities=data[54],
            square_feet=data[55]
        )
        area_details = AreaDetails.objects.create(
            street=data[34],
            neighbourhood=data[35],
            city=data[38],
            state=data[39],
            zip_code=data[40],
            country=data[43],
            latitude=data[44],
            longtitude=data[45],
        )
        charge = Charge.objects.create(
            price=data[56],
            weekly_price=data[57],
            monthly_price=data[58],
            security_deposit=data[59],
            cleaning_fee=data[60],
            extra_people_price=data[62],
        )
        ratings = Ratings.objects.create(
            rating=data[75],
            accuracy=data[76],
            cleanliness=data[77],
            check_in=data[78],
            communication=data[79],
            location=data[80],
            value=data[81],
        )

        Accomodation.objects.create(
            accomodation_id=data[0],
            name=data[4],
            property_type=data[47],
            guests_included=data[61],
            minimum_nights=data[63],
            maximum_nights=data[64],
            cancelation_policy=data[86],
            requires_guest_phone_verification=data[88],
            image=data[12],

            space_details_id=space_details,
            general_description_id=general_description,
            host_id=Host.objects.get(host_id=data[16]),
            area_details_id=area_details,
            charge_id=charge,
            ratings_id=ratings
        )

def make_reviewer_users(reviewers_data):
    for data in reviewers_data:
            try:
                user = User.objects.get(pk=data[3])
            except User.DoesNotExist:
                user = None

            if user != None:
                continue

            username = data[4]
                
            try:
                user = User.objects.get(username=username)
            except User.DoesNotExist:
                user = None

            if user != None:
                username += str(data[3])

            User.objects.create(
                pk=data[3],
                username=username,
                password=make_password(str(data[3]))
            )


def check_reviewers_duplicates(reviewers):
    duplicates = {}
    for reviewer in reviewers:
        duplicates[reviewer[3]] = (reviewer[0], reviewer[1], reviewer[2], reviewer[3], reviewer[4], reviewer[5])

    removed = []
    for key, reviewer in duplicates.items():
        removed.append(reviewer)

    return removed

def make_calendar(calendar_data):
    print("hello")
    for data in calendar_data:
        if data[2] == 't':
            date = datetime.strptime(data[1], "%m/%d/%Y")
            date = date.strftime("%Y-%m-%d")
            price = data[3].replace('$', '')

            try:
                accomodation = Accomodation.objects.get(accomodation_id=data[0])
                calendar = Calendar.objects.get(accomodation_id=accomodation, date=date)
            except Calendar.DoesNotExist:
                calendar = None

            if calendar == None:
                Calendar.objects.create( 
                    date=date,
                    price=float(price),
                    accomodation_id=accomodation
                )
                


def importExcel(request):

    if request.method == 'POST':
        user_resource = UserResource()
        profile_resource = ProfileResource()
        dataset = Dataset()
        file = request.FILES['my_file']

        imported_data = dataset.load(file.read(), format='xlsx')

        if file.name == 'listings.xlsx':
            host_data = check_host_duplicates(imported_data)
            # make_host_users(host_data)
            # make_host_profile(host_data)
            # make_host(host_data)
            # make_listings(imported_data)
            

        elif file.name == 'reviews.xlsx':
            reviewers_data = check_reviewers_duplicates(imported_data)
            
            


        elif file.name == 'calendar.xlsx':
            # make_calendar(imported_data)
            pass
             

    return render(request, 'input.html')