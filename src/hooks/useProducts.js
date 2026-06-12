// src/hooks/useProducts.js
// Custom hook to fetch products from Strapi with loading/error states

import { useState, useEffect, useCallback } from 'react';
import { getProducts, getProductBySlug } from '../services/api';

// ─── Hook: Fetch a list of products with filters ───────────────────────────
export const useProducts = (params = {}) => {
  const [products, setProducts] = useState([]);
  const [pagination, setPagination] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Serialize params to re-run effect when filters change
  const paramsKey = JSON.stringify(params);

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await getProducts(params);
      setProducts(result.products);
      setPagination(result.pagination);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [paramsKey]); // eslint-disable-line

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return { products, pagination, loading, error, refetch: fetchProducts };
};

// ─── Hook: Fetch a single product by slug ─────────────────────────────────
export const useProduct = (slug) => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!slug) return;

    const fetchProduct = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getProductBySlug(slug);
        setProduct(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [slug]);

  return { product, loading, error };
};

// ─── Hook: Fetch featured products for homepage ───────────────────────────
export const useFeaturedProducts = () => {
  return useProducts({ featured: true, pageSize: 8 });
};

// ─── Hook: Fetch new arrivals ─────────────────────────────────────────────
export const useNewArrivals = () => {
  return useProducts({ isNew: true, pageSize: 8 });
};