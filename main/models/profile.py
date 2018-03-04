from django.db import models
from django.contrib.auth.models import User
from django.db.models.signals import post_save
from django.dispatch import receiver


class Profile(models.Model):

    HEX_CODES = (
        ('#282C34', 'charleston'),
        ('#21252B', 'gunmetal'),
        ('#FF1053', 'light-red'),
        ('#FC7753', 'coral'),
        ('#5DA7E7', 'blue-jeans'),
        ('#00635D', 'rain-forest'),
        ('#A8ADBB', 'silver'),
        ('#08A4BD', 'blue-green'),
        ('#474b96', 'dark-blue'),
        ('#99c1a5', 'green'),
        ('#76c38d', 'sea-foam'),
    )

    user = models.OneToOneField(User, on_delete=models.CASCADE)
    bio = models.TextField(max_length=500, blank=True)
    location = models.CharField(max_length=30, blank=True)
    birth_date = models.DateField(null=True, blank=True)
    hex_code = models.CharField(max_length=10, blank=True, choices=HEX_CODES)

    def __str__(self):
        return self.user.username

@receiver(post_save, sender=User)
def create_user_profile(sender, instance, created, **kwargs):
    if created:
        Profile.objects.create(user=instance)

@receiver(post_save, sender=User)
def save_user_profile(sender, instance, **kwargs):
    instance.profile.save()
