import { useState } from 'react';
import { useAuth } from '../context/AuthContext';

function LoginForm({ onSwitchToRegister }) {
    const { handleLogin } = useAuth();
    const [identifier, setIdentifier] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');
    const [loading, setLoading] = useState(false);

    const onSubmit = async (e) => {
        e.preventDefault();
        setErrorMsg('');
        setLoading(true);

        const result = await handleLogin(identifier, password);
        if (!result.success) {
            setErrorMsg(result.message);
        }
        setLoading(false);
    };

    return (
        <form onSubmit={onSubmit}>
            {errorMsg && <div className="alert-error">{errorMsg}</div>}

            <div className="form-group">
                <label htmlFor="login-identifier">Username or Email</label>
                <input
                    id="login-identifier"
                    type="text"
                    className="form-input"
                    placeholder="Enter username or email"
                    value={identifier}
                    onChange={(e) => setIdentifier(e.target.value)}
                    required
                />
            </div>

            <div className="form-group">
                <label htmlFor="login-password">Password</label>
                <div className="password-field">
                    <input
                        id="login-password"
                        type={showPassword ? 'text' : 'password'}
                        className="form-input"
                        placeholder="Enter password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <button
                        type="button"
                        className="password-toggle"
                        onClick={() => setShowPassword(!showPassword)}
                    >
                        {showPassword ? 'Hide' : 'Show'}
                    </button>
                </div>
            </div>

            <button type="submit" className="btn btn-primary" disabled={loading}>
                {loading ? 'Signing in…' : 'Sign In'}
            </button>

            <p className="auth-switch">
                Don&apos;t have an account?
                <button type="button" onClick={onSwitchToRegister}>Create one</button>
            </p>
        </form>
    );
}

function RegisterForm({ onSwitchToLogin }) {
    const { handleRegister } = useAuth();
    const [form, setForm] = useState({
        username: '',
        email: '',
        password: '',
        role: 'DEVELOPER',
    });
    const [showPassword, setShowPassword] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');
    const [loading, setLoading] = useState(false);

    const updateField = (field) => (e) => {
        setForm((prev) => ({ ...prev, [field]: e.target.value }));
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        setErrorMsg('');
        setLoading(true);

        const result = await handleRegister(form);
        if (!result.success) {
            setErrorMsg(result.message);
        }
        setLoading(false);
    };

    return (
        <form onSubmit={onSubmit}>
            {errorMsg && <div className="alert-error">{errorMsg}</div>}

            <div className="form-group">
                <label htmlFor="reg-username">Username</label>
                <input
                    id="reg-username"
                    type="text"
                    className="form-input"
                    placeholder="Choose a username"
                    value={form.username}
                    onChange={updateField('username')}
                    required
                />
            </div>

            <div className="form-group">
                <label htmlFor="reg-email">Email</label>
                <input
                    id="reg-email"
                    type="email"
                    className="form-input"
                    placeholder="you@company.com"
                    value={form.email}
                    onChange={updateField('email')}
                    required
                />
            </div>

            <div className="form-group">
                <label htmlFor="reg-role">Role</label>
                <select
                    id="reg-role"
                    className="form-select"
                    value={form.role}
                    onChange={updateField('role')}
                >
                    <option value="DEVELOPER">Developer</option>
                    <option value="QA">Quality Assurance</option>
                    <option value="MANAGER">Project Manager</option>
                </select>
            </div>

            <div className="form-group">
                <label htmlFor="reg-password">Password</label>
                <div className="password-field">
                    <input
                        id="reg-password"
                        type={showPassword ? 'text' : 'password'}
                        className="form-input"
                        placeholder="Minimum 8 characters"
                        value={form.password}
                        onChange={updateField('password')}
                        minLength={8}
                        required
                    />
                    <button
                        type="button"
                        className="password-toggle"
                        onClick={() => setShowPassword(!showPassword)}
                    >
                        {showPassword ? 'Hide' : 'Show'}
                    </button>
                </div>
            </div>

            <button type="submit" className="btn btn-primary" disabled={loading}>
                {loading ? 'Creating account…' : 'Create Account'}
            </button>

            <p className="auth-switch">
                Already have an account?
                <button type="button" onClick={onSwitchToLogin}>Sign in</button>
            </p>
        </form>
    );
}

function AuthPage() {
    const [mode, setMode] = useState('login');

    return (
        <div className="auth-page">
            <aside className="auth-brand">
                <div className="auth-brand-content">
                    <div className="auth-brand-logo">
                        <span>⚡</span>
                        CorpPM
                    </div>
                    <h1>Ship projects faster, together</h1>
                    <p>
                        Your team&apos;s command center for planning sprints, tracking deliverables,
                        and keeping every stakeholder aligned.
                    </p>
                    <div className="auth-brand-features">
                        <div className="auth-brand-feature">
                            <span className="auth-brand-feature-icon">📁</span>
                            Unified project portfolio
                        </div>
                        <div className="auth-brand-feature">
                            <span className="auth-brand-feature-icon">🎯</span>
                            Visual Kanban task boards
                        </div>
                        <div className="auth-brand-feature">
                            <span className="auth-brand-feature-icon">🔐</span>
                            Role-based access control
                        </div>
                    </div>
                </div>
            </aside>

            <main className="auth-panel">
                <div className="auth-card">
                    <div className="auth-card-header">
                        <h2>{mode === 'login' ? 'Welcome back' : 'Create your account'}</h2>
                        <p>
                            {mode === 'login'
                                ? 'Sign in to access your project workspace'
                                : 'Join your team and start collaborating'}
                        </p>
                    </div>

                    <div className="auth-tabs">
                        <button
                            type="button"
                            className={`auth-tab ${mode === 'login' ? 'active' : ''}`}
                            onClick={() => setMode('login')}
                        >
                            Sign In
                        </button>
                        <button
                            type="button"
                            className={`auth-tab ${mode === 'register' ? 'active' : ''}`}
                            onClick={() => setMode('register')}
                        >
                            Register
                        </button>
                    </div>

                    {mode === 'login' ? (
                        <LoginForm onSwitchToRegister={() => setMode('register')} />
                    ) : (
                        <RegisterForm onSwitchToLogin={() => setMode('login')} />
                    )}
                </div>
            </main>
        </div>
    );
}

export default AuthPage;
