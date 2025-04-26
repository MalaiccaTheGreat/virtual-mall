import React from 'react';

export default function FilterSidebar({ filters, setFilters }) {
  return (
    <aside className="w-64 bg-white p-4 shadow-md">
      <h2 className="text-lg font-bold mb-4">Filters</h2>
      {/* Add filter controls here */}
      <p>Filter options will go here.</p>
    </aside>
  );
}