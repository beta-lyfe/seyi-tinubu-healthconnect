from django.db import models
from api.models import User


class Consultations(models.Model):
    id = models.UUIDField(primary_key=True)
    doctor_notes = models.JSONField(null=True, blank=True)
    chats = models.JSONField(null=True, blank=True)
    doctor = models.ForeignKey(User, on_delete=models.CASCADE, related_name='doctor_consultations')
    patient = models.ForeignKey(User, on_delete=models.CASCADE, related_name='patient_consultations')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)


class Consultation_Request(models.Model):
    class Status(models.TextChoices):
        ACCEPT = 'Accept', 'A'
        PENDING = 'Pending', 'P'
        DECLINE = 'Decline', 'D'

    id = models.UUIDField(primary_key=True)
    patient = models.OneToOneField(User, on_delete=models.CASCADE, related_name='patient_consultation_requests')
    doctor = models.OneToOneField(User, on_delete=models.CASCADE, related_name='doctor_consultation_requests')
    message = models.TextField()
    status = models.CharField(max_length=100, choices=Status.choices, default=Status.PENDING)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)




