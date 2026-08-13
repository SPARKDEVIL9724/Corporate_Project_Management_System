import { useState } from 'react';
import { useAuth } from './context/AuthContext';
import AuthPage from './components/AuthPage';
import ProjectDashboard from './components/ProjectDashboard';
import TaskWorkspace from './components/TaskWorkspace';

function App() {
    const { isAuthenticated } = useAuth();

    const [selectedProject, setSelectedProject] = useState(() => {
        const savedProject = localStorage.getItem('active_project_workspace');
        return savedProject ? JSON.parse(savedProject) : null;
    });

    const handleSetWorkspace = (project) => {
        if (project) {
            localStorage.setItem('active_project_workspace', JSON.stringify(project));
            setSelectedProject(project);
        } else {
            localStorage.removeItem('active_project_workspace');
            setSelectedProject(null);
        }
    };

    if (!isAuthenticated) {
        return <AuthPage />;
    }

    if (selectedProject === null) {
        return (
            <ProjectDashboard
                onSelectProject={(project) => handleSetWorkspace(project)}
            />
        );
    }

    return (
        <TaskWorkspace
            project={selectedProject}
            onBack={() => handleSetWorkspace(null)}
        />
    );
}

export default App;
