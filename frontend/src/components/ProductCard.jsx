import React from 'react';

const ProductCard = ({ product }) => {
    return (
        <div className="product-card">
            <img src={product.image_url || 'https://via.placeholder.com/150'} alt={product.model_name} className="product-image" />
            <div className="text-center">
                <h3 className="text-sm font-medium truncate">{product.model_name}</h3>
                <p className="text-green-700 text-xs font-bold mt-1">From ₹{product.price}</p>
                <p className="text-gray-500 text-[10px] truncate">{product.brand}</p>
            </div>
        </div>
    );
};

export default ProductCard;