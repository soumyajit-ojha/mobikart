import api from './api';

export const userService = {
    register: (data) => api.post('/auth/register', data),
    login: (data) => api.post('/auth/login', data),
    getProfile: () => api.get('/user/profile'),
    updateProfile: (data) => api.put('/user/profile', data),
    deleteAccount: () => api.delete('/auth/delete-account'),

    // Address methods
    getAddresses: () => api.get('/user/addresses'),
    addAddress: (data) => api.post('/user/address', data),
    deleteAddress: (id) => api.delete(`/user/address/${id}`),
};