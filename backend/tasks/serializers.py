from rest_framework import serializers
from .models import Tasks

class TaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tasks
        fields = [
            'id', 'title', 'description', 'status',
            'priority', 'due_date', 'created_at',
            'project', 'assignee'
        ]
        read_only_fields = ['id', 'created_at']

    def validate(self, data):

        project = data.get('project')
        assignee = data.get('assignee')

        if not project and self.instance:
            project = self.instance.project
    
        if not assignee and self.instance:
            assignee = self.instance.assignee

        if project and assignee:
            if hasattr(project, 'members') and not project.members.filter(id=assignee.id).exists():
                raise serializers.ValidationError({
                    "assignee" : "This assigned user must be a member of the selected project"
                })

        return data

        