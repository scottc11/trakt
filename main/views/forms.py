from django.shortcuts import render, get_object_or_404
from django.http import HttpResponseRedirect
from django.core.urlresolvers import reverse
from django.contrib.auth.decorators import login_required
from django.contrib import admin
from main.models.track import Track
from main.forms.track_form import TrackSubmition
from main.forms.project_form import NewProject

@login_required(login_url="/login/")
def submit_track(request):

    if request.method == 'POST':
        form = TrackSubmition(request.POST, request.FILES)

        if form.is_valid():
            track = form.save(commit=False)
            track.submitter = request.user
            track.save()
            form.save_m2m()
            return HttpResponseRedirect(reverse('home'))


    # if a GET or invalid form --> create a blank form
    else:
        form = TrackSubmition()

    return render(request, 'forms/submit_track.html', {'form': form})


@login_required(login_url="/login/")
def edit_track(request, pk):

    if request.method == 'POST':
        track = Track.objects.get(pk=pk)
        form = TrackSubmition(request.POST, request.FILES, instance=track)

        if form.is_valid():
            track = form.save()
            return HttpResponseRedirect(reverse('home'))

    # if a GET or invalid form --> create a blank form
    else:
        track = Track.objects.get(pk=pk);
        form = TrackSubmition(instance=track)

        # to add more to exclude, comma seperate field names in string => 'audiofile,key,genre'
        exclude = 'audio_file'
        return render(request, 'forms/submit_track.html', {'form': form, 'exclude': exclude})


@login_required(login_url="/login/")
def new_project(request):
    if request.method == 'POST':
        form = NewProject(request.POST)

        if form.is_valid():
            form.save()
            return HttpResponseRedirect(reverse('home'))

    else:
        form = NewProject()

    return render(request, 'forms/new_project.html', { 'form': form })
