import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { productService } from '../services/productService';
import { shopService } from '../services/shopService';
import { useAuth } from '../context/AuthContext';
import { ShoppingCart, Zap, Heart, ShieldCheck } from 'lucide-react';

const ProductDetailPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { isAuthenticated } = useAuth();

    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isWishlisted, setIsWishlisted] = useState(false);

    useEffect(() => {
        const fetchDetails = async () => {
            try {
                const res = await productService.getProductById(id);
                setProduct(res.data);
                // In a real app, you'd also check if this product is in the user's wishlist here
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchDetails();
    }, [id]);

    const handleAddToCart = async () => {
        if (!isAuthenticated) return navigate('/login');
        try {
            await shopService.addToCart(product.id);
            alert("Added to cart!");
        } catch (err) {
            alert("Failed to add to cart");
        }
    };

    const handleWishlist = async () => {
        if (!isAuthenticated) return navigate('/login');
        try {
            const res = await shopService.toggleWishlist(product.id);
            setIsWishlisted(res.data.is_wishlisted);
        } catch (err) {
            console.error(err);
        }
    };

    if (loading) return <div className="p-20 text-center font-bold">Loading product details...</div>;
    if (!product) return <div className="p-20 text-center">Product not found.</div>;

    return (
        <div className="max-w-7xl mx-auto mt-4 bg-white p-6 shadow-sm flex flex-col md:flex-row gap-10">

            {/* LEFT: Image & Actions */}
            <div className="w-full md:w-2/5 flex flex-col items-center">
                <div className="relative border p-4 w-full flex justify-center group">
                    <img src={product.image_url} alt={product.model_name} className="h-[450px] object-contain transition-transform group-hover:scale-105" />
                    <button
                        onClick={handleWishlist}
                        className="absolute top-4 right-4 p-2 bg-white rounded-full shadow-md border"
                    >
                        <Heart size={20} fill={isWishlisted ? "red" : "none"} color={isWishlisted ? "red" : "gray"} />
                    </button>
                </div>

                <div className="flex gap-4 w-full mt-4">
                    <button
                        onClick={handleAddToCart}
                        className="flex-1 bg-fk-yellow text-white py-4 font-bold flex items-center justify-center gap-2 rounded-sm"
                    >
                        <ShoppingCart size={20} /> ADD TO CART
                    </button>
                    <button className="flex-1 bg-orange-600 text-white py-4 font-bold flex items-center justify-center gap-2 rounded-sm">
                        <Zap size={20} fill="white" /> BUY NOW
                    </button>
                </div>
            </div>

            {/* RIGHT: Specs & Details */}
            <div className="flex-1">
                <nav className="text-xs text-gray-500 mb-2">Home &gt; Mobiles &gt; {product.brand}</nav>
                <h1 className="text-xl font-medium mb-2">{product.brand} {product.model_name}</h1>

                <div className="flex items-center gap-4 mb-4">
                    <span className="text-3xl font-bold">₹{product.price.toLocaleString()}</span>
                    <span className="text-gray-500 line-through">₹{(product.price * 1.2).toFixed(0)}</span>
                    <span className="text-green-700 font-bold text-sm">20% off</span>
                </div>

                {/* Mobile Specs Section */}
                <div className="mt-8">
                    <h3 className="text-lg font-bold border-b pb-2 mb-4">Highlights</h3>
                    <ul className="space-y-3">
                        <li className="flex text-sm"><span className="w-32 text-gray-500">RAM | ROM</span> {product.ram} GB | {product.rom} GB</li>
                        <li className="flex text-sm"><span className="w-32 text-gray-500">Display</span> {product.screen_size} inch HD+</li>
                        <li className="flex text-sm"><span className="w-32 text-gray-500">Processor</span> {product.processor}</li>
                        <li className="flex text-sm"><span className="w-32 text-gray-500">Battery</span> {product.battery} mAh</li>
                        <li className="flex text-sm"><span className="w-32 text-gray-500">Network</span> {product.network_type}</li>
                    </ul>
                </div>

                <div className="mt-10 p-4 bg-blue-50 border border-blue-100 flex items-center gap-4">
                    <ShieldCheck size={40} className="text-fk-blue" />
                    <div>
                        <p className="font-bold text-sm">SellPhone Assured</p>
                        <p className="text-xs text-gray-500">100% Genuine product with easy 7-day returns.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetailPage;