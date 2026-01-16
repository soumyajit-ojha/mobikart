import api from './api';

export const userService = {
    // Auth Logic
    register: (data) => api.post('/auth/register', data),
    login: (data) => api.post('/auth/login', data),
    logout: () => api.post('/auth/logout'),
    deleteAccount: () => api.delete('/auth/delete-account'),

    // Personal Info
    getProfile: () => api.get('/user/profile'),
    updateProfile: (data) => api.put('/user/profile', data),

    // S3 Profile Picture Upload (Multipart/Form-Data)
    updateProfilePic: (formData) => api.put('/user/profile/picture', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
    }),

    // Address Management
    getAddresses: () => api.get('/user/addresses'),
    addAddress: (data) => api.post('/user/address', data),
    deleteAddress: (id) => api.delete(`/user/address/${id}`),
};