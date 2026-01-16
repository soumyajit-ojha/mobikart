import { useEffect, useState } from 'react';
import { productService } from '../services/productService';
import ProductCard from '../components/ProductCard';
import FilterSidebar from '../components/FilterSidebar';

const HomePage = () => {
    const [products, setProducts] = useState([]);
    const [filters, setFilters] = useState({});
    const [options, setOptions] = useState(null);

    useEffect(() => {
        // Load dynamic filter options from backend
        productService.getFilterOptions().then(res => setOptions(res.data));
    }, []);

    useEffect(() => {
        // Fetch products whenever filters change
        productService.searchProducts(filters).then(res => setProducts(res.data));
    }, [filters]);

    return (
        <div className="flex max-w-7xl mx-auto py-4 gap-4">
            <FilterSidebar
                options={options}
                onFilterChange={(key, val) => setFilters(prev => ({ ...prev, [key]: val }))}
            />

            <div className="flex-1">
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-2">
                    {products.map(p => <ProductCard key={p.id} product={p} />)}
                </div>
                {products.length === 0 && <div className="p-20 text-center bg-white">No Mobiles found.</div>}
            </div>
        </div>
    );
};
export default HomePage;