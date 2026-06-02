import lipgloss from "../assets/lipgloss.jpg";
import { useNavigate } from "react-router-dom";

export default function ProductDetails() {

  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-pink-50 p-10">

      <div className="grid md:grid-cols-2 gap-10 bg-white p-8 rounded-xl shadow-lg">

        {/* Product Image */}
        <div>
          <img
            src={lipgloss}
            alt="Lip Gloss"
            className="w-full max-w-md mx-auto"
          />
        </div>

        {/* Product Info */}
        <div>

          <h1 className="text-4xl font-bold mb-4">
            High Shine Lip Gloss
          </h1>

          <p className="text-2xl font-semibold text-pink-600 mb-6">
            Rs. 500
          </p>

          <ul className="space-y-3 text-gray-700 mb-8">
            <li> Long lasting shine</li>
            <li> Smooth texture</li>
            <li>Hydrating formula</li>
            <li> Perfect glossy finish</li>
            <li> Lightweight & non-sticky</li>
          </ul>

          <button
            onClick={() => navigate("/cart")}
            className="bg-black text-white px-8 py-3 rounded-lg hover:bg-gray-800"
          >
            Add To Cart
          </button>

        </div>

      </div>

    </div>
  );
}