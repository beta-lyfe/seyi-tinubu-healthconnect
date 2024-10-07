from rest_framework import serializers
from doctor.models import DoctorProfile

class DoctorProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = DoctorProfile
        fields = '__all__'


class DoctorsDetails(serializers.ModelSerializer):
    class Meta:
        model = DoctorProfile
        fields = ['id', 'first_name', 'last_name', 'email']
