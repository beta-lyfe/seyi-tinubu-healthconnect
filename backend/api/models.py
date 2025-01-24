from django.db import models
from django.contrib.auth.models import AbstractUser
from .managers import CustomUserManager

# Create your models here.
class User(AbstractUser):
    id = models.UUIDField(primary_key=True)
    email = models.EmailField(unique=True)
    username = models.CharField(max_length=100, blank=True)
    is_doctor = models.BooleanField(default=False)

    is_staff = models.BooleanField(default=False)
    verified = models.BooleanField(default=False)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

    objects = CustomUserManager()

    def __str__(self) -> str:
        return self.email

# This is to store every email verification key issued 
class EmailVerication_Keys(models.Model):
    id = models.UUIDField(primary_key=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='keys')
    key = models.CharField(max_length=100)
    exp = models.DateTimeField()

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)


# This is to store every password reset token issued
class PasswordReset_keys(models.Model):
    id = models.UUIDField(primary_key=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='pwd_keys')
    key = models.CharField(max_length=100)
    exp = models.DateTimeField()

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

class Waitlist(models.Model):
    id = models.UUIDField(primary_key=True)
    email = models.EmailField(unique=True)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

