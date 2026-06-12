// src/components/ProductGrid.jsx
// Displays a grid of products — fetches from Strapi via useProducts hook

import { useProducts } from '../hooks/useProducts';
import ProductCard from './ProductCard';

// Loading skeleton card
const SkeletonCard = () => (
  <div className="bg-white rounded-2xl overflow-hidden shadow-sm animate-pulse">
    <div className="aspect-square bg-pink-100" />
    <div className="p-3 space-y-2">
      <div className="h-3 bg-pink-100 rounded w-3/4" />
      <div className="h-3 bg-pink-100 rounded w-1/2" />
      <div className="h-4 bg-pink-100 rounded w-1/3" />
    </div>
  </div>
);

const ProductGrid = ({ filters = {}, title }) => {
  const { products, loading, error, pagination } = useProducts(filters);

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-4xl mb-3">😔</p>
        <p className="text-gray-500 font-medium">Couldn't load products</p>
        <p className="text-gray-400 text-sm mt-1">{error}</p>
        <p className="text-gray-400 text-xs mt-2">Make sure Strapi is running at localhost:1337</p>
      </div>
    );
  }

  return (
    <section>
      {title && (
        <h2 className="text-xl font-bold text-gray-800 mb-4">{title}</h2>
      )}

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {loading
          ? Array.from({ length: 8 }).map((_, i) => <SkeletonCard key={i} />)
          : products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
      </div>

      {!loading && products.length === 0 && (
        <div className="text-center py-16">
          <p className="text-4xl mb-3">🌸</p>
          <p className="text-gray-500">No products found</p>
        </div>
      )}

      {/* Pagination info */}
      {pagination && (
        <p className="text-center text-sm text-gray-400 mt-6">
          Showing {products.length} of {pagination.total} products
        </p>
      )}
    </section>
  );
};

export default ProductGrid;