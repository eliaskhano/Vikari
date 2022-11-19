from rest_framework import serializers


from .models import Movie, WatchingRecord

class MoviesOptionsSerializer(serializers.ModelSerializer):
    value = serializers.SerializerMethodField("get_value")
    key = serializers.SerializerMethodField("get_key")

    def get_value(self, obj):
        return obj.display 

    def get_key(self, obj):
        return obj.id 

    class Meta:
        model = Movie
        fields = ('value', 'key')



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



class WatchingRecordTarget(serializers.ModelSerializer):
    show_name = serializers.SerializerMethodField("get_name")

    
    def get_name(self, obj):
        return obj.movie.display

    class Meta:
        model = WatchingRecord
        fields = ("rating", "date_created", "show_name")



class MoviePrivateSerializer(serializers.ModelSerializer):

    rating_friends = serializers.SerializerMethodField("get_rating_friends")
    show_friends   = serializers.SerializerMethodField("get_show_friends")
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


    def get_rating_friends(self, obj):
        ratings = WatchingRecord.objects.filter(movie = obj, user__in = self.context.get("profile").following.all())
        amount = sum(list(map(lambda k: k.rating, ratings)))
        if (ratings.count() > 0):
            return float(amount) / float(len(ratings))
        else:
            return 0
        

    def get_show_friends(self, obj):
        res = list(map(lambda k: k.username, self.context.get("profile").following.filter(reviewer__in = obj.reviews.all())))
        return res 


    class Meta:
        model = Movie 
        fields = ("display", "rating_avg", "rating_friends", "show_friends", "show_banners", "show_genres")


