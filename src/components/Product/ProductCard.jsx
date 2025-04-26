import React, { useState } from 'react';
import { ShoppingCart, Star } from 'lucide-react';

export default function ProductCard({ product, onAddToCart, isRecommended = false }) {
  const [selectedSize, setSelectedSize] = useState(product.sizes?.[0]);
  const [selectedColor, setSelectedColor] = useState(product.colors?.[0]);
  const [isAdding, setIsAdding] = useState(false);

  const handleAddToCart = () => {
    setIsAdding(true);
    onAddToCart(selectedSize, selectedColor);
    setTimeout(() => setIsAdding(false), 1000);
  };

  return (
    <div className={`relative bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 
      ${isRecommended ? 'border-2 border-blue-500' : 'border border-gray-200'}`}>
      
      {isRecommended && (
        <div className="absolute top-2 left-2 bg-blue-500 text-white text-xs px-2 py-1 rounded-full flex items-center">
          <Star className="w-3 h-3 mr-1" />
          Recommended
        </div>
      )}

      <div className="relative overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-48 object-cover"
        />
      </div>

      <div className="p-4">
        <h3 className="font-semibold text-lg">{product.name}</h3>
        <div className="flex justify-between items-center mt-1">
          <p className="text-gray-900 font-bold">${product.price.toFixed(2)}</p>
          {product.rating && (
            <div className="flex items-center">
              <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
              <span className="ml-1 text-sm">{product.rating.toFixed(1)}</span>
            </div>
          )}
        </div>

        {/* Size Selection */}
        {product.sizes && (
          <div className="mt-3">
            <p className="text-sm text-gray-600 mb-1">Size</p>
            <div className="flex flex-wrap gap-2">
              {product.sizes.map(size => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`px-3 py-1 text-sm rounded ${
                    selectedSize === size 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-gray-100 hover:bg-gray-200'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Color Selection */}
        {product.colors && (
          <div className="mt-3">
            <p className="text-sm text-gray-600 mb-1">Color</p>
            <div className="flex flex-wrap gap-2">
              {product.colors.map(color => (
                <button
                  key={color}
                  onClick={() => setSelectedColor(color)}
                  className={`w-6 h-6 rounded-full border-2 ${
                    selectedColor === color 
                      ? 'border-blue-600' 
                      : 'border-transparent'
                  }`}
                  style={{ backgroundColor: color }}
                  title={color}
                />
              ))}
            </div>
          </div>
        )}

        <button
          onClick={handleAddToCart}
          disabled={isAdding}
          className={`mt-4 w-full flex items-center justify-center py-2 px-4 rounded-md transition-colors ${
            isAdding 
              ? 'bg-green-500 text-white' 
              : 'bg-blue-600 hover:bg-blue-700 text-white'
          }`}
        >
          {isAdding ? (
            'Added!'
          ) : (
            <>
              <ShoppingCart className="w-4 h-4 mr-2" />
              Add to Cart
            </>
          )}
        </button>
      </div>
    </div>
  );
}