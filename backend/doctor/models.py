from django.db import models
from api.models import User
from cloudinary.models import CloudinaryField

class DoctorProfile(models.Model):
    id = models.UUIDField(primary_key=True)
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='doctor')
    profile_picture_url = models.TextField(default='res.cloudinary.com/dlanhtzbw/image/upload/v1675343188/Telegram Clone/no-profile_aknbeq.jpg')
    first_name = models.CharField(max_length=255, null=True, blank=True)
    last_name = models.CharField(max_length=255, null=True, blank=True)

    date_of_birth = models.DateField(null=True, blank=True)
    specialization = models.CharField(max_length=50, null=True, blank=True)
    patients_treated = models.IntegerField(default=0)
    years_of_experience = models.IntegerField(default=0)
    reviews = models.IntegerField(default=0)
    rating = models.IntegerField(default=0)
    description = models.TextField(null=True, blank=True)

    home_consultation_charge = models.IntegerField(default=0)
    video_consultation_charge = models.IntegerField(default=0)
    clinic_consultation_charge = models.IntegerField(default=0)

    certifications = models.JSONField(null=True, blank=True)
    experiences = models.JSONField(null=True, blank=True)
    working_hours = models.JSONField(null=True, blank=True)
    location = models.JSONField(null=True, blank=True)


    phone_number = models.TextField(null=True, blank=True)
    other_names = models.CharField(max_length=255, null=True, blank=True)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)


    def get_public_profile_picture(self):
        if self.profile_picture_url:
            return f"https://res.cloudinary.com/dlanhtzbw/{self.profile_picture_url}"
        return None

