from django.urls import path, include
from . import views

urlpatterns = [
    path('', views.get_patients, name='patients'),
    path('<str:id>', views.get_patient_profile_id, name='patient-profile-id'),
    path('profile/', views.get_or_update_patient, name='get-edit-profile'),
]

