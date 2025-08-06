'use client';

import React from 'react';
import { useRouter } from 'next/navigation';

const categories = [
  { name: 'Car', icon: '🚗' },
  { name: 'HCV/LCV', icon: '🚛' },
  { name: 'Construction Equipment’s', icon: '🏗️' },
  { name: 'Tractors', icon: '🚜' },
  { name: 'Bike/2 Wheelers', icon: '🏍️' },
];

export default function CategoryPage() {
  const router = useRouter();

  const handleCategoryClick = (category) => {
    router.push(`/auction?category=${encodeURIComponent(category)}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-100 p-8">
      <h1 className="text-4xl font-bold text-center text-blue-900 mb-2">
        Browse Vehicle Categories
      </h1>
      <p className="text-center text-gray-700 mb-10">
        Select your preferred vehicle category to explore live auctions
      </p>

      {/* Category Cards */}
      <div className="flex flex-wrap justify-center gap-8 mb-16">
        {categories.map((cat) => (
          <div
            key={cat.name}
            onClick={() => handleCategoryClick(cat.name)}
            className="w-52 h-52 bg-white rounded-xl shadow-lg cursor-pointer hover:scale-105 transition-transform flex flex-col items-center justify-center text-blue-900"
          >
            <div className="text-5xl mb-4">{cat.icon}</div>
            <p className="text-lg font-semibold text-center">{cat.name}</p>
          </div>
        ))}
      </div>

      {/* Extra Content Section */}
      <div className="bg-white rounded-xl p-8 shadow-lg max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-purple-700 mb-6">
          Why Choose Our Auctions?
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="p-6 border border-gray-200 rounded-lg shadow-sm bg-blue-50 hover:shadow-md transition">
            <div className="text-4xl mb-3">💰</div>
            <h3 className="text-xl font-semibold mb-2">Best Prices</h3>
            <p className="text-gray-600">Bid on vehicles at competitive prices and save big on your purchase.</p>
          </div>

          <div className="p-6 border border-gray-200 rounded-lg shadow-sm bg-blue-50 hover:shadow-md transition">
            <div className="text-4xl mb-3">📦</div>
            <h3 className="text-xl font-semibold mb-2">Wide Variety</h3>
            <p className="text-gray-600">Cars, trucks, tractors, bikes, and more—browse all types of vehicles.</p>
          </div>

          <div className="p-6 border border-gray-200 rounded-lg shadow-sm bg-blue-50 hover:shadow-md transition">
            <div className="text-4xl mb-3">🕒</div>
            <h3 className="text-xl font-semibold mb-2">24/7 Access</h3>
            <p className="text-gray-600">Explore listings and place bids anytime, from any device.</p>
          </div>
        </div>
      </div>
    </div>
  );
}


