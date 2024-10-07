from rest_framework import serializers
from consultation.models import Consultation_Request, Consultations


class ConsultationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Consultations
        fields = '__all__'

class ConsultationRequestSerializer(serializers.ModelSerializer):
    class Meta:
        model = Consultation_Request
        fields = '__all__'

