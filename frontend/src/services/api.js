import axios from 'axios';

const API_BASE_URL = 'http://127.0.0.1:8000';

let onLogout = null;

const api = axios.create({
    baseURL: `${API_BASE_URL}/`,
    timeout: 5000,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    },
});

const refreshAccessToken = async (refreshToken) => {
    const res = await axios.post(`${API_BASE_URL}/api/auth/token/refresh/`, {
        refresh: refreshToken,
    });
    return res.data.access;
};

api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('access_token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error),
);

const handleUnauthorized = async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;

        try {
            const refreshToken = localStorage.getItem('refresh_token');
            if (refreshToken) {
                const access = await refreshAccessToken(refreshToken);
                localStorage.setItem('access_token', access);
                originalRequest.headers.Authorization = `Bearer ${access}`;
                return api(originalRequest);
            }
        } catch {
            localStorage.removeItem('access_token');
            localStorage.removeItem('refresh_token');
            if (onLogout) {
                onLogout();
            } else {
                window.location.reload();
            }
        }
    }

    return Promise.reject(error);
};

api.interceptors.response.use(
    (response) => response,
    (error) => handleUnauthorized(error),
);

export const setupResponseInterceptor = (logoutHandler) => {
    onLogout = logoutHandler;
};

export default api;
