import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
    return (
        <Link to={`/product/${product.id}`} className="bg-white p-4 shadow-sm hover:shadow-md transition-shadow group">
            <div className="h-48 flex justify-center mb-4 overflow-hidden">
                <img src={product.image_url} alt={product.model_name} className="h-full object-contain group-hover:scale-105 transition-transform" />
            </div>
            <h3 className="font-semibold text-sm line-clamp-2 mb-1">{product.brand} {product.model_name}</h3>
            <p className="text-green-700 font-bold">₹{product.price.toLocaleString()}</p>
            <p className="text-gray-400 text-xs mt-2 uppercase">{product.ram} GB RAM</p>
        </Link>
    );
};

export default ProductCard;