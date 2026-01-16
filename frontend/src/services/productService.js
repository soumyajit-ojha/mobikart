import api from './api';

export const productService = {
    // Public Discovery
    getFilterOptions: () => api.get('/products/filter-options'),

    // searchParams is an object like { brand: ['Apple'], ram: [8], max_price: 50000 }
    searchProducts: (searchParams) => api.get('/products/search', { params: searchParams }),

    getProductDetails: (id) => api.get(`/products/${id}`),

    // Seller Only Endpoints
    getMyInventory: () => api.get('/products/my-inventory'),

    addMobile: (formData) => api.post('/products/add', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
    }),

    updateMobile: (id, formData) => api.put(`/products/update/${id}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
    }),

    // Soft Delete (Sets is_active to false in DB)
    deleteMobile: (id) => api.delete(`/products/delete/${id}`),

    // Hard Delete (Deletes from DB and S3)
    hardDeleteMobile: (id) => api.delete(`/products/hard-delete/${id}`),
};