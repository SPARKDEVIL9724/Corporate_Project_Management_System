from rest_framework.views import APIView
from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView
from rest_framework.response import Response
from rest_framework import status, permissions
from accounts.permissions import IsManagerOrReadOnly
from .models import Tasks
from .serializers import TaskSerializer
from django.db.models import Q

class TaskListCreateAPIView(ListCreateAPIView):

    permission_classes = [permissions.IsAuthenticated, IsManagerOrReadOnly]
    serializer_class = TaskSerializer

    def get_queryset(self):
        user = self.request.user
        project_id = self.request.query_params.get('project')

        if getattr(user, 'role', None) == 'MANAGER':
            queryset =  Tasks.objects.all()
        
        else:
            queryset = Tasks.objects.filter(Q(assignee=user) | Q(assignee__isnull=True))

        if project_id is not None:
            queryset = queryset.filter(project_id = project_id)

        return queryset
    # def get(self, request):
    #     tasks = Tasks.objects.all()
    #     serializer = TaskSerializer(tasks, many=True)
    #     return Response(serializer.data, status=status.HTTP_200_OK)

    # def post(self, request):
    #     serializer = TaskSerializer(data=request.data)
    #     if serializer.is_valid():
    #         serializer.save()
    #         return Response(serializer.data, status=status.HTTP_201_CREATED)

    #     return Response(serializer.error, status=status.HTTP_400_BAD_REQUEST)

class TaskDetailAPIView(RetrieveUpdateDestroyAPIView):
    queryset = Tasks.objects.all()
    serializer_class = TaskSerializer
    permission_classes = [permissions.IsAuthenticated, IsManagerOrReadOnly]
    lookup_field = 'id'

