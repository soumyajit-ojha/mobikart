import { useEffect, useState } from 'react';
import AccountLayout from '../components/AccountLayout';
import { shopService } from '../services/shopService';
import { Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';

const WishlistPage = () => {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);

    const loadWishlist = async () => {
        const res = await shopService.getWishlist();
        setItems(res.data);
        setLoading(false);
    };

    useEffect(() => { loadWishlist(); }, []);

    const handleRemove = async (productId) => {
        await shopService.toggleWishlist(productId);
        loadWishlist();
    };

    if (loading) return <AccountLayout>Loading...</AccountLayout>;

    return (
        <AccountLayout>
            <h2 className="text-xl font-bold mb-8">My Wishlist ({items.length})</h2>

            {items.length === 0 ? (
                <div className="text-center py-20">
                    <p className="text-gray-400">Your wishlist is empty!</p>
                </div>
            ) : (
                <div className="divide-y border-t">
                    {items.map(item => (
                        <div key={item.id} className="flex gap-6 py-6 group relative">
                            <img src={item.product.image_url} className="w-24 h-32 object-contain" />
                            <div className="flex-1">
                                <Link to={`/product/${item.product_id}`} className="font-bold hover:text-fk-blue transition-colors">
                                    {item.product.brand} {item.product.model_name}
                                </Link>
                                <div className="mt-2 flex items-center gap-2">
                                    <span className="bg-green-700 text-white text-[10px] px-1 rounded-sm">4.4★</span>
                                    <span className="text-gray-400 text-xs">(12,450)</span>
                                </div>
                                <p className="text-xl font-bold mt-4">₹{item.product.price.toLocaleString()}</p>
                            </div>
                            <button
                                onClick={() => handleRemove(item.product_id)}
                                className="text-gray-300 hover:text-red-600 transition-colors p-2"
                            >
                                <Trash2 size={20} />
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </AccountLayout>
    );
};

export default WishlistPage;