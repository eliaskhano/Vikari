from django.db.models.signals import post_save  	
from django.dispatch import receiver
from django.shortcuts import get_object_or_404                
from django.utils import timezone 

from rest_framework.authtoken.models import Token

from .models import WatchingRecord



# NEEDS TO BE TESTED
# the company that profile works for 
@receiver(post_save, sender = WatchingRecord)
def update_movie_statistic(sender, instance, created, **kwargs):
    if created:
        # TODO test this
        instance.movie.rating_avg = float(instance.movie.rating_avg * instance.movie.rating_mal  + instance.rating) / float((instance.movie.rating_mal + 1))
        instance.movie.rating_mal += 1 
        instance.movie.save()

        # updating the users last uploaded instance
        instance.user.last_uploaded = timezone.now() 
        instance.user.save()


