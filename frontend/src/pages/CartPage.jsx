import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { shopService } from '../services/shopService';
import { Trash2, ShoppingBag, ShieldCheck } from 'lucide-react';

const CartPage = () => {
    const [cart, setCart] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const loadCart = async () => {
        try {
            const res = await shopService.getCart();
            setCart(res.data);
        } catch (err) {
            console.error("Cart Error:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { loadCart(); }, []);

    const handleRemove = async (itemId) => {
        if (window.confirm("Remove this item from cart?")) {
            await shopService.removeFromCart(itemId);
            loadCart();
        }
    };

    if (loading) return <div className="p-20 text-center font-bold">Loading Cart...</div>;

    if (!cart || cart.items.length === 0) return (
        <div className="bg-white m-10 p-20 text-center shadow-sm rounded-sm">
            <img src="https://rukminim2.flixcart.com/www/800/800/promos/16/05/2019/d438a32e-765a-4d8b-b4a6-520b560971e8.png" className="w-64 mx-auto mb-6" alt="empty" />
            <h2 className="text-xl font-bold">Your cart is empty!</h2>
            <p className="text-gray-500 text-sm mb-6">Add items to it now.</p>
            <Link to="/" className="bg-fk-blue text-white px-16 py-3 font-bold uppercase rounded-sm shadow-md">Shop Now</Link>
        </div>
    );

    return (
        <div className="max-w-7xl mx-auto p-4 flex flex-col lg:flex-row gap-4 items-start">
            {/* Left: Item List */}
            <div className="flex-1 bg-white shadow-sm rounded-sm">
                <div className="p-4 border-b font-bold text-lg">My Cart ({cart.items.length})</div>

                {cart.items.map(item => (
                    <div key={item.id} className="p-6 border-b flex flex-col md:flex-row gap-6 hover:bg-gray-50 transition-colors">
                        <div className="w-24 h-32 flex-shrink-0">
                            <img src={item.product?.image_url} className="w-full h-full object-contain" alt="mobile" />
                        </div>
                        <div className="flex-1">
                            <h3 className="text-lg font-medium">{item.product_name_snapshot}</h3>
                            <p className="text-sm text-gray-400 mt-1">Seller: SellPhone Assured</p>
                            <div className="mt-4 flex items-center gap-3">
                                <span className="text-gray-400 line-through text-sm">₹{(item.price_at_addition * 1.2).toLocaleString()}</span>
                                <span className="text-2xl font-bold">₹{item.price_at_addition.toLocaleString()}</span>
                                <span className="text-green-700 text-sm font-bold">20% Off</span>
                            </div>
                            <button
                                onClick={() => handleRemove(item.id)}
                                className="mt-6 text-gray-800 font-bold uppercase text-sm hover:text-red-600 flex items-center gap-1"
                            >
                                <Trash2 size={16} /> Remove
                            </button>
                        </div>
                        <div className="text-sm font-medium">Delivery by {new Date(Date.now() + 172800000).toDateString()} | <span className="text-green-700">Free</span></div>
                    </div>
                ))}

                {/* Sticky Action Bar */}
                <div className="p-4 flex justify-end sticky bottom-0 bg-white border-t shadow-[0_-4px_10px_rgba(0,0,0,0.05)]">
                    <button className="bg-orange-600 text-white px-16 py-4 font-bold uppercase rounded-sm shadow-lg hover:bg-orange-700 transition-colors">
                        Place Order
                    </button>
                </div>
            </div>

            {/* Right: Price Summary */}
            <div className="w-full lg:w-[400px] bg-white shadow-sm rounded-sm sticky top-20">
                <div className="p-4 border-b font-bold text-gray-400 uppercase text-sm">Price Details</div>
                <div className="p-4 space-y-4 border-b">
                    <div className="flex justify-between">
                        <span>Price ({cart.items.length} items)</span>
                        <span>₹{cart.total_amount.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                        <span>Discount</span>
                        <span className="text-green-700">- ₹0</span>
                    </div>
                    <div className="flex justify-between">
                        <span>Delivery Charges</span>
                        <span className="text-green-700 font-bold">FREE</span>
                    </div>
                </div>
                <div className="p-4 flex justify-between font-bold text-xl border-b border-dashed">
                    <span>Total Amount</span>
                    <span>₹{cart.total_amount.toLocaleString()}</span>
                </div>
                <div className="p-4 text-green-700 font-bold text-sm">
                    You will save ₹0 on this order
                </div>
                <div className="p-4 bg-gray-50 flex items-center gap-3 text-gray-500 text-[11px] font-bold">
                    <ShieldCheck size={20} /> SAFE AND SECURE PAYMENTS. EASY RETURNS.
                </div>
            </div>
        </div>
    );
};

export default CartPage;