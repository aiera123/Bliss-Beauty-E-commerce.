// src/context/CartContext.jsx
// Cart context — shows login popup if customer is not logged in

import { createContext, useContext, useState } from "react";
import LoginModal from "../components/LoginModal";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [pendingProduct, setPendingProduct] = useState(null); // product waiting to be added

  // Check if user is logged in via Strapi token
  const isLoggedIn = () => !!localStorage.getItem("strapiToken");

  const addToCart = (product) => {
    if (!isLoggedIn()) {
      // Not logged in — save product and show login popup
      setPendingProduct(product);
      setShowLoginModal(true);
      return;
    }
    // Logged in — add to cart directly
    actuallyAddToCart(product);
  };

  const actuallyAddToCart = (product) => {
    setCart((prev) => {
      // If product already in cart, increase quantity
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

  // Called after successful login — adds the pending product
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
    if (quantity <= 0) {
      removeFromCart(productName);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.name === productName ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => setCart([]);

  const cartCount = cart.reduce((total, item) => total + (item.quantity || 1), 0);
  const cartTotal = cart.reduce(
    (total, item) => total + item.price * (item.quantity || 1),
    0
  );

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartCount,
        cartTotal,
      }}
    >
      {children}

      {/* Login modal — shown automatically when needed */}
      {showLoginModal && (
        <LoginModal
          onClose={() => {
            setShowLoginModal(false);
            setPendingProduct(null);
          }}
          onLoginSuccess={handleLoginSuccess}
        />
      )}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}