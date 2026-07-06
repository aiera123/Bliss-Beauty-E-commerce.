// src/context/CartContext.jsx
import { createContext, useContext, useState, useEffect } from "react";
import LoginModal from "../components/LoginModal";

const CartContext = createContext();

const CART_KEY = "bliss_beauty_cart";

export function CartProvider({ children }) {
  // Load cart from localStorage on first render
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem(CART_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [showLoginModal, setShowLoginModal] = useState(false);
  const [pendingProduct, setPendingProduct] = useState(null);

  // Save cart to localStorage every time it changes
  useEffect(() => {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
  }, [cart]);

  const isLoggedIn = () => !!localStorage.getItem("strapiToken");

  const addToCart = (product) => {
    if (!isLoggedIn()) {
      setPendingProduct(product);
      setShowLoginModal(true);
      return;
    }
    actuallyAddToCart(product);
  };

  const actuallyAddToCart = (product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.name === product.name);
      if (existing) {
        return prev.map((item) =>
          item.name === product.name
            ? { ...item, quantity: (item.quantity || 1) + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const handleLoginSuccess = () => {
    if (pendingProduct) {
      actuallyAddToCart(pendingProduct);
      setPendingProduct(null);
    }
  };

  const removeFromCart = (productName) => {
    setCart((prev) => prev.filter((item) => item.name !== productName));
  };

  const updateQuantity = (productName, quantity) => {
    if (quantity <= 0) { removeFromCart(productName); return; }
    setCart((prev) =>
      prev.map((item) =>
        item.name === productName ? { ...item, quantity } : item
      )
    );
  };

  // Clear cart on logout
  const clearCart = () => {
    setCart([]);
    localStorage.removeItem(CART_KEY);
  };

  const cartCount = cart.reduce((total, item) => total + (item.quantity || 1), 0);
  const cartTotal = cart.reduce((total, item) => total + item.price * (item.quantity || 1), 0);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity, clearCart, cartCount, cartTotal }}>
      {children}
      {showLoginModal && (
        <LoginModal
          onClose={() => { setShowLoginModal(false); setPendingProduct(null); }}
          onLoginSuccess={handleLoginSuccess}
        />
      )}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}