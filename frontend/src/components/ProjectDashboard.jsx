import { useState, useEffect } from 'react';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';

function ProjectDashboard({ onSelectProject }) {
    const { handleLogout } = useAuth();

    const [projects, setProjects] = useState([]);
    const [fetchError, setFetchError] = useState('');
    const [newTitle, setNewTitle] = useState('');
    const [newDescription, setNewDescription] = useState('');
    const [createError, setCreateError] = useState('');

    useEffect(() => {
        let cancelled = false;

        const loadProjects = async () => {
            try {
                setFetchError('');
                const response = await api.get('/api/projects/');
                if (!cancelled) {
                    setProjects(response.data);
                }
            } catch {
                if (!cancelled) {
                    setFetchError('Failed to load project portfolio.');
                }
            }
        };

        loadProjects();
        return () => { cancelled = true; };
    }, []);

    const onCreateProject = async (e) => {
        e.preventDefault();
        setCreateError('');
        try {
            const response = await api.post('/api/projects/', {
                title: newTitle,
                description: newDescription,
            });
            setProjects((prev) => [response.data, ...prev]);
            setNewTitle('');
            setNewDescription('');
        } catch (error) {
            setCreateError(error.response?.data?.detail || 'Failed to create project.');
        }
    };

    return (
        <div className="app-shell">
            <header className="page-header">
                <div className="page-header-left">
                    <div className="page-header-logo">🏢</div>
                    <div className="page-header-info">
                        <h1>Corporate Dashboard</h1>
                        <p>Project Portfolio Overview</p>
                    </div>
                </div>
                <button type="button" className="btn btn-danger" onClick={handleLogout}>
                    Log Out
                </button>
            </header>

            <div className="page-content">
                <div className="card card-accent card-spaced">
                    <div className="card-body">
                        <h3 className="card-title">
                            <span className="card-title-icon">✨</span>
                            Create New Project
                        </h3>
                        {createError && <div className="alert-error">{createError}</div>}
                        <form onSubmit={onCreateProject}>
                            <div className="form-row">
                                <input
                                    type="text"
                                    className="form-input"
                                    placeholder="Project title"
                                    value={newTitle}
                                    onChange={(e) => setNewTitle(e.target.value)}
                                    required
                                />
                                <input
                                    type="text"
                                    className="form-input"
                                    placeholder="Description (optional)"
                                    value={newDescription}
                                    onChange={(e) => setNewDescription(e.target.value)}
                                />
                            </div>
                            <button type="submit" className="btn btn-primary btn-auto">
                                + Create Project
                            </button>
                        </form>
                    </div>
                </div>

                {fetchError && <div className="alert-error">{fetchError}</div>}

                {projects.length > 0 && (
                    <div className="section-header">
                        <span className="section-title">Your Projects</span>
                        <span className="stat-badge">{projects.length} active</span>
                    </div>
                )}

                {projects.length === 0 && !fetchError ? (
                    <div className="empty-state">
                        <div className="empty-state-icon">📂</div>
                        <p>No projects yet. Create your first project above.</p>
                    </div>
                ) : (
                    <div className="project-list">
                        {projects.map((project) => (
                            <div
                                key={project.id}
                                className="project-card"
                                onClick={() => onSelectProject(project)}
                                onKeyDown={(e) => e.key === 'Enter' && onSelectProject(project)}
                                role="button"
                                tabIndex={0}
                            >
                                <h3>{project.title}</h3>
                                <p>{project.description || 'No description provided.'}</p>
                                <span className="project-card-arrow">Open workspace →</span>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default ProjectDashboard;
