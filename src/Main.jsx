import React from 'react';
import ReactDOM from 'react-dom/client';
import './output.css';
import { CartProvider } from './Context/CartContext';
import { AuthProvider } from './context/AuthContext';
import { TryOnProvider } from './context/TryOnContext';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Welcome from './pages/Welcome'; // Add new Welcome page import
import ProductDetail from './pages/ProductDetail';
import Checkout from './pages/Checkout';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Profile from './pages/Profile';
import TryOnViewer from './components/TryOnViewer';
import ReactGA from 'react-ga4';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import NotFound from './components/NotFound';

// Custom Error Boundary
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Error caught by boundary:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="p-4 bg-red-100 text-red-700 rounded-lg max-w-md mx-auto mt-8">
          <h2 className="font-bold">Something went wrong</h2>
          <pre className="whitespace-pre-wrap">{this.state.error.message}</pre>
          <button 
            onClick={() => this.setState({ hasError: false })}
            className="mt-2 text-blue-600 hover:underline"
          >
            Try Again
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

// Initialize GA4
ReactGA.initialize('G-XXXXXXXXXX'); // Replace with your actual GA4 tracking ID

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
      <ErrorBoundary>
        <GAListener />
        <Layout />
      </ErrorBoundary>
    ),
    children: [
      { index: true, element: <Welcome /> }, // Changed to Welcome as landing page
      { path: 'home', element: <Home /> }, // Moved Home to separate route
      { path: 'product/:id', element: <ProductDetail /> },
      { 
        path: 'login', 
        element: <Login />,
        loader: () => {
          // Redirect to home if already logged in
          const user = JSON.parse(localStorage.getItem('user'));
          if (user) {
            return window.location.replace('/home');
          }
          return null;
        }
      },
      { 
        path: 'signup', 
        element: <Signup />,
        loader: () => {
          // Redirect to home if already logged in
          const user = JSON.parse(localStorage.getItem('user'));
          if (user) {
            return window.location.replace('/home');
          }
          return null;
        }
      },
      { path: 'try-on', element: <TryOnViewer /> },
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
      <CartProvider>
        <AuthProvider>
          <TryOnProvider>
            <RouterProvider router={router} />
          </TryOnProvider>
        </AuthProvider>
      </CartProvider>
    </React.StrictMode>
  );
}