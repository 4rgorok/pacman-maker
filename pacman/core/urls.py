from django.urls import path

from . import views

app_name = 'core'
urlpatterns = [
    path("", views.index, name="index"),
    path("generator/", views.generator, name="generator"),
    path("game/", views.game, name="game"),
]