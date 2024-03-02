from django.urls import path

from . import views

urlpatterns = [
    path("", views.index, name="index"),
    path("profile/<str:name>", views.profile, name="profile"),
    path("injuries/<str:name>", views.injuries, name="injuries"),
    path("stats/<str:name>", views.stats, name="stats"),
    path("value/<str:name>", views.value, name="value"),
    path("transfers/<str:name>", views.transfers, name="transfers"),
]
