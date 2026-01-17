import { useEffect, useState } from 'react';
import AccountLayout from '../components/AccountLayout';
import { userService } from '../services/userService';
import { Trash2, Plus, MapPin, X } from 'lucide-react';

const AddressPage = () => {
    const [addresses, setAddresses] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [newAddr, setNewAddr] = useState({
        full_name: '', phone_number: '', pincode: '', locality: '',
        address_line: '', city: '', state: '', address_type: 'home'
    });

    const loadAddresses = async () => {
        const res = await userService.getAddresses();
        setAddresses(res.data);
    };

    useEffect(() => { loadAddresses(); }, []);

    const handleAdd = async (e) => {
        e.preventDefault();
        try {
            await userService.addAddress(newAddr);
            setShowForm(false);
            loadAddresses();
        } catch (err) { alert("Failed to add address"); }
    };

    const handleDelete = async (id) => {
        if (window.confirm("Delete this address?")) {
            await userService.deleteAddress(id);
            loadAddresses();
        }
    };

    return (
        <AccountLayout>
            <div className="flex justify-between items-center mb-8">
                <h2 className="text-xl font-bold">Manage Addresses</h2>
            </div>

            {/* Add Address Button or Form */}
            {!showForm ? (
                <button
                    onClick={() => setShowForm(true)}
                    className="w-full border-2 border-dashed border-gray-200 p-4 text-fk-blue font-bold flex items-center justify-center gap-2 hover:bg-blue-50 transition-colors mb-8"
                >
                    <Plus size={20} /> ADD A NEW ADDRESS
                </button>
            ) : (
                <form onSubmit={handleAdd} className="bg-blue-50 p-6 rounded-sm mb-8 border border-blue-100 space-y-4">
                    <div className="flex justify-between">
                        <span className="text-fk-blue font-bold text-sm uppercase">Add New Address</span>
                        <X size={20} className="cursor-pointer" onClick={() => setShowForm(false)} />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <input required placeholder="Name" className="p-3 border rounded-sm text-sm" onChange={e => setNewAddr({ ...newAddr, full_name: e.target.value })} />
                        <input required placeholder="10-digit mobile number" className="p-3 border rounded-sm text-sm" onChange={e => setNewAddr({ ...newAddr, phone_number: e.target.value })} />
                        <input required placeholder="Pincode" className="p-3 border rounded-sm text-sm" onChange={e => setNewAddr({ ...newAddr, pincode: e.target.value })} />
                        <input required placeholder="Locality" className="p-3 border rounded-sm text-sm" onChange={e => setNewAddr({ ...newAddr, locality: e.target.value })} />
                    </div>
                    <textarea required placeholder="Address (Area and Street)" className="w-full p-3 border rounded-sm text-sm" onChange={e => setNewAddr({ ...newAddr, address_line: e.target.value })} />
                    <div className="grid grid-cols-2 gap-4">
                        <input required placeholder="City/District/Town" className="p-3 border rounded-sm text-sm" onChange={e => setNewAddr({ ...newAddr, city: e.target.value })} />
                        <input required placeholder="State" className="p-3 border rounded-sm text-sm" onChange={e => setNewAddr({ ...newAddr, state: e.target.value })} />
                    </div>
                    <div className="flex gap-4">
                        <button type="submit" className="bg-fk-blue text-white px-10 py-3 font-bold uppercase rounded-sm shadow-md">Save</button>
                        <button type="button" onClick={() => setShowForm(false)} className="text-gray-500 font-bold uppercase px-6">Cancel</button>
                    </div>
                </form>
            )}

            <div className="space-y-4">
                {addresses.map(addr => (
                    <div key={addr.id} className="border p-6 rounded-sm flex justify-between items-start group">
                        <div className="space-y-2">
                            <span className="bg-gray-100 px-2 py-0.5 text-[10px] font-bold text-gray-500 rounded uppercase">{addr.address_type}</span>
                            <div className="flex gap-4 font-bold">
                                <span>{addr.full_name}</span>
                                <span>{addr.phone_number}</span>
                            </div>
                            <p className="text-sm text-gray-600">{addr.address_line}, {addr.locality}, {addr.city}, {addr.state} - <b>{addr.pincode}</b></p>
                        </div>
                        <button onClick={() => handleDelete(addr.id)} className="text-gray-300 hover:text-red-600 transition-colors">
                            <Trash2 size={20} />
                        </button>
                    </div>
                ))}
            </div>
        </AccountLayout>
    );
};

export default AddressPage;