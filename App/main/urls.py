from django.urls import path


from . import views 

urlpatterns = [
   path("", views.Index),
   path("movies/public/", views.MovieAPI.as_view({"get": "PublicList"}), {"public" : True}),
   path("movies/private/", views.MovieAPI.as_view({"get" : "PrivateList"}), {"public" : False}),

   path("movies/watching/<int:user_id>/", views.WatchingRecordAPI.as_view())

]
