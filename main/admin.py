from django.contrib import admin
from .models.track import Track
from .models.genre import Genre
from .models.key import Key
from .models.stage import Stage

# Register your models here.
admin.site.register(Track)
admin.site.register(Genre)
admin.site.register(Key)
admin.site.register(Stage)
