import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { ShoppingCart, RefreshCw, Ruler, Shirt, X, Star, ChevronDown } from 'lucide-react';
import Header from './components/Header';
import ProductGrid from './Products/ProductGrid';
import ProductCard from './components/ProductCard';
import Cart from './components/Cart';
import TryOnViewer from './components/TryOnViewer';
import { products } from './data/products';
import useLocalStorage from './hooks/useLocalStorage';
import RecommendationEngine from './services/RecommendationEngine';
import { CartProvider } from './context/CartContext'; // Import CartProvider
import { AuthProvider } from './context/AuthContext'; // Import AuthProvider if needed
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import ProductDetail from './pages/ProductDetail';
import Checkout from './pages/Checkout';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Profile from './pages/Profile';
import NotFound from './components/NotFound';

function App() {
  // State management with custom hook for localStorage
  const [cartItems, setCartItems] = useLocalStorage('cart', []);
  const [showCart, setShowCart] = useState(false);
  const [showTryOn, setShowTryOn] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [recommendedProducts, setRecommendedProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showMeasurements, setShowMeasurements] = useState(false);
  const [activeCategory, setActiveCategory] = useState('all');
  const [priceRange, setPriceRange] = useState([0, 500]);
  
  // User preferences with validation
  const [userPreferences, setUserPreferences] = useState({
    measurements: { height: 175, waist: 32, chest: 95, inseam: 32 },
    stylePreferences: "casual",
    budget: 200,
    favoriteBrands: []
  });

  // Memoized cart total and count
  const { totalItems, cartTotal } = useMemo(() => {
    return {
      totalItems: cartItems.reduce((sum, item) => sum + (item.quantity || 1), 0),
      cartTotal: cartItems.reduce((sum, item) => sum + (item.price * (item.quantity || 1)), 0)
    };
  }, [cartItems]);

  // Enhanced cart operations with useCallback
  const addToCart = useCallback((product, selectedSize = null, selectedColor = null) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => 
        item.id === product.id && 
        item.size === selectedSize && 
        item.color === selectedColor
      );

      const timestamp = new Date().toISOString();
      
      if (existingItem) {
        return prevItems.map(item =>
          item.id === product.id && item.size === selectedSize && item.color === selectedColor
            ? { 
                ...item, 
                quantity: item.quantity + 1,
                lastUpdated: timestamp
              }
            : item
        );
      }
      return [...prevItems, { 
        ...product, 
        quantity: 1,
        size: selectedSize,
        color: selectedColor,
        addedAt: timestamp,
        lastUpdated: timestamp
      }];
    });
  }, [setCartItems]);

  const removeFromCart = useCallback((id) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== id));
  }, [setCartItems]);

  const updateQuantity = useCallback((id, newQuantity) => {
    setCartItems(prevItems => 
      prevItems.map(item => 
        item.id === id 
          ? { 
              ...item, 
              quantity: Math.max(1, Math.min(99, newQuantity)),
              lastUpdated: new Date().toISOString()
            } 
          : item
      )
    );
  }, [setCartItems]);

  // Try-on handler with analytics event
  const handleTryOn = useCallback((product) => {
    setCurrentProduct(product);
    setShowTryOn(true);
    // Analytics event could be logged here
  }, []);

  // Recommendation system with service class
  const fetchRecommendations = useCallback(async () => {
    setIsLoading(true);
    try {
      const recommendations = await RecommendationEngine.getRecommendations({
        userPreferences,
        cartHistory: cartItems,
        priceRange
      });
      setRecommendedProducts(recommendations);
    } catch (error) {
      console.error("Recommendation error:", error);
      // Fallback to local recommendations
      setRecommendedProducts(RecommendationEngine.getLocalRecommendations(userPreferences));
    } finally {
      setIsLoading(false);
    }
  }, [userPreferences, cartItems, priceRange]);

  // Load recommendations on mount and when dependencies change
  useEffect(() => {
    fetchRecommendations();
  }, [fetchRecommendations]);

  // Filter products by category and price range
  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      const matchesCategory = activeCategory === 'all' || product.category === activeCategory;
      const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];
      return matchesCategory && matchesPrice;
    });
  }, [activeCategory, priceRange]);

  // Categories for filtering
  const categories = useMemo(() => {
    const uniqueCategories = [...new Set(products.map(p => p.category))];
    return ['all', ...uniqueCategories];
  }, []);

  return (
    <CartProvider> {/* Wrap the app with CartProvider */}
      <AuthProvider> {/* Optional: Wrap with AuthProvider if authentication is used */}
        <Router>
          <Layout>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/product/:id" element={<ProductDetail />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Layout>
        </Router>
      </AuthProvider>
    </CartProvider>
  );
}

export default App;