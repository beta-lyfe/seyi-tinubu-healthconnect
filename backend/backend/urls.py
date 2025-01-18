from django.contrib import admin
from django.urls import path, include
from django.conf.urls.static import static
from django.conf import settings
from .views import index_view
from drf_spectacular.views import SpectacularAPIView, SpectacularSwaggerView

urlpatterns = [
    path('', index_view),
    path('admin/', admin.site.urls),
    # path('api/auth/2/', include('dj_rest_auth.urls')),
    path('api/', include('api.urls')),
    path('api/patients/', include('patient.urls')),
    path('api/doctors/', include('doctor.urls')),
    path('api/consultation/', include('consultation.urls')),
    path('api/schema/', SpectacularAPIView.as_view(), name="schema"),
    path('api/docs', SpectacularSwaggerView.as_view(url_name="schema")),
]

handler404 = 'backend.views.not_found_view'
