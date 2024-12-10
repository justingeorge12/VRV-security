
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import *


router = DefaultRouter()
router.register(r'roles', RoleViewSet, basename='role')
router.register(r'product', ProductViewSet, basename='product')

urlpatterns = [

    path('', include(router.urls)),

    path('register', RegisterUserView.as_view(), name='register'),
    path('register/<int:pk>', RegisterUserView.as_view(), name='register'),
    path('users', UserListView.as_view(), name='users'),
    path('blockuser/<int:pk>', BlockUserView.as_view(), name='blockuser'),
]