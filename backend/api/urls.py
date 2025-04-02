from django.urls import path
from . import views

urlpatterns = [
    path('auth/sign-up', views.RegisterView.as_view(), name='register'),
    path('dev/user', views.devs, name='register-dev'),
    path('auth/verify-email', views.verify_email, name='verify-email'),
    path('auth/resend-verify-email', views.ResendVerifyEmail.as_view(), name='resend-verify-email'),
    path('waitlist', views.waitlist, name='waitlist'),
    path('auth/sign-in', views.login, name='login'),
    path('auth/logout', views.logout, name='logout'),
    path('auth/delete', views.delete_user, name='delete'),
    path('auth/forget-password', views.ForgetPassword.as_view(), name='forget-password'),
    path('auth/forget-password/<str:uid>/<str:otp>', views.confirm_forget_password, name='forget-password'),
]


