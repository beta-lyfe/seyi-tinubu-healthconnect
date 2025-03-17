from django.shortcuts import render, get_object_or_404
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.exceptions import PermissionDenied
from rest_framework.pagination import PageNumberPagination
from rest_framework.response import Response
from rest_framework import status
import cloudinary.uploader
import uuid
from django.utils import timezone

from api.models import User
from doctor.models import DoctorProfile
from consultation.utils import create_room, AccessToken, notify_doctor_consultation_request, notify_patient_consultation_status
from consultation.models import Consultation_Request, Consultations
from consultation.serializer import ConsultationRequestSerializer, ConsultationSerializer

from datetime import datetime, timedelta
from django.utils.timezone import make_aware


# Helper function
class CustomIsAuthenticated(IsAuthenticated):
    def has_permission(self, request, view):
        is_authenticated = super().has_permission(request, view)
        if not is_authenticated:
            raise PermissionDenied({
                'message': 'Authentication required',
            })
        return is_authenticated

class ConsultationRequestPagination(PageNumberPagination):
    page_size = 10  # Adjust as needed
    page_size_query_param = 'page_size'
    max_page_size = 100


@api_view(['GET', 'POST'])
@permission_classes([CustomIsAuthenticated])
def request_consultation(request):
    user = request.user

    if request.method == 'GET':
        if user.is_doctor:
            results = Consultation_Request.objects.filter(doctor=user)
        else:
            results = Consultation_Request.objects.filter(patient=user)

        # Apply pagination
        paginator = ConsultationRequestPagination()
        paginated_results = paginator.paginate_queryset(results, request)
        serialized_data = ConsultationRequestSerializer(paginated_results, many=True).data

        return paginator.get_paginated_response(serialized_data)

    elif request.method == 'POST':
        if user.is_doctor:
            return Response({'message': 'Doctor cannot create a consultation request'}, status=status.HTTP_403_FORBIDDEN)

        data = request.data.copy()
        data['patient'] = request.user.id
        
        # Check for existing pending requests
        existing_request = Consultation_Request.objects.filter(
            patient=data['patient'], 
            doctor=data['doctor'], 
            status='Pending'
        ).exists()
        
        if existing_request:
            return Response({'message': 'Already a Pending request'}, status=status.HTTP_406_NOT_ACCEPTABLE)

        serializer = ConsultationRequestSerializer(data=data)
        if serializer.is_valid():
            # Extract validated data
            # validated_data = serializer.validated_data
            # doctor = validated_data['doctor']
            # start_time = validated_data['start_time']
            # end_time = validated_data['end_time']

            # try:
            #     doctor_profile = DoctorProfile.objects.get(user=doctor)
            # except DoctorProfile.DoesNotExist:
            #     return Response({'message': 'Doctor profile not found'}, status=status.HTTP_400_BAD_REQUEST)

            # # Extract day of the week
            # day_of_week = start_time.strftime("%A")

            # # Get doctor's working hours
            # working_hours = doctor_profile.working_hours
            # available_hours = next(
            #     (wh for wh in working_hours if wh["day"].lower() == day_of_week.lower()), None
            # )

            # if not available_hours:
            #     return Response({'message': 'Doctor is not available on this day'}, status=status.HTTP_400_BAD_REQUEST)

            # # Convert working hours to datetime for comparison
            # doctor_start_time = datetime.strptime(available_hours["start_time"], "%H:%M").time()
            # doctor_end_time = datetime.strptime(available_hours["end_time"], "%H:%M").time()
            
            # # Convert start_time and end_time to time objects for comparison
            # consultation_start_time = start_time.time()
            # consultation_end_time = end_time.time()

            # if not (doctor_start_time <= consultation_start_time and consultation_end_time <= doctor_end_time):
            #     return Response({'message': 'Requested time is outside working hours'}, status=status.HTTP_400_BAD_REQUEST)

            # # Check if the doctor has a conflicting consultation
            # conflicting_consultations = Consultations.objects.filter(
            #     doctor=doctor,
            #     start_time__lte=end_time,
            #     end_time__gte=start_time
            # ).exists()

            # if conflicting_consultations:
            #     return Response({'message': 'Doctor is already in a consultation at this time'}, status=status.HTTP_400_BAD_REQUEST)

            # Save the consultation request
            serializer.save()
            new_user = User.objects.get(id=data['doctor'])
            notify_doctor_consultation_request(new_user)

            return Response({"message": "Consultation request created"}, 
                           status=status.HTTP_201_CREATED)
            
        # Return validation errors
        return Response({'errors': serializer.errors}, status=status.HTTP_400_BAD_REQUEST)
    
    # Default response for unsupported methods
    return Response({'message': 'Method not allowed'}, status=status.HTTP_405_METHOD_NOT_ALLOWED)


