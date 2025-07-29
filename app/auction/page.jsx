'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { PlusCircle } from 'lucide-react';

const auctionsData = [

  {
    id: 1,
    title: "Vijayawada Lot-1",
    state: "Andhra Pradesh",
    date: "Jul 25, 2025",
    published: "24-07-2025 10:00:00 AM",
    start: "25-07-2025 09:00:00 AM",
    end: "27-07-2025 06:00:00 PM",
    totalVehicles: 12,
    totalBids: 15,
    myBids: 0,
    image: "https://tse1.mm.bing.net/th/id/OIP.X42b4q5g88ldlViDnsLj9QHaEK?pid=Api&P=0&h=180",
  },
  {
    id: 2,
    title: "Vizag Lot-2",
    state: "Andhra Pradesh",
    date: "Jul 28, 2025",
    published: "27-07-2025 11:00:00 AM",
    start: "28-07-2025 10:00:00 AM",
    end: "30-07-2025 05:00:00 PM",
    totalVehicles: 9,
    totalBids: 11,
    myBids: 0,
    image: "https://tse1.mm.bing.net/th/id/OIP.TG3Nae2hQRp50bXe9kWE4gHaE2?pid=Api&P=0&h=180",
  },

  {
    id: 3,
    title: "Kochi Lot-1",
    state: "Kerala",
    date: "Jul 26, 2025",
    published: "25-07-2025 09:00:00 AM",
    start: "26-07-2025 10:00:00 AM",
    end: "28-07-2025 04:00:00 PM",
    totalVehicles: 8,
    totalBids: 6,
    myBids: 0,
    image: "https://tse1.mm.bing.net/th/id/OIP.xUB71vFH9nzkEKmCewHcuAHaE8?pid=Api&P=0&h=180",
  },
  {
    id: 4,
    title: "Trivandrum Lot-2",
    state: "Kerala",
    date: "Jul 29, 2025",
    published: "28-07-2025 10:30:00 AM",
    start: "29-07-2025 09:00:00 AM",
    end: "31-07-2025 03:00:00 PM",
    totalVehicles: 10,
    totalBids: 14,
    myBids: 0,
    image: "https://tse2.mm.bing.net/th/id/OIP._656ZmODwm5Gme6xgnZJrgHaEK?pid=Api&P=0&h=180",
  },

  {
    id: 5,
    title: "Indore Lot-1",
    state: "Madhya Pradesh",
    date: "Jul 24, 2025",
    published: "23-07-2025 10:00:00 AM",
    start: "24-07-2025 09:00:00 AM",
    end: "26-07-2025 05:00:00 PM",
    totalVehicles: 13,
    totalBids: 18,
    myBids: 0,
    image: "https://tse2.mm.bing.net/th/id/OIP.vjkXMV2LOEVUAEcfKjSGzgHaEK?pid=Api&P=0&h=180",
  },
  {
    id: 6,
    title: "Bhopal Lot-2",
    state: "Madhya Pradesh",
    date: "Jul 27, 2025",
    published: "26-07-2025 10:00:00 AM",
    start: "27-07-2025 10:00:00 AM",
    end: "29-07-2025 06:00:00 PM",
    totalVehicles: 9,
    totalBids: 10,
    myBids: 0,
    image: "https://tse1.mm.bing.net/th/id/OIP.w_rdqE8oOcis2s8fut6LGQHaEK?pid=Api&P=0&h=180",
  },

  {
    id: 7,
    title: "Mumbai Lot-1",
    state: "Maharashtra",
    date: "Jul 25, 2025",
    published: "24-07-2025 12:00:00 PM",
    start: "25-07-2025 11:00:00 AM",
    end: "27-07-2025 06:00:00 PM",
    totalVehicles: 11,
    totalBids: 16,
    myBids: 0,
    image: "https://tse1.mm.bing.net/th/id/OIP.WI0qGswjsqMgUtQ0nP9_yAHaD5?pid=Api&P=0&h=180",
  },
  {
    id: 8,
    title: "Pune Lot-2",
    state: "Maharashtra",
    date: "Jul 28, 2025",
    published: "27-07-2025 01:00:00 PM",
    start: "28-07-2025 10:00:00 AM",
    end: "30-07-2025 04:00:00 PM",
    totalVehicles: 10,
    totalBids: 12,
    myBids: 0,
    image: "https://tse3.mm.bing.net/th/id/OIP.boU8xtqnKYuGKEIePpYXFAHaEY?pid=Api&P=0&h=180",
  },

  // Orissa
  {
    id: 9,
    title: "Bhubaneswar Lot-1",
    state: "Orissa",
    date: "Jul 26, 2025",
    published: "25-07-2025 11:00:00 AM",
    start: "26-07-2025 10:00:00 AM",
    end: "28-07-2025 04:00:00 PM",
    totalVehicles: 7,
    totalBids: 5,
    myBids: 0,
    image: "https://tse4.mm.bing.net/th/id/OIP.Sa48FzP9ZG-Q9KHRaEiI5AHaEK?pid=Api&P=0&h=180",
  },
  {
    id: 10,
    title: "Cuttack Lot-2",
    state: "Orissa",
    date: "Jul 29, 2025",
    published: "28-07-2025 12:00:00 PM",
    start: "29-07-2025 09:00:00 AM",
    end: "31-07-2025 03:00:00 PM",
    totalVehicles: 6,
    totalBids: 4,
    myBids: 0,
    image: "https://tse4.mm.bing.net/th/id/OIP.06RTWkpXExa2Hk_gTN8oigHaE7?pid=Api&P=0&h=180",
  },


  {
    id: 11,
    title: "Jaipur Lot-1",
    state: "Rajasthan",
    date: "Jul 24, 2025",
    published: "23-07-2025 03:00:00 PM",
    start: "24-07-2025 10:00:00 AM",
    end: "26-07-2025 06:00:00 PM",
    totalVehicles: 14,
    totalBids: 20,
    myBids: 0,
    image: "https://tse2.mm.bing.net/th/id/OIP.Bfz55yLwvALxsjpxe1Z0nwHaEd?pid=Api&P=0&h=180",
  },
  {
    id: 12,
    title: "Udaipur Lot-2",
    state: "Rajasthan",
    date: "Jul 27, 2025",
    published: "26-07-2025 04:00:00 PM",
    start: "27-07-2025 11:00:00 AM",
    end: "29-07-2025 05:00:00 PM",
    totalVehicles: 10,
    totalBids: 8,
    myBids: 0,
    image: "https://tse4.mm.bing.net/th/id/OIP.TFtTbzhKuV1lkSVFmuBBLQHaD4?pid=Api&P=0&h=180",
  },

  {
    id: 13,
    title: "Hyderabad Lot-1",
    state: "Telangana",
    date: "Jul 26, 2025",
    published: "25-07-2025 10:00:00 AM",
    start: "26-07-2025 09:00:00 AM",
    end: "28-07-2025 04:00:00 PM",
    totalVehicles: 13,
    totalBids: 17,
    myBids: 0,
    image: "https://tse3.mm.bing.net/th/id/OIP.XbpsNTON70KeH6z9bPnjCwHaE8?pid=Api&P=0&h=180",
  },
  {
    id: 14,
    title: "Warangal Lot-2",
    state: "Telangana",
    date: "Jul 29, 2025",
    published: "28-07-2025 10:00:00 AM",
    start: "29-07-2025 10:00:00 AM",
    end: "31-07-2025 05:00:00 PM",
    totalVehicles: 8,
    totalBids: 9,
    myBids: 0,
    image: "https://tse3.mm.bing.net/th/id/OIP.kMc4fRURJ7VYQZa8CSNnWgHaE8?pid=Api&P=0&h=180",
  },

  // West Bengal
  {
    id: 15,
    title: "Kolkata Lot-1",
    state: "West Bengal",
    date: "Jul 25, 2025",
    published: "24-07-2025 11:30:00 AM",
    start: "25-07-2025 10:00:00 AM",
    end: "27-07-2025 06:00:00 PM",
    totalVehicles: 15,
    totalBids: 22,
    myBids: 0,
    image: "https://tse2.mm.bing.net/th/id/OIP.b4bS1jFf5fzQw_GjWYNigwHaE-?pid=Api&P=0&h=180",
  },
  {
    id: 16,
    title: "Siliguri Lot-2",
    state: "West Bengal",
    date: "Jul 28, 2025",
    published: "27-07-2025 02:00:00 PM",
    start: "28-07-2025 11:00:00 AM",
    end: "30-07-2025 05:00:00 PM",
    totalVehicles: 9,
    totalBids: 13,
    myBids: 0,
    image: "https://tse2.mm.bing.net/th/id/OIP.hIuhNWblWNtiA9LW4YGgowHaE8?pid=Api&P=0&w=300&h=300",
  },
];

