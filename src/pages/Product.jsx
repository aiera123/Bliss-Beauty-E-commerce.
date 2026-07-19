import { useNavigate, useSearchParams } from "react-router-dom";
import { useState } from "react";
import FilterSidebar from "../components/FilterSidebar";
import SortBar from "../components/SortBar";
import { useCart } from "../context/CartContext";
import { toast } from "react-toastify";
import lipgloss from "../assets/lipgloss.jpg";
import facecream from "../assets/facecream.jpg";
import perfume from "../assets/perfume.jpg";
import oil from "../assets/oil.jpg";
import blush from "../assets/blush.jpg";
import highlighter from "../assets/highlighter.jpg";

const allProducts = [
  { id: 1, name: "Lip Gloss",   price: 499,  category: "Makeup",     sub: "Lip Color",     brand: "Lakme",      rating: 4.2, skinType: null,     image: lipgloss,    desc: "Longlasting, Glossy lip" },
  { id: 2, name: "Face Cream",  price: 799,  category: "Skin",       sub: "Moisturizers",  brand: "CeraVe",     rating: 4.5, skinType: "Dry",    image: facecream,   desc: "Soft & glowing skin" },
  { id: 3, name: "Perfume",     price: 1199, category: "Fragrances", sub: "Eau de Parfum", brand: "Neutrogena", rating: 4.7, skinType: null,     image: perfume,     desc: "24 hours Fragrance" },
  { id: 4, name: "Oil",         price: 399,  category: "Hair",       sub: "Hair Oil",      brand: "Shea Moisture",  rating: 4.0, skinType: null,     image: oil,         desc: "Natural & nourishing" },
  { id: 5, name: "Blush",       price: 599,  category: "Makeup",     sub: "Blush",         brand: "Lakme",      rating: 3.8, skinType: null,     image: blush,       desc: "Natural flush of color" },
  { id: 6, name: "Highlighter", price: 699,  category: "Makeup",     sub: "Highlighter",   brand: "KayBeauty",   rating: 4.3, skinType: null,     image: highlighter, desc: "Add a glow to your look" },

];

const sortOptions = [
  { value: "featured",   label: "Featured" },
  { value: "price_asc",  label: "Price: Low to High" },
  { value: "price_desc", label: "Price: High to Low" },
  { value: "rating",     label: "Top Rated" },
  { value: "newest",     label: "Newest First" },
];

