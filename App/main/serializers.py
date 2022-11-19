from rest_framework import serializers


from .models import Movie, WatchingRecord

class MoviesOptionsSerializer(serializers.ModelSerializer):
    name = serializers.SerializerMethodField("get_name")

    def get_name(self, obj):
        return f"{obj.title} ({obj.year})" 
    
    class Meta:
        model = Movie
        fields = ('id', 'display')



class WatchingRecordSerializerCreate(serializers.ModelSerializer):
    class Meta:
        model = WatchingRecord
        fields = ('user', 'movie', 'rating')



class MoviePublicSerializer(serializers.ModelSerializer):
    show_banners = serializers.SerializerMethodField("get_banners") 
    show_genres  = serializers.SerializerMethodField("get_genres")

    def get_banners(self, obj):
        if (obj.banners):
            # removing spaces
            items = list(map(lambda x: x.strip(" "), obj.banners.split(",")))
        else:
            items = []
        
        return items 

    def get_genres(self, obj):
        if (obj.genres):
            # removing spaces
            items = list(map(lambda x: x.strip(" "), obj.genres.split(",")))
        else:
            items = []
        
        return items 

    class Meta:
        model = Movie 
        fields = ("id", "title", "o_title", "display", "show_banners", "show_genres","rating_avg", "rating_mal", "genres", "provider_name")
