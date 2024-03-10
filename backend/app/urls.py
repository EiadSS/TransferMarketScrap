from django.urls import path

from . import views

urlpatterns = [
    path("", views.index, name="index"),
    path("profile/<str:name>", views.profile, name="profile"),
    path("injuries/<str:name>/<str:playerId>", views.injuries, name="injuries"),
    path("stats/<str:name>/<str:playerId>", views.stats, name="stats"),
    path("value/<str:name>/<str:playerId>", views.value, name="value"),
    path("transfers/<str:name>", views.transfers, name="transfers"),
]
