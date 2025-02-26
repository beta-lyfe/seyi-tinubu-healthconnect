from django.shortcuts import render, get_object_or_404
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from rest_framework import status

from api.models import User
from rest_framework.pagination import PageNumberPagination
from patient.models import PatientProfile
from patient.serializer import PatientProfileSerializer, PatientsDetails

from rest_framework.exceptions import PermissionDenied

# Helper function
class CustomIsAuthenticated(IsAuthenticated):
    def has_permission(self, request, view):
        is_authenticated = super().has_permission(request, view)
        if not is_authenticated:
            raise PermissionDenied({
                'message': 'Authentication required',
            })
        return is_authenticated

# Helper function
class CustomPagination(PageNumberPagination):
    page_size = 10  # ✅ Set to 10 per page
    page_size_query_param = 'page_size'
    max_page_size = 100  # ✅ Optional, to limit max items per page


@api_view(['GET'])
@permission_classes([AllowAny])
def get_patient_profile_id(request, id):
    user = get_object_or_404(User, id=id)

    # If the user is a patient
    if not user.is_doctor:
        patient_profile = user.patient
        # If it's a GET request, return the patient's profile data
        result = PatientProfileSerializer(patient_profile).data
        print(result)

        result.pop('created_at')
        result.pop('updated_at')
        result['id'] = result['user']
        result['email'] = user.email
        result.pop('user')
        return Response(result, status=status.HTTP_200_OK)

    return Response({'message': 'User does not exist'}, status=status.HTTP_404_NOT_FOUND)

@api_view(['GET'])
@permission_classes([AllowAny])
def get_patients(request):
    patients = PatientProfile.objects.all()
    
    paginator = CustomPagination()
    paginated_doctors = paginator.paginate_queryset(patients, request)

    serializer = PatientProfileSerializer(paginated_doctors, many=True)

    results = []
    for result in serializer.data:
        user = User.objects.get(id=result['user'])
        result['id'] = result['user']
        result['email'] = user.email
        result.pop('user')
        results.append(result)
        result.pop('created_at')
        result.pop('updated_at')
    return paginator.get_paginated_response({
        'message': 'Successful',
        'data': results
    })



@api_view(['GET', 'PATCH'])
@permission_classes([CustomIsAuthenticated])
def get_or_update_patient(request):
    # Get the patient profile based on the provided ID
    try:
        patient_profile = get_object_or_404(PatientProfile, user=request.user)
    except Exception as e:
        return Response({'message': f'Patient not found'}, status=status.HTTP_404_NOT_FOUND)
    
    if request.method == 'GET':
        # If it's a GET request, return the patient's profile data
        user = User.objects.get(id=request.user.id)
        result = PatientProfileSerializer(patient_profile).data
        print(result)

        result.pop('created_at')
        result.pop('updated_at')
        result['id'] = result['user']
        result['email'] = user.email
        result.pop('user')
        return Response(result, status=status.HTTP_200_OK)

    elif request.method == 'PATCH':
        # If it's a PATCH request, update the patient's profile
        serializer = PatientProfileSerializer(patient_profile, data=request.data, partial=True)  # partial=True allows partial updates
        if serializer.is_valid():
            serializer.save()  # Save the updated patient profile
            return Response({"message": "Successfully updated"}, status=status.HTTP_200_OK)
        else:
            return Response({"message": "An unexpected error occurred"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    return Response({'detail': 'Method not allowed.'}, status=status.HTTP_405_METHOD_NOT_ALLOWED)

