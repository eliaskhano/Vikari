from django.shortcuts import get_object_or_404, render
from django.contrib.auth import authenticate, login


# rest framework imports 
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.decorators import parser_classes
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.views import APIView
from rest_framework import status, viewsets
from rest_framework.permissions import AllowAny, IsAuthenticated

# local imports 
from .models import CustomUser 
from .serializers import CreateUserProfileSerializer, UserDataSerializer, UserListSerializer
from main.views import format_error, responsedata


class LoginAPI(APIView):
    permission_classes = [AllowAny]
    authentication_classes = []

    """
    Accepts: 
    username, password 

    Possible Errors:
    wrong credentials
    """
    
    def post(self, request):

        username = request.data.get("username")
        password = request.data.get("password")

        user  = authenticate(request,
                            username = username, 
                            password = password)

        
        if not user:
            return Response(responsedata(False, ["Credentials are wrong!"]),
                                status=status.HTTP_400_BAD_REQUEST)

        login(request, user)
       
        return Response(responsedata(True, ["Authentication successful!"], {'key' : user.id, "userData" : UserDataSerializer(user).data,"message" : "Authentication successful!"}),
                        status=status.HTTP_200_OK)

     
            



"""
{
"username" : "Test",
"password" : "testing321",
"email" : "test@gamil.com" 
}
"""
class RegisterAPI(APIView):
    permission_classes = [AllowAny]
    authentication_classes = []
    """
    Accepts:
    username, email, password 

    Possible Errors:
    duplicate email
    wrong credentials (no account with these credentials)
    """
    # encrypted is the email 
    def post(self, request):
        username = request.data['username']
        email    = request.data['email']
        password = request.data['password']

        serializer = CreateUserProfileSerializer(data = request.data)
        
        if serializer.is_valid():
            serializer.save()
            return Response(responsedata(True, ["Account registered!"], serializer.data),
                        status=status.HTTP_200_OK)
        

        else:
            return Response(responsedata(False, format_error(serializer.errors), serializer.data),
                        status=status.HTTP_400_BAD_REQUEST)




@api_view(['get'])
def UserList(request, user_id):
    """
    list of users
    """
    res = UserListSerializer(CustomUser.objects.all().exclude(pk__in = get_object_or_404(CustomUser, id = user_id).following.all()).exclude(pk = user_id), many = True) 
    return Response(res.data)













