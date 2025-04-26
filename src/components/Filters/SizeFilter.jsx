import React from 'react';

export default function SizeFilter({ sizes, selectedSizes, onSizeChange }) {
  return (
    <div className="mb-4">
      <h3 className="font-medium mb-2">Filter by Size</h3>
      <div className="flex flex-wrap gap-2">
        {sizes.map((size) => (
          <label key={size} className="flex items-center gap-2">
            <input
              type="checkbox"
              value={size}
              checked={selectedSizes.includes(size)}
              onChange={(e) => onSizeChange(e.target.value)}
              className="form-checkbox"
            />
            <span>{size}</span>
          </label>
        ))}
      </div>
    </div>
  );
}