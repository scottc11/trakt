from django.contrib import admin
from .models import Profile, Track, TrackFile, TrackSession, Genre, Key, Status, Project, Tag, TagColor

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
admin.site.register(Tag)
admin.site.register(TagColor)
