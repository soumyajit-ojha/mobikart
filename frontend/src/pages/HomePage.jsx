import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { productService } from '../services/productService';
import ProductCard from '../components/ProductCard';
import FilterSidebar from '../components/FilterSidebar';

const HomePage = () => {
    const [searchParams] = useSearchParams();
    const [products, setProducts] = useState([]);
    const [options, setOptions] = useState(null);
    const [loading, setLoading] = useState(true);

    // Initial Filters State
    const [filters, setFilters] = useState({
        brand: [],
        ram: [],
        rom: [],
        network: [],
        screen: [],
        max_p: 200000,
        q: ''
    });

    // 1. Load sidebar options (Metadata) from Backend
    useEffect(() => {
        productService.getFilterOptions()
            .then(res => setOptions(res.data))
            .catch(err => console.error("Filter error:", err));
    }, []);

    // 2. Listen to URL Search Query changes (?q=...)
    useEffect(() => {
        const query = searchParams.get('q') || '';
        setFilters(prev => ({ ...prev, q: query }));
    }, [searchParams]);

    // 3. Fetch Products whenever Filters change
    useEffect(() => {
        const fetchMobiles = async () => {
            setLoading(true);
            try {
                const res = await productService.getProducts(filters);
                setProducts(res.data);
            } catch (err) {
                console.error("Fetch error:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchMobiles();
    }, [filters]);

    const handleFilterChange = (key, value) => {
        setFilters(prev => ({ ...prev, [key]: value }));
    };

    return (
        <div className="flex flex-col md:flex-row gap-4 p-4 max-w-7xl mx-auto items-start min-h-screen">

            {/* Sidebar with all Mobile Specs */}
            <FilterSidebar
                options={options}
                selectedFilters={filters}
                onFilterChange={handleFilterChange}
            />

            <main className="flex-1 w-full">
                {/* Results Header */}
                <div className="bg-white p-4 mb-4 shadow-sm rounded-sm flex justify-between items-center">
                    <div>
                        <nav className="text-[10px] text-gray-500 mb-1">Home &gt; Mobiles</nav>
                        <h1 className="font-bold text-sm md:text-base">
                            {filters.q ? `Search results for "${filters.q}"` : "Mobiles"}
                            <span className="text-gray-400 font-normal ml-2">({products.length} products)</span>
                        </h1>
                    </div>
                </div>

                {/* Loading State */}
                {loading ? (
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 opacity-50">
                        {[1, 2, 3, 4].map(i => <div key={i} className="bg-white h-64 animate-pulse rounded-sm"></div>)}
                    </div>
                ) : (
                    <>
                        {/* Product Grid */}
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-4">
                            {products.map(product => (
                                <ProductCard key={product.id} product={product} />
                            ))}
                        </div>

                        {/* Empty State */}
                        {products.length === 0 && (
                            <div className="bg-white p-20 text-center shadow-sm rounded-sm">
                                <img
                                    src="https://static-assets-web.flixcart.com/fk-p-linchpin-web/fk-cp-zion/img/error-no-search-results_2353c5.png"
                                    alt="empty"
                                    className="mx-auto w-64 opacity-50"
                                />
                                <p className="text-xl font-bold mt-4">No results found!</p>
                                <p className="text-gray-500 text-sm mt-1">Try clearing filters or using different keywords.</p>
                                <button
                                    onClick={() => window.location.reload()}
                                    className="mt-6 bg-fk-blue text-white px-8 py-2 font-bold uppercase rounded-sm shadow-md"
                                >
                                    Clear All Filters
                                </button>
                            </div>
                        )}
                    </>
                )}
            </main>
        </div>
    );
};

export default HomePage;