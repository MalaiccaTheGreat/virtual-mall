import React from 'react';
import ReactDOM from 'react-dom/client';
import './output.css';
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import ProductDetail from './pages/ProductDetail';
import Checkout from './pages/Checkout';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Profile from './pages/Profile';
import TryOnViewer from './components/TryOnViewer'; // Add this import
import ReactGA from 'react-ga4';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import NotFound from '@/components/NotFound';
import { ErrorBoundary } from 'react-error-boundary';

// Initialize GA4
ReactGA.initialize('G-XXXXXXXXXX');

function ErrorFallback({ error }) {
  return (
    <div className="p-4 bg-red-100 text-red-700 rounded-lg max-w-md mx-auto mt-8">
      <h2 className="font-bold">Something went wrong</h2>
      <pre className="whitespace-pre-wrap">{error.message}</pre>
    </div>
  );
}

function GAListener() {
  const location = useLocation();
  useEffect(() => {
    ReactGA.send({ hitType: 'pageview', page: location.pathname + location.search });
  }, [location]);
  return null;
}

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <GAListener />
        <Layout />
      </ErrorBoundary>
    ),
    children: [
      { index: true, element: <Home /> },
      { path: 'product/:id', element: <ProductDetail /> },
      { path: 'login', element: <Login /> },
      { path: 'signup', element: <Signup /> },
      { 
        path: 'try-on',
        element: <TryOnViewer /> 
      },
      {
        path: 'checkout',
        element: (
          <ProtectedRoute>
            <Checkout />
          </ProtectedRoute>
        )
      },
      {
        path: 'profile',
        element: (
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        )
      },
      { path: '*', element: <NotFound /> }
    ]
  }
]);

const rootElement = document.getElementById('root');
if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <AuthProvider>
        <CartProvider>
          <RouterProvider router={router} />
        </CartProvider>
      </AuthProvider>
    </React.StrictMode>
  );
}