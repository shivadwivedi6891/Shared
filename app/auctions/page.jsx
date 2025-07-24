"use client";
import { useState } from 'react';
import Link from 'next/link'; // ✅ Import Next.js Link
import { Car, Search, Eye, Clock, MapPin } from 'lucide-react';
import PrivateRoute from '@/components/PrivateRoute';

export default function AuctionsPage() {
  const [searchTerm, setSearchTerm] = useState('');

  const cars = [
    {
      id: 1,
      name: 'Rolls-Royce Phantom Ultra Luxury',
      price: 485000,
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTpU2XqzCYUZgGzb-pAlgKoQJ-IlApC9B442Q&s',
      location: 'San Jose, CA',
      timeLeft: '2d 14h 30m',
      watchers: 234,
      bids: 47,
      mileage: 12500,
      year: 2019
    },
    {
      id: 2,
      name: 'Mercedes AMG GT Limited Edition',
      price: 155000,
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSIGDX6A6DLidp0OkcRUC1wQ3xCmmWzlUq-Ew&s',
      location: 'Berlin, DE',
      timeLeft: '1d 8h 15m',
      watchers: 156,
      bids: 32,
      mileage: 8400,
      year: 2020
    },
    {
      id: 3,
      name: 'Bentley Continental GT',
      price: 245000,
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRvFEKzSTu1G3jMFRDDKEp_3sIVWIimOJA-Ow&s',
      location: 'Paris, FR',
      timeLeft: '3h 45m',
      watchers: 189,
      bids: 28,
      mileage: 5200,
      year: 2021
    },
    {
  id: 4,
  name: '2023 Chevrolet Corvette Z06',
  price: 105000,
  image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSfbtg2h_3mXv6wX82-1_SXzRTze7ZbUmIMsw&s',
  location: 'Orlando, FL',
  timeLeft: '2d 5h 30m',
  watchers: 185,
  bids: 33,
  mileage: 2100,
  year: 2023
},
{
  id: 5,
  name: '2021 Nissan GT-R NISMO',
  price: 185000,
  image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQXJVhKSwVDbiyh1E7dE6lxlJzVHJbxhDP3rw&s',
  location: 'Las Vegas, NV',
  timeLeft: '3d 7h 50m',
  watchers: 240,
  bids: 42,
  mileage: 8700,
  year: 2021
},
{
  id: 6,
  name: '2022 McLaren GT',
  price: 210000,
   image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRxcM-mXG40YDgf3vq1u1ia-zJRTZZBCpF0Ew&s',
  location: 'Los Angeles, CA',
  timeLeft: '1d 3h 20m',
  watchers: 298,
  bids: 55,
  mileage: 3300,
  year: 2022
},

{
  id: 7,
  name: '2022 Aston Martin Vantage',
  price: 139000,
  image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRAcGPp_vCF4sMQqsYHrrVQ07WTLLiw_fuEGQ&s',
  location: 'Scottsdale, AZ',
  timeLeft: '4d 9h 15m',
  watchers: 176,
  bids: 39,
  mileage: 4100,
  year: 2022
},
{
  id: 8,
  name: '2020 Lamborghini Aventador SVJ',
  price: 395000,
  image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJsEq6G39j_nDsvCOI9-tmeKZ0AQL_XZUrHw&s',
  location: 'Beverly Hills, CA',
  timeLeft: '1d 12h 5m',
  watchers: 322,
  bids: 63,
  mileage: 2900,
  year: 2020
},
{
  id: 9,
  name: '2023 Porsche 911 Turbo S',
  price: 204000,
  image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQqkq_WOxNe3ObrEusZad-Iykh6TfD9Tr7WmA&s',
  location: 'Miami Beach, FL',
  timeLeft: '5d 6h 45m',
  watchers: 245,
  bids: 48,
  mileage: 1800,
  year: 2023
}


  ];

  const filteredCars = cars.filter(car =>
    car.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <PrivateRoute>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

          <div className="mb-8">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
              Car Auctions
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Discover and bid on premium vehicles from trusted sellers
            </p>
          </div>

          <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg dark:shadow-gray-800 p-6 mb-8">
            <div className="relative">
              <Search className="absolute left-4 top-4 h-5 w-5 text-gray-400 dark:text-gray-300" />
              <input
                type="text"
                placeholder="Search by make, model, or keyword..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          <div className="mb-6">
            <p className="text-lg text-gray-600 dark:text-gray-300">
              {filteredCars.length} auctions found
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredCars.map((car) => (
              <div key={car.id} className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg dark:shadow-gray-800 overflow-hidden hover:shadow-2xl transition-all duration-300 hover:scale-105">
                <div className="relative">
                  <img src={car.image} alt={car.name} className="w-full h-56 object-cover" />
                  <div className="absolute top-4 right-4 bg-white/90 dark:bg-gray-800/90 px-3 py-1 rounded-full text-sm font-medium text-gray-900 dark:text-gray-100">
                    <Clock className="h-3 w-3 inline mr-1" />
                    {car.timeLeft}
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="font-bold text-xl mb-2 text-gray-900 dark:text-white">{car.name}</h3>

                  <div className="flex items-center text-gray-600 dark:text-gray-400 mb-2">
                    <MapPin className="h-4 w-4 mr-1" />
                    {car.location}
                  </div>

                  <div className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                    {car.mileage.toLocaleString()} miles • {car.year}
                  </div>

                  <div className="flex justify-between items-center mb-4">
                    <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                      ${car.price.toLocaleString()}
                    </span>
                    <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                      <Eye className="h-4 w-4 mr-1" />
                      {car.watchers} watching
                    </div>
                  </div>


                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600 dark:text-gray-400">{car.bids} bids</span>
                    <Link href={`/car/${car.id}`} passHref>
                      <div className="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:shadow-lg cursor-pointer">
                        View Details
                      </div>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredCars.length === 0 && (
            <div className="text-center py-20">
              <p className="text-gray-500 dark:text-gray-400 text-xl">No auctions found matching your search</p>
            </div>
          )}
        </div>
      </div>
    </PrivateRoute>
  );
}
