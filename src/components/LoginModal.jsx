// src/components/LoginModal.jsx
// Popup that appears when customer tries to add to cart without logging in

import { useState } from "react";
import { useAuth } from "../context/StrapiContext";
import { useNavigate } from "react-router-dom";

export default function LoginModal({ onClose, onLoginSuccess }) {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [isLogin, setIsLogin] = useState(true); // toggle login/signup
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    if (!email || !password) {
      setError("Please fill in all fields.");
      return;
    }
    setLoading(true);
    setError("");
    try {
      await login(email, password);
      onLoginSuccess(); // adds item to cart after login
      onClose();
    } catch (err) {
      setError("Invalid email or password. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const goToSignup = () => {
    onClose();
    navigate("/signup");
  };

  return (
    // Backdrop
    <div
      className="fixed inset-0 z-50 flex items-center justify-center px-4"
      style={{ background: "rgba(0,0,0,0.45)", backdropFilter: "blur(4px)" }}
      onClick={onClose}
    >
      {/* Modal box — stop click from closing when clicking inside */}
      <div
        className="relative w-full max-w-sm rounded-3xl shadow-2xl overflow-hidden"
        style={{ background: "linear-gradient(160deg, #fff0f5 0%, #f3e5f5 100%)" }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top accent bar */}
        <div
          className="h-2 w-full"
          style={{ background: "linear-gradient(90deg, #f48fb1, #ce93d8, #b39ddb)" }}
        />

        <div className="px-8 py-7">
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-5 text-gray-400 hover:text-gray-600 text-2xl leading-none transition"
          >
            ×
          </button>

          {/* Icon + heading */}
          <div className="text-center mb-6">
            <div className="text-4xl mb-2">🛍️</div>
            <h2 className="text-2xl font-bold text-purple-900">Login to continue</h2>
            <p className="text-sm text-pink-400 mt-1">
              Sign in to add items to your cart
            </p>
          </div>

          {/* Error message */}
          {error && (
            <div className="mb-4 px-4 py-2 bg-red-50 border border-red-200 rounded-xl text-red-500 text-sm text-center">
              {error}
            </div>
          )}

          {/* Email */}
          <div className="mb-4">
            <label className="block text-xs font-semibold text-purple-700 mb-1 ml-1">
              Email
            </label>
            <input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
              className="w-full px-4 py-3 rounded-xl border border-pink-200 bg-white text-gray-800 text-sm outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-100 transition placeholder-gray-300"
            />
          </div>

          {/* Password */}
          <div className="mb-6">
            <label className="block text-xs font-semibold text-purple-700 mb-1 ml-1">
              Password
            </label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
              className="w-full px-4 py-3 rounded-xl border border-pink-200 bg-white text-gray-800 text-sm outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-100 transition placeholder-gray-300"
            />
          </div>

          {/* Login button */}
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full py-3 rounded-full text-white font-semibold text-sm shadow-md hover:shadow-lg hover:scale-[1.02] active:scale-100 transition-all duration-200 disabled:opacity-60"
            style={{ background: "linear-gradient(90deg, #f48fb1, #ce93d8)" }}
          >
            {loading ? "Signing in..." : "Sign In 🌸"}
          </button>

          {/* Divider */}
          <div className="flex items-center gap-3 my-5">
            <div className="flex-1 h-px bg-pink-200" />
            <span className="text-xs text-pink-300">or</span>
            <div className="flex-1 h-px bg-pink-200" />
          </div>

          {/* Go to signup */}
          <button
            onClick={goToSignup}
            className="w-full py-3 rounded-full text-purple-700 font-semibold text-sm border-2 border-purple-200 hover:border-purple-400 hover:bg-purple-50 transition-all duration-200"
          >
            Create an account
          </button>

          <p className="text-center text-xs text-gray-400 mt-4">
            You need an account to shop with us 💜
          </p>
        </div>
      </div>
    </div>
  );
}