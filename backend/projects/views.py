from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView
from rest_framework import status, permissions
from accounts.permissions import IsManagerOrReadOnly
from .models import Project
from .serializers import ProjectSerializer


class ProjectListCreateAPIView(ListCreateAPIView):

    # queryset = Project.objects.all()
    permission_classes = [permissions.IsAuthenticated, IsManagerOrReadOnly]
    serializer_class = ProjectSerializer

    def get_queryset(self):
        user = self.request.user
        if getattr(user, 'role', None) == 'MANAGER':
            return Project.objects.all()
        return (Project.objects.filter(members=user))

    def perform_create(self, serializer):
        project = serializer.save(creator=self.request.user)
        project.members.add(self.request.user)
    

class ProjectDetailAPIView(RetrieveUpdateDestroyAPIView):

    queryset = Project.objects.all()
    serializer_class = ProjectSerializer
    permission_classes = [permissions.IsAuthenticated, IsManagerOrReadOnly]
    lookup_field = 'id'