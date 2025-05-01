import React, { useState, useCallback } from 'react';
import { ShoppingCart, Star, Info, Loader2 } from 'lucide-react';
import Tooltip from './Tooltip';
import { useCart } from '../Context/CartContext';
import { useTryOn } from '../context/TryOnContext';
import PropTypes from 'prop-types';

const ProductCard = React.memo(function ProductCard({ 
  product, 
  isRecommended = false, 
  recommendationReason = '' 
}) {
  const { addToCart } = useCart();
  const { setTryOnProduct } = useTryOn();
  const [selectedSize, setSelectedSize] = useState(product.sizes?.[0]);
  const [selectedColor, setSelectedColor] = useState(product.colors?.[0]);
  const [isAdding, setIsAdding] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  const handleAddToCart = useCallback(() => {
    setIsAdding(true);
    addToCart({
      ...product,
      selectedSize,
      selectedColor,
      quantity: 1,
      addedAt: new Date().toISOString()
    });
    setTimeout(() => setIsAdding(false), 1000);
  }, [product, selectedSize, selectedColor, addToCart]);

  const handleTryOn = useCallback(() => {
    setTryOnProduct({
      ...product,
      selectedSize,
      selectedColor
    });
  }, [product, selectedSize, selectedColor, setTryOnProduct]);

  return (
    <article 
      className={`relative bg-white rounded-lg shadow-sm overflow-hidden transition-all duration-300 hover:shadow-md
        ${isRecommended ? 'border-l-4 border-blue-500' : 'border border-gray-100'}`}
      aria-labelledby={`product-${product.id}-title`}
    >
      {/* Recommendation Badge */}
      {isRecommended && (
        <div 
          className="absolute top-2 left-2 bg-blue-500 text-white text-xs px-2 py-1 rounded flex items-center z-10"
          aria-label="Recommended product"
        >
          <Star className="w-3 h-3 mr-1" />
          <span>Recommended</span>
          {recommendationReason && (
            <Tooltip content={recommendationReason}>
              <button 
                className="ml-1"
                aria-label="Recommendation reason"
              >
                <Info className="w-3 h-3" />
              </button>
            </Tooltip>
          )}
        </div>
      )}

      {/* Product Image */}
      <div className="relative aspect-square overflow-hidden group">
        <img
          src={product.image}
          alt=""
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          loading="lazy"
          decoding="async"
        />
        {product.tryOnAvailable && (
          <button
            onClick={handleTryOn}
            className="absolute bottom-2 right-2 bg-white/90 text-xs px-3 py-1.5 rounded-full shadow-sm hover:bg-white transition-colors flex items-center gap-1"
            aria-label={`Try on ${product.name}`}
          >
            <Shirt className="w-3 h-3" />
            <span>Try It</span>
          </button>
        )}
      </div>

      {/* Product Info */}
      <div className="p-4">
        <div className="flex justify-between items-start">
          <h3 
            id={`product-${product.id}-title`}
            className="font-medium text-gray-900 line-clamp-2"
          >
            {product.name}
          </h3>
          <p className="text-gray-900 font-bold whitespace-nowrap pl-2">
            ${product.price.toFixed(2)}
          </p>
        </div>

        {/* Rating */}
        {product.rating && (
          <div className="flex items-center mt-1" aria-label={`Rating: ${product.rating} out of 5`}>
            {[...Array(5)].map((_, i) => (
              <Star 
                key={i}
                className={`w-3 h-3 ${i < Math.round(product.rating) ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'}`}
              />
            ))}
            <span className="text-xs text-gray-500 ml-1">({product.reviewCount})</span>
          </div>
        )}

        {/* Quick Details Toggle */}
        <button 
          onClick={() => setShowDetails(!showDetails)}
          className="text-xs text-blue-600 mt-1 flex items-center hover:underline"
          aria-expanded={showDetails}
        >
          {showDetails ? 'Hide details' : 'Show details'}
          <ChevronDown className={`w-3 h-3 ml-1 transition-transform ${showDetails ? 'rotate-180' : ''}`} />
        </button>

        {/* Collapsible Details */}
        {showDetails && (
          <div className="mt-2 text-sm text-gray-600">
            <p>{product.description}</p>
            <ul className="mt-2 space-y-1">
              {product.details?.map((detail, i) => (
                <li key={i} className="flex">
                  <span className="text-gray-400 mr-1">•</span>
                  {detail}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Size Selection */}
        {product.sizes?.length > 1 && (
          <div className="mt-3">
            <p className="text-xs text-gray-600 mb-1">Size: {selectedSize}</p>
            <div className="flex flex-wrap gap-1">
              {product.sizes.map(size => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`px-2 py-0.5 text-xs rounded transition-all ${
                    selectedSize === size 
                      ? 'bg-blue-600 text-white shadow-inner' 
                      : 'bg-gray-100 hover:bg-gray-200'
                  }`}
                  aria-label={`Select size ${size}`}
                  aria-pressed={selectedSize === size}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Color Selection */}
        {product.colors?.length > 1 && (
          <div className="mt-3">
            <p className="text-xs text-gray-600 mb-1">Color: {selectedColor}</p>
            <div className="flex flex-wrap gap-2">
              {product.colors.map(color => (
                <button
                  key={color}
                  onClick={() => setSelectedColor(color)}
                  className={`w-5 h-5 rounded-full border transition-all ${
                    selectedColor === color 
                      ? 'border-blue-600 scale-125 shadow-sm' 
                      : 'border-gray-200 hover:scale-110'
                  }`}
                  style={{ backgroundColor: color }}
                  aria-label={`Select color ${color}`}
                  aria-pressed={selectedColor === color}
                />
              ))}
            </div>
          </div>
        )}

        {/* Add to Cart Button */}
        <button
          onClick={handleAddToCart}
          disabled={isAdding}
          className={`mt-4 w-full flex items-center justify-center py-2 px-4 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
            isAdding 
              ? 'bg-green-600 text-white' 
              : 'bg-blue-600 hover:bg-blue-700 text-white'
          }`}
          aria-live="polite"
        >
          {isAdding ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Adding...
            </>
          ) : (
            <>
              <ShoppingCart className="w-4 h-4 mr-2" />
              Add to Cart
            </>
          )}
        </button>
      </div>
    </article>
  );
});

ProductCard.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    description: PropTypes.string,
    sizes: PropTypes.arrayOf(PropTypes.string),
    colors: PropTypes.arrayOf(PropTypes.string),
    rating: PropTypes.number,
    reviewCount: PropTypes.number,
    details: PropTypes.arrayOf(PropTypes.string),
    tryOnAvailable: PropTypes.bool
  }).isRequired,
  isRecommended: PropTypes.bool,
  recommendationReason: PropTypes.string
};

export default ProductCard;