import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function Navbar({ search, setSearch }) {
  const { cart } = useCart();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
          <button
            onClick={() => navigate("/cart")}
            className="relative p-2 rounded-lg hover:bg-white/10 transition text-xl"
          >
            🛒
            {cart.length > 0 && (
              <span className="absolute top-1 right-1 bg-red-500 text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                {cart.length > 9 ? "9+" : cart.length}
              </span>
            )}
          </button>

          <button
            onClick={() => navigate("/account")}
            className="p-2 rounded-lg hover:bg-white/10 transition text-xl"
          >
            👩🏻‍💼
          </button>
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
            🛒 Cart {cart.length > 0 && `(${cart.length})`}
          </button>
        </div>
      )}
    </nav>
  );
}