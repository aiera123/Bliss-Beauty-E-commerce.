import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function Cart() {
  const { cart, removeFromCart, updateQuantity, cartTotal } = useCart();
  const navigate = useNavigate();

  return (
    <div
      className="min-h-screen p-6"
      style={{ background: "linear-gradient(135deg, #fce4ec 0%, #f3e5f5 40%, #ede7f6 100%)" }}
    >
      <h1 className="text-3xl font-bold text-purple-900 mb-6 text-center">My Cart</h1>

      {cart.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-5xl mb-4">🛒</p>
          <p className="text-gray-500 text-lg mb-4">Your cart is empty</p>
          <button
            onClick={() => navigate("/products")}
            className="px-6 py-2 rounded-full text-white font-semibold"
            style={{ background: "linear-gradient(90deg, #f48fb1, #ce93d8)" }}
          >
            Shop Now
          </button>
        </div>
      ) : (
        <div className="max-w-2xl mx-auto space-y-4">
          {cart.map((item) => (
            <div key={item.name} className="flex items-center gap-4 bg-white rounded-2xl p-4 shadow">
              {item.image && (
                <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded-xl flex-shrink-0" />
              )}
              <div className="flex-1">
                <p className="font-semibold text-gray-800">{item.name}</p>
                <p className="text-purple-600 font-medium">Rs. {item.price.toLocaleString()}</p>
                {/* Quantity controls */}
                <div className="flex items-center gap-2 mt-1">
                  <button
                    onClick={() => updateQuantity(item.name, (item.quantity || 1) - 1)}
                    className="w-6 h-6 rounded-full bg-pink-100 text-pink-600 font-bold text-sm hover:bg-pink-200 transition flex items-center justify-center"
                  >−</button>
                  <span className="text-sm font-semibold">{item.quantity || 1}</span>
                  <button
                    onClick={() => updateQuantity(item.name, (item.quantity || 1) + 1)}
                    className="w-6 h-6 rounded-full bg-pink-100 text-pink-600 font-bold text-sm hover:bg-pink-200 transition flex items-center justify-center"
                  >+</button>
                </div>
              </div>
              {/* Subtotal */}
              <p className="text-sm font-bold text-purple-700 mr-2">
                Rs. {(item.price * (item.quantity || 1)).toLocaleString()}
              </p>
              {/* Remove button — now uses removeFromCart from context */}
              <button
                onClick={() => {
                  removeFromCart(item.name);
                  toast.success("Removed: " + item.name);
                }}
                className="text-red-400 hover:text-red-600 text-sm font-medium transition"
              >
                Remove
              </button>
            </div>
          ))}

          {/* Total */}
          <div className="bg-white rounded-2xl p-4 shadow flex justify-between items-center">
            <span className="font-bold text-gray-800 text-lg">Total</span>
            <span className="font-bold text-purple-700 text-lg">Rs. {cartTotal.toLocaleString()}</span>
          </div>

          {/* Checkout button — now navigates to /checkout */}
          <button
            onClick={() => navigate("/checkout")}
            className="w-full py-3 rounded-full text-white font-semibold text-lg shadow-lg hover:scale-105 transition-all"
            style={{ background: "linear-gradient(90deg, #f48fb1, #ce93d8, #b39ddb)" }}
          >
            Checkout →
          </button>
        </div>
      )}
    </div>
  );
}