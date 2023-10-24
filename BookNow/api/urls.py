
from django.urls import path
from . import views

urlpatterns = [
    path('description', views.description_list, name="description-list"),
    path('description/<int:id>', views.description_api, name="description-api"),

    path('space_details', views.space_details_list, name="space-details-list"),
    path('space_details/<int:id>', views.space_details_api, name="space-details-api"),

    path('area_details', views.area_details_list, name="area-details-list"),
    path('area_details/<int:id>', views.area_details_api, name="area-details-api"),

    path('charge', views.charge_list, name="charge-list"),
    path('charge/<int:id>', views.charge_api, name="charge-api"),

    path('ratings', views.ratings_list, name="ratings-list"),
    path('ratings/<int:id>', views.ratings_api, name="ratings-api"),

    path('accomodations', views.accomodation_list, name="accomodations-list"),
    path('accomodations/<int:id>', views.accomodation_api, name="accomodations-api"),

    path('accomodation/<int:id>', views.get_accomodation, name="get_accomodation"),

    path('create_reservation', views.create_reservation, name="create_reservation"),
]