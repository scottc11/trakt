"""trakt URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/1.11/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  url(r'^$', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  url(r'^$', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.conf.urls import url, include
    2. Add a URL to urlpatterns:  url(r'^blog/', include('blog.urls'))
"""
from django.conf.urls import url, include
from django.contrib import admin
from django.contrib.auth import views as auth_views
from rest_framework.routers import DefaultRouter

from main.views import home, forms
from main.views.api.tracks_api import TrackList, TrackDetail
from main.views.api.files_api import TrackFileList, TrackFileDetail
from main.views.api.genres_api import GenreList, GenreDetail
from main.views.api.keys_api import KeyList, KeyDetail
from main.views.api.users_api import UserViewSet
from main.views.api.projects import ProjectList, ProjectDetail
from main.views.api.status_api import StatusList, StatusDetail
from main.views.signed_urls import get_signed_url

router = DefaultRouter()
router.register(r'users', UserViewSet, base_name='user')

urlpatterns = [
    url(r'^admin/', admin.site.urls),
    url(r'^login/$', auth_views.login, name='login'),
    url(r'^logout/$', auth_views.logout, {'next_page': '/'}, name='logout'),
    url(r'^$', home.home, name='home'),

    url(r'^track/submit/$', forms.submit_track, name='submit_track'),
    url(r'^track/submit/sign_url/$', get_signed_url, name='get_signed_url'),
    url(r'^track/upload/(?P<pk>[0-9]+)/$', forms.upload_file, name='upload_file'),
    url(r'^track/upload/session/(?P<pk>[0-9]+)/$', forms.upload_session, name='upload_session'),
    url(r'^track/edit/(?P<pk>[0-9]+)/$', forms.edit_track, name='edit_track'),

    url(r'^project/new/$', forms.new_project, name='new_project'),
    url(r'^project/edit/(?P<pk>[0-9]+)/$', forms.edit_project, name='edit_project'),
    url(r'^genre/new/$', forms.new_genre, name='new_genre'),
    url(r'^key/new/$', forms.new_key, name='new_key'),

    url(r'^api/files/$', TrackFileList.as_view()),
    url(r'^api/files/(?P<pk>[0-9]+)/$', TrackFileDetail.as_view()),
    url(r'^api/genres/$', GenreList.as_view()),
    url(r'^api/genres/(?P<pk>[0-9]+)/$', GenreDetail.as_view()),
    url(r'^api/keys/$', KeyList.as_view()),
    url(r'^api/keys/(?P<pk>[0-9]+)/$', KeyDetail.as_view()),
    url(r'^api/tracks/$', TrackList.as_view()),
    url(r'^api/tracks/(?P<pk>[0-9]+)/$', TrackDetail.as_view()),
    url(r'^api/projects/$', ProjectList.as_view()),
    url(r'^api/projects/(?P<pk>[0-9]+)/$', ProjectDetail.as_view()),
    url(r'^api/status/$', StatusList.as_view()),
    url(r'^api/status/(?P<pk>[0-9]+)/$', StatusDetail.as_view()),

    url(r'^api/', include(router.urls)),
    # Catch All other url routes for react-router
]
