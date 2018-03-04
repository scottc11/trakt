from django.contrib import admin
from .models.profile import Profile
from .models.track import Track
from .models.track_file import TrackFile
from .models.track_session import TrackSession
from .models.genre import Genre
from .models.key import Key
from .models.status import Status
from .models.project import Project

class TrackAdmin(admin.ModelAdmin):
    prepopulated_fields = {'slug': ('title',)}

# Register your models here.
admin.site.register(Track, TrackAdmin)
admin.site.register(Genre)
admin.site.register(Key)
admin.site.register(Status)
admin.site.register(Project)
admin.site.register(Profile)
admin.site.register(TrackFile)
admin.site.register(TrackSession)
