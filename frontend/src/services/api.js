import axios from 'axios';

// Use relative /api for Vercel Proxy (Production) or direct IP for local
const api = axios.create({
    baseURL: import.meta.env.MODE === 'production' ? '/api' : import.meta.env.VITE_API_URL,
    paramsSerializer: {
        indexes: null, // by default arrays are serialized as brand[]=Apple, this changes it to brand=Apple
    }
});

// Interceptor: Automatically injects 'user-id' into every request header
api.interceptors.request.use((config) => {
    const userId = localStorage.getItem('userId');
    if (userId) {
        config.headers['user-id'] = userId;
    }
    return config;
});

export default api;