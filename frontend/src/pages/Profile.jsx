import { useEffect, useState } from 'react';
import { userService } from '../services/userService';

const Profile = () => {
    const [profile, setProfile] = useState(null);
    const [addresses, setAddresses] = useState([]);

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        const [pRes, aRes] = await Promise.all([
            userService.getProfile(),
            userService.getAddresses()
        ]);
        setProfile(pRes.data);
        setAddresses(aRes.data);
    };

    const handleDeleteAddress = async (id) => {
        if (window.confirm("Delete this address?")) {
            await userService.deleteAddress(id);
            loadData();
        }
    };

    if (!profile) return <div className="p-10">Loading...</div>;

    return (
        <div className="flex gap-4 mt-6">
            {/* Sidebar */}
            <div className="w-1/4 bg-white shadow-sm h-fit">
                <div className="p-4 flex items-center gap-4 border-b">
                    <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center text-fk-blue font-bold">
                        {profile.first_name[0]}
                    </div>
                    <div>
                        <p className="text-xs">Hello,</p>
                        <p className="font-bold">{profile.first_name} {profile.last_name}</p>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="w-3/4 space-y-4">
                <section className="bg-white p-6 shadow-sm">
                    <h3 className="text-lg font-bold mb-6">Personal Information</h3>
                    <div className="grid grid-cols-2 gap-6">
                        <div className="space-y-1">
                            <label className="text-sm text-gray-500">First Name</label>
                            <p className="border p-2 bg-gray-50">{profile.first_name}</p>
                        </div>
                        <div className="space-y-1">
                            <label className="text-sm text-gray-500">Last Name</label>
                            <p className="border p-2 bg-gray-50">{profile.last_name}</p>
                        </div>
                    </div>
                </section>

                <section className="bg-white p-6 shadow-sm">
                    <h3 className="text-lg font-bold mb-4">Manage Addresses</h3>
                    {addresses.map(addr => (
                        <div key={addr.id} className="border p-4 mb-4 flex justify-between group">
                            <div>
                                <span className="bg-gray-100 px-2 py-0.5 text-xs font-bold rounded uppercase">{addr.address_type}</span>
                                <p className="font-bold mt-2">{addr.name} <span className="ml-4">{addr.mobile}</span></p>
                                <p className="text-sm mt-1">{addr.address_line}, {addr.locality}, {addr.city}, {addr.state} - {addr.pincode}</p>
                            </div>
                            <button
                                onClick={() => handleDeleteAddress(addr.id)}
                                className="text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                                Delete
                            </button>
                        </div>
                    ))}
                </section>
            </div>
        </div>
    );
};

export default Profile;