@api_view(['GET'])
@permission_classes([CustomIsAuthenticated])
def consultation_request_by_id(request, request_id):
    user = request.user
    try:
        consultation = Consultation_Request.objects.get(id=request_id)
    except Exception as e:
        print(e)
        return Response({'message': 'Consultation Request not found'}, status=status.HTTP_404_NOT_FOUND)

    if user.is_doctor and consultation.doctor.id != user.id:
        return Response({"message": f"You Do Not have Permission to Access this Information"},
                        status=status.HTTP_403_FORBIDDEN)

    elif not user.is_doctor and consultation.patient.id != user.id:
        return Response({"message": f"You Do Not have Permission to Access this Information"},
                        status=status.HTTP_403_FORBIDDEN)

    return Response(ConsultationRequestSerializer(consultation).data,
                    status=status.HTTP_200_OK)


@api_view(['POST'])
@permission_classes([CustomIsAuthenticated])
def consultation_accept_request(request, request_id):
    user = request.user
    try:
        consultation = Consultation_Request.objects.get(id=request_id)
    except Exception as e:
        print(e)
        return Response({'message': 'Consultation Request not found'}, status=status.HTTP_404_NOT_FOUND)

    # Check if the user is a doctor
    if not user.is_doctor:
        return Response({"message": "User Do Not have Permission to Access this Information"},
                        status=status.HTTP_403_FORBIDDEN)

    # Check if the doctor matches the consultation request
    if consultation.doctor.id != user.id:
        return Response({"message": f"User Do Not have Permission to Access this Information"},
                        status=status.HTTP_403_FORBIDDEN)

    # Check if the consultation status is 'Pending'
    if consultation.status != 'Pending':
        if consultation.status == 'Accept':
            return Response({"message": f"Already accepted this request."},
                            status=status.HTTP_406_NOT_ACCEPTABLE)
        elif consultation.status == 'Decline':
            return Response({"message": f"Already declined this request."},
                            status=status.HTTP_406_NOT_ACCEPTABLE)
        else:
            return Response({"message": "Invalid consultation status."},
                            status=status.HTTP_400_BAD_REQUEST)
    
    new_user = User.objects.get(id=consultation.patient)

    notify_patient_consultation_status(new_user)

    # Try creating the video_room_id
    status_code, response = create_room()
    if not status_code:
        return Response({'message': 'Generation of Huddle-01 room_id failed'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    
    if status_code != 201:
        return Response({'message': f"Huddle-01 Error: ({status_code}) {response['message']}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    # Try to create a new consultation if everything is valid
    try:
        Consultations.objects.create(
            id = uuid.uuid4(),
            doctor=consultation.doctor,
            patient=consultation.patient,
            video_room_id=response['data']['roomId'],
            start_time=consultation.start_time,
            end_time=consultation.end_time
        )
        # Optionally, update the request status if needed
        consultation.status = 'Accept'
        consultation.save()

        return Response({"message": "Consultation request accepted"}, status=status.HTTP_201_CREATED)

    except Exception as e:
        print(e)
        return Response({"message": "An unexpected error occurred."},
                        status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@api_view(['GET'])
@permission_classes([CustomIsAuthenticated])
def user_consultation(request):
    user = request.user
    if user.is_doctor:
        consultations = Consultations.objects.filter(doctor=user)
    else:
        consultations = Consultations.objects.filter(patient=user)

    # print(consultations)

    # Apply pagination
    paginator = ConsultationRequestPagination()
    paginated_results = paginator.paginate_queryset(consultations, request)
    serialized_data = ConsultationSerializer(paginated_results, many=True).data

    return paginator.get_paginated_response(serialized_data)



@api_view(['GET'])
@permission_classes([CustomIsAuthenticated])
def consultation_by_id(request, consultation_id):
    user = request.user
    consultation = get_object_or_404(Consultations, id=consultation_id)

    if user.is_doctor and consultation.doctor.id != user.id:
        return Response({"message": f"User Does Not have Permission to Access this Information"},
                        status=status.HTTP_403_FORBIDDEN)

    elif not(user.is_doctor) and consultation.patient.id != user.id:
        return Response({"message": f"User Does Not have Permission to Access this Information"},
                        status=status.HTTP_403_FORBIDDEN)
    
    return Response(ConsultationSerializer(consultation).data,
                    status=status.HTTP_200_OK)

@api_view(['GET'])
@permission_classes([CustomIsAuthenticated])
def consultation_access_token(request, consultation_id):
    try:
        user = request.user

        consultation = Consultations.objects.get(id=consultation_id)

        if not consultation:
            return Response({'message': f"Consultation not found"}, status=status.HTTP_404_NOT_FOUND)
        if user.is_doctor and user.id != consultation.doctor.id:
            return Response({"message": f"User Does Not have Permission to Access this Information"},
                            status=status.HTTP_403_FORBIDDEN)
        elif not(user.is_doctor) and consultation.patient.id != user.id:
            return Response({"message": f"User Does Not have Permission to Access this Information"},
                            status=status.HTTP_403_FORBIDDEN)

        access_token = AccessToken({
            "roomId": consultation.video_room_id,
            "role": "SPEAKER",
            "permissions": {
                "canConsume": True,
                "canProduce": True,
                "canRecvData": True,
                "canSendData": True,
                "canUpdateMetadata": True,
                "canProduceSources": {"cam": True, "mic": True, "screen": True}
            },
            "options": {}
        })

        jwt_token = access_token.to_jwt()
        # print(f"Token: {jwt_token}")
        return Response({'token': jwt_token}, status=status.HTTP_200_OK)
    except Exception as e:
        print(f"Error: {e}")
        return Response({'message': 'An unexpected error occurred'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(['POST'])
@permission_classes([CustomIsAuthenticated])
def consultation_add_chats(request, consultation_id):
    user = request.user
    consultation = get_object_or_404(Consultations, id=consultation_id)

    if user.is_doctor and consultation.doctor.id == user.id:
        sender = "doctor"
    elif consultation.patient.id == user.id:
        sender = "patient"
    else:
        return Response({"message": "Permission denied"}, status=status.HTTP_403_FORBIDDEN)
    
    # Handle media upload if media is provided
    media_url = None
    if 'media' in request.FILES:
        uploaded_media = request.FILES['media']
        try:
            # Upload the file to Cloudinary
            upload_result = cloudinary.uploader.upload(uploaded_media, folder='beta-lyfe/chats', resource_type='auto')
            media_url = upload_result['url']  # Get the URL of the uploaded media
        except Exception as e:
            return Response({"message": "Media upload failed", "error": str(e)},
                            status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    # New chat object structure
    new_chat = {
        "id": str(uuid.uuid4()),  # Generate a unique ID for the chat
        "content": request.data['content'],
        "media": [{"type": "image", "url": media_url}] if media_url else [],
        "sent_by": sender,  # Either "doctor" or "patient"
        "created_at": timezone.now().isoformat()  # Timestamp for when the chat was created
    }

    # Append the new chat to the existing chats list
    if consultation.chats:
        consultation.chats.append(new_chat)
    else:
        consultation.chats = [new_chat]  # Initialize if chats list is empty

    # Save the consultation object
    consultation.save()

    return Response({"message": "Chat added"}, status=status.HTTP_200_OK)

@api_view(['POST'])
@permission_classes([CustomIsAuthenticated])
def consultation_add_notes(request, consultation_id):
    user = request.user
    consultation = get_object_or_404(Consultations, id=consultation_id)

    if not user.is_doctor:
        return Response({"message": "Permission denied"}, status=status.HTTP_403_FORBIDDEN)
    if not consultation.doctor.id == user.id:
        return Response({"message": "Permission denied"}, status=status.HTTP_403_FORBIDDEN)
    
    new_note = {
        "id": str(uuid.uuid4()),
        "content": request.data['content'],
        "created_at": timezone.now().isoformat()
    }

    if consultation.doctor_notes:
        consultation.doctor_notes.append(new_note)
    else:
        consultation.doctor_notes = [new_note]

    consultation.save()

    return Response({"message": "Doctors notes added"}, status=status.HTTP_200_OK)


