// src/pages/OrderConfirmation.jsx
import { useLocation, useNavigate } from "react-router-dom";

export default function OrderConfirmation() {
  const { state } = useLocation();
  const navigate = useNavigate();

  const { orderNumber, total, name } = state || {};

  return (
    <div className="min-h-screen flex items-center justify-center px-4"
      style={{ background: "linear-gradient(135deg, #fce4ec 0%, #f3e5f5 40%, #ede7f6 100%)" }}>
      <div className="w-full max-w-sm bg-white rounded-3xl shadow-xl overflow-hidden text-center">
        <div className="h-2" style={{ background: "linear-gradient(90deg, #f48fb1, #ce93d8, #b39ddb)" }} />
        <div className="p-8">
          {/* Success icon */}
          <div className="text-6xl mb-4">🎉</div>
          <h1 className="text-2xl font-bold text-purple-900 mb-2">Order Placed!</h1>
          <p className="text-gray-500 mb-6">
            Thank you {name}! Your order has been placed successfully.
          </p>

          {/* Order details */}
          <div className="bg-pink-50 rounded-2xl p-4 mb-6 text-left space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Order Number</span>
              <span className="font-bold text-purple-700">{orderNumber}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Total</span>
              <span className="font-bold text-purple-700">Rs. {total?.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Payment</span>
              <span className="font-bold text-green-600">Cash on Delivery 💵</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Status</span>
              <span className="font-bold text-orange-500">Pending 🕐</span>
            </div>
          </div>

          <p className="text-sm text-gray-400 mb-6">
            Our team will contact you on your phone number to confirm delivery. 🌸
          </p>

          {/* Buttons */}
          <div className="space-y-3">
            <button onClick={() => navigate("/products")}
              className="w-full py-3 rounded-full text-white font-semibold shadow-md"
              style={{ background: "linear-gradient(90deg, #f48fb1, #ce93d8)" }}>
              Continue Shopping
            </button>
            <button onClick={() => navigate("/account")}
              className="w-full py-3 rounded-full text-purple-700 font-semibold border-2 border-purple-200 hover:bg-purple-50 transition">
              View My Account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}