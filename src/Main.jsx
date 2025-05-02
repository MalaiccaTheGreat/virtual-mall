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

// Custom Error Boundary with improved error handling
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Error caught by boundary:", error, errorInfo);
    this.setState({ errorInfo });
    ReactGA.exception({
      description: `${error.toString()} - ${errorInfo.componentStack}`,
      fatal: true
    });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="p-6 bg-red-50 border-l-4 border-red-500 max-w-2xl mx-auto mt-10">
          <h2 className="text-xl font-bold text-red-700 mb-2">Something went wrong</h2>
          <p className="text-red-600 mb-4">{this.state.error.toString()}</p>
          <details className="mb-4">
            <summary className="cursor-pointer text-sm text-red-500">Error details</summary>
            <pre className="mt-2 text-xs text-red-400 overflow-auto">
              {this.state.errorInfo?.componentStack}
            </pre>
          </details>
          <button
            onClick={() => this.setState({ hasError: false })}
            className="px-4 py-2 bg-red-100 text-red-700 rounded hover:bg-red-200 transition"
          >
            Try Again
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

// Initialize GA4 with enhanced configuration
ReactGA.initialize('G-XXXXXXXXXX', {
  gaOptions: {
    cookieDomain: 'auto',
    cookieFlags: 'SameSite=None; Secure'
  }
});

// GAListener with route change tracking
function GAListener() {
  const location = useLocation();
  
  useEffect(() => {
    ReactGA.send({
      hitType: 'pageview',
      page: location.pathname + location.search,
      title: document.title
    });
    
    // Enhanced scroll tracking
    const handleScroll = () => {
      ReactGA.event({
        category: 'Scroll',
        action: 'Page scroll',
        value: Math.round((window.scrollY / document.body.scrollHeight) * 100)
      });
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [location]);

  return null;
}

// Router configuration with future flags
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
      children: [
        { index: true, element: <Welcome /> },
        { path: 'home', element: <Home /> },
        { path: 'product/:id', element: <ProductDetail /> },
        { 
          path: 'login', 
          element: <Login />,
          loader: () => {
            const user = JSON.parse(localStorage.getItem('user'));
            if (user) return window.location.replace('/home');
            return null;
          }
        },
        { 
          path: 'signup', 
          element: <Signup />,
          loader: () => {
            const user = JSON.parse(localStorage.getItem('user'));
            if (user) return window.location.replace('/home');
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
  ],
  {
    // React Router future flags
    future: {
      v7_startTransition: true,
      v7_relativeSplatPath: true,
      v7_fetcherPersist: true,
      v7_partialHydration: true
    }
  }
);

// Root component with all providers
function App() {
  return (
    <CartProvider>
      <AuthProvider>
        <TryOnProvider>
          <RouterProvider router={router} />
        </TryOnProvider>
      </AuthProvider>
    </CartProvider>
  );
}

// Render with Strict Mode
const rootElement = document.getElementById('root');
if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}