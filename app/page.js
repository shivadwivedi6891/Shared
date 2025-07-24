'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Eye, Clock, MapPin, Search } from 'lucide-react';

export default function HomePage() {
  const [searchTerm, setSearchTerm] = useState('');

  const cars = [
    {
      id: 1,
      name: 'Rolls-Royce Phantom Ultra Luxury',
      price: 485000,
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTpU2XqzCYUZgGzb-pAlgKoQJ-IlApC9B442Q&s',
      location: 'San Jose, CA',
      timeLeft: '4d 6h',
      watchers: 212,
      bids: 61,
    },
    {
      id: 2,
      name: 'Mercedes AMG GT Limited Edition',
      price: 155000,
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSIGDX6A6DLidp0OkcRUC1wQ3xCmmWzlUq-Ew&s',
      location: 'Berlin, DE',
      timeLeft: '2d 3h',
      watchers: 143,
      bids: 35,
    },
    {
      id: 3,
      name: 'Bentley Continental GT',
      price: 245000,
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRvFEKzSTu1G3jMFRDDKEp_3sIVWIimOJA-Ow&s',
      location: 'Paris, FR',
      timeLeft: '12h 20m',
      watchers: 197,
      bids: 49,
    },
  ];

  const filteredCars = cars.filter((car) =>
    car.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <main className="bg-black text-white min-h-screen font-sans">
     
      <section
        className="relative flex flex-col justify-center items-center text-center px-6 py-32 sm:py-40 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('https://images.pexels.com/photos/358070/pexels-photo-358070.jpeg')",
        }}
      >
        <div className="absolute inset-0 bg-black/80 backdrop-blur-md" />
        <div className="relative z-10 max-w-2xl">
          <h1 className="text-4xl sm:text-6xl font-bold leading-tight tracking-tight bg-gradient-to-r from-white via-gray-300 to-white text-transparent bg-clip-text drop-shadow-xl">
            Discover Premium Car Auctions
          </h1>
          <p className="mt-4 text-lg sm:text-xl text-gray-300">
            Bid on rare luxury vehicles from top cities across the world.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/auctions">
              <button className="px-6 py-3 rounded-xl bg-white text-black font-semibold hover:scale-105 transition shadow-lg hover:shadow-xl shine-effect">
                Explore Auctions
              </button>
            </Link>
            <Link href="/login">
              <button className="px-6 py-3 rounded-xl border border-white text-white hover:bg-white/10 transition shadow hover:shadow-md">Sell a Car</button>
            </Link>
          </div>
        </div>
      </section>

      <section className="py-20 px-6 sm:px-12 lg:px-20 bg-gradient-to-br from-gray-950 to-black">
        <div className="max-w-3xl mx-auto mb-10 relative">
          <Search className="absolute left-4 top-3 text-gray-400" />
          <input
            type="text"
            placeholder="Search featured listings..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full py-3 pl-12 pr-4 rounded-lg bg-white/5 border border-gray-700 text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-600"
          />
        </div>

        <h2 className="text-3xl sm:text-4xl font-semibold text-center mb-14">
          Featured Listings
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {filteredCars.map((car) => (
            <div
              key={car.id}
              className="bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10 p-4 shadow-md hover:shadow-2xl transition-all duration-300 transform hover:scale-[1.02]"
            >
              <div className="rounded-xl overflow-hidden mb-4">
                <img
                  src={car.image}
                  alt={car.name}
                  className="w-full h-56 object-cover transition-transform duration-500 hover:scale-110"
                />
              </div>
              <h3 className="text-xl font-bold truncate">{car.name}</h3>
              <div className="flex items-center text-sm text-gray-400 mt-1">
                <MapPin className="w-4 h-4 mr-1" />
                {car.location}
              </div>
              <div className="mt-4 flex justify-between items-center text-sm text-gray-400">
                <div className="flex items-center">
                  <Eye className="w-4 h-4 mr-1" />
                  {car.watchers}
                </div>
                <div className="flex items-center">
                  <Clock className="w-4 h-4 mr-1" />
                  {car.timeLeft}
                </div>
              </div>
              <div className="mt-4 flex justify-between items-center">
                <span className="text-lg font-bold text-white">${car.price.toLocaleString()}</span>
                <span className="text-sm text-gray-400">{car.bids} bids</span>
              </div>
              <Link
                href={`/car/${car.id}`}
                className="block mt-6 text-center bg-gradient-to-r from-purple-600 to-pink-500 hover:brightness-110 text-white font-semibold py-2 rounded-lg transition"
              >
                View Details
              </Link>
            </div>
          ))}
        </div>

        {filteredCars.length === 0 && (
          <div className="text-center text-gray-400 mt-16">No matching cars found.</div>
        )}
      </section>

      <style jsx>{`
        .shine-effect {
          position: relative;
          overflow: hidden;
        }

        .shine-effect::after {
          content: '';
          position: absolute;
          top: -50%;
          left: -50%;
          width: 200%;
          height: 200%;
          background: linear-gradient(
            120deg,
            rgba(255, 255, 255, 0) 30%,
            rgba(255, 255, 255, 0.4) 50%,
            rgba(255, 255, 255, 0) 70%
          );
          transform: rotate(25deg);
          animation: shine 2.5s infinite;
        }

        @keyframes shine {
          0% {
            left: -100%;
          }
          100% {
            left: 100%;
          }
        }
      `}</style>
    </main>
  );
}
