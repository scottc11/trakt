from django.contrib.auth.models import User
from django.shortcuts import get_object_or_404
from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.decorators import detail_route, list_route


from main.models.track import Track
from main.serializers import ActiveUserSerializer, UserSerializer


class UserViewSet(viewsets.ModelViewSet):
    """
    A viewset for viewing and editing user instances.
    """
    serializer_class = UserSerializer
    queryset = User.objects.all()

    @list_route(methods=['get'])
    def current(self, request):
        serializer = ActiveUserSerializer(request.user)
        return Response(serializer.data)
