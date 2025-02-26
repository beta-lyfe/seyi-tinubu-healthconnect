from rest_framework import serializers
from doctor.models import DoctorProfile
import cloudinary.uploader

class DoctorProfileSerializer(serializers.ModelSerializer):
    profile_picture_url = serializers.SerializerMethodField()

    class Meta:
        model = DoctorProfile
        fields = '__all__'

    def update(self, instance, validated_data):
        if 'profile_picture_url' in validated_data:  # Use the actual model field name
            uploaded_image = cloudinary.uploader.upload(validated_data['profile_picture_url'], folder='betalyfe/doctor/profile')
            instance.profile_picture_url = uploaded_image['secure_url']

        return super().update(instance, validated_data)

    def get_profile_picture_url(self, obj):
        if obj.profile_picture_url:
            return f"https://res.cloudinary.com/dlanhtzbw/{obj.profile_picture_url}"
        return None


class DoctorsDetails(serializers.ModelSerializer):
    class Meta:
        model = DoctorProfile
        fields = ['id', 'first_name', 'last_name', 'email']
