from django.urls import path

from . import views
from .views import *
from .views import SignUpView

app_name = 'core'
urlpatterns = [
    path("", views.index, name="index"),
    path("generator/", views.generator, name="generator"),
    path("game/", views.game, name="game"),
    path("login/", MyLoginView.as_view(), name="login"),
    path('signup/', SignUpView.as_view(), name='signup'),
    path("get_public_maps/", views.get_public_maps, name="get_public_maps"),
    path("get_maps_sorted_by_name/", views.get_maps_sorted_by_name, name="get_maps_sorted_by_name"),
    path("get_maps_sorted_by_date/", views.get_maps_sorted_by_date, name="get_maps_sorted_by_date"),
    path("get_maps_sorted_by_approval/", views.get_maps_sorted_by_approval, name="get_maps_sorted_by_approval"),
]