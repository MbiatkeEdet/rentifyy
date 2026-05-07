'use client';
import { useState } from 'react';

export default function PropertyCard({ property, onDelete }) {
  const [showContact, setShowContact] = useState(false);
  
  const getTypeColor = (type) => {
    const colors = {
      'Self Contain': 'bg-green-100 text-green-800',
      '1 Bedroom Flat': 'bg-blue-100 text-blue-800',
      '2 Bedroom Flat': 'bg-purple-100 text-purple-800',
      '3 Bedroom Flat': 'bg-orange-100 text-orange-800',
      '4+ Bedroom Flat': 'bg-red-100 text-red-800',
      'Studio Apartment': 'bg-indigo-100 text-indigo-800',
      'Duplex': 'bg-pink-100 text-pink-800',
    };
    return colors[type] || 'bg-gray-100 text-gray-800';
  };
  
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden property-card transition-all hover:shadow-xl">
      <div className="relative h-48 bg-gradient-to-r from-blue-400 to-purple-500">
        {property.image ? (
          <img src={property.image} alt={property.title} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span className="text-6xl">🏠</span>
          </div>
        )}
        <div className="absolute top-4 right-4">
          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getTypeColor(property.type)}`}>
            {property.type}
          </span>
        </div>
      </div>
      
      <div className="p-5">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-xl font-bold text-gray-800">{property.title}</h3>
          <button
            onClick={() => onDelete?.(property.id)}
            className="text-red-500 hover:text-red-700 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        </div>
        
        <p className="text-gray-600 text-sm mb-3">{property.location}</p>
        <p className="text-gray-700 text-sm mb-4 line-clamp-2">{property.description}</p>
        
        <div className="flex justify-between items-center mb-4">
          <div>
            <span className="text-2xl font-bold text-blue-600">₦{property.price.toLocaleString()}</span>
            <span className="text-gray-500 text-sm">/year</span>
          </div>
          <div className="flex items-center text-gray-500 text-sm">
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            <span>{property.bedrooms} bed</span>
          </div>
        </div>
        
        {!showContact ? (
          <button
            onClick={() => setShowContact(true)}
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Contact Owner
          </button>
        ) : (
          <div className="bg-gray-100 p-3 rounded-lg">
            <p className="text-sm text-gray-700">
              <span className="font-semibold">📞 {property.phone || '0700 000 0000'}</span>
              <br />
              <span className="font-semibold">✉️ {property.email || 'owner@example.com'}</span>
            </p>
          </div>
        )}
      </div>
    </div>
  );
}