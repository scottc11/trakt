from django.shortcuts import render, get_object_or_404
from django.http import HttpResponseRedirect
from django.core.urlresolvers import reverse
from django.contrib.auth.decorators import login_required
from django.contrib import admin
from main.forms.track_form import TrackSubmition



@login_required(login_url="/login/")
def home(request):
    context = {'user': request.user}
    return render(request, 'home/home.html', context)



@login_required(login_url="/login/")
def submit_track(request):

    if request.method == 'POST':
        form = TrackSubmition(request.POST, request.FILES)

        if form.is_valid():
            track = form.save(commit=False)
            track.submitter = request.user
            track.save()
            return HttpResponseRedirect(reverse('home'))

    # if a GET or invalid form --> create a blank form
    else:
        form = TrackSubmition()

    return render(request, 'forms/submit_track.html', {'form': form})
