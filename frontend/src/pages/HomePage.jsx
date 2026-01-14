import React, { useEffect, useState } from 'react';
import ProductCard from '../components/ProductCard';
// import { productService } from '../services/productService'; // We'll build this next

const HomePage = () => {
    const [trending, setTrending] = useState([]);
    const [budgetGroups, setBudgetGroups] = useState({
        Premium: [], Mid: [], Budget: [], Feature: []
    });

    // Mock data for initial UI dev (replace with API call)
    useEffect(() => {
        const mockData = Array(12).fill(0).map((_, i) => ({
            id: i,
            model_name: `Phone Model ${i + 1}`,
            price: 10000 + (i * 5000),
            brand: i % 2 === 0 ? 'Samsung' : 'iPhone',
            image_url: 'https://rukminim2.flixcart.com/image/312/312/xif0q/mobile/n/m/f/g34-5g-pb1v0002in-motorola-original-imagwu4dayhqvqhg.jpeg'
        }));

        setTrending(mockData);
        setBudgetGroups({
            Premium: mockData.filter(p => p.price > 30000),
            Mid: mockData.filter(p => p.price >= 15000 && p.price <= 30000),
            Budget: mockData.filter(p => p.price >= 5000 && p.price < 15000),
            Feature: mockData.filter(p => p.price < 5000),
        });
    }, []);

    return (
        <div className="home-container">
            {/* 1. Budget Categories Navigation */}
            <div className="budget-grid pt-4">
                {Object.keys(budgetGroups).map(cat => (
                    <div key={cat} className="budget-box">
                        <p className="text-xs text-gray-500 font-bold uppercase">Best of</p>
                        <p className="text-fk-blue font-bold">{cat}</p>
                    </div>
                ))}
            </div>

            {/* 2. Top Trending Carousel */}
            <section className="carousel-wrapper">
                <div className="carousel-header">
                    <h2 className="text-xl font-bold">Top Trending Mobiles</h2>
                    <button className="bg-fk-blue text-white px-4 py-2 text-xs rounded-sm">VIEW ALL</button>
                </div>
                <div className="carousel-items">
                    {trending.map(product => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            </section>

            {/* 3. High Rated Carousel */}
            <section className="carousel-wrapper">
                <div className="carousel-header">
                    <h2 className="text-xl font-bold">High Rated Items</h2>
                    <button className="bg-fk-blue text-white px-4 py-2 text-xs rounded-sm">VIEW ALL</button>
                </div>
                <div className="carousel-items scrollbar-hide">
                    {trending.map(product => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            </section>
        </div>
    );
};

export default HomePage;