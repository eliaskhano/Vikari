from django.db import models
from django.utils import timezone 



class Movie(models.Model):
    # fixed id 
    f_id = models.IntegerField()
    
    title = models.CharField(max_length = 512) 
    o_title = models.CharField(max_length = 512)
    display = models.TextField(default = "", blank = True, null = True)
    year = models.IntegerField(default = 0)
 
    # comma separated list 
    directors       = models.TextField(default = "", blank = True, null = True)
    actors          = models.TextField(default = "", blank = True, null = True)
    banners         = models.TextField(default = "", blank = True, null = True)
    posters         = models.TextField(default = "", blank = True, null = True)
    provider_name   = models.TextField(default = "", blank = True, null = True)
    genres          = models.TextField(default = "", blank = True, null = True)

    language        = models.CharField(max_length = 256)
    # parental rudiny
    fsk             = models.IntegerField(default = 0)

    date_added      = models.DateTimeField(default = None, blank = True, null = True)

    # max digits = 5 -> 3 100.00 biggest possible
    rating_avg     = models.DecimalField(default = 0, max_digits = 5, decimal_places = 2)
    rating_mal     = models.IntegerField(default = 0)


    def __str__(self):
        return self.display



class WatchingRecord(models.Model):
    user   = models.ForeignKey("users.CustomUser", on_delete = models.CASCADE)
    movie  = models.ForeignKey(Movie, on_delete = models.CASCADE)

    # from 0 to 100
    rating = models.IntegerField(default = 0)

    date_created = models.DateTimeField(default = timezone.now, blank = True, null = True)

    def __str__(self):
        return f"{self.user.username} {self.movie.title} {self.rating}"
