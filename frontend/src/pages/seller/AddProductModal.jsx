import { useState } from 'react';
import { productService } from '../../services/productService';
import { X, Upload } from 'lucide-react';

const AddProductModal = ({ onClose, onRefresh }) => {
    const [loading, setLoading] = useState(false);
    const [imagePreview, setImagePreview] = useState(null);
    const [file, setFile] = useState(null);

    // Initial State for Specs
    const [specs, setSpecs] = useState({
        brand: '', model_name: '', price: '', stock: 1,
        ram: '', rom: '', network_type: '5G', processor: '',
        battery: '', screen_size: '', description: ''
    });

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        setFile(selectedFile);
        setImagePreview(URL.createObjectURL(selectedFile));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        // CREATE FORMDATA (Critical Step)
        const formData = new FormData();
        Object.keys(specs).forEach(key => formData.append(key, specs[key]));
        formData.append('image', file);

        try {
            await productService.addMobile(formData);
            alert("Mobile Listed Successfully!");
            onRefresh();
            onClose();
        } catch (err) {
            alert(err.response?.data?.detail || "Upload failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-sm relative p-8">
                <button onClick={onClose} className="absolute right-4 top-4 text-gray-400 hover:text-black">
                    <X size={24} />
                </button>

                <h2 className="text-xl font-bold mb-6">List a New Mobile</h2>

                <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Left Side: Specs */}
                    <div className="space-y-4">
                        <input type="text" placeholder="Brand (e.g. Apple)" required className="w-full border p-2 text-sm" onChange={e => setSpecs({ ...specs, brand: e.target.value })} />
                        <input type="text" placeholder="Model Name" required className="w-full border p-2 text-sm" onChange={e => setSpecs({ ...specs, model_name: e.target.value })} />
                        <div className="flex gap-4">
                            <input type="number" placeholder="Price" required className="flex-1 border p-2 text-sm" onChange={e => setSpecs({ ...specs, price: e.target.value })} />
                            <input type="number" placeholder="Stock" required className="flex-1 border p-2 text-sm" onChange={e => setSpecs({ ...specs, stock: e.target.value })} />
                        </div>
                        <div className="flex gap-4">
                            <input type="number" placeholder="RAM (GB)" required className="flex-1 border p-2 text-sm" onChange={e => setSpecs({ ...specs, ram: e.target.value })} />
                            <input type="number" placeholder="ROM (GB)" required className="flex-1 border p-2 text-sm" onChange={e => setSpecs({ ...specs, rom: e.target.value })} />
                        </div>
                        <input type="text" placeholder="Processor" required className="w-full border p-2 text-sm" onChange={e => setSpecs({ ...specs, processor: e.target.value })} />
                        <div className="flex gap-4">
                            <input type="number" placeholder="Battery (mAh)" required className="flex-1 border p-2 text-sm" onChange={e => setSpecs({ ...specs, battery: e.target.value })} />
                            <input type="number" placeholder="Screen Size (inches)" required className="flex-1 border p-2 text-sm" onChange={e => setSpecs({ ...specs, screen_size: e.target.value })} />
                        </div>
                    </div>

                    {/* Right Side: Image Upload */}
                    <div className="flex flex-col gap-4">
                        <label className="border-2 border-dashed border-gray-300 rounded-sm p-8 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50 transition-colors h-64">
                            {imagePreview ? (
                                <img src={imagePreview} className="h-full object-contain" />
                            ) : (
                                <>
                                    <Upload size={40} className="text-gray-400 mb-2" />
                                    <p className="text-sm text-gray-500">Upload Product Image</p>
                                    <p className="text-xs text-gray-400 mt-1">Recommended: 800x800 px</p>
                                </>
                            )}
                            <input type="file" hidden accept="image/*" onChange={handleFileChange} required />
                        </label>

                        <textarea placeholder="Description" className="w-full border p-2 text-sm h-32" onChange={e => setSpecs({ ...specs, description: e.target.value })} />

                        <button
                            disabled={loading}
                            className="w-full bg-fk-yellow text-white py-4 font-bold uppercase rounded-sm shadow-md disabled:bg-gray-400"
                        >
                            {loading ? "Processing..." : "Confirm & List Product"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddProductModal;