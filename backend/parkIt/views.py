from django.shortcuts import render
from django.http import Http404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework import generics
from rest_framework.decorators import permission_classes, authentication_classes
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.authentication import TokenAuthentication
from rest_framework.authtoken.models import Token
from django.contrib.auth import login, logout
from django.contrib.auth.models import User
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
from django.middleware.csrf import get_token
from django.db.models import F


from parkIt.serializers import PostSerializer, UserSerializer, FavoritePostSerializer
from parkIt.models import Post, FavoritePost
from .utils import send_contact_email

class GetCsrf(APIView):

    def get(request):
        csrf_token = get_token(request)
        return Response({'csrf_token': csrf_token})

#LOGIN/LOGOUT/REGISTRATION/CHECK AUTH
class LoginView(ObtainAuthToken):

    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data, context={'request': request})
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']
        login(request, user)
        token, created = Token.objects.get_or_create(user=user)
        

        return Response({'token': token.key, 'user_id': user.id})


class LogoutView(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def post(self, request):
        logout(request)
        return Response(status=status.HTTP_200_OK)
    
class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = self.perform_create(serializer)
        login(self.request, user)
        token, created = Token.objects.get_or_create(user=user)
        headers = self.get_success_headers(serializer.data)
        return Response({'token': token.key, 'user_id': user.id}, status=status.HTTP_201_CREATED, headers=headers)
    
    def perform_create(self, serializer):
        return serializer.save()


class CheckAuthView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        return Response(status=status.HTTP_200_OK)




# Create your views here.
class GetRoutes(APIView):
    def get(self, request):
        routes = [
            '/api/posts/'
        ]
        return Response(routes)


class PostList(APIView):

    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]
    def get(self, request):
        #search_query = request.GET.get('search') if request.GET.get('search') != None else ''

        posts = Post.objects.all()

        serializer = PostSerializer(posts, many=True)
        return Response(serializer.data)
    
    def post(self, request):
        
        user = self.request.user

        # Create a mutable copy of the QueryDict
        mutable_data = request.data.copy()
        # Modify the mutable copy
        mutable_data['creator'] = user.id

        serializer = PostSerializer(data=mutable_data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    

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
        try:
            post = Post.objects.get(id=pk)
        except Post.DoesNotExist:
            return Response({'error': 'Post not found'}, status=status.HTTP_404_NOT_FOUND)

        # Check if the user is the creator of the post
        if request.user != post.creator:
            return Response({'error': 'Permission denied'}, status=status.HTTP_403_FORBIDDEN)

        post.delete()
        return Response({'message': 'Post deleted successfully'}, status=status.HTTP_204_NO_CONTENT)
    
    def post(self, request):
        serializer = PostSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status= status.HTTP_201_CREATED)
        return Response(serializer.errors, status= status.HTTP_400_BAD_REQUEST)


class ToggleFavoritePostView(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def post(self, request, post_id):

        try:
            post = Post.objects.get(pk=post_id)
            favorite_post, created = FavoritePost.objects.get_or_create(user=request.user, post=post)

            if not created:
                favorite_post.delete()
            
            serializer = FavoritePostSerializer(favorite_post)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Post.DoesNotExist:
            return Response({'error': 'Post not found'}, status=status.HTTP_404_NOT_FOUND)
        
class FavoritePostListView(APIView):
    serializer_class = FavoritePostSerializer
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request):
        favorite_posts = FavoritePost.objects.filter(user=self.request.user)
        serializer = self.serializer_class(favorite_posts, many=True)

        # Flatten the structure to directly get the data inside the 'post' field
        flattened_data = [item['post'] for item in serializer.data]

        return Response(flattened_data)
    

class ContactEmailView(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def post(self, request, post_id):
        post = Post.objects.get(pk=post_id)

        creator_email = post.creator_email
        user = self.request.user
        user_email = user.email

        send_contact_email(post, creator_email, user_email)

        return Response({'status': 'success'}, status=status.HTTP_200_OK)

