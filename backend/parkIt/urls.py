from django.urls import path
from . import views


urlpatterns = [
    path('', views.GetRoutes.as_view(), name='get-api-routes'),
    path('posts/', views.PostList.as_view(), name='post-list'),
    path('posts/<str:pk>/', views.PostDetail.as_view(), name='post-detail'),
]

