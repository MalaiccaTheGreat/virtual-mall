import React from 'react';
import ColorFilter from '@/components/Filters/ColorFilter';
import SizeFilter from '@/components/Filters/SizeFilter';
import PriceFilter from '@/components/Filters/PriceFilter';

export default function FilterSidebar({ filters, setFilters }) {
  return (
    <aside className="w-64 p-4 bg-white rounded-lg shadow-md h-fit sticky top-4">
      <h2 className="text-lg font-bold mb-4">Filters</h2>
      
      {/* Color Filter Section */}
      <div className="mb-6">
        <ColorFilter 
          colors={filters.colors} 
          onChange={(colors) => setFilters({...filters, colors })}
        />
      </div>
      
      {/* Size Filter Section */}
      <div className="mb-6">
        <SizeFilter 
          sizes={filters.sizes} 
          onChange={(sizes) => setFilters({...filters, sizes })}
        />
      </div>
      
      {/* Price Filter Section */}
      <div className="mb-6">
        <PriceFilter 
          priceRange={filters.priceRange} 
          onChange={(priceRange) => setFilters({...filters, priceRange })}
        />
      </div>
    </aside>
  );
}