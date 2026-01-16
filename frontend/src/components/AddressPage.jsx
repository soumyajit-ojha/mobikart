import React, { useState, useEffect } from 'react';
import AccountLayout from '../components/AccountLayout';
import { userService } from '../services/userService';
import { Trash2, MapPin } from 'lucide-react';

const AddressPage = () => {
    const [addresses, setAddresses] = useState([]);
    const [showForm, setShowForm] = useState(false);

    useEffect(() => { loadAddresses(); }, []);

    const loadAddresses = async () => {
        const res = await userService.getAddresses();
        setAddresses(res.data);
    };

    const handleDelete = async (id) => {
        if (window.confirm("Delete this address?")) {
            await userService.deleteAddress(id);
            loadAddresses();
        }
    };

    return (
        <AccountLayout>
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold">Manage Addresses</h2>
            </div>

            <button
                onClick={() => setShowForm(true)}
                className="w-full border-2 border-dashed border-gray-300 py-4 text-fk-blue font-bold flex items-center justify-center gap-2 hover:bg-blue-50 transition-colors mb-6"
            >
                <Plus size={20} /> ADD A NEW ADDRESS
            </button>

            <div className="space-y-4">
                {addresses.length === 0 && (
                    <div className="text-center py-10 text-gray-500">No addresses saved.</div>
                )}
                {addresses.map(addr => (
                    <div key={addr.id} className="border p-6 rounded-sm flex justify-between group hover:border-fk-blue transition-colors">
                        <div>
                            <span className="bg-gray-100 px-2 py-1 text-[10px] font-bold rounded uppercase text-gray-600">
                                {addr.address_type}
                            </span>
                            <div className="flex gap-4 mt-3">
                                <p className="font-bold">{addr.name}</p>
                                <p className="font-bold">{addr.mobile}</p>
                            </div>
                            <p className="text-sm mt-1 text-gray-700">
                                {addr.address_line}, {addr.locality}, {addr.city}, {addr.state} - <b>{addr.pincode}</b>
                            </p>
                        </div>
                        <button
                            onClick={() => handleDelete(addr.id)}
                            className="text-gray-400 hover:text-red-500 transition-colors"
                        >
                            <Trash2 size={20} />
                        </button>
                    </div>
                ))}
            </div>
        </AccountLayout>
    );
};

export default AddressPage;