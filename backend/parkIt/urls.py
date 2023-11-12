from django.urls import path
from . import views


urlpatterns = [
    path('', views.GetRoutes.as_view(), name='get-api-routes'),
    path('posts/', views.PostList.as_view(), name='post-list'),
    path('posts/<str:pk>/', views.PostDetail.as_view(), name='post-detail'),
    path('login/', views.LoginView.as_view(), name='login'),
    path('logout/', views.LogoutView.as_view(), name='logout'),
    path('register/', views.RegisterView.as_view(), name='register'),
    path('check-auth/', views.CheckAuthView.as_view(), name='check-auth'),
    path('get-csrf-token/', views.GetCsrf.as_view(), name='get_csrf_token'),
    path('toggle-favorite/<int:post_id>/', views.ToggleFavoritePostView.as_view(), name='toggle-favorite'),
]