export default function Product({ search = "" }) {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { addToCart } = useCart();

  const urlCategory = searchParams.get("category") || "";
  const urlSub      = searchParams.get("sub") || "";

  const [filters, setFilters] = useState({
    skinType: [],
    brand: [],
    rating: null,
    priceMax: 5000,
  });
  const [sortBy, setSortBy] = useState("featured");
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // ── Apply filters ──
  const filtered = allProducts.filter((p) => {
    if (search && !p.name.toLowerCase().includes(search.toLowerCase())) return false;
    if (urlCategory && p.category !== urlCategory) return false;
    if (urlSub && urlSub !== "all" && p.sub !== urlSub) return false;
    if (filters.skinType.length && !filters.skinType.includes(p.skinType)) return false;
    if (filters.brand.length && !filters.brand.includes(p.brand)) return false;
    if (filters.rating && p.rating < filters.rating) return false;
    if (p.price > filters.priceMax) return false;
    return true;
  });

  // ── Apply sort ──
  const sorted = [...filtered].sort((a, b) => {
    if (sortBy === "price_asc")  return a.price - b.price;
    if (sortBy === "price_desc") return b.price - a.price;
    if (sortBy === "rating")     return b.rating - a.rating;
    if (sortBy === "newest")     return b.id - a.id;
    return 0;
  });

  return (
    <div
      className="min-h-screen p-6"
      style={{ background: "linear-gradient(135deg, #fce4ec 0%, #f3e5f5 40%, #ede7f6 100%)" }}
    >
      {/* Page heading */}
      <div className="text-center mb-6">
        <p className="text-purple-400 uppercase tracking-widest text-xs font-semibold mb-1">
          Explore
        </p>
        <h1 className="text-3xl font-bold text-purple-900">Our Products</h1>
        <div
          className="mx-auto mt-2 w-16 h-1 rounded-full"
          style={{ background: "linear-gradient(90deg, #f48fb1, #b39ddb)" }}
        />
      </div>

      {/* Mobile filter toggle */}
      <button
        onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
        className="mb-4 flex items-center gap-2 text-sm text-purple-600 font-medium border border-purple-200 bg-white rounded-xl px-4 py-2 md:hidden shadow-sm"
      >
        ⚙️ {mobileFilterOpen ? "Hide Filters" : "Show Filters"}
      </button>

      <div className="flex gap-6 items-start">

        {/* Sidebar */}
        <div className={`${mobileFilterOpen ? "block" : "hidden"} md:block flex-shrink-0`}>
          <FilterSidebar filters={filters} onChange={setFilters} />
        </div>

        {/* Main area */}
        <div className="flex-1 min-w-0">
          <SortBar
            total={sorted.length}
            sortBy={sortBy}
            onSortChange={setSortBy}
            sortOptions={sortOptions}
            category={urlCategory}
            subcategory={urlSub}
          />

          {/* No results */}
          {sorted.length === 0 ? (
            <div className="text-center py-16 text-gray-400">
              <p className="text-5xl mb-3">🔍</p>
              <p className="font-medium text-gray-500">No products found.</p>
              <button
                onClick={() => setFilters({ skinType: [], brand: [], rating: null, priceMax: 5000 })}
                className="mt-3 text-sm text-pink-500 hover:underline"
              >
                Clear all filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
              {sorted.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 overflow-hidden flex flex-col"
                >
                  {/* ── Fixed image container ── */}
                  <div
                    className="w-full cursor-pointer overflow-hidden bg-pink-50"
                    style={{ height: "180px" }}
                    onClick={() => navigate(`/products/${item.id}`)}
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                    />
                  </div>

                  {/* ── Card info ── */}
                  <div className="p-3 flex flex-col flex-1">
                    {/* Brand */}
                    <p className="text-xs text-purple-400 font-medium mb-0.5">{item.brand}</p>

                    {/* Name */}
                    <h2
                      className="font-bold text-gray-800 text-sm leading-tight mb-1 cursor-pointer hover:text-pink-600 transition line-clamp-1"
                      onClick={() => navigate(`/products/${item.id}`)}
                    >
                      {item.name}
                    </h2>

                    {/* Description */}
                    <p className="text-xs text-gray-400 mb-2 line-clamp-1">{item.desc}</p>

                    {/* Rating */}
                    <div className="flex items-center gap-1 mb-2">
                      <div className="flex">
                        {[1,2,3,4,5].map((star) => (
                          <span
                            key={star}
                            className={`text-xs ${star <= Math.round(item.rating) ? "text-yellow-400" : "text-gray-200"}`}
                          >
                            ★
                          </span>
                        ))}
                      </div>
                      <span className="text-xs text-gray-400">({item.rating})</span>
                    </div>

                    {/* Price */}
                    <p className="text-pink-600 font-bold text-sm mb-3">
                      Rs. {item.price.toLocaleString()}
                    </p>

                    {/* Buttons — pushed to bottom */}
                    <div className="flex gap-2 mt-auto">
                      <button
                        onClick={() => navigate(`/products/${item.id}`)}
                        className="flex-1 py-2 rounded-xl text-xs font-semibold border-2 border-purple-200 text-purple-600 hover:bg-purple-50 transition"
                      >
                        Details
                      </button>
                      <button
                        onClick={() => {
                          addToCart({ name: item.name, price: item.price, image: item.image });
                          toast.success(`Added: ${item.name}`);
                        }}
                        className="flex-1 py-2 rounded-xl text-xs font-semibold text-white transition hover:opacity-90"
                        style={{ background: "linear-gradient(90deg, #f48fb1, #ce93d8)" }}
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}