// export const metadata = {
//   title: "AutoBid | Commercial Vehicle Auctions",
//   description: "Find, bid, and win commercial vehicles in live auctions. Discover the best deals and participate easily on AutoBid.",
// };

'use client';

import { useState } from 'react';
import { ChevronLeft, ChevronRight, Plus } from 'lucide-react';

const carImages = [
  'https://news.dupontregistry.com/wp-content/uploads/2022/09/2022-bmw-m5-cs-1.jpg',
  'https://news.dupontregistry.com/wp-content/uploads/2025/06/download-2025-06-02T120740.838-1140x570.jpeg',
  'https://news.dupontregistry.com/wp-content/uploads/2025/07/Cover-750x375.jpg',
  'https://news.dupontregistry.com/wp-content/uploads/2025/07/JC25_r0045-2018-Bugatti-Chiron-Carbon_001-1140x570.jpg',
];

export default function HomePage() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? carImages.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === carImages.length - 1 ? 0 : prev + 1));
  };

  return (
    <main className="bg-gradient-to-b from-yellow-50 to-white min-h-screen">
      {/* Hero Section */}
      <section className="relative w-full h-screen overflow-hidden rounded-b-[50px] shadow-lg">
        <img
          src={carImages[currentIndex]}
          alt={`Car ${currentIndex + 1}`}
          className="absolute inset-0 w-full h-full object-cover opacity-30"
        />
        <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between h-full px-6 sm:px-10 lg:px-20">
          <div className="w-full lg:w-1/2 max-w-xl space-y-6 text-center lg:text-left pt-20 lg:pt-0">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900">
              Auctioning Platform for{' '}
              <span className="text-blue-800">Commercial Vehicles</span>
            </h1>
          </div>
          <div className="relative w-full lg:w-1/2 h-[300px] sm:h-[400px] md:h-[500px] lg:h-[520px] flex items-end justify-center">
            <img
              src={carImages[currentIndex]}
              alt={`Car ${currentIndex + 1}`}
              className="h-full object-contain drop-shadow-2xl"
            />
            <button
              onClick={prevSlide}
              className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white text-black p-2 rounded-full shadow-md hover:scale-110 transition"
            >
              <ChevronLeft size={28} />
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white text-black p-2 rounded-full shadow-md hover:scale-110 transition"
            >
              <ChevronRight size={28} />
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}

