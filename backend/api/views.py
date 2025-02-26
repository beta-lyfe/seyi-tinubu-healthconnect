from django.shortcuts import render, get_object_or_404
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
# import cloudinary

from api.schemas import UserSerializer, LoginSerializer, EmailVerifySerializer
from django.utils import timezone
from django.utils.translation import gettext_lazy as _
from api.utils import VerifyEmail_key, ResetPassword_key
from django.contrib.auth.hashers import check_password
from allauth.account.models import EmailAddress
from rest_framework_simplejwt.tokens import RefreshToken

from api.models import User, EmailVerication_Keys, PasswordReset_keys, Waitlist
# from doctor.models import DoctorProfile
# from patient.models import PatientProfile
from doctor.serializer import DoctorProfileSerializer
from patient.serializer import PatientProfileSerializer

from rest_framework.exceptions import PermissionDenied
from rest_framework.permissions import BasePermission
from django.template.loader import get_template
from django.core.mail import send_mail
from uuid import uuid4

from api.schemas import (register_schema)

# Helper function
class CustomIsAuthenticated(IsAuthenticated):
    def has_permission(self, request, view):
        is_authenticated = super().has_permission(request, view)
        if not is_authenticated:
            raise PermissionDenied({
                'message': 'Authentication required',
            })
        return is_authenticated

class CustomAllowAny(BasePermission):
    def has_permission(self, request, view):
        auth_header = request.headers.get("Authorization", "")
        print("I got here")
        
        if auth_header.startswith("Bearer "):
            raise PermissionDenied({
                "message": "Bearer token is not allowed for this endpoint. Please remove the token and try again."
            })
        
        return True  # Allow access if no Bearer token is present

""" AUTH """
# Register View
class RegisterView(APIView):
    permission_classes = [CustomAllowAny]

    @register_schema
    def post(self, request):
        serialized_data = UserSerializer(data=request.data)

        if serialized_data.is_valid():
            user = serialized_data.save()

            return self.handle_email_verification(user=user)

        # Format error messages to remove the list
        error_messages = [errors[0] for errors in serialized_data.errors.values()]

        print(error_messages)

        return Response({"message": "Required fields missing"}, status=status.HTTP_400_BAD_REQUEST)


    def handle_email_verification(self, user):
        """Helper method to handle email verification process."""
        EmailAddress.objects.create(user=user, email=user.email)
        key, expires_at = VerifyEmail_key(user.id)

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
                "message": "Please check your email address for a verification code"}, 
                status=status.HTTP_200_OK)

        except Exception as e:
            print(f"Error: {e}")
            return Response({"message": "User Registered Successfully, Verification Otp wasn't sent please resend"}, status=status.HTTP_202_ACCEPTED)

