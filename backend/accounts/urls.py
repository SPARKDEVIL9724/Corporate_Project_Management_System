from django.urls import path
from .views import RegisterView, LoginView, MeView

urlpatterns = [
    path('api/auth/register/', RegisterView.as_view(), name='auth-register'),
    path('api/auth/login/', LoginView.as_view(), name='auth-login'),
    path('api/auth/me/', MeView.as_view(), name='auth-me'),
]
