
from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.generics import ListAPIView, UpdateAPIView

from .pagination import ListPagination
from .serializer import RegisterUserSerializer
from .permission import IsSuperUser
from user.models import *
from .serializer import *
# Create your views here.


class RoleViewSet(viewsets.ModelViewSet):
    permission_classes = [IsSuperUser]
    queryset = Role.objects.all()  
    serializer_class = RoleSerializer 




class RegisterUserView(APIView):
    permission_classes = [IsSuperUser]
    def post(self, request, *args, **kwargs):
        serializer = RegisterUserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"message": "User registered successfully"}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def patch(self, request, *args, **kwargs):
        user_id = kwargs.get('pk') 
        try:
            user = Users.objects.get(id=user_id)
        except Users.DoesNotExist:
            return Response({"error": "User not found"}, status=status.HTTP_404_NOT_FOUND)

        role_id = request.data.get("role")
        if role_id:
            try:
                role = Role.objects.get(id=role_id)
            except Role.DoesNotExist:
                return Response({"error": "Role not found"}, status=status.HTTP_404_NOT_FOUND)

            user_role, created = UserRole.objects.update_or_create(
                user=user,
                defaults={"role": role}
            )

        serializer = RegisterUserSerializer(user, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response({"message": "User updated successfully"}, status=status.HTTP_200_OK)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)





class UserListView(ListAPIView):
    permission_classes = [IsSuperUser]
    pagination_classes = ListPagination
    serializer_class = UserSerializer

    def get_queryset(self):
        queryset = Users.objects.filter(is_superuser=False).order_by('-id')
        search = self.request.query_params.get('search', None)
        if search:
            queryset = queryset.filter(first_name__icontains=search)
        return queryset
    


class BlockUserView(UpdateAPIView):
    queryset = Users.objects.all()
    serializer_class = UserSerializer
    permission_classes = [IsSuperUser]


    def patch(self, request, *args, **kwargs):
        user = self.get_object()
        user.is_active = not user.is_active
        user.save()

        status_message = "blocked" if user.is_active else "unblocked" 
        return Response({"message": f"User has been {status_message} successfully."},status=status.HTTP_200_OK)





class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all().order_by('-id')
    serializer_class = ProductSerializer
    permission_classes = [IsSuperUser]
    pagination_class = ListPagination
