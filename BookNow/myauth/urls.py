
from django.urls import path
from .views import MyTokenObtainPairView 
from .views import *

from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

urlpatterns = [
    path('token/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),

    path('create_tenant', create_tenant, name="create_tenant"),
    path('create_host', create_host, name="create_host"),
    path('create_host_awaiting', create_host_awaiting, name="create_host_awaiting"),

    path('get_all_hosts', get_all_hosts, name="get_all_hosts"),
    path('get_all_hosts_awaiting', get_all_hosts_awaiting, name="get_all_hosts_awaitings"),
    path('insert_host_awaiting', insert_host_awaiting, name="insert_host_awaiting"),
    path('delete_host_awaiting/<int:id>', delete_host_awaiting, name="delete_host_awaiting"),
    path('delete_host/<int:id>', delete_host, name="delete_host"),

    path('upload_users_image/<int:id>', upload_users_image, name="upload_users_image"),
    path('upload_host_awaiting_image/<int:id>', upload_host_awaiting_image, name="upload_host_awaiting_image"),

    path('user_from_host/<int:host_id>', get_user_from_host_id, name="get_user_from_host_id"),
    path('get_profile_by_user/<int:user_id>', get_profile_by_user, name="get_profile_by_user"),
    path('get_host_by_user/<int:user_id>', get_host_by_user, name="get_host_by_user"),
    path('get_tenant_by_user/<int:user_id>', get_tenant_by_user, name="get_tenant_by_user"),

    path('send_email_to_tenant', send_email_to_tenant, name="send_email_to_tenant"),
    path('get_user_from_id', get_user_from_id, name="get_user_from_id"),
]