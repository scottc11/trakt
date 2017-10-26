from django.shortcuts import render, get_object_or_404
from django.core.urlresolvers import reverse
from django.contrib.auth.decorators import login_required
from django.contrib import admin

@login_required(login_url="/login/")
def home(request):
    context = {'user': request.user}
    return render(request, 'home/home.html', context)
