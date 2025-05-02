import React from 'react';
import ReactDOM from 'react-dom/client';
import './output.css';
import { CartProvider } from './Context/CartContext';
import { AuthProvider } from './context/AuthContext';
import { TryOnProvider } from './context/TryOnContext';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Welcome from './pages/Welcome';
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

// Initialize GA4 before any components
ReactGA.initialize('G-XXXXXXXXXX', {
  gaOptions: {
    cookieDomain: 'auto',
    cookieFlags: 'SameSite=None; Secure'
  }
});

// Error Boundary Component (standalone)
class ErrorBoundary extends React.Component {
  state = { hasError: false, error: null };

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Application Error:", error, errorInfo);
    ReactGA.event({
      category: 'Error',
      action: 'Component Error',
      label: error.toString()
    });
  }

  handleReset = () => {
    this.setState({ hasError: false });
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-fallback">
          <h2>Something went wrong</h2>
          <button onClick={this.handleReset}>Try Again</button>
        </div>
      );
    }
    return this.props.children;
  }
}

// GAListener Component (standalone)
function GAListener() {
  const location = useLocation();

  useEffect(() => {
    ReactGA.send({
      hitType: 'pageview',
      page: location.pathname,
      title: document.title
    });
  }, [location]);

  return null;
}

// Main Router Configuration
const router = createBrowserRouter(
  [
    {
      path: '/',
      element: (
        <ErrorBoundary>
          <GAListener />
          <Layout />
        </ErrorBoundary>
      ),
      errorElement: <ErrorBoundary />,
      children: [
        { index: true, element: <Welcome /> },
        { path: 'home', element: <Home /> },
        { path: 'product/:id', element: <ProductDetail /> },
        { 
          path: 'login',
          element: <Login />,
          loader: async () => {
            const user = JSON.parse(localStorage.getItem('user'));
            return user ? { redirect: '/home' } : null;
          }
        },
        { 
          path: 'signup',
          element: <Signup />,
          loader: async () => {
            const user = JSON.parse(localStorage.getItem('user'));
            return user ? { redirect: '/home' } : null;
          }
        },
        { path: 'try-on', element: <TryOnViewer /> },
        {
          path: 'checkout',
          element: <ProtectedRoute><Checkout /></ProtectedRoute>,
        },
        {
          path: 'profile',
          element: <ProtectedRoute><Profile /></ProtectedRoute>,
        },
        { path: '*', element: <NotFound /> }
      ]
    }
  ],
  {
    future: {
      v7_startTransition: true,
      v7_relativeSplatPath: true,
      v7_fetcherPersist: true
    }
  }
);

// Main App Component
function App() {
  return (
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

// Render
const rootElement = document.getElementById('root');
if (rootElement) {
  ReactDOM.createRoot(rootElement).render(<App />);
}