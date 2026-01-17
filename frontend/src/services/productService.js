import api from './api';

export const productService = {
    getProducts: (params) => api.get('/products/search', { params }),
    getFilterOptions: () => api.get('/products/filter-options'),
    getProductById: (id) => api.get(`/products/${id}`),
    addMobile: (formData) => api.post('/products/add', formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    }),
    getMyInventory: () => api.get('/products/my-inventory'),
};

// MISSED_CONTENT might need to add the GET /my-inventory endpoint to your Backend products.py later if you haven't
// yet. It should filter by current_seller.id.)