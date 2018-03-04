from django.http import Http404
from django.contrib.auth.decorators import login_required

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from main.models.status import Status
from main.serializers import StatusSerializer


class StatusList(APIView):
    """
    List all status_list, or create a new status.
    """

    def get(self, request, format=None):
        status_list = Status.objects.all()
        serializer = StatusSerializer(status_list, many=True)
        return Response(serializer.data)

    def post(self, request, format=None):
        serializer = StatusSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class StatusDetail(APIView):
    """
    Retrieve, update or delete a status.
    """
    def get_object(self, pk):
        try:
            status = Status.objects.get(pk=pk)
            return status
        except Status.DoesNotExist:
            return Http404

    def get(self, request, pk, format=None):
        status = self.get_object(pk)
        serializer = StatusSerializer(status)
        return Response(serializer.data)

    def put(self, request, pk, format=None):
        status = self.get_object(pk)
        serializer = StatusSerializer(status, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk, format=None):
        status = self.get_object(pk)
        status.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
