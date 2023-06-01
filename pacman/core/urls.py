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
]