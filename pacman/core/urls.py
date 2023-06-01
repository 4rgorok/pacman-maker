from django.urls import path

from . import views
from .views import *
from .views import SignUpView
from django.contrib.auth.views import LogoutView

app_name = 'core'
urlpatterns = [
    path("", views.index, name="index"),
    path("generator/", views.generator, name="generator"),
    path("game/", views.game, name="game"),
    path("login/", MyLoginView.as_view(), name="login"),
    path('logout/', LogoutView.as_view(next_page='core:login'), name='logout'),
    path('signup/', SignUpView.as_view(), name='signup'),
]