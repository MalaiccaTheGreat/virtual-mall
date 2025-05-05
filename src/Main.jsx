import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './Context/CartContext';
import { TryOnProvider } from './Context/TryOnContext';
import Layout from './components/Layout';
import Welcome from './pages/Welcome'; // Double-check this path
import Home from './pages/Home';
import ProductDetail from './pages/ProductDetail';
import Checkout from './pages/Checkout';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Profile from './pages/Profile';
import TryOnViewer from './components/TryOnViewer';
import NotFound from './components/NotFound';
import ProtectedRoute from './components/ProtectedRoute';
import './output.css';

// Initialize GA4 (only if actually needed)
const initializeGA = () => {
  if (import.meta.env.PROD && import.meta.env.VITE_GA_TRACKING_ID) {
    import('react-ga4').then(({ initialize }) => {
      initialize(import.meta.env.VITE_GA_TRACKING_ID, {
        gaOptions: { cookieFlags: 'SameSite=None; Secure' }
      });
    });
  }
};

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Welcome />, // This must be first
      },
      {
        path: '/home',
        element: <Home />,
      },
      // ... other routes
    ]
  }
], {
  future: {
    v7_startTransition: true
  }
});

function App() {
  React.useEffect(initializeGA, []);

  return (
    <React.StrictMode>
      <AuthProvider>
        <CartProvider>
          <TryOnProvider>
            <RouterProvider router={router} />
          </TryOnProvider>
        </CartProvider>
      </AuthProvider>
    </React.StrictMode>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);