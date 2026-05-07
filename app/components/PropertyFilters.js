'use client';
import { useState } from 'react';
import { getPropertyTypes } from '@/lib/storage';

export default function PropertyFilters({ onFilterChange }) {
  const propertyTypes = ['All', ...getPropertyTypes()];
  const [selectedType, setSelectedType] = useState('All');
  const [priceRange, setPriceRange] = useState({ min: '', max: '' });
  const [searchTerm, setSearchTerm] = useState('');
  
  const handleFilter = () => {
    onFilterChange({
      type: selectedType === 'All' ? null : selectedType,
      minPrice: priceRange.min ? parseInt(priceRange.min) : null,
      maxPrice: priceRange.max ? parseInt(priceRange.max) : null,
      search: searchTerm,
    });
  };
  
  return (
    <div className="bg-white rounded-xl shadow-md p-6 mb-8">
      <h2 className="text-lg font-semibold mb-4">Find Your Perfect Home</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Search</label>
          <input
            type="text"
            placeholder="Search by title or location..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setTimeout(handleFilter, 300);
            }}
            className="input-field"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Property Type</label>
          <select
            value={selectedType}
            onChange={(e) => {
              setSelectedType(e.target.value);
              setTimeout(handleFilter, 0);
            }}
            className="input-field"
          >
            {propertyTypes.map(type => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Min Price (₦)</label>
          <input
            type="number"
            placeholder="Min"
            value={priceRange.min}
            onChange={(e) => {
              setPriceRange({ ...priceRange, min: e.target.value });
              setTimeout(handleFilter, 300);
            }}
            className="input-field"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Max Price (₦)</label>
          <input
            type="number"
            placeholder="Max"
            value={priceRange.max}
            onChange={(e) => {
              setPriceRange({ ...priceRange, max: e.target.value });
              setTimeout(handleFilter, 300);
            }}
            className="input-field"
          />
        </div>
      </div>
    </div>
  );
}