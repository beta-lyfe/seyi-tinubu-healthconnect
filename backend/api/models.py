from django.db import models
from django.contrib.auth.models import AbstractUser
from .managers import CustomUserManager

# Create your models here.
class User(AbstractUser):
    email = models.EmailField(unique=True)
    username = models.CharField(max_length=100, blank=True, null=True)
    first_name = models.CharField(max_length=255)
    last_name = models.CharField(max_length=255)
    other_name = models.CharField(max_length=255, null=True, blank=True)
    is_staff = models.BooleanField(default=False)
    verified = models.BooleanField(default=False)
    doctor = models.BooleanField(default=False)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['first_name', 'last_name']

    objects = CustomUserManager()

    def __str__(self) -> str:
        return self.email

# This is to store every email verification key issued 
class EmailVerication_Keys(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='keys')
    key = models.CharField(max_length=100)
    exp = models.DateTimeField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)


# This is to store every password reset token issued
class PasswordReset_keys(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='pwd_keys')
    key = models.CharField(max_length=100)
    exp = models.DateTimeField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
