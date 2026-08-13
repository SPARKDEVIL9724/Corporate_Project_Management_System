import api from './api';

const storeTokens = (data) => {
    if (data.access_token) {
        localStorage.setItem('access_token', data.access_token);
    }
    if (data.refresh_token) {
        localStorage.setItem('refresh_token', data.refresh_token);
    }
    if (data.access) {
        localStorage.setItem('access_token', data.access);
    }
    if (data.refresh) {
        localStorage.setItem('refresh_token', data.refresh);
    }
};

const authService = {
    login: async (identifier, password) => {
        const response = await api.post('/api/auth/login/', { identifier, password });
        storeTokens(response.data);
        return response.data;
    },

    register: async ({ username, email, password, role }) => {
        const response = await api.post('/api/auth/register/', {
            username,
            email,
            password,
            role,
        });
        return response.data;
    },

    logout: () => {
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
    },
};

export default authService;
