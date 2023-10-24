
from rest_framework.serializers import ModelSerializer
from .models import *

class DescriptionSerializer(ModelSerializer):
    class Meta:
        model = GeneralDescription
        fields = '__all__'

class SpaceDetailsSerializer(ModelSerializer):
    class Meta:
        model = SpaceDetails
        fields = '__all__'

class AreaDetailsSerializer(ModelSerializer):
    class Meta:
        model = AreaDetails
        fields = '__all__'

class ChargeSerializer(ModelSerializer):
    class Meta:
        model = Charge
        fields = '__all__'

class RatingsSerializer(ModelSerializer):
    class Meta:
        model = Ratings
        fields = '__all__'

class AccomodationSerializer(ModelSerializer):
    class Meta:
        model = Accomodation
        fields = '__all__'

class CalendarSerializer(ModelSerializer):
    class Meta:
        model = Calendar
        fields = '__all__'

class ReviewsSerializer(ModelSerializer):
    class Meta:
        model = Reviews
        fields = '__all__'

class ReservationSerializer(ModelSerializer):
    class Meta:
        model = Reservation
        fields = '__all__'