
from django.urls import path, register_converter
from . import views
from .converters import DateConverter

register_converter(DateConverter, 'date')

urlpatterns = [
    path('accomodations/<str:location>/<int:people>/<int:rooms>/<str:start_date>/<str:end_date>/<str:price_option>', views.get_accomodations, name="get_accomodations")
]