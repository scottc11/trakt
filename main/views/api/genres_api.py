from django.http import Http404
from django.contrib.auth.decorators import login_required

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from main.models.genre import Genre
from main.serializers import GenreSerializer


class GenreList(APIView):
    """
    List all genres, or create a new genre.
    """

    def get(self, request, format=None):
        genres = Genre.objects.all()
        serializer = GenreSerializer(genres, many=True)
        return Response(serializer.data)

    def post(self, request, format=None):
        serializer = GenreSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class GenreDetail(APIView):
    """
    Retrieve, update or delete a genre.
    """
    def get_object(self, pk):
        try:
            genre = Genre.objects.get(pk=pk)
            return genre
        except Genre.DoesNotExist:
                return Http404

    def get(self, request, pk, format=None):
        genre = self.get_object(pk)
        serializer = GenreSerializer(genre)
        return Response(serializer.data)

    def put(self, request, pk, format=None):
        genre = self.get_object(pk)
        serializer = GenreSerializer(genre, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk, format=None):
        genre = self.get_object(pk)
        genre.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
