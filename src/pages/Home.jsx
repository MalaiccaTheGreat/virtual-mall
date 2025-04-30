import { useState } from 'react';
import FilterSidebar from '../components/FilterSideBar';
import ProductGrid from './components/ProductGrid';
import { products } from '../data/products';

export default function Home({ onAddToCart }) {
  const [filters, setFilters] = useState({
    colors: [],
    sizes: [],
    priceRange: [0, 100],
  });

  const filteredProducts = products.filter((product) => {
    // Color filter
    if (
      filters.colors.length > 0 &&
      !product.colors.some((color) => filters.colors.includes(color))
    ) {
      return false;
    }

    // Size filter
    if (
      filters.sizes.length > 0 &&
      (!product.sizes || !product.sizes.some((size) => filters.sizes.includes(size)))
    ) {
      return false;
    }

    // Price filter
    if (product.price < filters.priceRange[0] || product.price > filters.priceRange[1]) {
      return false;
    }

    return true;
  });

  return (
    <div className="flex gap-8">
      <FilterSidebar filters={filters} setFilters={setFilters} />
      <div className="flex-1">
        <h1 className="text-3xl md:text-4xl font-bold text-blue-600 mb-6 md:mb-8">
          Virtual Clothing Mall
        </h1>
        <ProductGrid products={filteredProducts} />
      </div>
    </div>
  );
}