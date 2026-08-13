from django.urls import path
from .views import TaskDetailAPIView,TaskListCreateAPIView


urlpatterns =[
    path('api/tasks/', TaskListCreateAPIView.as_view(), name='task-list-create'),
    path('api/tasks/<int:id>/', TaskDetailAPIView.as_view(), name='task-detail'),
    
]