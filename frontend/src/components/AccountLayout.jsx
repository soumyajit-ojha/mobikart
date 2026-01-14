import { Link } from 'react-router-dom';

const AccountLayout = ({ children }) => (
    <div className="bg-gray-100 min-h-screen py-8 px-4 md:px-20 flex gap-4">
        <div className="w-1/4 bg-white shadow-sm h-fit">
            <div className="p-4 border-b flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold text-xl">U</div>
                <div><p className="text-xs">Hello,</p><p className="font-bold">User</p></div>
            </div>
            <div className="py-2">
                <Link to="/profile" className="block px-10 py-3 hover:bg-blue-50 text-blue-600 font-semibold">Profile Information</Link>
                <Link to="/addresses" className="block px-10 py-3 hover:bg-blue-50">Manage Addresses</Link>
                <Link to="/orders" className="block px-10 py-3 hover:bg-blue-50">My Orders</Link>
            </div>
        </div>
        <div className="flex-1 bg-white shadow-sm p-8">{children}</div>
    </div>
);

export default AccountLayout;
