// src/components/inventory/InventoryFilters.jsx
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setFilter, resetFilters } from '../../features/inventorySlice';
import { Search, ChevronDown, Calendar, Filter, RotateCcw } from 'lucide-react';

// Preset options
const DATE_PRESETS = [
  'All time',
  'Last 7 days',
  'Last 30 days',
  'Last 3 months',
  'Last 6 months',
  'Last 1 year',
];

const InventoryFilters = () => {
  const dispatch = useDispatch();
  const filters = useSelector((state) => state.inventory.filters);
  
  const items = useSelector((state) => state.inventory.items);
  const categories = ['All', ...new Set(items.map(item => item.category))];
  const products = ['All', ...new Set(items.map(item => item.name))];

  const handleFilterChange = (key, value) => {
    dispatch(setFilter({ [key]: value }));
  };

  return (
    <div className="p-4 border-b border-border-subtle bg-gray-50/50">
      
      {/* Header Row */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2 text-sm font-medium text-gray-700">
          <Filter size={16} />
          <span>Filter your inventory</span>
        </div>
        <button 
          onClick={() => dispatch(resetFilters())}
          className="text-xs font-medium text-gray-500 hover:text-gray-800 flex items-center gap-1"
        >
          <RotateCcw size={12} />
          Reset
        </button>
      </div>

      {/* All filters in a single row */}
      <div className="flex flex-col lg:flex-row lg:items-center gap-3">
        
        {/* Search - Takes the most space */}
        <div className="relative flex-1 min-w-0">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input 
            type="text"
            placeholder="Search name, code, barcode..."
            value={filters.search}
            onChange={(e) => handleFilterChange('search', e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent bg-white"
          />
        </div>

        {/* Category */}
        <FilterSelect 
          value={filters.category}
          onChange={(val) => handleFilterChange('category', val)}
          options={categories}
          width="lg:w-40"
        />

        {/* Product */}
        <FilterSelect 
          value={filters.product}
          onChange={(val) => handleFilterChange('product', val)}
          options={products}
          width="lg:w-48"
        />

        {/* Date Preset */}
        <div className="relative lg:w-44">
          <Calendar size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none z-10" />
          <select
            value={filters.datePreset}
            onChange={(e) => handleFilterChange('datePreset', e.target.value)}
            className="w-full appearance-none pl-9 pr-8 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent bg-white text-gray-700 cursor-pointer"
          >
            {DATE_PRESETS.map((preset) => (
              <option key={preset} value={preset}>{preset}</option>
            ))}
          </select>
          <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
        </div>
      </div>
    </div>
  );
};

const FilterSelect = ({ value, onChange, options, width = '' }) => (
  <div className={`relative ${width}`}>
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full appearance-none pl-3 pr-8 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent bg-white text-gray-700 cursor-pointer"
    >
      {options.map((opt) => (
        <option key={opt} value={opt}>{opt}</option>
      ))}
    </select>
    <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
  </div>
);

export default InventoryFilters;