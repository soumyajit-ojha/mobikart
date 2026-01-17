const FilterSidebar = ({ options, selectedFilters, onFilterChange }) => {

    const handleCheck = (category, value) => {
        // Ensure current is always an array to prevent .includes error
        const current = selectedFilters[category] || [];
        const updated = current.includes(value)
            ? current.filter(v => v !== value)
            : [...current, value];
        onFilterChange(category, updated);
    };

    if (!options) return <div className="w-64 bg-white p-6 animate-pulse">Loading filters...</div>;

    return (
        <aside className="w-64 bg-white shadow-sm h-fit sticky top-20 hidden md:block border-r rounded-sm">
            <div className="p-4 border-b flex justify-between items-center">
                <h2 className="font-bold text-lg uppercase tracking-tight">Filters</h2>
                <button
                    onClick={() => window.location.href = "/"}
                    className="text-[10px] text-fk-blue font-bold uppercase hover:underline"
                >
                    Clear All
                </button>
            </div>

            {/* Price Filter */}
            <div className="p-4 border-b">
                <p className="text-xs font-bold uppercase text-gray-500 mb-4">Price</p>
                <input
                    type="range"
                    min="0"
                    max={options.max_price_limit || 200000}
                    value={selectedFilters.max_p || 200000}
                    onChange={(e) => onFilterChange('max_p', e.target.value)}
                    className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-fk-blue"
                />
                <div className="flex justify-between text-[10px] mt-2 text-gray-500 font-bold">
                    <span>₹0</span>
                    <span>₹{(Number(selectedFilters.max_p) || 0).toLocaleString()}</span>
                </div>
            </div>

            {/* Logic: We use '|| []' to ensure an array is ALWAYS passed to FilterGroup */}

            <FilterGroup
                title="Brand"
                items={options.brands || []}
                selected={selectedFilters.brand || []}
                onToggle={(v) => handleCheck('brand', v)}
            />

            <FilterGroup
                title="RAM"
                items={options.ram_options || []}
                selected={selectedFilters.ram || []}
                onToggle={(v) => handleCheck('ram', v)}
                suffix=" GB"
            />

            <FilterGroup
                title="Internal Storage"
                items={options.rom_options || []}
                selected={selectedFilters.rom || []}
                onToggle={(v) => handleCheck('rom', v)}
                suffix=" GB"
            />

            <FilterGroup
                title="Network Type"
                items={options.network_types || []}
                selected={selectedFilters.network || []}
                onToggle={(v) => handleCheck('network', v)}
            />

            <FilterGroup
                title="Screen Size"
                items={options.screen_sizes || []}
                selected={selectedFilters.screen || []}
                onToggle={(v) => handleCheck('screen', v)}
                suffix=" inch"
            />
        </aside>
    );
};

// Added default parameters to items and selected to prevent crashes
const FilterGroup = ({ title, items = [], selected = [], onToggle, suffix = "" }) => {
    // If there are no items for this category, don't render the section at all (FAANG Best Practice)
    if (items.length === 0) return null;

    return (
        <div className="p-4 border-b">
            <p className="text-[11px] font-bold uppercase text-gray-500 mb-3">{title}</p>
            <div className="space-y-2.5 max-h-48 overflow-y-auto scrollbar-thin">
                {items.map(item => (
                    <label key={item} className="flex items-center gap-2.5 text-sm cursor-pointer group">
                        <input
                            type="checkbox"
                            checked={selected.includes(item)}
                            onChange={() => onToggle(item)}
                            className="w-4 h-4 accent-fk-blue rounded-sm"
                        />
                        <span className="text-gray-700 group-hover:text-fk-blue transition-colors">
                            {item}{suffix}
                        </span>
                    </label>
                ))}
            </div>
        </div>
    );
};

export default FilterSidebar;