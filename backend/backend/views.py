from django.contrib.staticfiles.views import serve
from django.http import HttpResponse
from django.shortcuts import render

def index_view(request):
    return render(request, 'index.html')

def not_found_view(request, exception):
    return render(request, 'index.html')
