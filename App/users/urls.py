from django.contrib import admin
from django.urls import path, include 


from . import views 

urlpatterns = [
   path("login/", views.LoginAPI.as_view()),
   path("register/", views.RegisterAPI.as_view()),
]
