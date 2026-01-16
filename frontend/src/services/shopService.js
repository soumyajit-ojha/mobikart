import api from './api';

export const shopService = {
    // Wishlist (Toggle logic: Adds if absent, removes if present)
    toggleWishlist: (productId) => api.post(`/shop/wishlist/toggle/${productId}`),
    getWishlist: () => api.get('/shop/wishlist'),

    // Cart Management
    getCart: () => api.get('/shop/cart'),

    // data: { product_id: number, quantity: number }
    addToCart: (data) => api.post('/shop/cart/add', data),

    // item_id is the ID of the CartItem record
    removeFromCart: (itemId) => api.delete(`/shop/cart/item/${itemId}`),
};