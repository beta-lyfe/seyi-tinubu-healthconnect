from django.contrib import admin
from django.urls import path, include
from django.conf.urls.static import static
from django.conf import settings
from .views import index_view

urlpatterns = [
    path('', index_view),
    path('admin/', admin.site.urls),
    path('api/auth/', include('dj_rest_auth.urls')),
    path('api/', include('api.urls')),
    path('api/patients/', include('patient.urls')),
    path('api/doctors/', include('doctor.urls')),
    path('api/consultation/', include('consultation.urls'))
]

handler404 = 'backend.views.not_found_view'
