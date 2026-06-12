import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function Cart() {
  const { cart, setCart } = useCart();
  const navigate = useNavigate();

  const removeFromCart = (index) => {
    setCart(cart.filter((_, i) => i !== index));
  };

  const total = cart.reduce((sum, item) => sum + item.price, 0);

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
          {cart.map((item, index) => (
            <div
              key={index}
              className="flex items-center gap-4 bg-white rounded-2xl p-4 shadow"
            >
              {item.image && (
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-16 h-16 object-cover rounded-xl"
                />
              )}
              <div className="flex-1">
                <p className="font-semibold text-gray-800">{item.name}</p>
                <p className="text-purple-600 font-medium">Rs. {item.price.toLocaleString()}</p>
              </div>
              <button
                onClick={(e) => {
                  removeFromCart(index);
                  toast.success("Removed from cart: " + item.name);
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
            <span className="font-bold text-purple-700 text-lg">
              Rs. {total.toLocaleString()}
            </span>
          </div>

          <button
            className="w-full py-3 rounded-full text-white font-semibold text-lg shadow-lg hover:scale-105 transition-all"
            style={{ background: "linear-gradient(90deg, #f48fb1, #ce93d8, #b39ddb)" }}
          >
            Checkout
          </button>
        </div>
      )}
    </div>
  );
}