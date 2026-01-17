import api from './api';

export const shopService = {
    // Cart Actions
    getCart: () => api.get('/shop/cart'),
    addToCart: (productId, quantity = 1) => api.post('/shop/cart/add', { product_id: productId, quantity }),
    removeFromCart: (itemId) => api.delete(`/shop/cart/item/${itemId}`),

    // Wishlist Actions
    toggleWishlist: (productId) => api.post(`/shop/wishlist/toggle/${productId}`),
    getWishlist: () => api.get('/shop/wishlist'),
};