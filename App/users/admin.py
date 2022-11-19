from django.contrib import admin
from django.contrib.auth.admin import UserAdmin 


from .models import CustomUser 


# Register your models here.
class CustomUserAdmin(UserAdmin):
    fieldsets = (
        (None, {
            "fields" : ("username", "password")
        }),
        ("Personal Info", {
            "fields" : ("email",)
        }),
        ("Permissions", {
            "fields" : ("is_staff", "is_superuser", "groups", "user_permissions")
        }),
        ("Important dates", {
            "fields" : ("last_login", "date_joined")
        }),
        ("Additional info", {
            "fields" : ( "last_uploaded", "following", "currently_watching")
        })
    )



admin.site.register(CustomUser, CustomUserAdmin)
