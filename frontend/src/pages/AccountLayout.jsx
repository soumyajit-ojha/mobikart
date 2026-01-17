import { User, Package, MapPin, Power, ChevronRight } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const AccountLayout = ({ children }) => {
    const { logout } = useAuth();
    const location = useLocation();

    const menuItems = [
        { label: 'Profile Information', path: '/profile', icon: <User size={18} /> },
        { label: 'Manage Addresses', path: '/addresses', icon: <MapPin size={18} /> },
        { label: 'My Orders', path: '/orders', icon: <Package size={18} /> },
    ];

    return (
        <div className="max-w-7xl mx-auto py-6 px-4 flex flex-col md:flex-row gap-4 items-start">
            {/* Sidebar */}
            <aside className="w-full md:w-80 space-y-4">
                <div className="bg-white p-4 flex items-center gap-4 shadow-sm">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-fk-blue font-bold">U</div>
                    <div>
                        <p className="text-xs">Hello,</p>
                        <p className="font-bold">SellPhone User</p>
                    </div>
                </div>

                <div className="bg-white shadow-sm overflow-hidden">
                    {menuItems.map(item => (
                        <Link
                            key={item.path}
                            to={item.path}
                            className={`flex items-center justify-between p-4 border-b hover:bg-blue-50 transition-colors ${location.pathname === item.path ? 'bg-blue-50 text-fk-blue font-bold' : ''}`}
                        >
                            <div className="flex items-center gap-4">
                                <span className="text-fk-blue">{item.icon}</span>
                                <span className="text-sm uppercase">{item.label}</span>
                            </div>
                            <ChevronRight size={16} />
                        </Link>
                    ))}
                    <button onClick={logout} className="w-full flex items-center gap-4 p-4 text-gray-500 hover:bg-red-50 hover:text-red-600 transition-colors">
                        <Power size={18} />
                        <span className="text-sm uppercase font-bold">Logout</span>
                    </button>
                </div>
            </aside>

            {/* Content Area */}
            <main className="flex-1 bg-white shadow-sm p-8 min-h-[500px]">
                {children}
            </main>
        </div>
    );
};

export default AccountLayout;