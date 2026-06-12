import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import lipgloss from "../assets/lipgloss.jpg";
import facecream from "../assets/facecream.jpg";
import perfume from "../assets/perfume.jpg";
import oil from "../assets/oil.jpg";
import blush from "../assets/blush.jpg";
import highlighter from "../assets/highlighter.jpg";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation, Autoplay } from "swiper/modules";
import banner1 from "../assets/banner1.jpg";
import banner2 from "../assets/banner2.jpg";
import banner3 from "../assets/banner3.jpg";
import banner4 from "../assets/banner4.jpg";
import { toast } from "react-toastify";
import { useProducts } from '../hooks/useProducts';

export default function Home() {
  const { addToCart } = useCart();
  const { products, loading, error } = useProducts({ featured: true });

  return (
    <div
      //className="min-h-screen"
      style={{ background: "linear-gradient(135deg, #fce4ec 0%, #f3e5f5 40%, #ede7f6 100%)" }}
    >

      {/* Hero Section */}
      <div
        className="text-center py-20 px-4 relative overflow-hidden"
        style={{
          background: "linear-gradient(135deg, #f48fb1 0%, #ce93d8 50%, #b39ddb 100%)",
        }}
      >
        {/* Decorative blobs */}
        <div className="absolute top-[-40px] left-[-40px] w-48 h-48 rounded-full opacity-20"
          style={{ background: "radial-gradient(circle, #fff, transparent)" }} />
        <div className="absolute bottom-[-30px] right-[-30px] w-36 h-36 rounded-full opacity-20"
          style={{ background: "radial-gradient(circle, #fff, transparent)" }} />

        <p className="text-white/80 uppercase tracking-[0.3em] text-xs font-semibold mb-3">
          Welcome to
        </p>
        <h1 className="text-5xl font-bold text-white drop-shadow mb-3">
          Bliss & Beauty
        </h1>
        <p className="mt-2 text-white/80 text-lg max-w-md mx-auto">
          Best products at affordable prices
        </p>

        <Link
          to="/products"
          className="mt-8 inline-block bg-white text-purple-700 px-8 py-3 rounded-full font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-200"
        >
         
          Shop Now →
        </Link>
      </div>

      {/* Carousel Section */}
      <div className="px-6 py-8">
        <div
          className="rounded-3xl overflow-hidden shadow-xl"
          style={{ background: "linear-gradient(135deg, #f8bbd0 0%, #e1bee7 100%)" }}
        >
          <Swiper
            modules={[Navigation, Autoplay]}
            navigation
            autoplay={{ delay: 3000 }}
            spaceBetween={20}
            slidesPerView={1}
            loop={true}
          >
            {[banner1, banner2, banner3, banner4].map((banner, i) => (
              <SwiperSlide key={i}>
                <div className="flex justify-center items-center h-[380px]">
                  <img
                    src={banner}
                    alt={`Banner ${i + 1}`}
                    className="h-[340px] object-cover rounded-2xl shadow-md"
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>

      {/* Featured Products Section */}
      <div className="px-6 py-8">

        {/* Section heading */}
        <div className="text-center mb-8">
          <p className="text-purple-400 uppercase tracking-widest text-xs font-semibold mb-1">
            Handpicked for you
          </p>
          <h2 className="text-3xl font-bold text-purple-900">Featured Products</h2>
          <div className="mx-auto mt-2 w-16 h-1 rounded-full"
            style={{ background: "linear-gradient(90deg, #f48fb1, #b39ddb)" }} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
  {loading ? (
    // Loading skeleton — same size as your cards
    [...Array(6)].map((_, i) => (
      <div key={i} className="p-5 rounded-2xl shadow-md animate-pulse text-center"
        style={{ background: "linear-gradient(160deg, #fff0f5 0%, #fce4ec 100%)" }}>
        <div className="w-44 h-44 mx-auto rounded-2xl bg-pink-200 mb-4" />
        <div className="h-4 bg-pink-200 rounded w-24 mx-auto mb-2" />
        <div className="h-3 bg-pink-100 rounded w-32 mx-auto mb-2" />
        <div className="h-4 bg-pink-200 rounded w-16 mx-auto" />
      </div>
    ))
  ) : (
    products.map((product) => (
      <div
        key={product.id}
        className="p-5 rounded-2xl shadow-md hover:shadow-xl hover:scale-105 transition-all duration-300 text-center"
        style={{ background: "linear-gradient(160deg, #fff0f5 0%, #fce4ec 100%)" }}
      >
        <div className="w-44 h-44 mx-auto rounded-2xl overflow-hidden shadow mb-4">
          <img
            src={product.imageUrl || lipgloss}
            alt={product.name}
            className="w-full h-full object-cover"
          />
        </div>
        <h3 className="text-xl font-bold text-pink-800">{product.name}</h3>
        <p className="text-pink-400 mt-1 text-sm">{product.description}</p>
        <p className="text-purple-700 font-semibold mt-1">Rs. {product.price}</p>
        <button
          onClick={() => {
            addToCart({ name: product.name, price: product.price, image: product.imageUrl });
            toast.success(`Added to cart: ${product.name}`);
          }}
          className="mt-4 px-6 py-2 rounded-full text-white text-sm font-semibold shadow hover:shadow-md hover:scale-105 transition-all duration-200"
          style={{ background: "linear-gradient(90deg, #f48fb1, #ce93d8)" }}
        >
          Add to Cart
        </button>
      </div>
    ))
  )}
</div>

        </div>
      </div>

      {/* Footer strip */}
      <div
        className="mt-8 py-6 text-center text-sm text-white/70"
        style={{ background: "linear-gradient(90deg, #f48fb1, #ce93d8, #b39ddb)" }}
      >
        © 2026 Bliss & Beauty · All rights reserved
      </div>

    </div>
  );
}