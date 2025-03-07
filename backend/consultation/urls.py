from django.urls import path
from . import views

urlpatterns = [
    path('', views.user_consultation, name='user-consultation'),
    path('request', views.request_consultation, name='request-consultation'),
    path('request/<str:request_id>', views.consultation_request_by_id, name='consultation-request-by-id'),
    path('request/<str:request_id>/accept', views.consultation_accept_request, name='accept-consultation-request'),
    path('<str:consultation_id>', views.consultation_by_id, name='consultation-by-id'),
    path('<str:consultation_id>/chat', views.consultation_add_chats, name='consultation-chat'),
    path('<str:consultation_id>/note', views.consultation_add_notes, name='consultation-note'),
    path('<str:consultation_id>/access-token', views.consultation_access_token, name='consultation-access-token')
]
