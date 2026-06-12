// src/hooks/useCategories.js
// Custom hook to fetch categories from Strapi

import { useState, useEffect } from 'react';
import { getCategories, getCategoryBySlug } from '../services/api';

// ─── Hook: Fetch all categories ───────────────────────────────────────────
export const useCategories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getCategories();
        setCategories(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  return { categories, loading, error };
};

// ─── Hook: Fetch a single category by slug ────────────────────────────────
export const useCategory = (slug) => {
  const [category, setCategory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!slug) return;

    const fetchCategory = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getCategoryBySlug(slug);
        setCategory(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCategory();
  }, [slug]);

  return { category, loading, error };
};