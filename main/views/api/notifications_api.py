from django.contrib.auth.models import User
from django.shortcuts import get_object_or_404
from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.decorators import detail_route, list_route

from notifications.models import Notification
from main.serializers import NotificationSerializer


class NotificationViewSet(viewsets.ModelViewSet):
    """
    A viewset for viewing and editing notifications.
    """
    serializer_class = NotificationSerializer
    queryset = Notification.objects.all()
