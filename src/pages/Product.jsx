export default function Product({ search = "" }) {
  const products = [
    { id: 1, name: "Lip Gloss", price: "Rs. 500" },
    { id: 2, name: "Face Cream", price: "Rs. 800" },
    { id: 3, name: "Perfume", price: "Rs. 1200" },
    { id: 4, name: "Shampoo", price: "Rs. 600" },
  ];
  const filteredProducts = products.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-100 p-8">

      <h1 className="text-3xl font-bold mb-6 text-center">
        Our Products 
      </h1>

      {/* No results message */}
      {filteredProducts.length === 0 ? (
        <p className="text-center text-gray-500">
          No products found 
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          {filteredProducts.map((item) => (
            <div
              key={item.id}
              className="bg-white p-4 shadow rounded-lg hover:shadow-lg transition"
            >
              <h2 className="font-semibold text-xl">{item.name}</h2>
              <p className="text-gray-600">{item.price}</p>

              <button className="mt-3 bg-black text-white px-4 py-2 rounded hover:bg-gray-800">
                Add to Cart
              </button>
            </div>
          ))}

        </div>
      )}

    </div>
  );
}