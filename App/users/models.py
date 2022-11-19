from django.db import models
from django.contrib.auth.models import AbstractUser

from django.utils import timezone 



class CustomUser(AbstractUser):
 
    date_joined = models.DateTimeField(default = timezone.now)
    # allowed to be empty 
    last_uploaded = models.DateTimeField(default = None, blank = True, null = True)
 
    # TODO currently watching foreign key 
    currently_watching = models.ForeignKey("main.Movie", on_delete = models.SET_NULL, default = None, blank = True, null = True)

    # because he is following other users
    following = models.ManyToManyField('self', default = None, blank = True)

    # prevent duplicate emails 
    class Meta:
        unique_together = ("email",)
        