import React, { useState, useEffect, useCallback, useMemo } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './Context/CartContext'; // Import CartProvider
import { AuthProvider } from './context/AuthContext'; // Import AuthProvider
import { TryOnProvider } from './Context/TryOnContext'; // Import TryOnProvider
import Layout from './components/Layout';
import Home from './pages/Home';
import ProductDetail from './pages/ProductDetail';
import Checkout from './pages/Checkout';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Profile from './pages/Profile';
import NotFound from './components/NotFound';
import { products } from './data/products';
import RecommendationEngine from './services/RecommendationEngine';
import useLocalStorage from './hooks/useLocalStorage';

function App() {
  const [cartItems, setCartItems] = useLocalStorage('cart', []);
  const [showTryOn, setShowTryOn] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [recommendedProducts, setRecommendedProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showMeasurements, setShowMeasurements] = useState(false);
  const [activeCategory, setActiveCategory] = useState('all');
  const [priceRange, setPriceRange] = useState([0, 500]);
  
  const [userPreferences, setUserPreferences] = useState({
    measurements: { height: 175, waist: 32, chest: 95, inseam: 32 },
    stylePreferences: "casual",
    budget: 200,
    favoriteBrands: []
  });

  const { totalItems, cartTotal } = useMemo(() => {
    return {
      totalItems: cartItems.reduce((sum, item) => sum + (item.quantity || 1), 0),
      cartTotal: cartItems.reduce((sum, item) => sum + (item.price * (item.quantity || 1)), 0)
    };
  }, [cartItems]);

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

  const handleTryOn = useCallback((product) => {
    setCurrentProduct(product);
    setShowTryOn(true);
  }, []);

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
      setRecommendedProducts(RecommendationEngine.getLocalRecommendations(userPreferences));
    } finally {
      setIsLoading(false);
    }
  }, [userPreferences, cartItems, priceRange]);

  useEffect(() => {
    fetchRecommendations();
  }, [fetchRecommendations]);

  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      const matchesCategory = activeCategory === 'all' || product.category === activeCategory;
      const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];
      return matchesCategory && matchesPrice;
    });
  }, [activeCategory, priceRange]);

  const categories = useMemo(() => {
    const uniqueCategories = [...new Set(products.map(p => p.category))];
    return ['all', ...uniqueCategories];
  }, []);

  return (
    <CartProvider>
      <AuthProvider>
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

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <TryOnProvider>
      <App />
    </TryOnProvider>
  </React.StrictMode>
);