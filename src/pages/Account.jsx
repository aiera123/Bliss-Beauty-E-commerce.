// src/pages/Account.jsx
import { useState } from "react";
import { useAuth } from "../context/StrapiContext";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

export default function Account() {
  const { user, isLoggedIn, login, logout } = useAuth();
  const { cart, removeFromCart, updateQuantity, cartTotal, clearCart } = useCart();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState("cart"); // "cart" | "profile"

  const handleLogin = async () => {
    if (!email || !password) { setError("Please fill in all fields."); return; }
    setLoading(true);
    setError("");
    try {
      await login(email, password);
    } catch {
      setError("Invalid email or password.");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    clearCart();
    logout();
    navigate("/");
  };

  // ── NOT LOGGED IN ──────────────────────────────────────────
  if (!isLoggedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 py-12"
        style={{ background: "linear-gradient(135deg, #fce4ec 0%, #f3e5f5 40%, #ede7f6 100%)" }}>
        <div className="w-full max-w-sm rounded-3xl shadow-xl overflow-hidden"
          style={{ background: "linear-gradient(160deg, #fff0f5 0%, #f3e5f5 100%)" }}>
          <div className="h-2" style={{ background: "linear-gradient(90deg, #f48fb1, #ce93d8, #b39ddb)" }} />
          <div className="px-8 py-8">
            <div className="text-center mb-6">
              <div className="text-4xl mb-2">👩🏻‍💼</div>
              <h2 className="text-2xl font-bold text-purple-900">My Account</h2>
              <p className="text-sm text-pink-400 mt-1">Sign in to view your cart & profile</p>
            </div>
            {error && (
              <div className="mb-4 px-4 py-2 bg-red-50 border border-red-200 rounded-xl text-red-500 text-sm text-center">{error}</div>
            )}
            <div className="mb-4">
              <label className="block text-xs font-semibold text-purple-700 mb-1 ml-1">Email</label>
              <input type="email" placeholder="you@example.com" value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleLogin()}
                className="w-full px-4 py-3 rounded-xl border border-pink-200 bg-white text-gray-800 text-sm outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-100 transition placeholder-gray-300" />
            </div>
            <div className="mb-6">
              <label className="block text-xs font-semibold text-purple-700 mb-1 ml-1">Password</label>
              <input type="password" placeholder="••••••••" value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleLogin()}
                className="w-full px-4 py-3 rounded-xl border border-pink-200 bg-white text-gray-800 text-sm outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-100 transition placeholder-gray-300" />
            </div>
            <button onClick={handleLogin} disabled={loading}
              className="w-full py-3 rounded-full text-white font-semibold text-sm shadow-md hover:shadow-lg hover:scale-[1.02] transition-all duration-200 disabled:opacity-60"
              style={{ background: "linear-gradient(90deg, #f48fb1, #ce93d8)" }}>
              {loading ? "Signing in..." : "Sign In 🌸"}
            </button>
            <div className="flex items-center gap-3 my-5">
              <div className="flex-1 h-px bg-pink-200" />
              <span className="text-xs text-pink-300">or</span>
              <div className="flex-1 h-px bg-pink-200" />
            </div>
            <button onClick={() => navigate("/signup")}
              className="w-full py-3 rounded-full text-purple-700 font-semibold text-sm border-2 border-purple-200 hover:border-purple-400 hover:bg-purple-50 transition">
              Create an account
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ── LOGGED IN ──────────────────────────────────────────────
  return (
    <div className="min-h-screen px-4 py-10"
      style={{ background: "linear-gradient(135deg, #fce4ec 0%, #f3e5f5 40%, #ede7f6 100%)" }}>
      <div className="max-w-2xl mx-auto">

        {/* User header */}
        <div className="bg-white rounded-3xl shadow-md p-6 mb-6 flex items-center gap-4">
          <div className="w-14 h-14 rounded-full flex items-center justify-center text-2xl font-bold text-white shadow"
            style={{ background: "linear-gradient(135deg, #f48fb1, #ce93d8)" }}>
            {user?.username?.[0]?.toUpperCase() || "A"}
          </div>
          <div className="flex-1">
            <h2 className="text-lg font-bold text-purple-900">{user?.username || "User"} 🌸</h2>
            <p className="text-sm text-gray-400">{user?.email}</p>
          </div>
          <button onClick={handleLogout}
            className="text-sm text-red-400 font-medium border border-red-100 px-4 py-2 rounded-full hover:bg-red-50 transition">
            Logout
          </button>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6">
          {["cart", "profile"].map((tab) => (
            <button key={tab} onClick={() => setActiveTab(tab)}
              className={`flex-1 py-2.5 rounded-full text-sm font-semibold transition-all ${
                activeTab === tab
                  ? "text-white shadow-md"
                  : "bg-white text-gray-500 hover:bg-pink-50"
              }`}
              style={activeTab === tab ? { background: "linear-gradient(90deg, #f48fb1, #ce93d8)" } : {}}>
              {tab === "cart" ? `🛒 My Cart (${cart.length})` : "👤 Profile"}
            </button>
          ))}
        </div>

        {/* ── CART TAB ── */}
        {activeTab === "cart" && (
          <div className="bg-white rounded-3xl shadow-md overflow-hidden">
            {cart.length === 0 ? (
              <div className="text-center py-16">
                <p className="text-5xl mb-3">🛒</p>
                <p className="text-gray-500 font-medium">Your cart is empty</p>
                <button onClick={() => navigate("/products")}
                  className="mt-4 px-6 py-3 rounded-full text-white font-semibold text-sm"
                  style={{ background: "linear-gradient(90deg, #f48fb1, #ce93d8)" }}>
                  Start Shopping
                </button>
              </div>
            ) : (
              <>
                {/* Cart items */}
                <div className="divide-y divide-pink-50">
                  {cart.map((item) => (
                    <div key={item.name} className="flex items-center gap-4 p-4">
                      {/* Image */}
                      <div className="w-16 h-16 rounded-xl overflow-hidden bg-pink-50 flex-shrink-0">
                        {item.image ? (
                          <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-2xl">🌸</div>
                        )}
                      </div>

                      {/* Info */}
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-gray-800 text-sm truncate">{item.name}</p>
                        <p className="text-pink-500 font-bold text-sm">Rs. {item.price.toLocaleString()}</p>
                      </div>

                      {/* Quantity controls */}
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => updateQuantity(item.name, (item.quantity || 1) - 1)}
                          className="w-7 h-7 rounded-full bg-pink-100 text-pink-600 font-bold text-sm hover:bg-pink-200 transition flex items-center justify-center">
                          −
                        </button>
                        <span className="text-sm font-semibold w-5 text-center">{item.quantity || 1}</span>
                        <button
                          onClick={() => updateQuantity(item.name, (item.quantity || 1) + 1)}
                          className="w-7 h-7 rounded-full bg-pink-100 text-pink-600 font-bold text-sm hover:bg-pink-200 transition flex items-center justify-center">
                          +
                        </button>
                      </div>

                      {/* Remove */}
                      <button onClick={() => removeFromCart(item.name)}
                        className="text-gray-300 hover:text-red-400 transition text-lg ml-1">
                        ✕
                      </button>
                    </div>
                  ))}
                </div>

                {/* Total + actions */}
                <div className="p-4 border-t border-pink-50">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-gray-500 font-medium">Total</span>
                    <span className="text-xl font-bold text-purple-900">Rs. {cartTotal.toLocaleString()}</span>
                  </div>
                  <div className="flex gap-3">
                    <button onClick={() => navigate("/cart")}
                      className="flex-1 py-3 rounded-full text-white font-semibold text-sm shadow-md"
                      style={{ background: "linear-gradient(90deg, #f48fb1, #ce93d8)" }}>
                      Checkout 🛍️
                    </button>
                    <button onClick={clearCart}
                      className="px-4 py-3 rounded-full text-red-400 font-semibold text-sm border-2 border-red-100 hover:bg-red-50 transition">
                      Clear All
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        )}

        {/* ── PROFILE TAB ── */}
        {activeTab === "profile" && (
          <div className="bg-white rounded-3xl shadow-md p-6 space-y-4">
            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-purple-400 uppercase tracking-widest">Username</label>
              <p className="text-gray-800 font-medium">{user?.username || "—"}</p>
            </div>
            <div className="h-px bg-pink-50" />
            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-purple-400 uppercase tracking-widest">Email</label>
              <p className="text-gray-800 font-medium">{user?.email || "—"}</p>
            </div>
            <div className="h-px bg-pink-50" />
            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-purple-400 uppercase tracking-widest">Member Since</label>
              <p className="text-gray-800 font-medium">
                {user?.createdAt ? new Date(user.createdAt).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" }) : "—"}
              </p>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}