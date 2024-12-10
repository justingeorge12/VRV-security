from rest_framework.serializers import ModelSerializer
from rest_framework import serializers
from user.models import Users, UserRole, Role
from .models import *


class RoleSerializer(ModelSerializer):
    class Meta:
        model = Role
        fields = '__all__' 



class RegisterUserSerializer(serializers.ModelSerializer):
    role = serializers.PrimaryKeyRelatedField(queryset=Role.objects.all(), write_only=True)

    class Meta:
        model = Users
        fields = ['email', 'password', 'role', 'first_name', 'coins']
        extra_kwargs = {
            'password': {'write_only': True}, 
        }

    def create(self, validated_data):
        role = validated_data.pop('role')

        user = Users.objects.create_user(
            email=validated_data['email'],
            password=validated_data['password'],
            first_name=validated_data['first_name'],
            coins = validated_data['coins']
        )

        user.username = validated_data.get('email') 
        user.save()

        UserRole.objects.create(user=user, role=role)

        return user



class UserSerializer(serializers.ModelSerializer):
    role = serializers.SerializerMethodField()

    class Meta:
        model = Users
        fields = ["id", "first_name", "email", "date_joined", "is_active", "role", 'coins']

    def get_role(self, obj):
        user_roles = UserRole.objects.filter(user=obj)
        if user_roles.exists():
            return [
                {"id": user_role.role.id, "name": user_role.role.name}
                for user_role in user_roles
            ]
        return []
    


class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = '__all__'
