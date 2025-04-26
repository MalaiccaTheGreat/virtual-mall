import React from 'react';

export default function FilterSidebar({ filters, setFilters }) {
  return (
    <aside className="w-64 p-4 bg-white rounded-lg shadow-md h-fit sticky top-4">
      <h2 className="text-lg font-bold mb-4">Filters</h2>
      <ColorFilter 
        colors={filters.colors} 
        onChange={(colors) => setFilters({...filters, colors })}
      />
      <SizeFilter 
        sizes={filters.sizes} 
        onChange={(sizes) => setFilters({...filters, sizes })}
      />
      <PriceFilter 
        priceRange={filters.priceRange} 
        onChange={(priceRange) => setFilters({...filters, priceRange })}
      />
    </aside>
  );
}