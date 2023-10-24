from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status

from api.models import *
from api.serializers import *

from datetime import datetime, date, timedelta
# Create your views here.
 
@api_view(['GET'])
def get_accomodations(request, location, people, rooms, start_date, end_date, price_option): # , people, rooms, start_date, end_date
    if request.method == 'GET':
        # Get the accomodations
        accomodations = Accomodation.objects.filter(area_details_id__city=location,
                                                    space_details_id__accomodates=people,
                                                    space_details_id__bedrooms=rooms)
        # print(accomodations)

        start_date = datetime.strptime(start_date, "%Y-%m-%d")
        end_date = datetime.strptime(end_date, "%Y-%m-%d")
        # Make the date range that the people want to stay 
        date_range = [start_date + timedelta(days=i) for i in range((end_date - start_date).days+1)]
        
        # For every accomodation search if it has available the correct date range
        accomodation_list = []
        description_list = []
        charges_list = []
        ratings_list = []
        space_details_list = []
        for accomodation in accomodations:
            try:
                calendars = Calendar.objects.filter(
                    accomodation_id=accomodation,
                    date__range=[start_date, end_date]
                )
            except Calendar.DoesNotExist:
                continue

             
            new_date_range = [date.date() for date in date_range]
            new_calendars = [calendar.date for calendar in calendars]   
            # print("New Date Range ", new_date_range)
            # print("New Calendars ", new_calendars) 

            # Check if all days wanted are available
            full_days = True 
            for date in new_date_range:
                if date not in new_calendars:
                    full_days = False

            if full_days:
                print("Full days")
                description_list.append(GeneralDescription.objects.get(accomodation__general_description_id=accomodation.general_description_id))
                ratings_list.append(Ratings.objects.get(accomodation__ratings_id=accomodation.ratings_id))
                charges_list.append(Charge.objects.get(accomodation__charge_id=accomodation.charge_id))
                space_details_list.append(SpaceDetails.objects.get(accomodation__space_details_id=accomodation.space_details_id))
                accomodation_list.append(accomodation)
                cd = Calendar.objects.filter(
                    accomodation_id=accomodation,
                    date__range=[start_date, end_date]
                )
                print(start_date, end_date, end_date-start_date)
                s = CalendarSerializer(cd, many=True)
                # print("S.data are ", s.data)
                print("IN CALENDAR")
                for calendar in cd:
                    # print("In calendar")  
                    print(calendar.date)
        
        # Order by price 
        order = False
        if price_option == 'High to Low':
            order = True
        for i in range(len(charges_list)):
            charges_list[i].price = float(charges_list[i].price.replace('$', ''))
        all = list(zip(accomodation_list, description_list, ratings_list, charges_list, space_details_list))
        all_sorted = sorted(all, key=lambda x: x[3].price, reverse=order)
        sorted_list = list(zip(*all_sorted))

        accomodation_serializer = AccomodationSerializer(sorted_list[0], many=True)
        description_serializer = DescriptionSerializer(sorted_list[1], many=True)
        ratings_serializer = RatingsSerializer(sorted_list[2], many=True)
        charges_serializer = ChargeSerializer(sorted_list[3], many=True)
        space_details_serializer = SpaceDetailsSerializer(sorted_list[4], many=True)
        print("finished")
    return Response({'accomodations': accomodation_serializer.data,
                     'descriptions': description_serializer.data,
                     'charges': charges_serializer.data,
                     'ratings': ratings_serializer.data,
                     'space_details': space_details_serializer.data,})

