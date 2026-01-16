import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { productService } from '../services/productService';
import { shopService } from '../services/shopService';
import { useAuth } from '../context/AuthContext';
import { ShoppingCart, Heart, Zap, ShieldCheck } from 'lucide-react';

const ProductDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { isLoggedIn } = useAuth();

    const [product, setProduct] = useState(null);
    const [isInCart, setIsInCart] = useState(false);
    const [isWishlisted, setIsWishlisted] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadData = async () => {
            try {
                // 1. Load Product Specs
                const prodRes = await productService.getProductDetails(id);
                setProduct(prodRes.data);

                // 2. If logged in, check if it's already in Cart or Wishlist
                if (isLoggedIn) {
                    const [cartRes, wishRes] = await Promise.all([
                        shopService.getCart(),
                        shopService.getWishlist()
                    ]);

                    // Check cart status
                    const inCart = cartRes.data.items.some(item => item.product_id === parseInt(id));
                    setIsInCart(inCart);

                    // Check wishlist status
                    const inWish = wishRes.data.some(item => item.product_id === parseInt(id));
                    setIsWishlisted(inWish);
                }
            } catch (err) {
                console.error("Error loading product details:", err);
            } finally {
                setLoading(false);
            }
        };
        loadData();
    }, [id, isLoggedIn]);

    const handleAddToCart = async () => {
        if (!isLoggedIn) {
            alert("Please login to add items to cart");
            return navigate('/login');
        }
        try {
            await shopService.addToCart({ product_id: product.id, quantity: 1 });
            setIsInCart(true); // Switch button to "GO TO CART"
        } catch (err) {
            alert("Failed to add to cart");
        }
    };

    const handleWishlistToggle = async () => {
        if (!isLoggedIn) {
            return navigate('/login');
        }
        try {
            const res = await shopService.toggleWishlist(product.id);
            setIsWishlisted(res.data.is_wishlisted); // Response from backend toggle API
        } catch (err) {
            console.error("Wishlist error:", err);
        }
    };

    if (loading) return (
        <div className="flex justify-center items-center h-96">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-fk-blue"></div>
        </div>
    );

    if (!product) return <div className="p-20 text-center">Product not found.</div>;

    return (
        <div className="flex flex-col md:flex-row bg-white p-4 md:p-8 mt-4 gap-10 shadow-sm relative">

            {/* LEFT SIDE: Images and Actions */}
            <div className="w-full md:w-2/5 flex flex-col items-center">
                <div className="relative border p-4 w-full flex justify-center group">
                    <img src={product.image_url} className="h-[400px] object-contain transition-transform group-hover:scale-105" alt={product.model_name} />

                    {/* Wishlist Heart Icon */}
                    <button
                        onClick={handleWishlistToggle}
                        className="absolute top-4 right-4 p-2 bg-white rounded-full shadow-md border hover:scale-110 transition-transform"
                    >
                        <Heart
                            size={24}
                            fill={isWishlisted ? "#ff4343" : "none"}
                            color={isWishlisted ? "#ff4343" : "#dbdbdb"}
                        />
                    </button>
                </div>

                <div className="flex gap-4 w-full mt-4">
                    {isInCart ? (
                        <button
                            onClick={() => navigate('/cart')}
                            className="flex-1 bg-fk-blue py-4 font-bold text-white flex justify-center gap-2 items-center rounded-sm"
                        >
                            <ShoppingCart size={20} /> GO TO CART
                        </button>
                    ) : (
                        <button
                            onClick={handleAddToCart}
                            className="flex-1 bg-fk-yellow py-4 font-bold text-white flex justify-center gap-2 items-center rounded-sm"
                        >
                            <ShoppingCart size={20} /> ADD TO CART
                        </button>
                    )}

                    <button className="flex-1 bg-orange-600 py-4 font-bold text-white flex justify-center gap-2 items-center rounded-sm">
                        <Zap size={20} fill="white" /> BUY NOW
                    </button>
                </div>
            </div>

            {/* RIGHT SIDE: Product Info */}
            <div className="flex-1">
                <nav className="text-xs text-gray-500 mb-2">Home &gt; Mobiles &gt; {product.brand}</nav>
                <h1 className="text-xl font-medium mb-1">{product.brand} {product.model_name}</h1>

                <div className="flex items-center gap-2 mb-4">
                    <span className="bg-green-700 text-white text-xs px-2 py-0.5 rounded-sm flex items-center gap-1">
                        4.4 ★
                    </span>
                    <span className="text-gray-500 font-bold text-sm">1,245 Ratings & 156 Reviews</span>
                </div>

                <div className="flex items-baseline gap-4 mb-4">
                    <span className="text-3xl font-bold">₹{product.price.toLocaleString()}</span>
                    <span className="text-gray-500 line-through">₹{(product.price * 1.2).toLocaleString()}</span>
                    <span className="text-green-700 font-bold">20% off</span>
                </div>

                {/* Specs Table */}
                <div className="mt-8">
                    <h3 className="text-lg font-bold border-b pb-2 mb-4">Highlights</h3>
                    <ul className="list-disc ml-4 space-y-2 text-sm text-gray-700">
                        <li>{product.ram} GB RAM | {product.rom} GB ROM</li>
                        <li>{product.screen_size} inch Display</li>
                        <li>{product.processor} Processor</li>
                        <li>{product.battery} mAh Battery</li>
                        <li>{product.network_type} Network Connectivity</li>
                    </ul>
                </div>

                <div className="mt-10 p-4 bg-gray-50 border rounded-sm flex items-center gap-4">
                    <ShieldCheck size={40} className="text-fk-blue" />
                    <div>
                        <p className="font-bold text-sm italic">SellPhone Assured</p>
                        <p className="text-xs text-gray-500">Quality products, fast delivery, and easy returns.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;