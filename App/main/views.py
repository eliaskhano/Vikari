from django.shortcuts import render, HttpResponse


from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status, viewsets
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny

from .serializers import MoviesOptionsSerializer, WatchingRecordSerializerCreate, MoviePublicSerializer
from .models import Movie


# return list of errors 
def format_error(error):
    return list(map(lambda i: f"{', '.join(i[1])} ({i[0]})", error.items()))


# Boolean, list, object
def responsedata(status, message, data=None):
    if status:
        return {
            "status": status,
            "message": message,
            "data": data
        }
    else:
        return {
            "status": status,
            "message": message,
        }



def Index(request):
    return HttpResponse("Index")



@api_view(['get'])
def Options(request):
    """
    Movie options list 
    
    """
    serializer = MoviesOptionsSerializer(Movie.objects.order_by("-rating_avg").all(), many = True)
    return Response(serializer.data)


class MovieAPI(viewsets.ViewSet):


    # TODO  
    def PrivateList(self, request, public, user_id):
        profile = get_object_or_404(CustomUser, id = user_id)

        
        return Response(serializer.data if queryset else []) 


    def PublicList(self, request, public):

        queryset = Movie.objects.order_by("-rating_avg")[:200]

        serializer = MoviePublicSerializer(queryset, many = True) 

        return Response(serializer.data)

    #@action(detail = True, methods=["post"])
    #def 


"""
{
"user" : "1",
"movie" : "1",
"rating" : "70" 
}
"""
class WatchingRecordAPI(APIView):
    permission_classes = [AllowAny]
    authentication_classes = []
    """
    Accepts:
    user   -> id 
    movie  -> id
    rating -> int

    Possible Errors
    user id does not exist
    movie id does not exist 
    """

    def post(self, request, user_id):

        serializer = WatchingRecordSerializerCreate(data = request.data)
        if serializer.is_valid():
            serializer.save()

            return Response(responsedata(True, ["Recorded!"], serializer.data),
                                status=status.HTTP_200_OK)

        else:
            return Response(responsedata(False, format_error(serializer.errors), serializer.data),
                                status=status.HTTP_400_BAD_REQUEST)


class FollowUserAPI(APIView):
    permission_classes = [AllowAny]
    authentication_classes = []
    """
    Accepts:
    target_id  -> id 
    following  -> boolean

    Possible errors
    user id or target id do not exist 
    """
    def post(self, request, user_id):
        try:
            following = bool(request.data.get('following'))

            user   = get_object_or_404(CustomUser, id = user_id)
            target = get_object_or_404(CustomUser, id = target_id)

            if following:
                user.following.add(target) 
            else:
                user.following.remove(target)

            return Response(responsedata(True, ["Follow added!" if following else "Follow removed!"]),
                                    status=status.HTTP_200_OK)

        except Exception as e:
            return Response(responsedata(False, ["Not found!"]),
                            status=status.HTTP_404_NOT_FOUND)

    # TODO target detail
