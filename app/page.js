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

      {/* Section Below Slider (New Content)
      <section className="text-center py-12 px-4 bg-gradient-to-b from-white to-blue-50">
  
        <div className="flex flex-col md:flex-row justify-center items-center gap-50 text-blue-800 font-semibold text-lg">
          <div><span className="text-4xl font-bold">5356</span><br />USERS ONLINE</div>
          <div><span className="text-4xl font-bold">1</span><br />VEHICLES ONLINE</div>
          <div><span className="text-4xl font-bold">1</span><br />AUCTIONS ONLINE</div>
        </div>

   
        <div className="mt-8 max-w-3xl mx-auto">
          <label className="block text-xl font-bold text-left mb-2">FIND VEHICLES</label>
          <input
            type="text"
            placeholder="type vehicle or state or yard for smart search of your vehicle"
            className="w-full px-6 py-3 rounded-full border border-blue-500 focus:outline-none"
          />
        </div>

 
        <h2 className="text-3xl font-semibold mt-12 mb-6">Ongoing Auctions</h2>
        <div className="flex justify-center flex-wrap gap-4 mb-10">
          {['MH', 'AP', 'TS', 'AR', 'AS', 'BR', 'CG', 'GA', 'More'].map((state, i) => (
            <div
              key={i}
              className="min-w-[70px] px-6 py-3 border border-blue-600 text-lg text-black rounded-md hover:bg-blue-100 transition"
            >
              {state}
            </div>
          ))}
        </div>

      
        <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-md overflow-hidden">
          <div className="flex flex-col md:flex-row gap-4 p-6">
            <img
              src="https://news.dupontregistry.com/wp-content/uploads/2025/07/Cover-750x375.jpg"
              alt="Vehicle"
              className="w-full md:w-48 h-28 object-cover rounded-md"
            />
            <div className="flex-1 text-left text-sm">
              <p className="text-blue-700 font-semibold text-base mb-1">
                #Jul 29, 2025 Vehicle Sale Jul-25_2 <br />
                <span className="text-blue-600">AUCT2025785876531</span>
              </p>
              <p>Published date: 29-07-2025 02:16:44 PM</p>
              <p>Start date: 29-07-2025 02:30:00 PM</p>
              <p>End date: 29-07-2025 06:00:00 PM</p>
              <div className="flex items-center gap-70 pt-3">
                <button className="text-blue-700 text-sm hover:text-purple-500">📄 My Bid List</button>
                <button className="text-blue-700 text-sm hover:text-purple-500">📃 View Vehicle List</button>
              </div>
            </div>
            <div className="flex items-start justify-end">
              <button className="bg-blue-600 text-white px-4 py-2 rounded-md flex items-center gap-2 hover:bg-blue-700">
                <Plus size={18} /> Place Bids
              </button>
            </div>
          </div>

          <div className="grid grid-cols-3 bg-gradient-to-r from-blue-600 to-blue-400 text-white text-center py-4 rounded-b-2xl">
            <div>
              <p className="text-xl font-bold">1</p>
              <p className="text-sm">Total Vehicles</p>
            </div>
            <div>
              <p className="text-xl font-bold">0</p>
              <p className="text-sm">Total Bids</p>
            </div>
            <div>
              <p className="text-xl font-bold">0</p>
              <p className="text-sm">My Bids</p>
            </div>
          </div>
        </div>
      </section> */}
    </main>
  );
}

