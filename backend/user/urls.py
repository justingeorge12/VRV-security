from django.urls import path, include
from rest_framework_simplejwt.views import TokenRefreshView
from .views import CustomTokenObtainPairView
from rest_framework.routers import DefaultRouter
from .views import RoleViewSet

router = DefaultRouter()
router.register(r'roles', RoleViewSet, basename='role')

urlpatterns = [
    path('token', CustomTokenObtainPairView.as_view() , name='token'),
    path('token/refresh', TokenRefreshView.as_view(), name='refresh_token'),
    path('', include(router.urls)),
]
