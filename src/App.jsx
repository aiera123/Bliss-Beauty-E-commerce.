// App.jsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "./context/CartContext";
import { useState } from "react";

import Home from "./pages/Home";
import Product from "./pages/Product";
import Navbar from "./components/Navbar";
import CategoryNav from "./components/CategoryNav";
import Cart from "./pages/cart";
import ProductDetails from "./pages/ProductDetails";
import Account from "./pages/Account";

export default function App() {
  const [search, setSearch] = useState("");

  return (
    <BrowserRouter>
      <CartProvider>          {/* ✅ CartProvider wraps EVERYTHING including Navbar */}
        <Navbar search={search} setSearch={setSearch} />
        <CategoryNav />
        <Routes>
          <Route path="/" element={<Home search={search} />} />
          <Route path="/products" element={<Product search={search} />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/products/:id" element={<ProductDetails />} />
          <Route path="/account" element={<Account />} />
        </Routes>
      </CartProvider>
    </BrowserRouter>
  );
}