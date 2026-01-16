import React from 'react';
import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
    return (
        <Link to={`/product/${product.id}`} className="product-card block hover:shadow-lg transition-shadow">
            <img src={product.image_url || 'https://via.placeholder.com/150'} alt={product.model_name} className="product-image" />
            <div className="text-center p-2">
                <h3 className="text-sm font-medium truncate">{product.model_name}</h3>
                <p className="text-green-700 text-xs font-bold mt-1">From ₹{product.price.toLocaleString()}</p>
                <p className="text-gray-500 text-[10px] truncate">{product.brand}</p>
            </div>
        </Link>
    );
};

export default ProductCard;