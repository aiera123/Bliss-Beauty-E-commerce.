// App.jsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { StrapiProvider } from "./context/StrapiContext";
import { Provider } from "react-redux";
import { CartProvider } from "./context/CartContext";
import { useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Home from "./pages/Home";
import Product from "./pages/Product";
import Navbar from "./components/Navbar";
import CategoryNav from "./components/CategoryNav";
import Cart from "./pages/cart";
import ProductDetails from "./pages/ProductDetails";
import Account from "./pages/Account";
 import Signup from "./pages/Signup";
export default function App() {
  const [search, setSearch] = useState("");

  return (
    <BrowserRouter>
    <StrapiProvider>
       {/* If you set up Redux, wrap with Provider and pass the store */}
      {/* <Provider store={store}> */}  
      <CartProvider>          
        <Navbar search={search} setSearch={setSearch} />
        <CategoryNav />
          < ToastContainer />
        <Routes>
          <Route path="/" element={<Home search={search} />} />
          <Route path="/products" element={<Product search={search} />} />
        <Route path="/cart" element={<Cart />} />
          <Route path="/products/:id" element={<ProductDetails />} />
          <Route path="/account" element={<Account />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </CartProvider>
      </StrapiProvider>
    </BrowserRouter>
  );
}