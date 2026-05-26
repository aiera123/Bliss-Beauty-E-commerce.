//import { useState, useEffect } from 'react';
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100">
      
      {/* Hero Section */}
      <div className="text-center py-16 bg-white text-black">
        <h1 className="text-4xl font-bold">Welcome to My Shop </h1>
        <p className="mt-2 text-gray-600">
          Best products at affordable prices
        </p>

        <Link
          to="/products"
          className="mt-6 inline-block bg-white text-black px-6 py-2 rounded-lg font-medium"
        >
          Shop Now
        </Link>
      </div>

      {/* Featured Section */}
      <div className="p-8">
        <h2 className="text-2xl font-bold mb-4">Featured Products</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          <div className="bg-white p-4 shadow rounded-lg">
            <h3 className="font-semibold">Lip Gloss</h3>
            <p className="text-sm text-gray-500">Shiny & long lasting</p>
          </div>

          <div className="bg-white p-4 shadow rounded-lg">
            <h3 className="font-semibold">Face Cream</h3>
            <p className="text-sm text-gray-500">Soft & glowing skin</p>
          </div>

          <div className="bg-white p-4 shadow rounded-lg">
            <h3 className="font-semibold">Perfume</h3>
            <p className="text-sm text-gray-500">Long lasting fragrance</p>
          </div>

        </div>
      </div>

    </div>
  );
}


