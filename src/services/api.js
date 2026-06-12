const STRAPI_URL = import.meta.env.VITE_STRAPI_URL || 'http://localhost:1337';

const getHeaders = () => {
  const token = localStorage.getItem('strapiToken');
  return {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` }),
  };
};

const handleResponse = async (res) => {
  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    throw new Error(error?.error?.message || `Request failed: ${res.status}`);
  }
  return res.json();
};

// ── PRODUCTS ──────────────────────────────────

export const getProducts = async (params = {}) => {
  const query = new URLSearchParams();

  query.append('populate[image][fields][0]', 'url');
  query.append('populate[category][fields][0]', 'name');
  query.append('populate[category][fields][1]', 'slug');

  if (params.category) query.append('filters[category][slug][$eq]', params.category);
  if (params.minPrice !== undefined) query.append('filters[price][$gte]', params.minPrice);
  if (params.maxPrice !== undefined) query.append('filters[price][$lte]', params.maxPrice);
  if (params.search) query.append('filters[name][$containsi]', params.search);
  if (params.sort) query.append('sort', params.sort);
  if (params.page) query.append('pagination[page]', params.page);
  if (params.pageSize) query.append('pagination[pageSize]', params.pageSize);

  const res = await fetch(`${STRAPI_URL}/api/products?${query}`, { headers: getHeaders() });
  const data = await handleResponse(res);
  return {
    products: data.data.map(normalizeProduct),
    pagination: data.meta?.pagination,
  };
};

export const getProductBySlug = async (slug) => {
  const query = new URLSearchParams();
  query.append('filters[slug][$eq]', slug);
  query.append('populate[image][fields][0]', 'url');
  query.append('populate[category][fields][0]', 'name');

  const res = await fetch(`${STRAPI_URL}/api/products?${query}`, { headers: getHeaders() });
  const data = await handleResponse(res);
  if (!data.data.length) throw new Error('Product not found');
  return normalizeProduct(data.data[0]);
};

export const getProductById = async (id) => {
  const res = await fetch(
    `${STRAPI_URL}/api/products/${id}?populate[image][fields][0]=url`,
    { headers: getHeaders() }
  );
  const data = await handleResponse(res);
  return normalizeProduct(data.data);
};

// ── CATEGORIES ────────────────────────────────

export const getCategories = async () => {
  const res = await fetch(
    `${STRAPI_URL}/api/categories?populate[image][fields][0]=url`,
    { headers: getHeaders() }
  );
  const data = await handleResponse(res);
  return data.data.map(normalizeCategory);
};

export const getCategoryBySlug = async (slug) => {
  const res = await fetch(
    `${STRAPI_URL}/api/categories?filters[slug][$eq]=${slug}&populate[image][fields][0]=url`,
    { headers: getHeaders() }
  );
  const data = await handleResponse(res);
  if (!data.data.length) throw new Error('Category not found');
  return normalizeCategory(data.data[0]);
};

// ── ORDERS ────────────────────────────────────

export const createOrder = async (orderData) => {
  const res = await fetch(`${STRAPI_URL}/api/orders`, {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify({ data: orderData }),
  });
  return handleResponse(res);
};

export const getMyOrders = async () => {
  const res = await fetch(
    `${STRAPI_URL}/api/orders?filters[userEmail][$eq]=${getUserEmail()}&sort=createdAt:desc`,
    { headers: getHeaders() }
  );
  const data = await handleResponse(res);
  return data.data.map((o) => ({ id: o.id, ...o }));
};

export const getOrderById = async (id) => {
  const res = await fetch(`${STRAPI_URL}/api/orders/${id}`, { headers: getHeaders() });
  const data = await handleResponse(res);
  return { id: data.data.id, ...data.data };
};

// ── REVIEWS ───────────────────────────────────

export const createReview = async (reviewData) => {
  const res = await fetch(`${STRAPI_URL}/api/reviews`, {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify({ data: reviewData }),
  });
  return handleResponse(res);
};

// ── AUTH ──────────────────────────────────────

export const strapiLogin = async (identifier, password) => {
  const res = await fetch(`${STRAPI_URL}/api/auth/local`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ identifier, password }),
  });
  const data = await handleResponse(res);
  localStorage.setItem('strapiToken', data.jwt);
  localStorage.setItem('strapiUser', JSON.stringify(data.user));
  return data;
};

export const strapiRegister = async (username, email, password) => {
  const res = await fetch(`${STRAPI_URL}/api/auth/local/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, email, password }),
  });
  const data = await handleResponse(res);
  localStorage.setItem('strapiToken', data.jwt);
  localStorage.setItem('strapiUser', JSON.stringify(data.user));
  return data;
};

export const strapiLogout = () => {
  localStorage.removeItem('strapiToken');
  localStorage.removeItem('strapiUser');
};

export const getCurrentUser = () => {
  const user = localStorage.getItem('strapiUser');
  return user ? JSON.parse(user) : null;
};

// ── HELPERS ───────────────────────────────────

const normalizeProduct = (item) => {
  const { id, ...attributes } = item;
  const imageUrl = attributes.image?.url
    ? `${STRAPI_URL}${attributes.image.url}`
    : null;
  return {
    id,
    ...attributes,
    imageUrl,
    category: attributes.category || null,
  };
};

const normalizeCategory = (item) => {
  const { id, ...attributes } = item;
  const imageUrl = attributes.image?.url
    ? `${STRAPI_URL}${attributes.image.url}`
    : null;
  return { id, ...attributes, imageUrl };
};

const getUserEmail = () => {
  const user = getCurrentUser();
  return user?.email || '';
};

export { STRAPI_URL };