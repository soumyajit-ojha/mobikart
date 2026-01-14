import { Search, ShoppingCart, User, Package, Heart, Power, ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
    const { isLoggedIn, logout, user } = useAuth();

    return (
        <nav className="navbar-wrapper">
            <div className="navbar-content">

                {/* Logo */}
                <Link to="/" className="logo-container">
                    <span className="logo-main">Flipkart</span>
                    <span className="logo-plus">Explore <span className="font-extrabold italic">Plus</span></span>
                </Link>

                {/* Search */}
                <div className="search-wrapper">
                    <input
                        type="text"
                        placeholder="Search for products, brands and more"
                        className="search-field"
                    />
                    <Search className="search-icon" size={20} />
                </div>

                {/* Actions */}
                <div className="nav-actions">

                    {isLoggedIn ? (
                        <div className="account-dropdown">
                            <span className="flex items-center gap-1">
                                My Account <ChevronDown size={14} className="group-hover:rotate-180 transition-transform" />
                            </span>

                            <div className="dropdown-menu">
                                <Link to="/profile" className="dropdown-item">
                                    <User size={16} className="text-fk-blue" /> My Profile
                                </Link>
                                <Link to="/orders" className="dropdown-item">
                                    <Package size={16} className="text-fk-blue" /> Orders
                                </Link>
                                <Link to="/wishlist" className="dropdown-item">
                                    <Heart size={16} className="text-fk-blue" /> Wishlist
                                </Link>
                                <button onClick={logout} className="dropdown-item w-full text-red-600">
                                    <Power size={16} /> Logout
                                </button>
                            </div>
                        </div>
                    ) : (
                        <Link to="/login" className="nav-login-btn">Login</Link>
                    )}

                    <Link to="/seller" className="hidden lg:block">Become a Seller</Link>

                    <Link to="/cart" className="nav-item-link">
                        <ShoppingCart size={20} />
                        <span>Cart</span>
                    </Link>

                </div>
            </div>
        </nav>
    );
};

export default Navbar;