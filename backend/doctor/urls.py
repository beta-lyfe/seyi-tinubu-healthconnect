from django.urls import path, include
from . import views

urlpatterns = [
    path('', views.get_doctors, name='doctors'),
    path('<str:id>', views.get_doctor_profile_id, name='doctor-profile-id'),
    path('profile/', views.get_or_update_doctor, name='get-edit-profile'),
]

