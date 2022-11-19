from django.db import models
from django.utils import timezone 



class Movie(models.Model):
    # fixed id 
    f_id = models.IntegerField()

    title = models.CharField(max_length = 512) 
    o_title = models.CharField(max_length = 512)

    is_serie = models.BooleanField()

    season = models.IntegerField(default = 0, blank = True, null = True)
    episode = models.IntegerField(default = 0, blank = True, null = True)
    
    year = models.IntegerField(default = 0)

    # comma separated list 
    directors       = models.TextField(default = "", blank = True, null = True)
    actors          = models.TextField(default = "", blank = True, null = True)
    banners         = models.TextField(default = "", blank = True, null = True)
    posters         = models.TextField(default = "", blank = True, null = True)
    provider_name   = models.TextField(default = "", blank = True, null = True)
    language        = models.CharField(max_length = 256)

    # parental rudiny
    fsk             = models.IntegerField(default = 0)

    date_added      = models.DateTimeField(default = None, blank = True, null = True)

    def __str__(self):
        return self.title
