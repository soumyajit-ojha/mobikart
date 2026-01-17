import { useState, useEffect } from 'react';
import { productService } from '../../services/productService';
import { Plus, Package, DollarSign, Smartphone } from 'lucide-react';
import AddProductModal from './AddProductModal';

const SellerDashboard = () => {
    const [inventory, setInventory] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const fetchInventory = async () => {
        try {
            const res = await productService.getMyInventory();
            setInventory(res.data);
        } catch (err) { console.error(err); }
    };

    useEffect(() => { fetchInventory(); }, []);

    return (
        <div className="p-8 max-w-7xl mx-auto">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-2xl font-bold flex items-center gap-2">
                    <Smartphone className="text-fk-blue" /> Seller Dashboard
                </h1>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="bg-fk-blue text-white px-6 py-2 rounded-sm font-bold flex items-center gap-2 hover:bg-blue-700 transition-colors"
                >
                    <Plus size={20} /> Add New Mobile
                </button>
            </div>

            {/* Inventory Table */}
            <div className="bg-white shadow-sm rounded-sm overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-gray-50 border-b text-xs uppercase font-bold text-gray-500">
                        <tr>
                            <th className="p-4">Product</th>
                            <th className="p-4">Price</th>
                            <th className="p-4">Stock</th>
                            <th className="p-4">Status</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y">
                        {inventory.map(item => (
                            <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                                <td className="p-4 flex items-center gap-4">
                                    <img src={item.image_url} alt="phone" className="w-12 h-12 object-contain" />
                                    <div>
                                        <p className="font-bold">{item.brand} {item.model_name}</p>
                                        <p className="text-xs text-gray-500">{item.ram}GB / {item.rom}GB</p>
                                    </div>
                                </td>
                                <td className="p-4 font-semibold">₹{item.price.toLocaleString()}</td>
                                <td className="p-4">{item.stock} units</td>
                                <td className="p-4">
                                    <span className={`px-2 py-1 rounded-full text-[10px] font-bold ${item.is_active ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                                        {item.is_active ? 'ACTIVE' : 'INACTIVE'}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {isModalOpen && <AddProductModal onClose={() => setIsModalOpen(false)} onRefresh={fetchInventory} />}
        </div>
    );
};

export default SellerDashboard;