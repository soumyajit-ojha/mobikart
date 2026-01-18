import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { userService } from '../services/userService';
import { Eye, EyeOff } from 'lucide-react'; // Import icons

const RegisterPage = () => {
    const [formData, setFormData] = useState({
        first_name: '', last_name: '', email: '',
        phone: '', password: '', role: 'buyer'
    });

    // New States for verification
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        // 1. Password Match Validation
        if (formData.password !== confirmPassword) {
            setError("Passwords do not match!");
            return;
        }

        // 2. Password Length Validation (Matches Pydantic Schema)
        if (formData.password.length < 8) {
            setError("Password must be at least 8 characters long.");
            return;
        }

        setLoading(true);
        try {
            await userService.register(formData);
            alert("Registration successful! Please login.");
            navigate('/login');
        } catch (err) {
            setError(err.response?.data?.detail || "Registration failed.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto mt-12 bg-white flex shadow-2xl rounded-sm overflow-hidden min-h-[620px]">
            {/* Left Sidebar */}
            <div className="w-2/5 bg-fk-blue p-10 text-white flex flex-col">
                <h2 className="text-3xl font-bold mb-4">Looks like you're new here!</h2>
                <p className="text-lg opacity-80 leading-relaxed">Sign up with your details to get started</p>
                <img
                    src="https://static-assets-web.flixcart.com/fk-p-linchpin-web/fk-cp-zion/img/login_img_c4a81e.png"
                    alt="reg" className="mt-auto self-center w-48 mb-8"
                />
            </div>

            {/* Right Form */}
            <div className="w-3/5 p-10">
                <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="flex gap-4">
                        <input type="text" placeholder="First Name" required className="flex-1 border-b border-gray-300 py-2 outline-none text-sm focus:border-fk-blue"
                            onChange={e => setFormData({ ...formData, first_name: e.target.value })} />
                        <input type="text" placeholder="Last Name" required className="flex-1 border-b border-gray-300 py-2 outline-none text-sm focus:border-fk-blue"
                            onChange={e => setFormData({ ...formData, last_name: e.target.value })} />
                    </div>

                    <input type="email" placeholder="Email Address" required className="w-full border-b border-gray-300 py-2 outline-none text-sm focus:border-fk-blue"
                        onChange={e => setFormData({ ...formData, email: e.target.value })} />

                    <input type="text" placeholder="Phone Number" required className="w-full border-b border-gray-300 py-2 outline-none text-sm focus:border-fk-blue"
                        onChange={e => setFormData({ ...formData, phone: e.target.value })} />

                    {/* Password Field with Eye Toggle */}
                    <div className="relative w-full border-b border-gray-300 focus-within:border-fk-blue">
                        <input
                            type={showPassword ? "text" : "password"}
                            placeholder="Set Password"
                            required
                            className="w-full py-2 outline-none text-sm"
                            onChange={e => setFormData({ ...formData, password: e.target.value })}
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-2 top-2 text-gray-400 hover:text-fk-blue"
                        >
                            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                    </div>

                    {/* Confirm Password Field */}
                    <div className="relative w-full border-b border-gray-300 focus-within:border-fk-blue">
                        <input
                            type={showPassword ? "text" : "password"}
                            placeholder="Confirm Password"
                            required
                            className="w-full border-b border-gray-300 py-2 outline-none text-sm focus:border-fk-blue"
                            onChange={e => setConfirmPassword(e.target.value)}
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-2 top-2 text-gray-400 hover:text-fk-blue"
                        >
                            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                    </div>


                    {/* Role Selection */}
                    <div className="py-2">
                        <p className="text-[11px] font-bold text-gray-400 uppercase mb-2">I want to register as a:</p>
                        <div className="flex gap-8">
                            <label className="flex items-center gap-2 text-sm cursor-pointer">
                                <input type="radio" name="role" value="buyer" checked={formData.role === 'buyer'} onChange={e => setFormData({ ...formData, role: e.target.value })} className="accent-fk-blue w-4 h-4" /> Buyer
                            </label>
                            <label className="flex items-center gap-2 text-sm cursor-pointer">
                                <input type="radio" name="role" value="seller" checked={formData.role === 'seller'} onChange={e => setFormData({ ...formData, role: e.target.value })} className="accent-fk-blue w-4 h-4" /> Seller
                            </label>
                        </div>
                    </div>

                    {error && <p className="text-red-500 text-xs font-bold bg-red-50 p-2 rounded-sm">{error}</p>}

                    <button
                        disabled={loading}
                        className="w-full bg-fk-yellow text-white py-3 rounded-sm font-bold shadow-md hover:bg-opacity-90 disabled:bg-gray-300"
                    >
                        {loading ? "Creating Account..." : "Continue"}
                    </button>

                    <Link to="/login" className="block text-center text-fk-blue font-bold text-sm bg-gray-50 py-3 border shadow-inner mt-4">
                        Existing User? Log in
                    </Link>
                </form>
            </div>
        </div>
    );
};

export default RegisterPage;