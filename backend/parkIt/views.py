from django.shortcuts import render
from django.http import Http404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.authtoken.models import Token
from django.contrib.auth import login, logout
from parkIt.serializers import PostSerializer

from parkIt.models import Post


#LOGIN/LOGOUT/REGISTRATION


# Create your views here.
class GetRoutes(APIView):
    def get(self, request):
        routes = [
            '/api/posts/'
        ]
        return Response(routes)



class PostList(APIView):

    def get(self, request):
        #search_query = request.GET.get('search') if request.GET.get('search') != None else ''

       
        posts = Post.objects.all()

        serializer = PostSerializer(posts, many=True)
        return Response(serializer.data)

class PostDetail(APIView):

    def get_object(self, pk):
        try:
            return Post.objects.get(pk=pk)
        except Post.DoesNotExist:
            raise Http404
    
    def get(self, request, pk):
        post = self.get_object(pk)
        serializer = PostSerializer(post)
        return Response(serializer.data)
    
    def delete(self, request, pk):
        post = self.get_object(pk)
        post.delete()
        return Response(status= status.HTTP_204_NO_CONTENT)
    
    def post(self, request):
        serializer = PostSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status= status.HTTP_201_CREATED)
        return Response(serializer.errors, status= status.HTTP_400_BAD_REQUEST)



