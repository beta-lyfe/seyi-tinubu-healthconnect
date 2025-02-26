from django.db import models
from api.models import User
from cloudinary.models import CloudinaryField


class PatientProfile(models.Model):
    id = models.UUIDField(primary_key=True)
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='patient')
    profile_picture_url = models.TextField(default='res.cloudinary.com/dlanhtzbw/image/upload/v1675343188/Telegram Clone/no-profile_aknbeq.jpg')
    first_name = models.CharField(max_length=255, null=True, blank=True)
    last_name = models.CharField(max_length=255, null=True, blank=True)
    other_names = models.CharField(max_length=255, null=True, blank=True)
    date_of_birth = models.DateField()
    phone_number = models.TextField(null=True, blank=True)
    age = models.IntegerField(null=True, blank=True)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

