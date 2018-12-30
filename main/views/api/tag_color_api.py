from rest_framework import viewsets, permissions

from main.models import TagColor
from main.serializers import TagColorSerializer

class TagColorViewset(viewsets.ModelViewSet):
    queryset = TagColor.objects.all()
    serializer_class = TagColorSerializer
    permission_classes = (permissions.IsAuthenticated,)
