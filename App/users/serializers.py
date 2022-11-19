from rest_framework import serializers


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