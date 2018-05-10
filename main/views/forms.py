
from django.conf import settings
from django.shortcuts import render, get_object_or_404
from django.http import HttpResponseRedirect, JsonResponse
from django.core.urlresolvers import reverse
from django.contrib.auth.decorators import login_required
from django.contrib import admin, messages

from google.cloud import storage

from main.models.track import Track
from main.models.project import Project
from main.forms.track_form import TrackSubmition
from main.forms.track_file_form import TrackFileSubmition
from main.forms.session_upload_form import SessionUpload
from main.forms.project_form import NewProject
from main.forms.genre_form import NewGenre
from main.forms.key_form import NewKey
from main.forms.status_form import NewStatus

@login_required(login_url="/login/")
def submit_track(request):

    if request.method == 'POST':
        form = TrackSubmition(request.POST, user=request.user)

        if form.is_valid():
            track = form.save(commit=False)
            track.submitter = request.user
            track.save()
            form.save_m2m()
            messages.success(request, "Your data has been saved!")
            return HttpResponseRedirect(reverse('upload_file', kwargs={'pk': track.id }))
        else:
            raise ValueError('A very specific bad thing happened.')

    # if a GET or invalid form --> create a blank form
    else:
        form = TrackSubmition(user=request.user)

    return render(request, 'forms/submit_track.html', {'form': form})


#---------------------------------------------------------------
#                UPLOAD FILE TO TRACK OBJECT
#---------------------------------------------------------------
def upload_file(request, pk):
    track = Track.objects.get(pk=pk)

    if request.method == 'POST':
        form = TrackFileSubmition(request.POST)

        if form.is_valid():
            file = form.save(commit=False)
            file.file.name = request.POST.get('file_path')
            file.save()
            messages.success(request, "File Successfully Uploaded")
            return HttpResponseRedirect(reverse('home'))
    else:
        form = TrackFileSubmition(initial={'track': track})

    return render(request, 'forms/upload_file.html', { 'track': track, 'form': form })


#---------------------------------------------------------------
#                UPLOAD SESSION FOLDER .zip FILE TO TRACK OBJECT
#---------------------------------------------------------------

def upload_session(request, pk):
    track = Track.objects.get(pk=pk)

    if request.method == 'POST':
        form = SessionUpload(request.POST)

        if form.is_valid():
            file = form.save(commit=False)
            file.file.name = request.POST.get('file_path')
            file.save()
            messages.success(request, "File Successfully Uploaded")
            return HttpResponseRedirect(reverse('home'))
    else:
        form = SessionUpload(initial={'track': track})

    return render(request, 'forms/upload_session.html', { 'track': track, 'form': form })




@login_required(login_url="/login/")
def edit_track(request, pk):

    if request.method == 'POST':
        track = Track.objects.get(pk=pk)

        # DELETE
        if 'delete' in request.POST:
            track.delete()
            return HttpResponseRedirect(reverse('home'))

        # EDIT
        if 'submit' in request.POST:
            form = TrackSubmition(request.POST, request.FILES, instance=track, user=request.user)

            if form.is_valid():
                track = form.save()
                return HttpResponseRedirect(reverse('home'))

    # if a GET or invalid form --> create a blank form
    else:
        track = Track.objects.get(pk=pk);
        form = TrackSubmition(instance=track, user=request.user)
        return render(request, 'forms/submit_track.html', {'form': form, 'edit': True })


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


@login_required(login_url="/login/")
def edit_project(request, pk):
    if request.method == 'POST':
        project = Project.objects.get(pk=pk)

        if 'delete' in request.POST:
            project.delete()
            return HttpResponseRedirect(reverse('home'))

        if 'submit' in request.POST:
            form = NewProject(data=request.POST, instance=project)

            if form.is_valid():
                form.save()
                return HttpResponseRedirect(reverse('home'))

    else:
        project = Project.objects.get(pk=pk)
        form = NewProject(instance=project)
        edit = True
        return render(request, 'forms/new_project.html', { 'form': form, 'edit': edit })



@login_required(login_url="/login/")
def new_genre(request):
    if request.method == 'POST':
        form = NewGenre(request.POST)

        if form.is_valid():
            genre = form.save()
            next = request.POST.get('next', '/')
            message = 'Created new genre: ' + '"' + genre.label + '"'
            messages.add_message(request, messages.INFO, message)
            return HttpResponseRedirect(next)

    else:
        form = NewGenre()

    return render(request, 'forms/generic_form.html', { 'form': form, 'form_title': 'New Genre' })


@login_required(login_url="/login/")
def new_key(request):
    if request.method == 'POST':
        form = NewKey(request.POST)

        if form.is_valid():
            key = form.save()
            next = request.POST.get('next', '/')
            message = 'Created new key: ' + '"' + key.label + '"'
            messages.add_message(request, messages.INFO, message)
            return HttpResponseRedirect(next)

    else:
        form = NewKey()

    return render(request, 'forms/generic_form.html', { 'form': form, 'form_title': 'New Key' })


@login_required(login_url="/login/")
def new_status(request):
    if request.method == 'POST':
        form = NewStatus(request.POST)

        if form.is_valid():
            status = form.save()
            next = request.POST.get('next', '/')
            message = 'Created new status: ' + '"' + status.label + '"'
            messages.add_message(request, messages.INFO, message)
            return HttpResponseRedirect(next)

    else:
        form = NewStatus()

    return render(request, 'forms/generic_form.html', { 'form': form, 'form_title': 'New Status' })
