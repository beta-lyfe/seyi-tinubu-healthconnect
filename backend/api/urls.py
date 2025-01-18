from django.urls import path
from . import views

urlpatterns = [
    path('auth/sign-up/', views.RegisterView.as_view(), name='register'),
    path('auth/verify-email/', views.verify_email, name='verify-email'),
    path('auth/resend-verify-email/', views.resend_verify_email, name='verify-email'),
    path('auth/sign-in/', views.login, name='login'),
    path('logout/', views.logout, name='logout'),
    path('delete/', views.delete_user, name='delete'),
]
