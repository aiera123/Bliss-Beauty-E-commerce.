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

export default function Home() {
  const { addToCart } = useCart();

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

          {/* Lip Gloss */}
          <div
            className="p-5 rounded-2xl shadow-md hover:shadow-xl hover:scale-105 transition-all duration-300 text-center"
            style={{ background: "linear-gradient(160deg, #fff0f5 0%, #fce4ec 100%)" }}
          >
            <div className="w-44 h-44 mx-auto rounded-2xl overflow-hidden shadow mb-4">
              <img src={lipgloss} alt="Lip Gloss" className="w-full h-full object-cover" />
            </div>
            <h3 className="text-xl font-bold text-pink-800">Lip Gloss</h3>
            <p className="text-pink-400 mt-1 text-sm">Shiny & long lasting</p>
            <p className="text-purple-700 font-semibold mt-1">Rs. 499</p>
            <button
              onClick={() => addToCart({ name: "Lip Gloss", price: 499, image: lipgloss })}
              className="mt-4 px-6 py-2 rounded-full text-white text-sm font-semibold shadow hover:shadow-md hover:scale-105 transition-all duration-200"
              style={{ background: "linear-gradient(90deg, #f48fb1, #ce93d8)" }}
            >
              Add to Cart
            </button>
          </div>

          {/* Face Cream */}
          <div
            className="p-5 rounded-2xl shadow-md hover:shadow-xl hover:scale-105 transition-all duration-300 text-center"
            style={{ background: "linear-gradient(160deg, #f3e5f5 0%, #ede7f6 100%)" }}
          >
            <div className="w-44 h-44 mx-auto rounded-2xl overflow-hidden shadow mb-4">
              <img src={facecream} alt="Face Cream" className="w-full h-full object-cover" />
            </div>
            <h3 className="text-xl font-bold text-purple-800">Face Cream</h3>
            <p className="text-purple-400 mt-1 text-sm">Soft & glowing skin</p>
            <p className="text-purple-700 font-semibold mt-1">Rs. 799</p>
            <button
              onClick={() => addToCart({ name: "Face Cream", price: 799, image: facecream })}
              className="mt-4 px-6 py-2 rounded-full text-white text-sm font-semibold shadow hover:shadow-md hover:scale-105 transition-all duration-200"
              style={{ background: "linear-gradient(90deg, #ce93d8, #b39ddb)" }}
            >
              Add to Cart
            </button>
          </div>

          {/* Perfume */}
          <div
            className="p-5 rounded-2xl shadow-md hover:shadow-xl hover:scale-105 transition-all duration-300 text-center"
            style={{ background: "linear-gradient(160deg, #ede7f6 0%, #e8eaf6 100%)" }}
          >
            <div className="w-44 h-44 mx-auto rounded-2xl overflow-hidden shadow mb-4">
              <img src={perfume} alt="Perfume" className="w-full h-full object-cover" />
            </div>
            <h3 className="text-xl font-bold text-indigo-800">Perfume</h3>
            <p className="text-indigo-400 mt-1 text-sm">Long lasting fragrance</p>
            <p className="text-purple-700 font-semibold mt-1">Rs. 1,199</p>
            <button
              onClick={() => addToCart({ name: "Perfume", price: 1199, image: perfume })}
              className="mt-4 px-6 py-2 rounded-full text-white text-sm font-semibold shadow hover:shadow-md hover:scale-105 transition-all duration-200"
              style={{ background: "linear-gradient(90deg, #b39ddb, #9fa8da)" }}
            >
              Add to Cart
            </button>
          </div>
 <div
            className="p-5 rounded-2xl shadow-md hover:shadow-xl hover:scale-105 transition-all duration-300 text-center"
            style={{ background: "linear-gradient(160deg, #fff0f5 0%, #fce4ec 100%)" }}
          >
            <div className="w-44 h-44 mx-auto rounded-2xl overflow-hidden shadow mb-4">
              <img src={oil} alt="Oil" className="w-full h-full object-cover" />
            </div>
            <h3 className="text-xl font-bold text-pink-800">Oil</h3>
            <p className="text-pink-400 mt-1 text-sm">Natural & nourishing</p>
            <p className="text-purple-700 font-semibold mt-1">Rs. 399</p>
            <button
              onClick={() => addToCart({ name: "Oil", price: 399, image: oil })}
              className="mt-4 px-6 py-2 rounded-full text-white text-sm font-semibold shadow hover:shadow-md hover:scale-105 transition-all duration-200"
              style={{ background: "linear-gradient(90deg, #f48fb1, #ce93d8)" }}
            >
              Add to Cart
            </button>
          </div>

 <div
            className="p-5 rounded-2xl shadow-md hover:shadow-xl hover:scale-105 transition-all duration-300 text-center"
            style={{ background: "linear-gradient(160deg, #fff0f5 0%, #fce4ec 100%)" }}
          >
            <div className="w-44 h-44 mx-auto rounded-2xl overflow-hidden shadow mb-4">
              <img src={blush} alt="Blush" className="w-full h-full object-cover" />
            </div>
            <h3 className="text-xl font-bold text-pink-800">Blush</h3>
            <p className="text-pink-400 mt-1 text-sm">Natural flush of color</p>
            <p className="text-purple-700 font-semibold mt-1">Rs. 599</p>
            <button
              onClick={() => addToCart({ name: "Blush", price: 599, image: blush })}
              className="mt-4 px-6 py-2 rounded-full text-white text-sm font-semibold shadow hover:shadow-md hover:scale-105 transition-all duration-200"
              style={{ background: "linear-gradient(90deg, #f48fb1, #ce93d8)" }}
            >
              Add to Cart
            </button>
          </div>

 <div
            className="p-5 rounded-2xl shadow-md hover:shadow-xl hover:scale-105 transition-all duration-300 text-center"
            style={{ background: "linear-gradient(160deg, #fff0f5 0%, #fce4ec 100%)" }}
          >
            <div className="w-44 h-44 mx-auto rounded-2xl overflow-hidden shadow mb-4">
              <img src={highlighter} alt="Highlighter" className="w-full h-full object-cover" />
            </div>
            <h3 className="text-xl font-bold text-pink-800">Highlighter</h3>
            <p className="text-pink-400 mt-1 text-sm">Add a glow to your look</p>
            <p className="text-purple-700 font-semibold mt-1">Rs. 699</p>
            <button
              onClick={() => addToCart({ name: "Highlighter", price: 699, image: highlighter })}
              className="mt-4 px-6 py-2 rounded-full text-white text-sm font-semibold shadow hover:shadow-md hover:scale-105 transition-all duration-200"
              style={{ background: "linear-gradient(90deg, #f48fb1, #ce93d8)" }}
            >
              Add to Cart
            </button>
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