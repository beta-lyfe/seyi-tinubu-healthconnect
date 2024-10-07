from django.shortcuts import render, get_object_or_404
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from rest_framework import status

from api.models import User
from patient.models import PatientProfile
from patient.serializer import PatientProfileSerializer, PatientsDetails


@api_view(['GET'])
@permission_classes([AllowAny])
def get_patient_profile_id(request, id):
    user = get_object_or_404(User, id=id)

    # If the user is a patient
    if not user.is_doctor:
        patient_profile = user.patient
        serializer = PatientProfileSerializer(patient_profile)
        data = serializer.data
        data['email'] = user.email
        data['is_doctor'] = user.is_doctor
        data.pop('created_at')
        data.pop('updated_at')
        
        return Response({
            'user': data  # Serialized patient data
        }, status=200)

    return Response({'message': 'User does not exist'}, status=status.HTTP_404_NOT_FOUND)

@api_view(['GET'])
@permission_classes([AllowAny])
def get_patients(request):
    patients = PatientProfile.objects.all()
    serializer = PatientProfileSerializer(patients, many=True)
    
    return Response(serializer.data, status=status.HTTP_200_OK)



@api_view(['GET', 'PATCH'])
@permission_classes([IsAuthenticated])
def get_or_update_patient(request):
    # Get the patient profile based on the provided ID
    patient_profile = get_object_or_404(PatientProfile, user=request.user)
    
    if request.method == 'GET':
        # If it's a GET request, return the patient's profile data
        serializer = PatientProfileSerializer(patient_profile)
        return Response(serializer.data, status=status.HTTP_200_OK)

    elif request.method == 'PATCH':
        # If it's a PATCH request, update the patient's profile
        serializer = PatientProfileSerializer(patient_profile, data=request.data, partial=True)  # partial=True allows partial updates
        if serializer.is_valid():
            serializer.save()  # Save the updated patient profile
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    return Response({'detail': 'Method not allowed.'}, status=status.HTTP_405_METHOD_NOT_ALLOWED)

