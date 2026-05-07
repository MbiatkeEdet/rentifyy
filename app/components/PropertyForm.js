'use client';
import { useState } from 'react';
import { getPropertyTypes, saveProperty } from '@/lib/storage';

export default function PropertyForm({ onPropertyAdded }) {
  const propertyTypes = getPropertyTypes();
  const [formData, setFormData] = useState({
    title: '',
    type: propertyTypes[0],
    price: '',
    location: '',
    bedrooms: '1',
    description: '',
    phone: '',
    email: '',
    image: '',
  });
  
  const [submitting, setSubmitting] = useState(false);
  
  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitting(true);
    
    const property = {
      ...formData,
      price: parseInt(formData.price),
      bedrooms: parseInt(formData.bedrooms),
    };
    
    saveProperty(property);
    onPropertyAdded?.();
    
    // Reset form
    setFormData({
      title: '',
      type: propertyTypes[0],
      price: '',
      location: '',
      bedrooms: '1',
      description: '',
      phone: '',
      email: '',
      image: '',
    });
    
    setSubmitting(false);
    alert('Property listed successfully!');
  };
  
  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Property Title *
          </label>
          <input
            type="text"
            required
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            className="input-field"
            placeholder="e.g., Cozy 2-Bedroom Apartment"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Property Type *
          </label>
          <select
            required
            value={formData.type}
            onChange={(e) => setFormData({ ...formData, type: e.target.value })}
            className="input-field"
          >
            {propertyTypes.map(type => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Yearly Price (₦) *
          </label>
          <input
            type="number"
            required
            value={formData.price}
            onChange={(e) => setFormData({ ...formData, price: e.target.value })}
            className="input-field"
            placeholder="e.g., 250000"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Location *
          </label>
          <input
            type="text"
            required
            value={formData.location}
            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
            className="input-field"
            placeholder="e.g., Lekki Phase 1, Lagos"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Number of Bedrooms
          </label>
          <select
            value={formData.bedrooms}
            onChange={(e) => setFormData({ ...formData, bedrooms: e.target.value })}
            className="input-field"
          >
            {[0, 1, 2, 3, 4, 5].map(num => (
              <option key={num} value={num}>{num === 0 ? 'Studio/No bedroom' : `${num} Bedroom${num > 1 ? 's' : ''}`}</option>
            ))}
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Phone Number *
          </label>
          <input
            type="tel"
            required
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            className="input-field"
            placeholder="e.g., 08012345678"
          />
        </div>
        
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Email *
          </label>
          <input
            type="email"
            required
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="input-field"
            placeholder="owner@example.com"
          />
        </div>
        
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Description *
          </label>
          <textarea
            required
            rows="4"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className="input-field"
            placeholder="Describe your property (amenities, nearby facilities, etc.)"
          />
        </div>
        
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Image URL (optional)
          </label>
          <input
            type="url"
            value={formData.image}
            onChange={(e) => setFormData({ ...formData, image: e.target.value })}
            className="input-field"
            placeholder="https://example.com/image.jpg"
          />
        </div>
      </div>
      
      <button
        type="submit"
        disabled={submitting}
        className="w-full btn-primary py-3 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {submitting ? 'Listing Property...' : 'List Your Property'}
      </button>
    </form>
  );
}