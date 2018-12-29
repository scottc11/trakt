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

    def list(self, request):
        queryset = Notification.objects.filter(recipient_id=self.request.user.id)[:5]
        serializer = NotificationSerializer(queryset, many=True)
        return Response(serializer.data)
