import React from 'react'; // Added missing import

export default function ColorFilter({ colors, onChange }) {
    const availableColors = ['red', 'blue', 'black', 'white', 'green'];
    
    return (
      <div className="mb-6">
        <h4 className="font-medium mb-2">Color</h4>
        <div className="space-y-2">
          {availableColors.map(color => (
            <label key={color} className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={colors.includes(color)}
                onChange={() => {
                  const newColors = colors.includes(color)
                    ? colors.filter(c => c !== color)
                    : [...colors, color];
                  onChange(newColors);
                }}
              />
              <span 
                className="inline-block w-4 h-4 rounded-full"
                style={{ backgroundColor: color }}
                aria-label={color}
              ></span>
              <span className="capitalize">{color}</span>
            </label>
          ))}
        </div>
      </div>
    );
}