# Register devs
@api_view(['POST'])
@permission_classes([AllowAny])
def devs(request):
    try:
        # CHeck if email address already exisst
        email = EmailAddress.objects.filter(email=request.data['email'])
        print(f"Email Error: {email}")

        if email:
            return Response({'message': 'Email already exists'}, status=status.HTTP_409_CONFLICT)

        serialized_data = UserSerializer(data=request.data)

        if serialized_data.is_valid():
            user = serialized_data.save()

            EmailAddress.objects.create(user=user, email=user.email, verified=True)

            return Response({
                "message": "User created successfully"},
                status=status.HTTP_200_OK)

        # Format error messages to remove the list
        error_messages = [errors[0] for errors in serialized_data.errors.values()]

        print(error_messages)

        return Response({"message": "Required fields missing"}, status=status.HTTP_400_BAD_REQUEST)
    except Exception as e:
        print(e)
        return Response({'message': "An unexpected error occurred"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


# Verify Email Here
@api_view(['POST'])
@permission_classes([CustomAllowAny])
def verify_email(request):
    """
        This method verifies the use email exists by Matching the user Unique Key that was sent to the email
        request.data - ['otp']
    """
    serialized_data = EmailVerifySerializer(data=request.data)
    if serialized_data.is_valid():
        # print(serialized_data.data)
        otp = request.data['otp'] # type: ignore It works just pylance Type list errors
        try:
            unique_key = EmailVerication_Keys.objects.get(key=otp)
            if unique_key.exp <= timezone.now():
                return Response({'message': _('Invalid verification OTP or OTP has expired.')}, status=status.HTTP_404_NOT_FOUND)
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
            return Response({'message': _('Invalid verification OTP or OTP has expired.')}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            print(e)
            return Response({"message": "An unexpected error occurred"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    # Format error messages to remove the list
    error_messages = [errors[0] for errors in serialized_data.errors.values()]
    print(error_messages)
    
    return Response({"message": "Required fields missing"}, status=status.HTTP_400_BAD_REQUEST)



@api_view(['POST'])
@permission_classes([CustomAllowAny])
def login(request):
    serializer = LoginSerializer(data=request.data)
    if serializer.is_valid():
        email = serializer.validated_data['email'] # type: ignore
        password = serializer.validated_data['password'] # type: ignore


        try:
            user = User.objects.get(email=email)
        except User.DoesNotExist:
            return Response({'message': 'Invalid email or password'}, status=status.HTTP_401_UNAUTHORIZED)

        if not EmailAddress.objects.get(email=email).verified:
                
                return Response({'message': 'Email is not verified '}, status=status.HTTP_401_UNAUTHORIZED)

        if check_password(password, user.password):
            # print(user.password)
            refresh = RefreshToken.for_user(user)
            # update_last_login(None, user)

            # If the user is a doctor
            if user.is_doctor:
                patient_profile = user.doctor
                serializer = DoctorProfileSerializer(patient_profile)

                data = serializer.data
                data['id'] = data['user']
                data.pop('user')
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


            serializer = DoctorProfileSerializer(patient_profile)

            data = serializer.data
            data['id'] = data['user']
            data.pop('user')
            data['email'] = user.email
            data['is_doctor'] = user.is_doctor

            return Response({
                'refresh': str(refresh),
                'access': str(refresh.access_token), # type: ignore
                'user' : data
            })

        else:
            print(check_password(user.password, password))
            return Response({'message': 'Invalid email or password'}, status=status.HTTP_401_UNAUTHORIZED)
    else:
        # Format error messages to remove the list
        error_messages = [errors[0] for errors in serializer.errors.values()]
        
        return Response({"message": error_messages[0]}, status=status.HTTP_400_BAD_REQUEST)


# Verify Email Here
@api_view(['POST'])
@permission_classes([CustomAllowAny])
def resend_verify_email(request):
    try:
        email = request.data['email']
        unverified_email = EmailAddress.objects.get(email=email)
        user = unverified_email.user

        key, exp = VerifyEmail_key(user.id)

        return Response({'message': {'name': user.first_name, 'otp': key, 'expires': exp} }, status=status.HTTP_201_CREATED) # type: ignore
    except Exception as e:
        print(e)
        return Response("Email does not exist", status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
@permission_classes([CustomIsAuthenticated])
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
def forget_password(request):
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
def confirm_forget_password(request, uid, otp):
    """
        The confirm reset password takes in two arguments
            uid - User id
            otp - Key generated from the reset_password
        and the post data
            password
            password2

        Checks if both are valid in the database
            changes the password of the user
    """
    try:
        user = get_object_or_404(User, id=uid)
        reset_pwd_object = get_object_or_404(PasswordReset_keys, user=user, key=otp)

        # Check if key has expired
        if reset_pwd_object.exp <= timezone.now():
                return Response({'message': _('Key has expired.')}, status=status.HTTP_404_NOT_FOUND)

        password = request.data.get('password')
        password2 = request.data.get('password2')

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
@permission_classes([CustomIsAuthenticated])
def delete_user(request):
    # Get the user profile
    user = get_object_or_404(User, id=request.user.id)
    message = f"User {user.id} has been deleted Successfully"

    user.delete()
    return Response({"message": message}, status=status.HTTP_200_OK)


@api_view(['POST'])
@permission_classes([AllowAny])
def waitlist(request):
    email = request.data.get('email')
    if not email:
        return Response({'message': 'Email is required'}, status=status.HTTP_400_BAD_REQUEST)
    
    # Check if the email already exists
    if Waitlist.objects.filter(email=email).exists():
        return Response({'message': 'This email has already been added to the waitlist'}, status=status.HTTP_406_NOT_ACCEPTABLE)
    
    # Create a new waitlist entry
    Waitlist.objects.create(id=uuid4(), email=email)
    return Response({'message': 'Email Added Successfully'}, status=status.HTTP_200_OK)
    
