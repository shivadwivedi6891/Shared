'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import CarBidModal from '@/components/carbidmodal';

const vehiclesData = [
  {
    id: 1,
    name: 'BMW M5',
    number: 'NL01AA9365',
    image: 'https://news.dupontregistry.com/wp-content/uploads/2022/09/2022-bmw-m5-cs-1.jpg',
    state: 'Delhi',
    city: 'New Delhi',
    chassis: 'Sedan',
    year: '2023',
    images: [
      'https://news.dupontregistry.com/wp-content/uploads/2022/09/2022-bmw-m5-cs-1.jpg',
      'https://media.ed.edmunds-media.com/bmw/m5/2022/oem/2022_bmw_m5_sedan_base_fq_oem_1_1600.jpg'
    ],
    fuel: 'Petrol',
    registration: 'DL01BM1234',
    insurance: 'Valid till 2025',
    rcStatus: 'Available',
    permit: 'Personal',
    evaluation: 'Excellent condition. No dents, brand-new tyres.',
    contractNo: 'CN-001122',
    bids: 4,
    startingBid: 7550000,
  },
  {
    id: 2,
    name: 'Tata 2518',
    number: 'TN18AV4185',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQPF93lDlRe4ektKrTnEguHYykeFXuXwyjzXw&s',
    state: 'Tamil Nadu',
    city: 'Chennai',
    chassis: 'Truck',
    year: '2020',
    images: [
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQPF93lDlRe4ektKrTnEguHYykeFXuXwyjzXw&s',
      'https://cdn.drivespark.com/img/2020/01/tata-lpt-2518-exterior-1-1578571105.jpg'
    ],
    fuel: 'Diesel',
    registration: 'TN18AV4185',
    insurance: 'Expired',
    rcStatus: 'Available',
    permit: 'National',
    evaluation: 'Used vehicle. Body dents visible, engine serviced.',
    contractNo: 'CN-005533',
    bids: 2,
    startingBid: 1050000,
  },
  {
    id: 3,
    name: 'Signa 2823',
    number: 'BR06GF2371',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4iaxyNoXdZK8JYyLN5HygkEF0Eats_IZE9w&s',
    state: 'Bihar',
    city: 'Patna',
    chassis: 'Dumper',
    year: '2021',
    images: [
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4iaxyNoXdZK8JYyLN5HygkEF0Eats_IZE9w&s',
      'https://www.91trucks.com/truck_images/tata/signa-2823k/standard.png'
    ],
    fuel: 'Diesel',
    registration: 'BR06GF2371',
    insurance: 'Valid till 2024',
    rcStatus: 'Pending',
    permit: 'State',
    evaluation: 'Fair condition. Tyres replacement required.',
    contractNo: 'CN-007788',
    bids: 6,
    startingBid: 1250000,
  },
];

const states = ['All', 'Delhi', 'Tamil Nadu', 'Bihar'];
const cities = ['All', 'New Delhi', 'Chennai', 'Patna'];
const chassisOptions = ['All', 'Sedan', 'Truck', 'Dumper'];
const years = ['All', '2020', '2021', '2023'];

