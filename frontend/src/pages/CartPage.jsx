import { useEffect, useState } from 'react';
import { shopService } from '../services/shopService';
import { Trash2, ShoppingBag } from 'lucide-react';
import { Link } from 'react-router-dom';

const CartPage = () => {
    const [cart, setCart] = useState(null);
    const [loading, setLoading] = useState(true);

    const loadCart = async () => {
        try {
            const res = await shopService.getCart();
            setCart(res.data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadCart();
    }, []);

    const handleRemove = async (itemId) => {
        await shopService.removeFromCart(itemId);
        loadCart();
    };

    if (loading) return <div className="p-20 text-center">Loading Cart...</div>;

    if (!cart || cart.items.length === 0) {
        return (
            <div className="bg-white m-4 p-10 text-center shadow-sm">
                <img src="https://rukminim2.flixcart.com/www/800/800/promos/16/05/2019/d438a32e-765a-4d8b-b4a6-520b560971e8.png?q=90" className="w-64 mx-auto mb-6" alt="empty" />
                <h2 className="text-xl font-bold">Your cart is empty!</h2>
                <p className="text-gray-500 mb-6">Add items to it now.</p>
                <Link to="/" className="bg-fk-blue text-white px-12 py-3 font-bold uppercase rounded-sm">Shop Now</Link>
            </div>
        );
    }

    return (
        <div className="flex flex-col md:flex-row gap-4 p-4 max-w-7xl mx-auto">
            {/* Left Side: Items */}
            <div className="flex-1 bg-white shadow-sm">
                <div className="p-4 border-b font-bold text-lg flex items-center gap-2">
                    <ShoppingBag size={20} /> My Cart ({cart.items.length})
                </div>

                {cart.items.map(item => (
                    <div key={item.id} className="p-6 border-b flex gap-6 hover:bg-gray-50 transition-colors">
                        <img
                            src={item.product?.image_url || 'https://via.placeholder.com/150'}
                            className="w-24 h-32 object-contain"
                        />
                        <div className="flex-1">
                            <h3 className="text-lg font-medium">{item.product_name_snapshot}</h3>
                            <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                            <div className="mt-4 flex items-center gap-4">
                                <span className="font-bold text-xl">₹{item.price_at_addition.toLocaleString()}</span>
                                <button
                                    onClick={() => handleRemove(item.id)}
                                    className="text-red-500 font-bold text-sm uppercase hover:underline"
                                >
                                    Remove
                                </button>
                            </div>
                        </div>
                    </div>
                ))}

                <div className="p-4 flex justify-end sticky bottom-0 bg-white border-t shadow-inner">
                    <button className="bg-orange-600 text-white px-16 py-4 font-bold uppercase rounded-sm shadow-md">
                        Place Order
                    </button>
                </div>
            </div>

            {/* Right Side: Price Details */}
            <div className="w-full md:w-1/3 bg-white shadow-sm h-fit sticky top-20">
                <div className="p-4 border-b text-gray-500 font-bold uppercase text-sm">Price Details</div>
                <div className="p-4 space-y-4">
                    <div className="flex justify-between">
                        <span>Price ({cart.items.length} items)</span>
                        <span>₹{cart.total_amount.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                        <span>Delivery Charges</span>
                        <span className="text-green-700">FREE</span>
                    </div>
                    <div className="flex justify-between font-bold text-lg border-t border-dashed pt-4">
                        <span>Total Amount</span>
                        <span>₹{cart.total_amount.toLocaleString()}</span>
                    </div>
                </div>
                <div className="p-4 text-green-700 font-bold border-t text-sm">
                    You will save ₹0 on this order
                </div>
            </div>
        </div>
    );
};

export default CartPage;
