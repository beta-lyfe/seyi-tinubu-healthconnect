from django.shortcuts import render, get_object_or_404
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from rest_framework import status

from api.models import User
from doctor.models import DoctorProfile
from doctor.serializer import DoctorProfileSerializer, DoctorsDetails
from rest_framework.response import Response


@api_view(['GET'])
@permission_classes([AllowAny])
def get_doctor_profile_id(request, id):
    user = get_object_or_404(User, id=id)

    # If the user is a doctor
    if user.is_doctor:
        doctor_profile = user.doctor
        serializer = DoctorProfileSerializer(doctor_profile)
        data = serializer.data
        data['email'] = user.email
        data['is_doctor'] = user.is_doctor
        data.pop('created_at')
        data.pop('updated_at')
        
        return Response({
            'user': data  # Serialized patient data
        }, status=200)


@api_view(['GET'])
@permission_classes([AllowAny])
def get_doctors(request):
    doctors = DoctorProfile.objects.all()

    result = DoctorProfileSerializer(doctors, many=True)

    return Response(result.data, status=status.HTTP_200_OK)


@api_view(['GET', 'PATCH'])
@permission_classes([IsAuthenticated])
def get_or_update_doctor(request):
    # Get the patient profile based on the provided ID
    doctor_profile = get_object_or_404(DoctorProfile, user=request.user)

    if request.method == 'GET':
        # If it's a GET request, return the patient's profile data
        serializer = DoctorProfileSerializer(doctor_profile)
        return Response(serializer.data, status=status.HTTP_200_OK)

    elif request.method == 'PATCH':
        # If it's a PATCH request, update the patient's profile
        serializer = DoctorProfileSerializer(doctor_profile, data=request.data, partial=True)  # partial=True allows partial updates
        if serializer.is_valid():
            serializer.save()  # Save the updated patient profile
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    return Response({'detail': 'Method not allowed.'}, status=status.HTTP_405_METHOD_NOT_ALLOWED)