export default function AuctionPage() {
  const [filters, setFilters] = useState({
    state: 'All',
    city: 'All',
    chassis: 'All',
    year: 'All',
  });

  const [bids, setBids] = useState({});
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedCar, setSelectedCar] = useState(null);

  const handleInputChange = (id, field, value) => {
    setBids((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        [field]: value,
      },
    }));
  };

  const filteredVehicles = vehiclesData.filter((vehicle) => {
    return (
      (filters.state === 'All' || vehicle.state === filters.state) &&
      (filters.city === 'All' || vehicle.city === filters.city) &&
      (filters.chassis === 'All' || vehicle.chassis === filters.chassis) &&
      (filters.year === 'All' || vehicle.year === filters.year)
    );
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-200 dark:from-[#0f0f0f] dark:to-[#1a1a1a] py-12 px-6 text-gray-900 dark:text-white">
      <h1 className="text-4xl font-extrabold text-center mb-10">
        Vehicle Auction Listings
      </h1>

      <div className="flex flex-col lg:flex-row gap-8">
        <aside className="w-full lg:w-64 bg-white dark:bg-white/5 backdrop-blur-xl border border-gray-200 dark:border-white/10 shadow px-4 py-6 rounded-xl space-y-6">
          {[{ label: 'State', options: states, key: 'state' }, { label: 'City', options: cities, key: 'city' }, { label: 'Chassis Description', options: chassisOptions, key: 'chassis' }, { label: 'Year of Manufacture', options: years, key: 'year' }].map(({ label, options, key }) => (
            <div key={key}>
              <label className="block text-sm font-medium mb-1">{label}</label>
              <select
                className="w-full px-3 py-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                value={filters[key]}
                onChange={(e) => setFilters({ ...filters, [key]: e.target.value })}
              >
                {options.map((opt) => (
                  <option key={opt}>{opt}</option>
                ))}
              </select>
            </div>
          ))}
        </aside>

        <main className="flex-1 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {filteredVehicles.length === 0 && (
            <p className="col-span-full text-center text-gray-600 dark:text-gray-300">
              No vehicles match the selected filters.
            </p>
          )}

          {filteredVehicles.map((vehicle) => {
            const bid = bids[vehicle.id] || {};
            return (
              <div
                key={vehicle.id}
                className="bg-white dark:bg-white/5 backdrop-blur-xl rounded-3xl overflow-hidden border border-gray-200 dark:border-white/10 shadow-xl transition duration-300 hover:scale-[1.03] hover:shadow-purple-400/40 group p-5"
              >
                <div className="overflow-hidden">
                  <img
                    src={vehicle.image}
                    alt={vehicle.name}
                    className="w-full h-48 object-cover transform group-hover:scale-105 transition duration-300 rounded-xl"
                  />
                </div>

                <div className="mt-4 space-y-2">
                  <h2 className="font-bold text-lg text-gray-800 dark:text-white">
                    {vehicle.name}{' '}
                    <span className="text-blue-600 dark:text-blue-400">{vehicle.number}</span>
                  </h2>

                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={() => {
                        setSelectedCar(vehicle);
                        setModalOpen(true);
                      }}
                      className="px-3 py-1 text-sm bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-800 dark:text-white"
                    >
                        onClick={() => {
                        setSelectedCar(vehicle);
                        setModalOpen(true);
                      }}
                      Gallery
                    </button>
                    <button className="px-3 py-1 text-sm bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-800 dark:text-white">
                      onClick={() => {
                        setSelectedCar(vehicle);
                        setModalOpen(true);
                      }}
                      Vehicle Details
                    </button>
                    <button className="px-3 py-1 text-sm bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-800 dark:text-white">
                      onClick={() => {
                        setSelectedCar(vehicle);
                        setModalOpen(true);
                      }}
                      Other Details
                    </button>
                    <button className="px-3 py-1 text-sm bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-800 dark:text-white">
                      onClick={() => {
                        setSelectedCar(vehicle);
                        setModalOpen(true);
                      }}
                      Evaluation Report
                    </button>
                  </div>

                  <button className="w-full mt-2 px-4 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded shadow-sm flex items-center justify-center gap-2 text-gray-800 dark:text-white">
                    💛 Add to Watchlist
                  </button>

                  <div className="text-sm mt-2">
                    <label className="block mb-1">Your Bid:</label>
                    <input
                      type="number"
                      value={bid.amount ?? ''}
                      onChange={(e) => handleInputChange(vehicle.id, 'amount', Number(e.target.value))}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
                      placeholder="Enter your bid"
                    />
                    <label className="flex items-center mt-2">
                      <input
                        type="checkbox"
                        checked={bid.agree ?? false}
                        onChange={(e) => handleInputChange(vehicle.id, 'agree', e.target.checked)}
                        className="mr-2 accent-blue-600"
                      />
                      I Agree <Link href="#" className="text-blue-600 dark:text-blue-400 ml-1 underline">Terms & Conditions</Link>
                    </label>
                  </div>

                  <div className="flex gap-2 mt-3">
                    <button className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-white py-2 rounded-lg shadow-md">
                      View Details
                    </button>
                    <button
                      className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg shadow-md"
                      disabled={!bid.agree || !bid.amount}
                    >
                      Place Bid
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </main>
      </div>

      {isModalOpen && selectedCar && (
        <CarBidModal car={selectedCar} onClose={() => setModalOpen(false)} />
      )}
    </div>
  );
}