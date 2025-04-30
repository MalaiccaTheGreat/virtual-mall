import { createBrowserRouter } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import ProductDetail from './components/Product/ProductDetail';
import Checkout from './pages/checkout';
import AuthWrapper from './components/AuthWrapper';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: "product/:id", element: <ProductDetail /> },
      {
        path: "checkout",
        element: (
          <AuthWrapper>
            <Checkout />
          </AuthWrapper>
        )
      }
    ]
  }
]);

export default router;