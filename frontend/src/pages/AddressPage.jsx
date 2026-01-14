import { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import AccountLayout from '../components/AccountLayout';

const AddressPage = () => {
    const [addresses, setAddresses] = useState([]);
    const { userId } = useAuth();

    const fetchAddresses = async () => {
        const res = await axios.get('http://localhost:8005/user/addresses', {
            headers: { 'user-id': userId }
        });
        setAddresses(res.data);
    };

    useEffect(() => { fetchAddresses(); }, []);

    return (
        <AccountLayout>
            <h2 className="text-xl font-bold mb-6">Manage Addresses</h2>
            <button className="w-full border-2 border-dashed py-4 text-blue-600 font-bold mb-6 hover:bg-blue-50">+ ADD A NEW ADDRESS</button>
            <div className="space-y-4">
                {addresses.map(addr => (
                    <div key={addr.id} className="border p-4 rounded-sm">
                        <div className="flex justify-between">
                            <span className="bg-gray-100 px-2 py-1 text-xs font-bold rounded-sm uppercase">{addr.address_type}</span>
                        </div>
                        <p className="font-bold mt-2">{addr.name}  {addr.mobile}</p>
                        <p className="text-gray-600">{addr.address_line}, {addr.locality}, {addr.city}, {addr.state} - {addr.pincode}</p>
                    </div>
                ))}
            </div>
        </AccountLayout>
    );
};

export default AddressPage;
