from django.urls import path
from . import views

urlpatterns = [
    path('', views.Home, name='home'),
    path('auth/register/', views.register, name='register'),
    path('auth/verify-email/', views.verify_email, name='verify-email'),
    path('auth/resend-verify-email/', views.resend_verify_email, name='verify-email'),
    path('auth/sign-in/', views.login, name='login'),
    path('logout/', views.logout, name='logout')
]