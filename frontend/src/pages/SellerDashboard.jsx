import { useEffect, useState } from 'react';
import { productService } from '../services/productService';
import { Trash2, Edit, Plus } from 'lucide-react';

const SellerDashboard = () => {
    const [inventory, setInventory] = useState([]);
    const [isAdding, setIsAdding] = useState(false);

    const loadInventory = () => productService.getMyInventory().then(res => setInventory(res.data));

    useEffect(() => { loadInventory(); }, []);

    return (
        <div className="p-8">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Seller Dashboard</h1>
                <button onClick={() => setIsAdding(true)} className="bg-fk-blue text-white px-6 py-2 flex items-center gap-2">
                    <Plus size={18} /> Add Mobile
                </button>
            </div>

            <div className="bg-white shadow-sm overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-gray-50 text-xs font-bold uppercase border-b">
                        <tr>
                            <th className="p-4">Mobile</th>
                            <th>Brand</th>
                            <th>Price</th>
                            <th>Stock</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {inventory.map(p => (
                            <tr key={p.id} className="border-b hover:bg-gray-50">
                                <td className="p-4 flex items-center gap-3">
                                    <img src={p.image_url} className="w-10 h-10 object-contain" />
                                    <span className="font-medium">{p.model_name}</span>
                                </td>
                                <td>{p.brand}</td>
                                <td>₹{p.price.toLocaleString()}</td>
                                <td>{p.stock}</td>
                                <td>{p.is_active ? '✅ Active' : '❌ Inactive'}</td>
                                <td className="flex gap-4 p-4">
                                    <Edit size={18} className="text-blue-600 cursor-pointer" />
                                    <Trash2 size={18} className="text-red-500 cursor-pointer" onClick={() => productService.deleteMobile(p.id).then(loadInventory)} />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};