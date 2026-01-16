import React, { useState } from 'react';
import { ChevronDown, Filter } from 'lucide-react';

const FilterSidebar = ({ options, onFilterChange }) => {
    // Local state to track selected values for each category
    const [selected, setSelected] = useState({
        brand: [],
        ram: [],
        rom: [],
        network_type: [],
        min_price: 0,
        max_price: 200000
    });

    if (!options) return <div className="w-64 bg-white p-4">Loading filters...</div>;

    const handleCheckboxChange = (category, value) => {
        const isAlreadySelected = selected[category].includes(value);
        let newSelection;

        if (isAlreadySelected) {
            newSelection = selected[category].filter(item => item !== value);
        } else {
            newSelection = [...selected[category], value];
        }

        const newFilters = { ...selected, [category]: newSelection };
        setSelected(newFilters);

        // Notify parent (HomePage)
        // Note: For backend compatibility, we send the array or null
        onFilterChange(category, newSelection.length > 0 ? newSelection : null);
    };

    const handlePriceChange = (e) => {
        const value = e.target.value;
        setSelected(prev => ({ ...prev, max_price: value }));
        onFilterChange('max_price', value);
    };

    return (
        <div className="w-64 bg-white shadow-sm h-fit sticky top-20 hidden md:block">
            <div className="p-4 border-b flex items-center justify-between">
                <h2 className="font-bold text-lg uppercase flex items-center gap-2">
                    <Filter size={18} /> Filters
                </h2>
                <button
                    onClick={() => window.location.reload()}
                    className="text-xs text-fk-blue font-bold uppercase"
                >
                    Clear All
                </button>
            </div>

            {/* Price Filter */}
            <div className="p-4 border-b">
                <h3 className="text-xs font-bold uppercase mb-4 flex justify-between">
                    Price <span>Up to ₹{selected.max_price}</span>
                </h3>
                <input
                    type="range"
                    min={options.price_range.min}
                    max={options.price_range.max}
                    value={selected.max_price}
                    onChange={handlePriceChange}
                    className="w-full accent-fk-blue"
                />
                <div className="flex justify-between text-[10px] text-gray-500 mt-2">
                    <span>₹{options.price_range.min}</span>
                    <span>₹{options.price_range.max}</span>
                </div>
            </div>

            {/* Dynamic Brand Filter */}
            <FilterSection
                title="Brand"
                items={options.brands}
                selectedItems={selected.brand}
                onChange={(val) => handleCheckboxChange('brand', val)}
            />

            {/* Dynamic RAM Filter */}
            <FilterSection
                title="RAM"
                items={options.ram_options}
                selectedItems={selected.ram}
                suffix=" GB"
                onChange={(val) => handleCheckboxChange('ram', val)}
            />

            {/* Dynamic ROM Filter */}
            <FilterSection
                title="Internal Storage"
                items={options.rom_options}
                selectedItems={selected.rom}
                suffix=" GB"
                onChange={(val) => handleCheckboxChange('rom', val)}
            />

            {/* Network Type */}
            <FilterSection
                title="Network Type"
                items={options.network_types}
                selectedItems={selected.network_type}
                onChange={(val) => handleCheckboxChange('network_type', val)}
            />
        </div>
    );
};

// Helper sub-component for repeated sections
const FilterSection = ({ title, items, selectedItems, onChange, suffix = "" }) => (
    <div className="p-4 border-b">
        <div className="flex justify-between items-center mb-2 cursor-pointer group">
            <h3 className="text-xs font-bold uppercase">{title}</h3>
            <ChevronDown size={14} className="text-gray-400 group-hover:text-black" />
        </div>
        <div className="space-y-2 mt-3 max-h-48 overflow-y-auto scrollbar-hide">
            {items.map(item => (
                <label key={item} className="flex items-center gap-2 cursor-pointer group">
                    <input
                        type="checkbox"
                        className="w-4 h-4 accent-fk-blue"
                        checked={selectedItems.includes(item)}
                        onChange={() => onChange(item)}
                    />
                    <span className="text-sm text-gray-700 group-hover:text-fk-blue capitalize">
                        {item}{suffix}
                    </span>
                </label>
            ))}
        </div>
    </div>
);

export default FilterSidebar;