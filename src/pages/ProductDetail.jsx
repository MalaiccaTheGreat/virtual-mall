import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { products } from '../data/products';
import { useCart } from '@/Context/CartContext';
import NotFound from '@/components/NotFound';
import ColorFilter from '@/components/Filters/ColorFilter';

export default function ProductDetail() {
  const { id } = useParams();
  const product = products.find(p => p.id === Number(id));
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const { addToCart } = useCart();

  // Return NotFound component if product doesn't exist
  if (!product) return <NotFound />;

  return (
    <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8 p-4">
      
      {/* Image Gallery */}
      <div className="bg-white p-4 rounded-lg shadow">
        <img 
          src={product.image} 
          alt={product.name}
          className="w-full h-auto max-h-[500px] object-contain"
          loading="lazy"
        />
      </div>

      {/* Product Info */}
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">{product.name}</h1>
          <p className="text-2xl my-2">K{product.price.toFixed(2)}</p> {/* Optional: Zambian currency */}
          <p className="text-gray-600">{product.description}</p>
        </div>
        
        {/* Size Selector */}
        <div className="space-y-2">
          <h3 className="font-medium">Size</h3>
          <div className="flex flex-wrap gap-2">
            {product.sizes.map(size => (
              <button
                key={size}
                onClick={() => setSelectedSize(size)}
                className={`px-4 py-2 border rounded-md transition-colors ${
                  selectedSize === size 
                    ? 'bg-black text-white border-black' 
                    : 'hover:bg-gray-50 border-gray-200'
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        {/* Color Selector */}
        <div className="space-y-2">
          <h3 className="font-medium">Color</h3>
          <div className="flex flex-wrap gap-3">
            {product.colors.map(color => (
              <button
                key={color}
                onClick={() => setSelectedColor(color)}
                className={`w-10 h-10 rounded-full border-2 transition-all ${
                  selectedColor === color 
                    ? 'border-black scale-110' 
                    : 'border-transparent hover:scale-105'
                }`}
                style={{ backgroundColor: color }}
                aria-label={`${color} color option`}
                title={color}
              />
            ))}
          </div>
        </div>

        {/* Add to Cart */}
        <button 
          onClick={() => addToCart({
            ...product,
            selectedSize,
            selectedColor,
            quantity: 1,
          })}
          className={`w-full py-3 rounded-md text-white transition-colors ${
            !selectedSize || !selectedColor
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-blue-600 hover:bg-blue-700'
          }`}
          disabled={!selectedSize || !selectedColor}
        >
          {!selectedSize || !selectedColor 
            ? 'Select size and color' 
            : 'Add to Cart'
          }
        </button>

        {/* Back to Home */}
        <Link 
          to="/" 
          className="inline-flex items-center gap-1 mt-4 text-blue-600 hover:underline"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
          </svg>
          Back to products
        </Link>

      </div>
    </div>
  );
}
