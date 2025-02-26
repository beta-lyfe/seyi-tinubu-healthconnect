import cloudinary.uploader
from django.shortcuts import render, get_object_or_404
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from rest_framework import status

from api.models import User
from doctor.models import DoctorProfile
from doctor.serializer import DoctorProfileSerializer
from rest_framework.response import Response

from rest_framework.exceptions import PermissionDenied
from rest_framework.pagination import PageNumberPagination


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
def get_doctor_profile_id(request, id):
    try:
        user = get_object_or_404(User, id=id)
    except Exception as e:
        print(f"Error: {e}")
        return Response({'message': f'Doctor with id {id} does not exist'}, status=status.HTTP_404_NOT_FOUND)

    # If the user is a doctor
    if user.is_doctor:
        doctor_profile = user.doctor
        serializer = DoctorProfileSerializer(doctor_profile)
        data = serializer.data
        data['id'] = data['user']
        data.pop('user')
        data['email'] = user.email
        data['is_doctor'] = user.is_doctor
        data.pop('created_at')
        data.pop('updated_at')
        
        return Response(data, status=status.HTTP_200_OK)

    return Response({'message': f'Internal server error'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(['GET'])
@permission_classes([AllowAny])
def get_doctors(request):
    doctors = DoctorProfile.objects.all()
    
    paginator = CustomPagination()
    paginated_doctors = paginator.paginate_queryset(doctors, request)

    serializer = DoctorProfileSerializer(paginated_doctors, many=True)
    results = []
    for result in serializer.data:
        user = User.objects.get(id=result['user'])
        result['id'] = result['user']
        result['email'] = user.email
        result.pop('user')
        result.pop('created_at')
        result.pop('updated_at')
        results.append(result)

    return paginator.get_paginated_response({
        'message': 'Successful',
        'data': results
    })

@api_view(['GET', 'PATCH'])
@permission_classes([CustomIsAuthenticated])
def get_or_update_doctor(request):
    # Get the patient profile based on the provided ID
    try:
        doctor_profile = DoctorProfile.objects.get(user=request.user)
    except Exception as e:
        print(f"Error: {e}")
        return Response({'message': f'Doctor does not exist or User is not a Doctor'}, status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        # If it's a GET request, return the patient's profile data
        user = User.objects.get(id=request.user.id)
        result = DoctorProfileSerializer(doctor_profile).data

        result.pop('created_at')
        result.pop('updated_at')
        result['id'] = result['user']
        result['email'] = user.email
        result.pop('user')

        return Response(result, status=status.HTTP_200_OK)

    elif request.method == 'PATCH':
        # If it's a PATCH request, update the patient's profile
        # Check if doctor profile_picture_url exists
        if "profile_picture_url" in request.FILES:
            result = cloudinary.uploader.upload(request.FILES['profile_picture_url'], folder="BetaLyfe/profile")
            doctor_profile.profile_image = result['secure_url']
            doctor_profile.save()

        serializer = DoctorProfileSerializer(doctor_profile, data=request.data, partial=True)  # partial=True allows partial updates
        if serializer.is_valid():
            serializer.save()  # Save the updated patient profile
            result = serializer.data
            result['id'] = result['user']
            result.pop('user')
            return Response({'message': 'Successful'}, status=status.HTTP_200_OK)
        else:
            return Response({'message': serializer.errors}, status=status.HTTP_400_BAD_REQUEST)

    return Response({'message': 'Method not allowed'}, status=status.HTTP_405_METHOD_NOT_ALLOWED)

