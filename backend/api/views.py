from django.shortcuts import render, get_object_or_404
from rest_framework.decorators import api_view, permission_classes
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
import cloudinary

from api.schemas import UserSerializer, LoginSerializer, EmailVerifySerializer
from django.utils import timezone
from django.utils.translation import gettext_lazy as _
from api.utils import VerifyEmail_key, ResetPassword_key
from django.contrib.auth.hashers import make_password, check_password
from allauth.account.models import EmailAddress
from rest_framework_simplejwt.tokens import RefreshToken

from api.models import User, EmailVerication_Keys, PasswordReset_keys
from doctor.models import DoctorProfile
from patient.models import PatientProfile
from doctor.serializer import DoctorProfileSerializer
from patient.serializer import PatientProfileSerializer

from django.template.loader import get_template
from django.core.mail import send_mail

from api.schemas import (register_schema)


""" AUTH """
# Register View
class RegisterView(APIView):
    permission_classes = [AllowAny]
    
    @register_schema
    def post(self, request):
        serialized_data = UserSerializer(data=request.data)

        if serialized_data.is_valid():
            user = serialized_data.save()
                
            return self.handle_email_verification(user=user)

        return Response({'message': serialized_data.errors}, status=status.HTTP_400_BAD_REQUEST)

    def handle_email_verification(self, user):
        """Helper method to handle email verification process."""
        EmailAddress.objects.create(user=user, email=user.email)
        key, expires_at = VerifyEmail_key(user.id)

        # Add other fields to profile ('first_name', 'last_name', 'phone_number', 'age')
        # if user.is_doctor:
        #     profile = DoctorProfile.objects.get(user=user)
        #     doctor = DoctorProfileSerializer(profile, data=request.data, partial=True)
        #     if doctor.is_valid():
        #         doctor.save()
        # else:
        #     profile = PatientProfile.objects.get(user=user)
        #     patient = PatientProfileSerializer(profile, data=request.data, partial=True)
        #     if patient.is_valid():
        #         patient.save()
        
        html_content = get_template('auth/verify_email.html').render({
            "user": user,
            "otp": key,
            "expirary_date": expires_at
        })

        try:
            send_mail(
                subject="Verify your email",
                message="Please Verify your email. This Email is from GetPaid.bot",
                from_email="BETA LYFE <cyrile450@gmail.com>",
                recipient_list=[user.email],
                html_message=html_content,
                fail_silently=False
            )
            return Response({
                "message": "Please check your email address for a verification code",
                "data": {"otp": key, "exp": expires_at}}, status=status.HTTP_200_OK)

        except Exception as e:
            print(f"Error: {e}")
            return Response({"message": "User Registered Successfully, Verify your email"}, status=status.HTTP_202_ACCEPTED)


