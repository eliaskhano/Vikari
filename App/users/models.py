from django.db import models
from django.contrib.auth.models import AbstractUser

from django.utils import timezone 



class CustomUser(AbstractUser):
 
    
    date_joined = models.DateTimeField(default = timezone.now)
    # allowed to be empty 
    last_uploaded = models.DateTimeField(default = None, blank = True, null = True)
 
    # TODO currently watching foreign key 

    # prevent duplicate emails 
    class Meta:
        unique_together = ("email",)
        