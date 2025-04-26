import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { products } from '../data/products';
import { useCart } from '@/Context/CartContext'; // Using alias '@'


export default function ProductDetail() {
  const { id } = useParams();
  const product = products.find(p => p.id === Number(id));
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const { addToCart } = useCart();

  if (!product) return <div>Product not found</div>;

  return (
    <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8">
      {/* Image Gallery */}
      <div className="bg-white p-4 rounded-lg shadow">
        <img 
          src={product.image} 
          alt={product.name}
          className="w-full h-auto max-h-[500px] object-contain"
        />
      </div>

      {/* Product Info */}
      <div>
        <h1 className="text-3xl font-bold">{product.name}</h1>
        <p className="text-2xl my-4">${product.price.toFixed(2)}</p>
        
        {/* Size Selector */}
        <div className="my-6">
          <h3 className="font-medium mb-2">Size</h3>
          <div className="flex gap-2">
            {product.sizes.map(size => (
              <button
                key={size}
                onClick={() => setSelectedSize(size)}
                className={`px-4 py-2 border rounded ${
                  selectedSize === size 
                    ? 'bg-black text-white border-black' 
                    : 'hover:bg-gray-100'
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        {/* Color Selector */}
        <div className="my-6">
          <h3 className="font-medium mb-2">Color</h3>
          <div className="flex gap-2">
            {product.colors.map(color => (
              <button
                key={color}
                onClick={() => setSelectedColor(color)}
                className={`w-10 h-10 rounded-full border-2 ${
                  selectedColor === color ? 'border-black' : 'border-transparent'
                }`}
                style={{ backgroundColor: color }}
                aria-label={color}
              />
            ))}
          </div>
        </div>

        {/* Add to Cart Button */}
        <button 
          onClick={() => addToCart({
            ...product,
            selectedSize,
            selectedColor,
            quantity: 1
          })}
          className="w-full bg-blue-500 text-white py-3 rounded hover:bg-blue-600 mt-6"
          disabled={!selectedSize || !selectedColor}
        >
          Add to Cart
        </button>

        <Link 
          to="/" 
          className="inline-block mt-4 text-blue-500 hover:underline"
        >
          ← Back to products
        </Link>
      </div>
    </div>
  );
}