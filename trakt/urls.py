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
from django.conf.urls import url
from django.contrib import admin
from django.contrib.auth import views as auth_views
from main.views import home, forms
from main.views.api import tracks
from main.views.api.users import UserList, UserDetail, CurrentUser
from main.views.api.projects import ProjectList, ProjectDetail

urlpatterns = [
    url(r'^admin/', admin.site.urls),
    url(r'^login/$', auth_views.login, name='login'),
    url(r'^logout/$', auth_views.logout, {'next_page': '/'}, name='logout'),
    url(r'^$', home.home, name='home'),
    url(r'^submit/$', forms.submit_track, name='submit_track'),
    url(r'^newproject/$', forms.new_project, name='new_project'),

    url(r'^api/tracks/', tracks.TrackList.as_view()),
    url(r'^api/tracks/(?P<pk>[0-9]+)/$', tracks.TrackDetail.as_view()),
    url(r'^api/users/$', UserList.as_view()),
    url(r'^api/users/current/$', CurrentUser.as_view()),
    url(r'^api/users/(?P<pk>[0-9]+)/$', UserDetail.as_view()),
    url(r'^api/projects/$', ProjectList.as_view()),
    url(r'^api/projects/(?P<pk>[0-9]+)/$', ProjectDetail.as_view()),
]
