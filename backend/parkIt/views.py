from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from parkIt.serializers import PostSerializer
from parkIt.models import Post


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


