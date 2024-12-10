from django.urls import path, include
from rest_framework_simplejwt.views import TokenRefreshView
from rest_framework.routers import DefaultRouter
from .views import *

router = DefaultRouter()
router.register(r'productslist', ProductListViewSet, basename="products")

urlpatterns = [
    path('', include(router.urls)),

    path('token', CustomTokenObtainPairView.as_view() , name='token'),
    path('token/refresh', TokenRefreshView.as_view(), name='refresh_token'),
    path('logout',Logout.as_view(), name='logout' ),
    path('userroles', UserRoleViewSet.as_view(), name='userroles'),
    path('usercoins', UserCoinDetail.as_view(), name='usercoins'),
    path('userregister', UserRegistrationView.as_view(), name='userregistration'),
]
