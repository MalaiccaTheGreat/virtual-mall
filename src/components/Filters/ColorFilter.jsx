import React from 'react';
import PropTypes from 'prop-types';

export default function ColorFilter({ colors, onChange }) {
    const availableColors = ['red', 'blue', 'black', 'white', 'green'];
    
    return (
      <div className="mb-6">
        <h4 className="font-medium mb-2">Color</h4>
        <div className="space-y-2">
          {availableColors.map(color => (
            <label key={color} className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                className="cursor-pointer"
                checked={colors.includes(color)}
                onChange={() => {
                  const newColors = colors.includes(color)
                    ? colors.filter(c => c !== color)
                    : [...colors, color];
                  onChange(newColors);
                }}
              />
              <span 
                className="inline-block w-4 h-4 rounded-full border border-gray-300"
                style={{ backgroundColor: color }}
                aria-label={color}
              />
              <span className="capitalize text-sm">{color}</span>
            </label>
          ))}
        </div>
      </div>
    );
}

ColorFilter.propTypes = {
  colors: PropTypes.arrayOf(PropTypes.string).isRequired,
  onChange: PropTypes.func.isRequired
};