// src/components/Navbar.jsx
// Shows logged-in user name on account icon, logout option in dropdown

import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/StrapiContext";



export default function Navbar({ search, setSearch }) {

  const { user, isLoggedIn, logout } = useAuth();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [accountMenuOpen, setAccountMenuOpen] = useState(false);
  const accountRef = useRef(null);
  const { cartCount , clearCart } = useCart();

  // Close account dropdown when clicking outside
  useEffect(() => {
    const handleClick = (e) => {
      if (accountRef.current && !accountRef.current.contains(e.target)) {
        setAccountMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const handleLogout = () => {
    logout();
    clearCart();
    setAccountMenuOpen(false);
    navigate("/");
  };

  return (
    <nav className="bg-[#1976d2] text-white sticky top-0 z-50 shadow-md">
      <div className="max-w-screen-xl mx-auto px-4 py-2 flex items-center gap-4">

        {/* LEFT — Hamburger + Brand */}
        <div className="flex items-center gap-2 flex-shrink-0">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-1.5 rounded-lg hover:bg-white/10 transition md:hidden"
          >
            ☰
          </button>
          <span
            onClick={() => navigate("/")}
            className="text-xl font-bold cursor-pointer tracking-tight hover:opacity-90 transition whitespace-nowrap"
          >
            Bliss & Beauty
          </span>
        </div>

        {/* CENTER — Search */}
        <div className="flex-1 flex justify-center">
          <div className="relative w-full max-w-lg">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-white/60 pointer-events-none text-sm">
              🔍
            </span>
            <input
              type="text"
              placeholder="Search products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-white/15 hover:bg-white/25 focus:bg-white/25 text-white placeholder-white/60 rounded-lg pl-9 pr-8 py-2 text-sm outline-none transition"
            />
            {search && (
              <button
                onClick={() => setSearch("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-white/60 hover:text-white text-lg leading-none"
              >
                ×
              </button>
            )}
          </div>
        </div>

        {/* RIGHT — Cart + Account */}
        <div className="flex items-center gap-1 flex-shrink-0">
          {/* Cart */}
          <button
            onClick={() => navigate("/cart")}
            className="relative p-2 rounded-lg hover:bg-white/10 transition text-xl"
          >
            🛒
            {cartCount > 0 && (
              <span className="absolute top-1 right-1 bg-red-500 text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                {cartCount > 9 ? "9+" : cartCount}
              </span>
            )}
          </button>

          {/* Account — dropdown if logged in */}
          <div className="relative" ref={accountRef}>
            <button
              onClick={() => setAccountMenuOpen(!accountMenuOpen)}
              className="flex items-center gap-1.5 p-2 rounded-lg hover:bg-white/10 transition"
            >
              <span className="text-xl">👩🏻‍💼</span>
              {isLoggedIn && user && (
                <span className="text-xs font-medium hidden sm:block max-w-[80px] truncate">
                  {user.username || user.email?.split("@")[0]}
                </span>
              )}
            </button>

            {/* Dropdown */}
            {accountMenuOpen && (
              <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-2xl shadow-xl overflow-hidden z-50 border border-pink-100">
                {isLoggedIn ? (
                  <>
                    {/* User info */}
                    <div className="px-4 py-3 border-b border-pink-50">
                      <p className="text-xs text-gray-400">Signed in as</p>
                      <p className="text-sm font-semibold text-purple-800 truncate">
                        {user?.email}
                      </p>
                    </div>
                    <button
                      onClick={() => { navigate("/account"); setAccountMenuOpen(false); }}
                      className="w-full text-left px-4 py-3 text-sm text-gray-700 hover:bg-pink-50 transition flex items-center gap-2"
                    >
                      👤 My Account
                    </button>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-3 text-sm text-red-500 hover:bg-red-50 transition flex items-center gap-2 border-t border-pink-50"
                    >
                      🚪 Logout
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => { navigate("/account"); setAccountMenuOpen(false); }}
                      className="w-full text-left px-4 py-3 text-sm text-gray-700 hover:bg-pink-50 transition flex items-center gap-2"
                    >
                      🔑 Login
                    </button>
                    <button
                      onClick={() => { navigate("/signup"); setAccountMenuOpen(false); }}
                      className="w-full text-left px-4 py-3 text-sm text-gray-700 hover:bg-pink-50 transition flex items-center gap-2 border-t border-pink-50"
                    >
                      ✨ Sign Up
                    </button>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-white/20 px-4 py-3 flex flex-col gap-2 bg-[#1565c0]">
          <button onClick={() => { navigate("/"); setMobileMenuOpen(false); }}
            className="text-left text-sm py-2 px-3 rounded-lg hover:bg-white/10 transition">
            🏠 Home
          </button>
          <button onClick={() => { navigate("/products"); setMobileMenuOpen(false); }}
            className="text-left text-sm py-2 px-3 rounded-lg hover:bg-white/10 transition">
            🛍️ Products
          </button>
          <button onClick={() => { navigate("/cart"); setMobileMenuOpen(false); }}
            className="text-left text-sm py-2 px-3 rounded-lg hover:bg-white/10 transition">
            🛒 Cart {cartCount > 0 && `(${cartCount})`}
          </button>
        </div>
      )}
    </nav>
  );
}