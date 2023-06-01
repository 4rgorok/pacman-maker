from django.contrib import admin
from django.urls import include, path

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
    path('user_maps/', views.user_maps, name='user_maps'),
    path('public_maps/', views.public_maps, name='public_maps'),
    path('toggle_public/<int:map_id>/', views.toggle_public, name='toggle_public'),
    path('like_map/<int:map_id>/', views.like_map, name='like_map'),
    path('tasks/', views.tasks, name='tasks'),
]