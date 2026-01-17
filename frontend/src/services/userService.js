import api from './api';

export const userService = {
    login: (credentials) => api.post('/auth/login', credentials),
    register: (data) => api.post('/auth/register', data),
    getProfile: () => api.get('/user/profile'),
    updateProfile: (data) => api.put('/user/profile', data),
    updateProfilePic: (formData) => api.put('/user/profile/picture', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
    }),
    getAddresses: () => api.get('/user/addresses'),
    addAddress: (data) => api.post('/user/address', data),
    deleteAddress: (id) => api.delete(`/user/address/${id}`),
    logout: () => api.post('/auth/logout'),
    deleteAccount: () => api.delete('/auth/delete-account'),
};