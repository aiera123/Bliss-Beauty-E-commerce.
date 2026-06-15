// src/pages/Account.jsx
// Shows user dashboard if logged in, or login form if not

import { useState } from "react";
import { useAuth } from "../context/StrapiContext";
import { useNavigate } from "react-router-dom";

export default function Account() {
  const { user, isLoggedIn, login, logout } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

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

  // ── Logged in view ──────────────────────────
  if (isLoggedIn) {
    return (
      <div
        className="min-h-screen flex items-center justify-center px-4 py-12"
        style={{ background: "linear-gradient(135deg, #fce4ec 0%, #f3e5f5 40%, #ede7f6 100%)" }}
      >
        <div
          className="w-full max-w-sm rounded-3xl shadow-xl overflow-hidden"
          style={{ background: "linear-gradient(160deg, #fff0f5 0%, #f3e5f5 100%)" }}
        >
          <div
            className="h-2"
            style={{ background: "linear-gradient(90deg, #f48fb1, #ce93d8, #b39ddb)" }}
          />
          <div className="px-8 py-8 text-center">
            {/* Avatar */}
            <div
              className="w-20 h-20 rounded-full mx-auto mb-4 flex items-center justify-center text-3xl shadow-md"
              style={{ background: "linear-gradient(135deg, #f48fb1, #ce93d8)" }}
            >
              {user?.username?.[0]?.toUpperCase() || "👩🏻"}
            </div>

            <h2 className="text-2xl font-bold text-purple-900 mb-1">
              Hi, {user?.username || "Beautiful"} 🌸
            </h2>
            <p className="text-sm text-pink-400 mb-6">{user?.email}</p>

            {/* Quick actions */}
            <div className="space-y-3 mb-6">
              <button
                onClick={() => navigate("/orders")}
                className="w-full py-3 rounded-xl text-left px-4 bg-white shadow-sm hover:shadow-md transition flex items-center gap-3 text-gray-700 font-medium"
              >
                <span className="text-xl">📦</span> My Orders
              </button>
              <button
                onClick={() => navigate("/wishlist")}
                className="w-full py-3 rounded-xl text-left px-4 bg-white shadow-sm hover:shadow-md transition flex items-center gap-3 text-gray-700 font-medium"
              >
                <span className="text-xl">❤️</span> Wishlist
              </button>
              <button
                onClick={() => navigate("/")}
                className="w-full py-3 rounded-xl text-left px-4 bg-white shadow-sm hover:shadow-md transition flex items-center gap-3 text-gray-700 font-medium"
              >
                <span className="text-xl">🛍️</span> Continue Shopping
              </button>
            </div>

            {/* Logout */}
            <button
              onClick={() => { logout(); navigate("/"); }}
              className="w-full py-3 rounded-full text-red-400 font-semibold text-sm border-2 border-red-100 hover:border-red-300 hover:bg-red-50 transition"
            >
              🚪 Logout
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ── Not logged in view ───────────────────────
  return (
    <div
      className="min-h-screen flex items-center justify-center px-4 py-12"
      style={{ background: "linear-gradient(135deg, #fce4ec 0%, #f3e5f5 40%, #ede7f6 100%)" }}
    >
      <div
        className="w-full max-w-sm rounded-3xl shadow-xl overflow-hidden"
        style={{ background: "linear-gradient(160deg, #fff0f5 0%, #f3e5f5 100%)" }}
      >
        <div
          className="h-2"
          style={{ background: "linear-gradient(90deg, #f48fb1, #ce93d8, #b39ddb)" }}
        />
        <div className="px-8 py-8">
          <div className="text-center mb-6">
            <div className="text-4xl mb-2">👩🏻‍💼</div>
            <h2 className="text-2xl font-bold text-purple-900">My Account</h2>
            <p className="text-sm text-pink-400 mt-1">Sign in to your account</p>
          </div>

          {error && (
            <div className="mb-4 px-4 py-2 bg-red-50 border border-red-200 rounded-xl text-red-500 text-sm text-center">
              {error}
            </div>
          )}

          <div className="mb-4">
            <label className="block text-xs font-semibold text-purple-700 mb-1 ml-1">Email</label>
            <input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleLogin()}
              className="w-full px-4 py-3 rounded-xl border border-pink-200 bg-white text-gray-800 text-sm outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-100 transition placeholder-gray-300"
            />
          </div>

          <div className="mb-6">
            <label className="block text-xs font-semibold text-purple-700 mb-1 ml-1">Password</label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleLogin()}
              className="w-full px-4 py-3 rounded-xl border border-pink-200 bg-white text-gray-800 text-sm outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-100 transition placeholder-gray-300"
            />
          </div>

          <button
            onClick={handleLogin}
            disabled={loading}
            className="w-full py-3 rounded-full text-white font-semibold text-sm shadow-md hover:shadow-lg hover:scale-[1.02] transition-all duration-200 disabled:opacity-60"
            style={{ background: "linear-gradient(90deg, #f48fb1, #ce93d8)" }}
          >
            {loading ? "Signing in..." : "Sign In 🌸"}
          </button>

          <div className="flex items-center gap-3 my-5">
            <div className="flex-1 h-px bg-pink-200" />
            <span className="text-xs text-pink-300">or</span>
            <div className="flex-1 h-px bg-pink-200" />
          </div>

          <button
            onClick={() => navigate("/signup")}
            className="w-full py-3 rounded-full text-purple-700 font-semibold text-sm border-2 border-purple-200 hover:border-purple-400 hover:bg-purple-50 transition"
          >
            Create an account
          </button>
        </div>
      </div>
    </div>
  );
}