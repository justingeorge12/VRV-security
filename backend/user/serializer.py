from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.exceptions import AuthenticationFailed
from .models import UserRole, Role
from rest_framework.serializers import ModelSerializer

class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        data = super().validate(attrs)
        user = self.user

        print(user, '-------------------------------------------------')
        
        request = self.context['request']
        role_request = request.data.get('role', None)
        
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