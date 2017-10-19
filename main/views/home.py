from django.shortcuts import render, get_object_or_404
from django.contrib import admin

def home(request):
    return render(request, 'home/home.html')
