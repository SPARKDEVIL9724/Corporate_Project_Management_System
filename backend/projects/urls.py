from django.urls import path
from .views import ProjectListCreateAPIView, ProjectDetailAPIView

urlpatterns =[
    path('api/projects/', ProjectListCreateAPIView.as_view(), name='project-list-create'),
    path('api/projects/<int:id>/', ProjectDetailAPIView.as_view(), name='project-detail'),
    
]