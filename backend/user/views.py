from django.shortcuts import render
from rest_framework_simplejwt.views import TokenObtainPairView
from .serializer import CustomTokenObtainPairSerializer
from .models import Role
from rest_framework import viewsets
from .serializer import RoleSerializer
# Create your views here.




class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer


class RoleViewSet(viewsets.ModelViewSet):
    queryset = Role.objects.all()  
    serializer_class = RoleSerializer 