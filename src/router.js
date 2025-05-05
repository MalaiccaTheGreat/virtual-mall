import { createBrowserRouter } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import Layout from './components/Layout';
import Home from './pages/Home';
import Welcome from './pages/Welcome'; // Make sure this import exists
import AuthWrapper from './components/AuthWrapper';
import LoadingSpinner from './components/UI/LoadingSpinner';
import NotFound from './components/NotFound';

// Lazy-loaded components for better performance
const ProductDetail = lazy(() => import('./components/Product/ProductDetail'));
const Checkout = lazy(() => import('./pages/Checkout'));
const Profile = lazy(() => import('./pages/Profile'));
const TryOnViewer = lazy(() => import('./components/TryOnViewer'));
const Login = lazy(() => import('./pages/Login')); // Lazy-loaded Login component

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <NotFound />,
    children: [
      { 
        index: true, 
        element: <Welcome /> 
      },
      { 
        path: "home", 
        element: <Home /> 
      },
      { 
        path: "product/:id",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <ProductDetail />
          </Suspense>
        )
      },
      {
        path: "checkout",
        element: (
          <AuthWrapper>
            <Suspense fallback={<LoadingSpinner />}>
              <Checkout />
            </Suspense>
          </AuthWrapper>
        )
      },
      {
        path: "profile",
        element: (
          <AuthWrapper>
            <Suspense fallback={<LoadingSpinner />}>
              <Profile />
            </Suspense>
          </AuthWrapper>
        )
      },
      {
        path: "try-on",
        element: (
          <AuthWrapper>
            <Suspense fallback={<LoadingSpinner />}>
              <TryOnViewer />
            </Suspense>
          </AuthWrapper>
        )
      },
      {
        path: "login", // Added login route
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <Login />
          </Suspense>
        )
      },
      {
        path: "*",
        element: <NotFound />
      }
    ]
  }
], {
  future: {
    v7_startTransition: true, // Enable new React Router features
    v7_relativeSplatPath: true
  }
});

export default router;