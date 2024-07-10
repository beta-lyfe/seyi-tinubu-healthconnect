from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
import cloudinary
from backend.settings import BASE_DIR
from .models import User, EmailVerication_Keys, PasswordReset_keys
from rest_framework.serializers import ModelSerializer
from rest_framework import serializers


class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True)


class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
    password2 = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ['email', 'first_name', 'last_name', 'other_name', 'password', 'password2', 'doctor']

    def validate(self, attrs):
        if attrs.get('password') != attrs.get('password2'):
            raise serializers.ValidationError("Passwords do not match.")
        return attrs

    def create(self, validated_data):
        validated_data.pop('password2')  # Remove confirm_password from validated data
        password = validated_data.pop('password')  # Remove confirm_password from validated data
        
        # Create User
        user = User.objects.create(**validated_data)
        user.set_password(password)
        # print(user)
        user.save()
        return user

class EmailVerifySerializer(ModelSerializer):
    class Meta:
        model = EmailVerication_Keys
        fields = ['key']
