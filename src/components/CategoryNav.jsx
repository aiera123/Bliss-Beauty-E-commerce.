import { useState } from "react";
import { useNavigate } from "react-router-dom";

const categories = [
  {
    name: "Skin",
    items: [
      { label: "Moisturizers"},
      { label: "Sunscreen" },
      { label: "Serums"},
      { label: "Eye Creams" },
      { label: "Face Masks" },
      { label: "Cleansers" },
    ],
  },
  {
    name: "Hair",
    items: [
      { label: "Shampoo" },
      { label: "Conditioner" },
      { label: "Hair Oils" },
      { label: "Styling" },
      { label: "Hair Masks" },
      { label: "Growth Serums" },
    ],
  },
  {
    name: "Lifestyle",
    items: [
      { label: "Supplements" },
      { label: "Wellness" },
      { label: "Sleep Care" },
      { label: "Nutrition" },
    ],
  },
  {
    name: "Fragrances",
    items: [
      { label: "Eau de Parfum" },
      { label: "Eau de Toilette" },
      { label: "Body Mists" },
      { label: "Scented Candles" },
    ],
  },
  {
    name: "Makeup",
    items: [
      { label: "Foundation" },
      { label: "Eye Makeup" },
      { label: "Lip Color" },
      { label: "Highlighter" },
      { label: "Brushes" },
      { label: "Remover" },
    ],
  },
  {
    name: "Kid's Fashion",
    items: [
      { label: "Tops & Tees" },
      { label: "Bottoms" },
      { label: "Dresses" },
      { label: "Accessories" },
    ],
  },
  {
    name: "Gadgets",
    items: [
      { label: "Skin Devices" },
      { label: "Hair Tools" },
      { label: "Massagers" },
      { label: "Accessories" },
    ],
  },
];

export default function CategoryNav() {
  const [activeCategory, setActiveCategory] = useState(null);
  const [dropdownPos, setDropdownPos] = useState({ top: 0, left: 0 });
  const navigate = useNavigate();

  const handleMouseEnter = (catName, e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setDropdownPos({ top: rect.bottom + window.scrollY, left: rect.left });
    setActiveCategory(catName);
  };

  const handleClick = (catName, itemLabel) => {
    setActiveCategory(null);
    navigate(`/products?category=${encodeURIComponent(catName)}&sub=${encodeURIComponent(itemLabel)}`);
  };

  return (
    <div className="bg-white border-b border-gray-200 shadow-sm">
      <div
        className="flex items-center px-2"
        style={{ scrollbarWidth: "none", overflowX: "auto", overflowY: "visible" }}
      >
        {categories.map((cat) => (
          <div
            key={cat.name}
            className="relative flex-shrink-0"
            onMouseEnter={(e) => handleMouseEnter(cat.name, e)}
            onMouseLeave={() => setActiveCategory(null)}
          >
            <button
              className={`px-4 py-3 text-sm font-medium whitespace-nowrap border-b-2 transition-all duration-150 ${
                activeCategory === cat.name
                  ? "text-blue-600 border-blue-600"
                  : "text-gray-600 border-transparent hover:text-blue-500 hover:border-blue-300"
              }`}
            >
              {cat.name} <span className="text-xs opacity-50">▾</span>
            </button>
          </div>
        ))}
      </div>

      {/* Dropdown rendered outside the scroll container */}
      {activeCategory && (
        <div
          className="fixed bg-white border border-gray-200 rounded-xl shadow-2xl p-3 min-w-[230px]"
          style={{ zIndex: 99999, top: dropdownPos.top, left: dropdownPos.left }}
          onMouseEnter={() => setActiveCategory(activeCategory)}
          onMouseLeave={() => setActiveCategory(null)}
        >
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider px-2 pb-2 mb-1 border-b border-gray-100">
            {activeCategory}
          </p>

          <div className="grid grid-cols-2 gap-0.5">
            {categories
              .find((c) => c.name === activeCategory)
              ?.items.map((item) => (
                <button
                  key={item.label}
                  onClick={() => handleClick(activeCategory, item.label)}
                  className="flex items-center gap-2 px-2 py-2 rounded-lg text-sm text-gray-600 hover:bg-blue-50 hover:text-blue-600 transition-colors text-left w-full"
                >
                  <span>{item.icon}</span>
                  <span>{item.label}</span>
                </button>
              ))}
          </div>

          <div className="mt-2 pt-2 border-t border-gray-100">
            <button
              onClick={() => handleClick(activeCategory, "all")}
              className="w-full text-center text-xs text-blue-500 hover:text-blue-700 font-medium py-1"
            >
              View all {activeCategory} →
            </button>
          </div>
        </div>
      )}
    </div>
  );
}