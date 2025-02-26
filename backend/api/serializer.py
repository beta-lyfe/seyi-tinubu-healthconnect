from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
import uuid
import cloudinary
from backend.settings import BASE_DIR
from allauth.account.models import EmailAddress
from api.models import User, EmailVerication_Keys, PasswordReset_keys
from rest_framework.serializers import ModelSerializer
from rest_framework import serializers

from doctor.models import DoctorProfile
from patient.models import PatientProfile


class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True)


class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
    password2 = serializers.CharField(write_only=True)
    first_name = serializers.CharField()
    last_name = serializers.CharField()
    date_of_birth = serializers.DateField()
    phone_number = serializers.CharField()

    class Meta:
        model = User
        fields = ['email', 'password', 'password2', 'last_name', 'first_name', 'date_of_birth', 'is_doctor', 'phone_number']

    def validate(self, attrs):
        if attrs.get('password') != attrs.get('password2'):
            raise serializers.ValidationError("Passwords do not match.")
        return attrs

    def create(self, validated_data):
        validated_data.pop('password2')  # Remove confirm_password from validated data
        password = validated_data.pop('password')  # Remove confirm_password from validated data
        date_of_birth = validated_data.pop('date_of_birth')
        phone_number = validated_data.pop('phone_number')

        # Set id
        validated_data['id'] = uuid.uuid4()
        
        # Create User
        user = User.objects.create(**validated_data)
        user.set_password(password)
        # print(user)
        user.save()

        # Create profile
        if user.is_doctor:
            is_doctor = DoctorProfile.objects.create(id=uuid.uuid4(), user=user, first_name=validated_data.pop('first_name'), last_name=validated_data.pop('last_name'), date_of_birth=date_of_birth, phone_number=phone_number)
            is_doctor.save()

        else:
            is_patient = PatientProfile.objects.create(id=uuid.uuid4(), user=user, first_name=validated_data.pop('first_name'), last_name=validated_data.pop('last_name'), date_of_birth=date_of_birth, phone_number=phone_number)
            is_patient.save()

        return user
        

class EmailVerifySerializer(serializers.Serializer):
    otp = serializers.CharField(write_only=True)

class EmailSerializer(serializers.Serializer):
    email = serializers.CharField(write_only=True)
    