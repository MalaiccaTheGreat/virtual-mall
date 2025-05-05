import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './Context/CartContext';
import { AuthProvider } from './context/AuthContext';
import { TryOnProvider } from './Context/TryOnContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Layout from './components/Layout';
import Welcome from './pages/Welcome';
import Home from './pages/Home';
import ProductDetail from './pages/ProductDetail';
import Checkout from './pages/Checkout';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Profile from './pages/Profile';
import NotFound from './components/NotFound';

function App() {
  return (
    <CartProvider>
      <AuthProvider>
        <TryOnProvider>
          <ToastContainer position="bottom-right" autoClose={5000} />
          <Router>
            <Routes>
              {/* Welcome page with fullScreen Layout */}
              <Route path="/" element={<Layout fullScreen />}>
                <Route index element={<Welcome />} />
              </Route>
              
              {/* All other routes with standard Layout */}
              <Route path="/" element={<Layout />}>
                <Route path="home" element={<Home />} />
                <Route path="product/:id" element={<ProductDetail />} />
                <Route path="checkout" element={<Checkout />} />
                <Route path="login" element={<Login />} />
                <Route path="signup" element={<Signup />} />
                <Route path="profile" element={<Profile />} />
                <Route path="*" element={<NotFound />} />
              </Route>
            </Routes>
          </Router>
        </TryOnProvider>
      </AuthProvider>
    </CartProvider>
  );
}

export default App;