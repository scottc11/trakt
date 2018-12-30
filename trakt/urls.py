
from django.conf.urls import url, include
from django.contrib import admin
from django.contrib.auth import views as auth_views
from rest_framework.routers import DefaultRouter
import notifications.urls

from main.views import home, forms, auth
from main.views.api.tracks_api import TrackViewset, TrackDetail
from main.views.api.files_api import TrackFileList, TrackFileDetail, TrackFileViewSet
from main.views.api.genres_api import GenreList, GenreDetail
from main.views.api.keys_api import KeyList, KeyDetail
from main.views.api.users_api import UserViewSet
from main.views.api.projects import ProjectList, ProjectDetail
from main.views.api import TagViewset, TagColorViewset, NotificationViewSet, StatusList, StatusDetail
from main.views.signed_urls import get_signed_url

# API routes
router = DefaultRouter()
router.register(r'audiofiles', TrackFileViewSet, base_name='audiofile')
router.register(r'notifications', NotificationViewSet, base_name='notification')
router.register(r'tags', TagViewset)
router.register(r'tagcolors', TagColorViewset)
router.register(r'tracks', TrackViewset, base_name='track')
router.register(r'users', UserViewSet, base_name='user')

urlpatterns = [
    url(r'^admin/', admin.site.urls),
    url(r'^login/$', auth_views.login, name='login'),
    url(r'^logout/$', auth_views.logout, {'next_page': '/'}, name='logout'),
    url(r'^signup/$', auth.signup_view, name='signup'),
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
    url(r'^status/new/$', forms.new_status, name='new_key'),

    url(r'^api/files/$', TrackFileList.as_view()),
    url(r'^api/files/(?P<pk>[0-9]+)/$', TrackFileDetail.as_view()),
    url(r'^api/genres/$', GenreList.as_view()),
    url(r'^api/genres/(?P<pk>[0-9]+)/$', GenreDetail.as_view()),
    url(r'^api/keys/$', KeyList.as_view()),
    url(r'^api/keys/(?P<pk>[0-9]+)/$', KeyDetail.as_view()),
    url(r'^api/projects/$', ProjectList.as_view()),
    url(r'^api/projects/(?P<pk>[0-9]+)/$', ProjectDetail.as_view()),
    url(r'^api/status/$', StatusList.as_view()),
    url(r'^api/status/(?P<pk>[0-9]+)/$', StatusDetail.as_view()),

    url(r'^api/', include(router.urls)),

    url('^inbox/notifications/', include(notifications.urls, namespace='notifications')),
    # Catch All other url routes for react-router
]
