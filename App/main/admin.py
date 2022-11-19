from django.contrib import admin

from .models import Movie, WatchingRecord
# Register your models here.
admin.site.register(Movie)
admin.site.register(WatchingRecord)