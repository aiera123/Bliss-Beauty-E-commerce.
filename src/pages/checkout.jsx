// src/pages/Checkout.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/StrapiContext";
import { toast } from "react-toastify";

export default function Checkout() {
  const { cart, cartTotal, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    fullName: user?.username || "",
    email: user?.email || "",
    phone: "",
    address: "",
    city: "",
    note: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handlePlaceOrder = async () => {
    // Basic validation
    if (!form.fullName || !form.phone || !form.address || !form.city) {
      toast.error("Please fill in all required fields.");
      return;
    }
    if (cart.length === 0) {
      toast.error("Your cart is empty!");
      return;
    }

    setLoading(true);
    try {
      // Generate simple order number
      const orderNumber = "BB-" + Date.now().toString().slice(-6);

      // Save order to Strapi
      await fetch(`${import.meta.env.VITE_STRAPI_URL || "http://localhost:1337"}/api/orders`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(localStorage.getItem("strapiToken") && {
            Authorization: `Bearer ${localStorage.getItem("strapiToken")}`,
          }),
        },
        body: JSON.stringify({
          data: {
            orderNumber,
            status: "pending",
            totalAmount: cartTotal,
            items: cart,
            shippingAddress: {
              fullName: form.fullName,
              phone: form.phone,
              address: form.address,
              city: form.city,
              note: form.note,
            },
            userEmail: form.email,
          },
        }),
      });

      clearCart();
      toast.success("Order placed successfully! 🌸");
      // Pass order info to confirmation page
      navigate("/order-confirmation", {
        state: { orderNumber, total: cartTotal, name: form.fullName },
      });
    } catch (err) {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center"
        style={{ background: "linear-gradient(135deg, #fce4ec 0%, #f3e5f5 100%)" }}>
        <div className="text-center">
          <p className="text-5xl mb-4">🛒</p>
          <p className="text-gray-500 mb-4">Your cart is empty</p>
          <button onClick={() => navigate("/products")}
            className="px-6 py-3 rounded-full text-white font-semibold"
            style={{ background: "linear-gradient(90deg, #f48fb1, #ce93d8)" }}>
            Shop Now
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6"
      style={{ background: "linear-gradient(135deg, #fce4ec 0%, #f3e5f5 40%, #ede7f6 100%)" }}>

      <button onClick={() => navigate("/cart")}
        className="mb-6 flex items-center gap-2 text-purple-600 font-medium hover:text-pink-500 transition text-sm">
        ← Back to Cart
      </button>

      <div className="max-w-2xl mx-auto space-y-4">
        <h1 className="text-3xl font-bold text-purple-900 text-center mb-6">Checkout</h1>

        {/* Order summary */}
        <div className="bg-white rounded-2xl shadow p-5">
          <h2 className="font-bold text-gray-800 mb-3 text-lg">Order Summary</h2>
          <div className="space-y-2">
            {cart.map((item) => (
              <div key={item.name} className="flex justify-between text-sm">
                <span className="text-gray-600">{item.name} × {item.quantity || 1}</span>
                <span className="font-medium text-purple-700">
                  Rs. {(item.price * (item.quantity || 1)).toLocaleString()}
                </span>
              </div>
            ))}
          </div>
          <div className="border-t border-pink-100 mt-3 pt-3 flex justify-between font-bold">
            <span>Total</span>
            <span className="text-purple-700">Rs. {cartTotal.toLocaleString()}</span>
          </div>
          {/* Cash on delivery badge */}
          <div className="mt-3 flex items-center gap-2 bg-green-50 rounded-xl px-3 py-2">
            <span className="text-green-500 text-lg">💵</span>
            <span className="text-green-700 text-sm font-medium">Cash on Delivery</span>
          </div>
        </div>

        {/* Shipping form */}
        <div className="bg-white rounded-2xl shadow p-5">
          <h2 className="font-bold text-gray-800 mb-4 text-lg">Shipping Details</h2>
          <div className="space-y-3">
            {/* Full name */}
            <div>
              <label className="block text-xs font-semibold text-purple-700 mb-1 ml-1">
                Full Name <span className="text-red-400">*</span>
              </label>
              <input name="fullName" value={form.fullName} onChange={handleChange}
                placeholder="Your full name"
                className="w-full px-4 py-3 rounded-xl border border-pink-200 bg-white text-gray-800 text-sm outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-100 transition placeholder-gray-300" />
            </div>
            {/* Email */}
            <div>
              <label className="block text-xs font-semibold text-purple-700 mb-1 ml-1">Email</label>
              <input name="email" value={form.email} onChange={handleChange}
                placeholder="you@example.com" type="email"
                className="w-full px-4 py-3 rounded-xl border border-pink-200 bg-white text-gray-800 text-sm outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-100 transition placeholder-gray-300" />
            </div>
            {/* Phone */}
            <div>
              <label className="block text-xs font-semibold text-purple-700 mb-1 ml-1">
                Phone <span className="text-red-400">*</span>
              </label>
              <input name="phone" value={form.phone} onChange={handleChange}
                placeholder="98XXXXXXXX" type="tel"
                className="w-full px-4 py-3 rounded-xl border border-pink-200 bg-white text-gray-800 text-sm outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-100 transition placeholder-gray-300" />
            </div>
            {/* Address */}
            <div>
              <label className="block text-xs font-semibold text-purple-700 mb-1 ml-1">
                Address <span className="text-red-400">*</span>
              </label>
              <input name="address" value={form.address} onChange={handleChange}
                placeholder="Street address, Tole"
                className="w-full px-4 py-3 rounded-xl border border-pink-200 bg-white text-gray-800 text-sm outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-100 transition placeholder-gray-300" />
            </div>
            {/* City */}
            <div>
              <label className="block text-xs font-semibold text-purple-700 mb-1 ml-1">
                City <span className="text-red-400">*</span>
              </label>
              <input name="city" value={form.city} onChange={handleChange}
                placeholder="Kathmandu / Pokhara / Lalitpur"
                className="w-full px-4 py-3 rounded-xl border border-pink-200 bg-white text-gray-800 text-sm outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-100 transition placeholder-gray-300" />
            </div>
            {/* Note */}
            <div>
              <label className="block text-xs font-semibold text-purple-700 mb-1 ml-1">
                Order Note (optional)
              </label>
              <textarea name="note" value={form.note} onChange={handleChange}
                placeholder="Any special instructions..."
                rows={2}
                className="w-full px-4 py-3 rounded-xl border border-pink-200 bg-white text-gray-800 text-sm outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-100 transition placeholder-gray-300 resize-none" />
            </div>
          </div>
        </div>

        {/* Place order button */}
        <button
          onClick={handlePlaceOrder}
          disabled={loading}
          className="w-full py-4 rounded-full text-white font-bold text-lg shadow-lg hover:scale-[1.02] transition-all disabled:opacity-60"
          style={{ background: "linear-gradient(90deg, #f48fb1, #ce93d8, #b39ddb)" }}
        >
          {loading ? "Placing Order..." : "Place Order 🌸"}
        </button>
      </div>
    </div>
  );
}