from django.shortcuts import render, get_object_or_404
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.exceptions import PermissionDenied
from rest_framework.response import Response
from rest_framework import status
import cloudinary.uploader
import uuid
from django.utils import timezone

from api.models import User
from consultation.models import Consultation_Request, Consultations
from consultation.serializer import ConsultationRequestSerializer, ConsultationSerializer


# Helper function
class CustomIsAuthenticated(IsAuthenticated):
    def has_permission(self, request, view):
        is_authenticated = super().has_permission(request, view)
        if not is_authenticated:
            raise PermissionDenied({
                'message': 'Authentication required',
            })
        return is_authenticated

@api_view(['GET', 'POST'])
@permission_classes([CustomIsAuthenticated])
def request_consultation(request):
    user = request.user

    if request.method == 'GET':
        if user.is_doctor:
            results = Consultation_Request.objects.filter(doctor=user)
        else:
            results = Consultation_Request.objects.filter(patient=user)

         # Handle case when there are no consultation requests
        if not results.exists():
            return Response({'message': 'No consultation requests found.'}, status=status.HTTP_200_OK)

        data = [ConsultationRequestSerializer(result).data for result in results]

        return Response({'message': 'Retrieved Consultations Successfully',
                         'data': data}, status=status.HTTP_200_OK)


    elif request.method == 'POST':

        if user.is_doctor:
            return Response({'message': 'Doctor cannot create a consultation request'}, status=status.HTTP_403_FORBIDDEN)

        data = request.data.copy()
        data['patient'] = request.user.id
        data['id'] = uuid.uuid4()

        print(data)

        serializer = ConsultationRequestSerializer(data=data)
        if serializer.is_valid():
            serializer.save()

            return Response({"message": "Consultation request created"}, status=status.HTTP_201_CREATED)
        # Return validation errors if any
        print(serializer.errors)
        return Response({'message': 'Missing a Required Field'}, status=status.HTTP_400_BAD_REQUEST)
    
    # Default response in case of any unforeseen methods
    return Response({'message': 'Method not allowed.'}, status=status.HTTP_405_METHOD_NOT_ALLOWED)


@api_view(['GET'])
@permission_classes([CustomIsAuthenticated])
def consultation_request_by_id(request, request_id):
    user = request.user
    consultation = get_object_or_404(Consultation_Request, id=request_id)

    if user.is_doctor and consultation.doctor.id != user.id:
        return Response({"message": f"Doctor {user.email} does Not have Permission to Access this Information"},
                        status=status.HTTP_403_FORBIDDEN)

    elif user.is_patient and consultation.patient.id != user.id:
        return Response({"message": f"Patient {user.email} does Not have Permission to Access this Information"},
                        status=status.HTTP_403_FORBIDDEN)

    return Response({'message': 'Succesfully Requested Consultation',
                     'data': ConsultationRequestSerializer(consultation).data},
                    status=status.HTTP_200_OK)


@api_view(['POST'])
@permission_classes([CustomIsAuthenticated])
def consultation_accept_request(request, request_id):
    user = request.user
    consultation = get_object_or_404(Consultation_Request, id=request_id)

    # Check if the user is a doctor
    if not user.is_doctor:
        return Response({"message": "Patients don't have permission to perform this action."},
                        status=status.HTTP_403_FORBIDDEN)

    # Check if the doctor matches the consultation request
    if consultation.doctor.id != user.id:
        return Response({"message": f"Doctor {user.email} does not have permission to access this information."},
                        status=status.HTTP_403_FORBIDDEN)

    # Check if the consultation status is 'Pending'
    if consultation.status != 'Pending':
        if consultation.status == 'Accept':
            return Response({"message": f"Doctor {user.email} has already accepted this request."},
                            status=status.HTTP_200_OK)
        elif consultation.status == 'Decline':
            return Response({"message": f"Doctor {user.email} has already declined this request."},
                            status=status.HTTP_200_OK)
        else:
            return Response({"message": "Invalid consultation status."},
                            status=status.HTTP_400_BAD_REQUEST)

    # Try to create a new consultation if everything is valid
    try:
        Consultations.objects.create(
            id = uuid.uuid4(),
            doctor=consultation.doctor,
            patient=consultation.patient
        )
        # Optionally, update the request status if needed
        consultation.status = 'Accept'
        consultation.save()

        return Response({"message": "Consultation created!"}, status=status.HTTP_201_CREATED)

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

    print(consultations)

    
    return Response({'message': 'Retrieved All Consultations Successfully',
                     'data': ConsultationSerializer(consultations, many=True).data},
                    status=status.HTTP_200_OK)



@api_view(['GET'])
@permission_classes([CustomIsAuthenticated])
def consultation_by_id(request, consultation_id):
    user = request.user
    consultation = get_object_or_404(Consultations, id=consultation_id)

    if user.is_doctor and consultation.doctor.id != user.id:
        return Response({"message": f"Doctor {user.email} does Not have Permission to Access this Information"},
                        status=status.HTTP_403_FORBIDDEN)

    elif not(user.is_doctor) and consultation.patient.id != user.id:
        return Response({"message": f"Patient {user.email} does Not have Permission to Access this Information"},
                        status=status.HTTP_403_FORBIDDEN)
    
    return Response(ConsultationSerializer(consultation).data,
                    status=status.HTTP_200_OK)


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

    return Response({"message": "Chat added successfully"}, status=status.HTTP_200_OK)


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

    return Response({"message": "Note added successfully"}, status=status.HTTP_200_OK)

