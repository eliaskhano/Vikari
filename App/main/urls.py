from django.urls import path


from . import views 

urlpatterns = [
   path("movies/options/", views.Options),
   path("movies/private/<int:user_id>/", views.MovieAPI.as_view({"get" : "PrivateList"}), {"public" : False}),
   path("movies/public/", views.MovieAPI.as_view({"get": "PublicList"}), {"public" : True}),
   path("movies/watching/", views.WatchingRecordAPI.as_view())

]       
        