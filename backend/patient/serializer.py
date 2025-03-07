from rest_framework import serializers
from patient.models import PatientProfile
import cloudinary.uploader

DEFAULT_URL = "https://res.cloudinary.com/dlanhtzbw/image/upload/v1675343188/Telegram Clone/no-profile_aknbeq.jpg"

class PatientProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = PatientProfile
        fields = '__all__'

    def update(self, instance, validated_data):
        if 'profile_picture_url' in validated_data:  # Use the actual model field name
            uploaded_image = cloudinary.uploader.upload(validated_data['profile_picture_url'], folder='betalyfe/patient/profile',)
            instance.profile_picture_url = uploaded_image['secure_url']
            instance.save()

        return instance

    def get_profile_picture_url(self, obj):
        if obj.profile_picture_url and obj.profile_picture_url != DEFAULT_URL:
            return f"https://{obj.profile_picture_url}"
        return None

class PatientsDetails(serializers.ModelSerializer):
    class Meta:
        model = PatientProfile
        fields = ['id', 'first_name', 'last_name', 'email']

