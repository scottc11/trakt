from django.http import Http404
from django.contrib.auth.decorators import login_required

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from main.models.project import Project
from main.serializers import ProjectSerializer, SimpleProjectSerializer


class ProjectList(APIView):
    """
    List all projects, or create a new project.
    """

    def get(self, request, format=None):
        projects = Project.objects.filter(collaborators__id=request.user.id)
        serializer = SimpleProjectSerializer(projects, many=True)
        return Response(serializer.data)


class ProjectDetail(APIView):

    def get_object(self, pk):
        try:
            project = Project.objects.get(pk=pk)
            return project
        except Project.DoesNotExist:
            return Http404

    def get(self, request, pk, format=None):
        project = self.get_object(pk)
        serializer = ProjectSerializer(project)
        return Response(serializer.data)