const getUniqueValues = (data, key) => {
  return [...new Set(data.map((item) => item[key]).filter(Boolean))];
};

export default function AuctionList() {
  const [filters, setFilters] = useState({
    state: '',
    city: '',
    region: '',
    brand: '',
    year: '',
  });

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const resetFilters = () => {
    setFilters({ state: '', city: '', region: '', brand: '', year: '' });
  };

  const filteredAuctions = auctionsData.filter((auction) => {
    return (
      (!filters.state || auction.state === filters.state) &&
      (!filters.city || auction.city === filters.city) &&
      (!filters.region || auction.region === filters.region) &&
      (!filters.brand || auction.brand === filters.brand) &&
      (!filters.year || auction.year === filters.year)
    );
  });

  const SelectFilter = ({ label, keyName, options }) => (
    <div className="mb-4">
      <label className="block font-semibold mb-1">{label}</label>
      <select
        value={filters[keyName]}
        onChange={(e) => handleFilterChange(keyName, e.target.value)}
        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-[#1f2937] text-black dark:text-white"
      >
        <option value="">All</option>
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    </div>
  );

  const states = getUniqueValues(auctionsData, 'state');
  const cities = getUniqueValues(auctionsData, 'city');
  const regions = getUniqueValues(auctionsData, 'region');
  const brands = getUniqueValues(auctionsData, 'brand');
  const years = getUniqueValues(auctionsData, 'year');

  return (
    <div className="flex flex-col lg:flex-row bg-gray-100 dark:bg-[#121a26] min-h-screen text-black dark:text-white">
      <aside className="w-full lg:w-1/4 bg-white dark:bg-[#1e293b] p-5 border-r border-gray-300 dark:border-gray-700">
        <h2 className="text-2xl font-bold mb-4">Filter By</h2>
        <button
          onClick={resetFilters}
          className="bg-blue-600 text-white text-sm px-4 py-2 rounded hover:bg-blue-700 w-full mb-6"
        >
          Reset
        </button>
        <SelectFilter label="State" keyName="state" options={states} />
        <SelectFilter label="City" keyName="city" options={cities} />
        <SelectFilter label="Region" keyName="region" options={regions} />
        <SelectFilter label="Brand Type" keyName="brand" options={brands} />
        <SelectFilter label="Year of Manufacture" keyName="year" options={years} />
      </aside>

      <main className="w-full lg:w-3/4 p-6">
        <h1 className="text-2xl font-bold mb-4">
          {filters.state ? `Auctions in ${filters.state}` : 'Live Auctions'}
        </h1>

        {filteredAuctions.length ? (
          filteredAuctions.map((auction) => (
            <div
              key={auction.id}
              className="bg-white dark:bg-[#1e293b] rounded-xl shadow-md border border-gray-300 dark:border-gray-700 mb-6 overflow-hidden"
            >
              <div className="flex flex-col sm:flex-row justify-between gap-4 p-4">
                <div className="flex gap-4">
                  <img
                    src={auction.image}
                    alt={auction.title}
                    className="w-32 h-20 object-cover rounded border border-gray-300 dark:border-gray-600"
                  />
                  <div>
                    <p className="text-blue-600 dark:text-blue-400 text-sm font-medium">
                      #{auction.date}
                      <span className="text-green-600 dark:text-green-500 ml-2">Current</span>
                    </p>
                    <h2 className="text-lg font-semibold">{auction.title}</h2>
                    <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                      <p>Published: {auction.published}</p>
                      <p>Start: {auction.start}</p>
                      <p>End: {auction.end}</p>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col items-center justify-center">
                  <PlusCircle size={24} className="text-blue-600 dark:text-blue-400" />
                  <Link href="/auctionlist" className="text-sm text-blue-600 dark:text-blue-400 hover:underline">
                    Place Bids
                  </Link>
                </div>
              </div>

              <div className="bg-gray-200 dark:bg-[#111827] border-t border-gray-300 dark:border-gray-700 px-4 py-3 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 text-sm font-medium text-center gap-4">
                <div>
                  <p className="text-base text-black dark:text-white">{auction.totalVehicles}</p>
                  <p>Total Vehicles</p>
                </div>
                <div>
                  <p className="text-base text-black dark:text-white">{auction.totalBids}</p>
                  <p>Total Bids</p>
                </div>
                <div>
                  <p className="text-base text-black dark:text-white">{auction.myBids}</p>
                  <p>My Bids</p>
                </div>
                <div>
                  <Link href="/dashboard/buyer" className="text-blue-600 dark:text-blue-500 hover:underline w-full block">
                    My Bid List
                  </Link>
                </div>
                <div>
                  <Link href="/auctionlist" className="text-blue-600 dark:text-blue-500 hover:underline w-full block">
                    View Vehicle List
                  </Link>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-600 dark:text-gray-400 mt-10 text-center">
            No auctions found for selected filters.
          </p>
        )}
      </main>
    </div>
  );
}