# Verify Email Here
@api_view(['POST'])
@permission_classes([AllowAny])
def verify_email(request):
    """
        This method verifies the use email exists by Matching the user Unique Key that was sent to the email
        request.data - ['key']
    """
    serialized_data = EmailVerifySerializer(data=request.data)
    if serialized_data.is_valid():
        # print(serialized_data.data)
        key = serialized_data.data['key'] # type: ignore It works just pylance Type list errors
        try:
            unique_key = get_object_or_404(EmailVerication_Keys, key=key)
            if unique_key.exp <= timezone.now():
                return Response({'message': _('Key has expired.')}, status=status.HTTP_404_NOT_FOUND)
            user = unique_key.user
            # Here you can update the 'verified' field of the user
            user.verified = True
            # Because I'm using some of allauth functionalities. I have to update the Email model created by allauth to login
            # Could remove this later
            user_email = EmailAddress.objects.get(email=user.email)
            user_email.verified = True
            user_email.primary = True
            user_email.save()

            user.save()
            # You might also want to delete the used verification key
            unique_key.delete()
            return Response({'message': _('Email verified successfully.')}, status=status.HTTP_200_OK)
        except EmailVerication_Keys.DoesNotExist:
            return Response({'message': _('Invalid verification key.')}, status=status.HTTP_404_NOT_FOUND)

    return Response(serialized_data.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
@permission_classes([AllowAny])
def login(request):
    serializer = LoginSerializer(data=request.data)
    if serializer.is_valid():
        email = serializer.validated_data['email'] # type: ignore
        password = serializer.validated_data['password'] # type: ignore


        try:
            user = User.objects.get(email=email)
        except User.DoesNotExist:
            return Response({'error': 'Invalid email or password'}, status=status.HTTP_401_UNAUTHORIZED)
        
        if not EmailAddress.objects.get(email=email).verified:
                return Response({'error': 'Email is not verified '}, status=status.HTTP_401_UNAUTHORIZED)

        if check_password(password, user.password):
            # print(user.password)
            refresh = RefreshToken.for_user(user)
            # update_last_login(None, user)

            # If the user is a doctor
            if user.is_doctor:
                patient_profile = user.doctor
                serializer = DoctorProfileSerializer(patient_profile)

                data = serializer.data
                data['email'] = user.email
                data['is_doctor'] = user.is_doctor
            
                return Response({
                    'refresh': str(refresh),
                    'access': str(refresh.access_token), # type: ignore
                    'user' : data
                })
            
            # If the user is a patient
            patient_profile = user.patient
            serializer = PatientProfileSerializer(patient_profile)
            
            data = serializer.data
            data['email'] = user.email
            data['is_doctor'] = user.is_doctor
    
            return Response({
                'refresh': str(refresh),
                'access': str(refresh.access_token), # type: ignore
                'user' : data
            })

        else:
            print(check_password(user.password, password))
            return Response({'erro': 'Invalid email or password'}, status=status.HTTP_401_UNAUTHORIZED)
    else:
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# Verify Email Here
@api_view(['POST'])
@permission_classes([AllowAny])
def resend_verify_email(request):
    try:
        email = request.data['email']
        unverified_email = EmailAddress.objects.get(email=email)
        user = unverified_email.user

        key, exp = VerifyEmail_key(user.id)

        return Response({'message': {'name': user.first_name, 'key': key, 'expires': exp} }, status=status.HTTP_201_CREATED) # type: ignore
    except:
        return Response("Email does not exist", status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def logout(request):
    try:
        refresh_token = request.data["refresh"]
        token = RefreshToken(refresh_token)
        token.blacklist()

        return Response(status=status.HTTP_205_RESET_CONTENT)
    except Exception as e:
        return Response(f"{e}", status=status.HTTP_400_BAD_REQUEST)


# Reset password Here
@api_view(['POST'])
@permission_classes([AllowAny])
def reset_password(request):
    """
        Receives Email
        Check if Email is in database
        Send (uid, token) in a url
    """
    data = request.data
    if data:
        
        key, uid = ResetPassword_key(email=data['email']) # type: ignore pylance warning

        return Response({'message': {'uid': uid, 'key': key}}, status=status.HTTP_201_CREATED)
    return Response({'errors': 'Something went wrong!'}, status=status.HTTP_400_BAD_REQUEST)

# Verify Email Here
@api_view(['POST'])
@permission_classes([AllowAny])
def confirm_reset_password(request, uid, key):
    """
        The confirm reset password takes in two arguments
            uid - User id
            key - Key generated from the reset_password
        and the post data
            password
            password2

        Checks if both are valid in the database
            changes the password of the user
    """
    try:
        user = get_object_or_404(User, id=uid)
        reset_pwd_object = get_object_or_404(PasswordReset_keys, user=user, key=key)

        # Check if key has expired
        print(reset_pwd_object.exp)
        # print(timezone.now())
        if reset_pwd_object.exp <= timezone.now():
                return Response({'message': _('Key has expired.')}, status=status.HTTP_404_NOT_FOUND)

        password = request.data.get('password')
        password2 = request.data.get('password2')
        # print(password)
        # print(password2)


        # Check if passwords match
        if password != password2:
            return Response({'message': _('Passwords do not match.')}, status=status.HTTP_400_BAD_REQUEST)


        # Update the user's password
        print(f"Old password: {user.password}")
        user.set_password(password)
        user.save()
        print(f"New password: {user.password}")

        return Response({'message': _('Password Successfully changed.')}, status=status.HTTP_201_CREATED)

    except User.DoesNotExist or PasswordReset_keys.DoesNotExist:
        return Response({'message': _('User DoesNot Exist or Reset Password Key is Invalid')},
                        status=status.HTTP_404_NOT_FOUND)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def delete_user(request):
    # Get the user profile
    user = get_object_or_404(User, id=request.user.id)
    message = f"User {user.id} has been deleted Successfully"

    user.delete()
    return Response({"message": message}, status=status.HTTP_200_OK)



