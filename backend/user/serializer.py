from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.exceptions import AuthenticationFailed
from rest_framework.serializers import ModelSerializer
from django.contrib.auth import get_user_model
from .models import *
from rest_framework import serializers
from adminapp.models import Product

class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        data = super().validate(attrs)
        user = self.user

        print(user, '-------------------------------------------------')
        
        request = self.context['request']
        role_request = request.data.get('role', None)

        print(role_request, '-----------------------------------------------')
        
        if role_request == 'admin' and user.is_superuser:
            data['role'] = 'admin'
            data['user_id'] = user.id
        else:
            user_roles = UserRole.objects.filter(user=user, role__name=role_request)
            
            if not user_roles.exists():
                raise AuthenticationFailed(f"User does not have the role '{role_request}'")
            
            if not user.is_active:
                raise AuthenticationFailed("User account is inactive.")
            
            data['role'] = role_request
        
        return data



class RoleSerializer(ModelSerializer):
    class Meta:
        model = Role
        fields = '__all__' 


class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = ['id', 'name', 'coins', 'image']


class UserCoinsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Users
        fields = ['coins']



Users = get_user_model()
class UserRegistrationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Users
        fields = ['email', 'password', 'first_name']
        extra_kwargs = {
            'password': {'write_only': True}
        }

    def create(self, validated_data):
        user = Users.objects.create_user(
            email=validated_data['email'],
            password=validated_data['password'],
            first_name=validated_data['first_name'],
        )

        role, created = Role.objects.get_or_create(name='user')
        UserRole.objects.create(user=user, role=role)

        return user