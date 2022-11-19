from rest_framework import serializers

from main.serializers import MoviePublicSerializer
from .models import CustomUser 


# TODO test if this works
class CreateUserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ('id', 'username', 'email', 'password')
        # important for hashing
        extra_kwargs = {'password': {'write_only': True}}



    def create(self, validated_data):
        user = CustomUser.objects.create_user(**validated_data)
        return user 


class UserDataSerializer(serializers.ModelSerializer):
    show_currently_watching = serializers.SerializerMethodField("get_currently_watching")

    def get_currently_watching(self, obj):
        return MoviePublicSerializer(obj.currently_watching).data


    class Meta:
        model = CustomUser 
        fields = ("username", "last_uploaded", "show_currently_watching")