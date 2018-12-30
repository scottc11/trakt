from django.http import Http404
from django.contrib.auth.decorators import login_required

from rest_framework import viewsets, permissions
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from main.models import Tag
from main.serializers import TagSerializer, TagCreateSerializer

class TagViewset(viewsets.ModelViewSet):
    queryset = Tag.objects.all()
    serializer_class = TagSerializer
    permission_classes = (permissions.IsAuthenticated,)

    def create(self, request, *args, **kwargs):
        serializer = TagCreateSerializer(data=request.data)
        if serializer.is_valid():
            color_id = int(request.data['color']) # this is bullshit
            serializer.save(color_id=color_id)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
