import { useState, useEffect, useCallback } from 'react';
import api from '../services/api';

function TaskWorkspace({ project, onBack }) {
    const [tasks, setTasks] = useState([]);
    const [taskError, setTaskError] = useState('');

    const [taskTitle, setTaskTitle] = useState('');
    const [taskDescription, setTaskDescription] = useState('');
    const [taskPriority, setTaskPriority] = useState('MEDIUM');
    const [createError, setCreateError] = useState('');

    const fetchTasks = useCallback(async () => {
        try {
            setTaskError('');
            const response = await api.get(`/api/tasks/?project=${project.id}`);
            setTasks(response.data);
        } catch {
            setTaskError('Failed to load tasks for this project.');
        }
    }, [project.id]);

    useEffect(() => {
        fetchTasks();
    }, [fetchTasks]);

    const onCreateTask = async (e) => {
        e.preventDefault();
        setCreateError('');

        try {
            const response = await api.post('/api/tasks/', {
                title: taskTitle,
                description: taskDescription,
                priority: taskPriority,
                status: 'TODO',
                project: project.id,
            });

            setTasks((prev) => [...prev, response.data]);
            setTaskTitle('');
            setTaskDescription('');
            setTaskPriority('MEDIUM');
        } catch (error) {
            setCreateError(error.response?.data?.detail || 'Failed to create task.');
        }
    };

    const onUpdateTaskStatus = async (taskId, newStatus) => {
        try {
            const response = await api.patch(`/api/tasks/${taskId}/`, {
                status: newStatus,
            });

            setTasks((prev) =>
                prev.map((task) => (task.id === taskId ? response.data : task)),
            );
        } catch {
            alert('You do not have permission to update this task.');
        }
    };

    const onUpdateTaskAssignee = async (taskId, userId) => {
        try {
            const assigneeValue = userId === '' ? null : parseInt(userId, 10);

            const response = await api.patch(`/api/tasks/${taskId}/`, {
                assignee: assigneeValue,
            });

            setTasks((prev) =>
                prev.map((task) => (task.id === taskId ? response.data : task)),
            );
        } catch {
            alert('Assignee must be a verified project member.');
        }
    };

    const priorityClass = (priority) => {
        if (priority === 'LOW') return 'low';
        if (priority === 'HIGH') return 'high';
        return 'medium';
    };

    const renderTaskCard = (task) => {
        const teamMembers = project.members || [];

        return (
            <div key={task.id} className="task-card">
                <h5 className="task-card-title">{task.title}</h5>
                <p className="task-card-desc">{task.description || 'No description.'}</p>

                <div className="task-card-meta">
                    <div className="task-field">
                        <label htmlFor={`status-${task.id}`}>Status</label>
                        <select
                            id={`status-${task.id}`}
                            value={task.status}
                            onChange={(e) => onUpdateTaskStatus(task.id, e.target.value)}
                        >
                            <option value="TODO">To Do</option>
                            <option value="IN_PROGRESS">In Progress</option>
                            <option value="DONE">Done</option>
                        </select>
                    </div>

                    <div className="task-field">
                        <label htmlFor={`assignee-${task.id}`}>Assignee</label>
                        <select
                            id={`assignee-${task.id}`}
                            value={task.assignee?.id || task.assignee || ''}
                            onChange={(e) => onUpdateTaskAssignee(task.id, e.target.value)}
                        >
                            <option value="">Unassigned</option>
                            {teamMembers.map((member) => (
                                <option key={member.id} value={member.id}>
                                    {member.username} ({member.role})
                                </option>
                            ))}
                        </select>
                    </div>

                    <span className={`priority-badge ${priorityClass(task.priority)}`}>
                        {task.priority}
                    </span>
                </div>
            </div>
        );
    };

    const columns = [
        { key: 'TODO', label: 'To Do', className: 'todo', icon: '📥' },
        { key: 'IN_PROGRESS', label: 'In Progress', className: 'progress', icon: '⚡' },
        { key: 'DONE', label: 'Done', className: 'done', icon: '✅' },
    ];

    const taskCount = tasks.length;

    return (
        <div className="app-shell">
            <header className="page-header">
                <div className="page-header-left">
                    <div className="page-header-logo">📋</div>
                    <div className="page-header-info">
                        <button type="button" className="back-link" onClick={onBack}>
                            ← Back to Projects
                        </button>
                        <h1>{project.title}</h1>
                        <p>Task Board &amp; Workloads</p>
                    </div>
                </div>
                <span className="stat-badge accent">{taskCount} tasks</span>
            </header>

            <div className="page-content">
                <div className="card card-accent-amber card-spaced">
                    <div className="card-body">
                        <h3 className="card-title">
                            <span className="card-title-icon">➕</span>
                            Add Task
                        </h3>
                        {createError && <div className="alert-error">{createError}</div>}
                        <form onSubmit={onCreateTask}>
                            <div className="form-row">
                                <input
                                    type="text"
                                    className="form-input"
                                    placeholder="Task title"
                                    value={taskTitle}
                                    onChange={(e) => setTaskTitle(e.target.value)}
                                    required
                                />
                                <select
                                    className="form-select narrow"
                                    value={taskPriority}
                                    onChange={(e) => setTaskPriority(e.target.value)}
                                >
                                    <option value="LOW">Low Priority</option>
                                    <option value="MEDIUM">Medium Priority</option>
                                    <option value="HIGH">High Priority</option>
                                </select>
                            </div>
                            <div className="form-row">
                                <input
                                    type="text"
                                    className="form-input"
                                    placeholder="Description (optional)"
                                    value={taskDescription}
                                    onChange={(e) => setTaskDescription(e.target.value)}
                                />
                                <button type="submit" className="btn btn-success">
                                    + Add Task
                                </button>
                            </div>
                        </form>
                    </div>
                </div>

                {taskError && <div className="alert-error">{taskError}</div>}

                <div className="kanban-board">
                    {columns.map(({ key, label, className, icon }) => (
                        <div key={key} className={`kanban-column ${className}`}>
                            <div className="kanban-column-header">
                                <span>
                                    <span className="kanban-column-icon">{icon}</span>
                                    {label}
                                </span>
                                <span className="kanban-count">
                                    {tasks.filter((t) => t.status === key).length}
                                </span>
                            </div>
                            <div className="kanban-tasks">
                                {tasks
                                    .filter((t) => t.status === key)
                                    .map((task) => renderTaskCard(task))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default TaskWorkspace;
