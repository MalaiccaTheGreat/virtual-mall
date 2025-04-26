import React from 'react';

export default function PriceFilter({ priceRange, setPriceRange }) {
  const handlePriceChange = (event) => {
    const { name, value } = event.target;
    setPriceRange((prevRange) => ({
      ...prevRange,
      [name]: Number(value),
    }));
  };

  return (
    <div className="price-filter">
      <h3 className="text-lg font-bold mb-2">Price Range</h3>
      <div className="flex items-center gap-4">
        <div>
          <label htmlFor="minPrice" className="block text-sm font-medium text-gray-700">
            Min:
          </label>
          <input
            type="number"
            id="minPrice"
            name="min"
            value={priceRange.min}
            onChange={handlePriceChange}
            className="w-20 p-1 border rounded"
            min="0"
          />
        </div>
        <div>
          <label htmlFor="maxPrice" className="block text-sm font-medium text-gray-700">
            Max:
          </label>
          <input
            type="number"
            id="maxPrice"
            name="max"
            value={priceRange.max}
            onChange={handlePriceChange}
            className="w-20 p-1 border rounded"
            min="0"
          />
        </div>
      </div>
    </div>
  );
}