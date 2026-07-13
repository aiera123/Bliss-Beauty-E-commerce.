// src/pages/Signup.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/StrapiContext";
import { toast } from "react-toastify";

export default function Signup() {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();
    if (!username || !email || !password) {
      setError("Please fill in all fields.");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }
    setLoading(true);
    setError("");
    try {
      await register(username, email, password);
      toast.success("Account created! Welcome to Bliss & Beauty 🌸");
      navigate("/"); // redirect to home after signup
    } catch (err) {
      setError(err.message || "Signup failed. Try a different email.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4 py-12"
      style={{ background: "linear-gradient(135deg, #fce4ec 0%, #f3e5f5 40%, #ede7f6 100%)" }}
    >
      <div
        className="w-full max-w-sm rounded-3xl shadow-xl overflow-hidden"
        style={{ background: "linear-gradient(160deg, #fff0f5 0%, #f3e5f5 100%)" }}
      >
        {/* Top accent bar */}
        <div className="h-2" style={{ background: "linear-gradient(90deg, #f48fb1, #ce93d8, #b39ddb)" }} />

        <div className="px-8 py-8">
          {/* Header */}
          <div className="text-center mb-6">
            <div className="text-4xl mb-2">🌸</div>
            <h2 className="text-2xl font-bold text-purple-900">Create Account</h2>
            <p className="text-sm text-pink-400 mt-1">Join Bliss & Beauty today</p>
          </div>

          {/* Error */}
          {error && (
            <div className="mb-4 px-4 py-2 bg-red-50 border border-red-200 rounded-xl text-red-500 text-sm text-center">
              {error}
            </div>
          )}

          <form onSubmit={handleSignup} className="space-y-4">
            {/* Username */}
            <div>
              <label className="block text-xs font-semibold text-purple-700 mb-1 ml-1">
                Username
              </label>
              <input
                type="text"
                placeholder="yourname"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-pink-200 bg-white text-gray-800 text-sm outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-100 transition placeholder-gray-300"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-xs font-semibold text-purple-700 mb-1 ml-1">
                Email
              </label>
              <input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-pink-200 bg-white text-gray-800 text-sm outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-100 transition placeholder-gray-300"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-xs font-semibold text-purple-700 mb-1 ml-1">
                Password
              </label>
              <input
                type="password"
                placeholder="min. 6 characters"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-pink-200 bg-white text-gray-800 text-sm outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-100 transition placeholder-gray-300"
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-full text-white font-semibold text-sm shadow-md hover:shadow-lg hover:scale-[1.02] transition-all duration-200 disabled:opacity-60 mt-2"
              style={{ background: "linear-gradient(90deg, #f48fb1, #ce93d8)" }}
            >
              {loading ? "Creating account..." : "Sign Up 🌸"}
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-3 my-5">
            <div className="flex-1 h-px bg-pink-200" />
            <span className="text-xs text-pink-300">already have an account?</span>
            <div className="flex-1 h-px bg-pink-200" />
          </div>

          {/* Go to login */}
          <button
            onClick={() => navigate("/account")}
            className="w-full py-3 rounded-full text-purple-700 font-semibold text-sm border-2 border-purple-200 hover:border-purple-400 hover:bg-purple-50 transition"
          >
            Sign In
          </button>
        </div>
      </div>
    </div>
  );
}