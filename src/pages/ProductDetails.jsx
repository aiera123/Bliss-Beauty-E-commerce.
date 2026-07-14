import { useParams, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { toast } from "react-toastify";
import lipgloss from "../assets/lipgloss.jpg";
import facecream from "../assets/facecream.jpg";
import perfume from "../assets/perfume.jpg";
import oil from "../assets/oil.jpg";
import blush from "../assets/blush.jpg";
import highlighter from "../assets/highlighter.jpg";

const allProducts = [
  { id: 1, name: "Lip Gloss",   brand: "Lakme",      price: 499,  category: "Makeup",     image: lipgloss,    desc: "Longlasting, Glossy lip",    rating: 4.2, features: ["Long lasting shine","Smooth texture","Hydrating formula","Perfect glossy finish","Lightweight & non-sticky"] },
  { id: 2, name: "Face Cream",  brand: "CeraVe",     price: 799,  category: "Skin",       image: facecream,   desc: "Soft & glowing skin",        rating: 4.5, features: ["Deep moisturizing","Suitable for dry skin","Non-greasy formula","Dermatologist tested","With hyaluronic acid"] },
  { id: 3, name: "Perfume",     brand: "Neutrogena", price: 1199, category: "Fragrances", image: perfume,     desc: "24 hours Fragrance",         rating: 4.7, features: ["Long lasting 24h fragrance","Floral & woody notes","Alcohol-free base","Travel-friendly size","Suitable for all occasions"] },
  { id: 4, name: "Oil",         brand: "Mamaearth",  price: 399,  category: "Hair",       image: oil,         desc: "Natural & nourishing",       rating: 4.0, features: ["100% natural ingredients","Reduces hair fall","Nourishes scalp","No harmful chemicals","Suitable for all hair types"] },
  { id: 5, name: "Blush",       brand: "Lakme",      price: 599,  category: "Makeup",     image: blush,       desc: "Natural flush of color",     rating: 3.8, features: ["Buildable coverage","Long lasting color","Silky smooth texture","Natural flush finish","Blends easily"] },
  { id: 6, name: "Highlighter", brand: "Cetaphil",   price: 699,  category: "Makeup",     image: highlighter, desc: "Add a glow to your look",    rating: 4.3, features: ["Luminous glow finish","Finely milled shimmer","Long lasting highlight","Suitable for all skin tones","Multi-use face & body"] },
{ id: 7, name: "Lipstick",    brand: "Maybelline", price: 499,  category: "Makeup",     image: lipgloss,    desc: "Rich color & hydration",     rating: 4.1, features: ["Intense color payoff","Moisturizing formula","Long lasting wear","Smooth application","Variety of shades"] },
{ id: 8, name: "Face Wash",   brand: "Himalaya",   price: 299,  category: "Skin",       image: facecream,   desc: "Gentle cleansing for skin",  rating: 4.4, features: ["Gentle on skin","Removes dirt & oil","Hydrating formula","Suitable for daily use","Dermatologically tested"] },
{ id: 9, name: "Body Lotion", brand: "Nivea",      price: 399,  category: "Skin",       image: oil,         desc: "Soft & smooth skin",         rating: 4.6, features: ["Deeply moisturizing","Non-greasy formula","Quick absorption","Suitable for all skin types","With natural oils"] },
{ id: 10,name: "Eyeliner",    brand: "Revlon",     price: 349,  category: "Makeup",     image: blush,       desc: "Precision & long wear",      rating: 4.0, features: ["Precise application","Smudge-proof formula","Long lasting wear","Intense color payoff","Suitable for all eye shapes"] },];

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const product = allProducts.find((p) => p.id === Number(id));

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center"
        style={{ background: "linear-gradient(135deg, #fce4ec 0%, #f3e5f5 100%)" }}>
        <div className="text-center">
          <p className="text-6xl mb-4">🌸</p>
          <h2 className="text-2xl font-bold text-purple-900 mb-2">Product not found</h2>
          <button onClick={() => navigate("/products")}
            className="mt-4 px-6 py-3 rounded-full text-white font-semibold"
            style={{ background: "linear-gradient(90deg, #f48fb1, #ce93d8)" }}>
            Back to Products
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6 md:p-10"
      style={{ background: "linear-gradient(135deg, #fce4ec 0%, #f3e5f5 40%, #ede7f6 100%)" }}>

      <button onClick={() => navigate("/products")}
        className="mb-6 flex items-center gap-2 text-purple-600 font-medium hover:text-pink-500 transition text-sm">
        ← Back to Products
      </button>

      <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-xl overflow-hidden">
        <div className="grid md:grid-cols-2">

          {/* Image */}
          <div className="flex items-center justify-center p-8"
            style={{ background: "linear-gradient(135deg, #fff0f5, #f3e5f5)" }}>
            <img src={product.image} alt={product.name}
              className="w-full max-w-xs object-contain rounded-2xl shadow-md"
              style={{ height: "300px" }} />
          </div>

          {/* Info */}
          <div className="p-8 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs font-semibold text-purple-400 uppercase tracking-widest">{product.brand}</span>
                <span className="text-gray-300">•</span>
                <span className="text-xs text-gray-400">{product.category}</span>
              </div>

              <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
              <p className="text-gray-400 text-sm mb-4">{product.desc}</p>

              <div className="flex items-center gap-2 mb-4">
                <div className="flex">
                  {[1,2,3,4,5].map((star) => (
                    <span key={star} className={`text-lg ${star <= Math.round(product.rating) ? "text-yellow-400" : "text-gray-200"}`}>★</span>
                  ))}
                </div>
                <span className="text-sm text-gray-400">{product.rating} out of 5</span>
              </div>

              <p className="text-3xl font-bold text-pink-600 mb-6">Rs. {product.price.toLocaleString()}</p>

              <ul className="space-y-2 mb-8">
                {product.features.map((f, i) => (
                  <li key={i} className="flex items-center gap-2 text-gray-600 text-sm">
                    <span className="text-pink-400">✓</span> {f}
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => { addToCart({ name: product.name, price: product.price, image: product.image }); toast.success(`Added: ${product.name}`); }}
                className="flex-1 py-3 rounded-full text-white font-semibold shadow-md hover:shadow-lg hover:scale-[1.02] transition-all"
                style={{ background: "linear-gradient(90deg, #f48fb1, #ce93d8)" }}>
                Add to Cart 
              </button>
              <button onClick={() => navigate("/cart")}
                className="flex-1 py-3 rounded-full text-purple-700 font-semibold border-2 border-purple-200 hover:border-purple-400 hover:bg-purple-50 transition">
                Go to Cart
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}