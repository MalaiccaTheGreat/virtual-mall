import React, { useState, useEffect, useCallback } from 'react';
import { ShoppingCart, RefreshCw, Ruler, Shirt } from 'lucide-react';
import Header from './components/Header';
import ProductGrid from './Products/ProductGrid';
import ProductCard from './components/ProductCard';
import Cart from './components/Cart';
import { products } from './data/products';

export default function App() {
  // State management
  const [cartItems, setCartItems] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [recommendedProducts, setRecommendedProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showMeasurements, setShowMeasurements] = useState(false);
  const [userPreferences, setUserPreferences] = useState({
    measurements: { height: 175, waist: 32 },
    stylePreferences: "casual"
  });

  // Load cart from localStorage
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) setCartItems(JSON.parse(savedCart));
  }, []);

  // Persist cart to localStorage
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);

  // Enhanced cart functions
  const addToCart = useCallback((product, selectedSize = null, selectedColor = null) => {
    const existingItem = cartItems.find(item => 
      item.id === product.id && 
      item.size === selectedSize && 
      item.color === selectedColor
    );

    if (existingItem) {
      setCartItems(cartItems.map(item =>
        item.id === product.id && item.size === selectedSize && item.color === selectedColor
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setCartItems([...cartItems, { 
        ...product, 
        quantity: 1,
        size: selectedSize,
        color: selectedColor
      }]);
    }
  }, [cartItems]);

  const removeFromCart = useCallback((id) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  }, [cartItems]);

  const updateQuantity = useCallback((id, newQuantity) => {
    setCartItems(cartItems.map(item => 
      item.id === id ? { ...item, quantity: Math.max(1, newQuantity) } : item
    ));
  }, [cartItems]);

  // Recommendation system
  const fetchRecommendations = useCallback(async () => {
    setIsLoading(true);
    try {
      // Mock recommendation logic
      const mockRecommendations = products
        .filter(product => 
          product.style === userPreferences.stylePreferences &&
          product.category !== "accessories"
        )
        .sort((a, b) => b.rating - a.rating)
        .slice(0, 4);

      setRecommendedProducts(mockRecommendations.map(rec => ({
        ...rec,
        isRecommended: true
      })));
    } catch (error) {
      console.error("Failed to load recommendations:", error);
    } finally {
      setIsLoading(false);
    }
  }, [userPreferences.stylePreferences]);

  // Load recommendations on mount and when preferences change
  useEffect(() => {
    fetchRecommendations();
  }, [fetchRecommendations]);

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-8">
      {/* Header with controls */}
      <Header>
        <div className="flex items-center gap-4">
          <button
            onClick={() => setShowMeasurements(true)}
            className="p-2 rounded-full hover:bg-gray-200"
            title="Update measurements"
          >
            <Ruler className="w-5 h-5" />
          </button>
          
          {isLoading ? (
            <div className="flex items-center text-sm text-gray-500">
              <RefreshCw className="w-4 h-4 mr-1 animate-spin" />
              Loading...
            </div>
          ) : (
            <button
              onClick={fetchRecommendations}
              className="text-sm text-blue-600 hover:text-blue-800 flex items-center"
              disabled={isLoading}
            >
              <RefreshCw className="w-4 h-4 mr-1" />
              Refresh
            </button>
          )}
          
          <button 
            onClick={() => setShowCart(true)}
            className="relative p-2 rounded-full hover:bg-gray-200"
            aria-label="Shopping cart"
          >
            <ShoppingCart className="w-5 h-5" />
            {cartItems.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {cartItems.reduce((sum, item) => sum + (item.quantity || 1), 0)}
              </span>
            )}
          </button>
        </div>
      </Header>

      {/* Measurements Modal */}
      {showMeasurements && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg max-w-md w-full">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Your Measurements</h2>
              <button 
                onClick={() => setShowMeasurements(false)}
                className="text-gray-500 hover:text-black"
              >
                ✕
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block mb-1">Height (cm)</label>
                <input
                  type="number"
                  value={userPreferences.measurements.height}
                  onChange={(e) => setUserPreferences({
                    ...userPreferences,
                    measurements: {
                      ...userPreferences.measurements,
                      height: Number(e.target.value)
                    }
                  })}
                  className="w-full p-2 border rounded"
                />
              </div>
              
              <div>
                <label className="block mb-1">Waist (cm)</label>
                <input
                  type="number"
                  value={userPreferences.measurements.waist}
                  onChange={(e) => setUserPreferences({
                    ...userPreferences,
                    measurements: {
                      ...userPreferences.measurements,
                      waist: Number(e.target.value)
                    }
                  })}
                  className="w-full p-2 border rounded"
                />
              </div>
              
              <div>
                <label className="block mb-1">Style Preference</label>
                <select
                  value={userPreferences.stylePreferences}
                  onChange={(e) => setUserPreferences({
                    ...userPreferences,
                    stylePreferences: e.target.value
                  })}
                  className="w-full p-2 border rounded"
                >
                  <option value="casual">Casual</option>
                  <option value="formal">Formal</option>
                  <option value="sporty">Sporty</option>
                </select>
              </div>
              
              <button
                onClick={() => {
                  setShowMeasurements(false);
                  fetchRecommendations();
                }}
                className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
              >
                Save Preferences
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main content */}
      <main className="max-w-6xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-blue-600 mb-6 md:mb-8">
          Virtual Clothing Mall
        </h1>
        
        <ProductGrid>
          {/* Recommended Products Section */}
          {recommendedProducts.length > 0 && (
            <>
              <h2 className="col-span-full text-2xl font-semibold mt-8 mb-4 text-gray-800 flex items-center">
                <Shirt className="mr-2 text-blue-500" />
                Recommended For You
              </h2>
              {recommendedProducts.map(product => (
                <ProductCard 
                  key={product.id} 
                  product={product}
                  onAddToCart={(size, color) => addToCart(product, size, color)}
                  isRecommended={true}
                />
              ))}
            </>
          )}

          {/* All Products Section */}
          <h2 className="col-span-full text-2xl font-semibold mt-8 mb-4 text-gray-800">
            All Products
          </h2>
          {products.map(product => (
            <ProductCard 
              key={product.id}
              product={product}
              onAddToCart={(size, color) => addToCart(product, size, color)}
            />
          ))}
        </ProductGrid>
      </main>

      {/* Cart Overlay */}
      {showCart && (
        <Cart 
          items={cartItems}
          onClose={() => setShowCart(false)}
          onRemove={removeFromCart}
          onUpdateQuantity={updateQuantity}
        />
      )}
    </div>
  );
}