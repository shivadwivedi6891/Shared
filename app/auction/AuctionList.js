'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { PlusCircle } from 'lucide-react';
import { useSearchParams } from 'next/navigation';

const categorySlugToName = {
  'car': 'Car',
  'hcv-lcv': 'HCV/LCV',
  'construction-equipments': 'Construction Equipment’s',
  'tractors': 'Tractors',
  'bike-2-wheelers': 'Bike/2 Wheelers',
};

const auctionsData = [
  {
    id: 1,
    title: "Vijayawada Lot-1",
    state: "Andhra Pradesh",
    category: "Car",
    date: "Jul 25, 2025",
    published: "24-07-2025 10:00:00 AM",
    start: "25-07-2025 09:00:00 AM",
    end: "27-07-2025 06:00:00 PM",
    totalVehicles: 12,
    totalBids: 15,
    myBids: 0,
    image: "https://tse1.mm.bing.net/th/id/OIP.X42b4q5g88ldlViDnsLj9QHaEK?pid=Api&P=0&h=180"
  },
  {
    id: 2,
    title: "Vizag Lot-2",
    state: "Andhra Pradesh",
    category: "Bike/2 Wheelers",
    date: "Jul 28, 2025",
    published: "27-07-2025 11:00:00 AM",
    start: "28-07-2025 10:00:00 AM",
    end: "30-07-2025 05:00:00 PM",
    totalVehicles: 9,
    totalBids: 11,
    myBids: 0,
    image: "https://tse3.mm.bing.net/th/id/OIP.CmsstI9Sf4OsZPIftUmiSQHaFj?pid=Api&P=0&h=180"
  },
  {
    id: 3,
    title: "Kochi Lot-1",
    state: "Kerala",
    category: "Construction Equipment’s",
    date: "Jul 26, 2025",
    published: "25-07-2025 09:00:00 AM",
    start: "26-07-2025 10:00:00 AM",
    end: "28-07-2025 04:00:00 PM",
    totalVehicles: 8,
    totalBids: 6,
    myBids: 0,
    image: "https://tse4.mm.bing.net/th/id/OIP.mixIW9FmVpB2v9Bk241QgQHaEG?pid=Api&P=0&h=180"
  },
  {
    id: 4,
    title: "Trivandrum Lot-2",
    state: "Kerala",
    category: "HCV/LCV",
    date: "Jul 29, 2025",
    published: "28-07-2025 10:30:00 AM",
    start: "29-07-2025 09:00:00 AM",
    end: "31-07-2025 03:00:00 PM",
    totalVehicles: 10,
    totalBids: 14,
    myBids: 0,
    image: "https://tse4.mm.bing.net/th/id/OIP.J36CNDhVLjfVg-mvYIe6EAHaDt?pid=Api&P=0&h=180"
  },
  {
    id: 5,
    title: "Indore Lot-1",
    state: "Madhya Pradesh",
    category: "Tractors",
    date: "Jul 24, 2025",
    published: "23-07-2025 10:00:00 AM",
    start: "24-07-2025 09:00:00 AM",
    end: "26-07-2025 05:00:00 PM",
    totalVehicles: 13,
    totalBids: 18,
    myBids: 0,
    image: "https://tse4.mm.bing.net/th/id/OIP.nHvUt60D-48BpzF55z3NBAHaFj?pid=Api&P=0&h=180"
  },
  {
    id: 6,
    title: "Bhopal Lot-2",
    state: "Madhya Pradesh",
    category: "Car",
    date: "Jul 27, 2025",
    published: "26-07-2025 10:00:00 AM",
    start: "27-07-2025 10:00:00 AM",
    end: "29-07-2025 06:00:00 PM",
    totalVehicles: 9,
    totalBids: 10,
    myBids: 0,
    image: "https://tse1.mm.bing.net/th/id/OIP.w_rdqE8oOcis2s8fut6LGQHaEK?pid=Api&P=0&h=180"
  },
  {
    id: 7,
    title: "Hyderabad Lot-1",
    state: "Telangana",
    category: "Bike/2 Wheelers",
    date: "Jul 30, 2025",
    published: "29-07-2025 09:00:00 AM",
    start: "30-07-2025 10:00:00 AM",
    end: "01-08-2025 05:00:00 PM",
    totalVehicles: 11,
    totalBids: 13,
    myBids: 0,
    image: "https://tse4.mm.bing.net/th/id/OIP.ZKDvuHTGTV1FLv3aBnGb2gHaEK?pid=Api&P=0&h=180"
  },
  {
    id: 8,
    title: "Udaipur Lot-1",
    state: "Rajasthan",
    category: "Construction Equipment’s",
    date: "Jul 31, 2025",
    published: "30-07-2025 10:00:00 AM",
    start: "31-07-2025 11:00:00 AM",
    end: "02-08-2025 04:00:00 PM",
    totalVehicles: 7,
    totalBids: 9,
    myBids: 0,
    image: "https://tse1.mm.bing.net/th/id/OIP.x9gbNBkJNwDNemQzDuznLQHaEK?pid=Api&P=0&h=180"
  },
  {
    id: 9,
    title: "Bhubaneswar Lot-1",
    state: "Orissa",
    category: "HCV/LCV",
    date: "Jul 26, 2025",
    published: "25-07-2025 11:00:00 AM",
    start: "26-07-2025 10:00:00 AM",
    end: "28-07-2025 04:00:00 PM",
    totalVehicles: 7,
    totalBids: 5,
    myBids: 0,
    image: "https://tse1.mm.bing.net/th/id/OIP.POGEGE8X32J5zwVsmEkkPwHaFO?pid=Api&P=0&h=180",
  },
  {
    id: 10,
    title: "Cuttack Lot-2",
    state: "Orissa",
    category: "Tractors",
    date: "Jul 29, 2025",
    published: "28-07-2025 12:00:00 PM",
    start: "29-07-2025 09:00:00 AM",
    end: "31-07-2025 03:00:00 PM",
    totalVehicles: 6,
    totalBids: 4,
    myBids: 0,
    image: "https://tse3.mm.bing.net/th/id/OIP.2tW6ABdcdFx5Ha84V3pGQQHaFT?pid=Api&P=0&h=180",
  },
  {
    id: 11,
    title: "Jaipur Lot-1",
    state: "Rajasthan",
    category: "Car",
    date: "Jul 24, 2025",
    published: "23-07-2025 03:00:00 PM",
    start: "24-07-2025 10:00:00 AM",
    end: "26-07-2025 06:00:00 PM",
    totalVehicles: 14,
    totalBids: 20,
    myBids: 0,
    image: "https://tse3.mm.bing.net/th/id/OIP.VXhbwWPbcudJ1WbhwQTCIwHaEc?pid=Api&P=0&h=180",
  },
  {
    id: 12,
    title: "Udaipur Lot-2",
    state: "Rajasthan",
    category: "Bike/2 Wheelers",
    date: "Jul 27, 2025",
    published: "26-07-2025 04:00:00 PM",
    start: "27-07-2025 11:00:00 AM",
    end: "29-07-2025 05:00:00 PM",
    totalVehicles: 10,
    totalBids: 8,
    myBids: 0,
    image: "https://tse1.mm.bing.net/th/id/OIP.g_fBwQQ74NqqxUU9valV6wHaEo?pid=Api&P=0&h=180",
  },

  {
    id: 13,
    title: "Hyderabad Lot-1",
    state: "Telangana",
    category: "Car",
    date: "Jul 26, 2025",
    published: "25-07-2025 10:00:00 AM",
    start: "26-07-2025 09:00:00 AM",
    end: "28-07-2025 04:00:00 PM",
    totalVehicles: 13,

    totalBids: 17,
    myBids: 0,
    image: "https://tse4.mm.bing.net/th/id/OIP.lgL6Pb6es2TmyZa6F5qHmAHaE7?pid=Api&P=0&h=180",
  },
  {
    id: 14,
    title: "Warangal Lot-2",
    state: "Telangana",
    category: "Bike/2 Wheelers",
    date: "Jul 29, 2025",
    published: "28-07-2025 10:00:00 AM",
    start: "29-07-2025 10:00:00 AM",
    end: "31-07-2025 05:00:00 PM",
    totalVehicles: 8,
    totalBids: 9,
    myBids: 0,
    image: "https://tse3.mm.bing.net/th/id/OIP.h0svHgYOGB-eHMgIYehsqAHaEo?pid=Api&P=0&h=180",
  },

  {
    id: 15,
    title: "Kolkata Lot-1",
    state: "West Bengal",
    category: "Car",
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
    category: "Bike/2 Wheelers",
    date: "Jul 28, 2025",
    published: "27-07-2025 02:00:00 PM",
    start: "28-07-2025 11:00:00 AM",
    end: "30-07-2025 05:00:00 PM",
    totalVehicles: 9,
    totalBids: 13,
    myBids: 0,
    image: "https://tse4.mm.bing.net/th/id/OIP.ZKDvuHTGTV1FLv3aBnGb2gHaEK?pid=Api&P=0&h=180",
  },
  {
    id: 17,
    title: "Nagpur Lot-3",
    state: "Maharashtra",
    category: "HCV/LCV",
    date: "Jul 30, 2025",
    published: "29-07-2025 10:00:00 AM",
    start: "30-07-2025 09:00:00 AM",
    end: "01-08-2025 06:00:00 PM",
    totalVehicles: 10,
    totalBids: 13,
    myBids: 0,
    image: "https://tse2.mm.bing.net/th/id/OIP.l-hnqA3HmCTuCDllY5PTswHaFH?pid=Api&P=0&h=180"
  },
  {
    id: 18,
    title: "Raipur Lot-2",
    state: "Chhattisgarh",
    category: "Tractors",
    date: "Jul 31, 2025",
    published: "30-07-2025 11:00:00 AM",
    start: "31-07-2025 09:00:00 AM",
    end: "02-08-2025 06:00:00 PM",
    totalVehicles: 7,
    totalBids: 9,
    myBids: 0,
    image: "https://tse1.mm.bing.net/th/id/OIP.PX-kOMdZF84Qm0MHGOzJTwHaFG?pid=Api&P=0&h=180"
  },
  {
    id: 19,
    title: "Bangalore Lot-4",
    state: "Karnataka",
    category: "Bike/2 Wheelers",
    date: "Aug 01, 2025",
    published: "31-07-2025 12:00:00 PM",
    start: "01-08-2025 10:00:00 AM",
    end: "03-08-2025 05:00:00 PM",
    totalVehicles: 15,
    totalBids: 20,
    myBids: 0,
    image: "https://tse3.mm.bing.net/th/id/OIP.dSyheQuHr-YnOewMtItETwHaFe?pid=Api&P=0&h=180"
  },
  {
    id: 20,
    title: "Surat Lot-5",
    state: "Gujarat",
    category: "HCV/LCV",
    date: "Aug 02, 2025",
    published: "01-08-2025 09:00:00 AM",
    start: "02-08-2025 10:00:00 AM",
    end: "04-08-2025 05:00:00 PM",
    totalVehicles: 11,
    totalBids: 14,
    myBids: 0,
    image: "https://tse4.mm.bing.net/th/id/OIP.swELERI0nCXykTcnWmvDFQHaDp?pid=Api&P=0&h=180"
  },
  {
    id: 21,
    title: "Ahmedabad Lot-6",
    state: "Gujarat",
    category: "HCV/LCV",
    date: "Aug 03, 2025",
    published: "02-08-2025 10:00:00 AM",
    start: "03-08-2025 09:30:00 AM",
    end: "05-08-2025 04:30:00 PM",
    totalVehicles: 8,
    totalBids: 12,
    myBids: 0,
    image: "https://tse1.mm.bing.net/th/id/OIP.A93v6PqTWhDfL4E1eE4pvQHaEZ?pid=Api&P=0&h=180"
  }
  ,
  {
    id: 24,
    title: "Chennai Lot-3",
    state: "Tamil Nadu",
    category: "Bike/2 Wheelers",
    date: "Aug 02, 2025",
    published: "01-08-2025 09:00:00 AM",
    start: "02-08-2025 10:00:00 AM",
    end: "04-08-2025 04:00:00 PM",
    totalVehicles: 17,
    totalBids: 19,
    myBids: 0,
    image: "https://tse4.mm.bing.net/th/id/OIP.6l4LL73hJ08omlELqHgEFgHaE8?pid=Api&P=0&h=180"
  },
];


const getUniqueValues = (data, key) => {
  return [...new Set(data.map((item) => item[key]).filter(Boolean))];
};

export default function AuctionList() {
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get('category');

  const [filters, setFilters] = useState({
    state: '',
    brand: '',
    category: '',
  });

  useEffect(() => {
    if (categoryParam) {
      const decodedSlug = decodeURIComponent(categoryParam.toLowerCase());
      const matchedCategory = categorySlugToName[decodedSlug];
      if (matchedCategory) {
        setFilters((prev) => ({ ...prev, category: matchedCategory }));
      }
    }
  }, [categoryParam]);

  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const auctionsPerPage = 4;

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
    setCurrentPage(1);
  };

  const resetFilters = () => {
    setFilters({ state: '', city: '', region: '', brand: '', year: '', category: '' });
    setCurrentPage(1);
  };

  const filteredAuctions = useMemo(() => {
    return auctionsData.filter((auction) => {
      return (
        (!filters.state || auction.state === filters.state) &&
        (!filters.brand || auction.brand === filters.brand) &&
        (!filters.category || auction.category === filters.category)
      );
    });
  }, [filters]);

  const indexOfLastAuction = currentPage * auctionsPerPage;
  const indexOfFirstAuction = indexOfLastAuction - auctionsPerPage;
  const currentAuctions = filteredAuctions.slice(indexOfFirstAuction, indexOfLastAuction);
  const totalPages = Math.ceil(filteredAuctions.length / auctionsPerPage);

  const paginate = (direction) => {
    if (direction === 'prev' && currentPage > 1) setCurrentPage((prev) => prev - 1);
    if (direction === 'next' && currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  const SelectFilter = ({ label, keyName, options }) => (
    <div className="mb-4">
      <label className="block font-semibold mb-1">{label}</label>
      <select
        value={filters[keyName]}
        onChange={(e) => handleFilterChange(keyName, e.target.value)}
        className="w-full px-3 py-2 border border-gray-300 rounded bg-white text-black"
      >
        <option value="">All</option>
        {options.map((opt) => (
          <option key={opt} value={opt}>{opt}</option>
        ))}
      </select>
    </div>
  );

  const states = getUniqueValues(auctionsData, 'state');
  const brands = getUniqueValues(auctionsData, 'brand');
  const categories = getUniqueValues(auctionsData, 'category');

  return (
    <div className="flex flex-col lg:flex-row bg-white min-h-screen text-black">
      {/* Sidebar */}
      <aside className="hidden lg:block lg:w-1/4 bg-white p-5 border-r border-gray-300 sticky top-0 h-fit">
        <h2 className="text-2xl font-bold mb-4">Filter By</h2>
        <button
          onClick={resetFilters}
          className="bg-blue-600 text-white text-sm px-4 py-2 rounded hover:bg-blue-700 w-full mb-6"
        >
          Reset
        </button>
        <SelectFilter label="State" keyName="state" options={states} />
        <SelectFilter label="Brand Type" keyName="brand" options={brands} />
        <SelectFilter label="Category" keyName="category" options={categories} />
      </aside>

      {/* Main content */}
      <main className="w-full lg:w-3/4 p-4">
        <div className="lg:hidden mb-4">
          <button
            onClick={() => setShowMobileFilters(!showMobileFilters)}
            className="bg-blue-600 text-white px-4 py-2 rounded w-full"
          >
            {showMobileFilters ? 'Hide Filters' : 'Show Filters'}
          </button>
        </div>

        {showMobileFilters && (
          <form onSubmit={(e) => e.preventDefault()} className="lg:hidden mb-6 border border-gray-300 rounded p-4 bg-white">
            <h2 className="text-xl font-bold mb-4">Filter Auctions</h2>
            <button
              type="button"
              onClick={resetFilters}
              className="bg-blue-500 text-white text-sm px-4 py-2 rounded w-full mb-4"
            >
              Reset Filters
            </button>
            <SelectFilter label="State" keyName="state" options={states} />
            <SelectFilter label="Brand Type" keyName="brand" options={brands} />
            <SelectFilter label="Category" keyName="category" options={categories} />
            <button
              type="submit"
              className="w-full mt-4 bg-green-600 text-white py-2 px-4 rounded"
            >
              Apply Filters
            </button>
          </form>
        )}

        <h1 className="text-2xl font-bold mb-4">
          {filters.state
            ? `Auctions in ${filters.state}`
            : filters.category
              ? `Live ${filters.category} Auction List`
              : 'Live Auction List'}
        </h1>

        {currentAuctions.length ? (
          currentAuctions.map((auction) => (
            <div
              key={auction.id}
              className="bg-white rounded-xl shadow-md border border-gray-300 mb-6 overflow-hidden max-w-4xl mx-auto"
            >
              <div className="flex flex-col sm:flex-row justify-between gap-4 p-4">
                <div className="flex gap-4">
                  <img
                    src={auction.image}
                    alt={auction.title}
                    className="w-32 h-20 object-cover rounded border border-gray-300"
                  />
                  <div>
                    <p className="text-blue-600 text-sm font-medium">
                      #{auction.date}
                      <span className="text-green-600 ml-2">Current</span>
                    </p>
                    <h2 className="text-lg font-semibold">{auction.title}</h2>
                    <div className="text-sm text-gray-700 mt-1 grid grid-cols-1 sm:grid-cols-3 gap-x-6">
                      <p>Published date<br />{auction.published}</p>
                      <p>Start date<br />{auction.start}</p>
                      <p>End date<br />{auction.end}</p>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col items-center justify-center">
                  <Link href="/auctionlist" className="flex flex-col items-center text-blue-600 hover:underline">
                    <PlusCircle size={24} />
                    <span className="text-sm hover:text-purple-500 hover:underline">Place Bids</span>
                  </Link>
                </div>
              </div>

              <div className="flex justify-around text-sm py-2 border-t border-gray-200 text-gray-800">
                <Link href="/dashboard/buyer" className="flex items-center gap-2 hover:text-purple-500 hover:underline">
                  <span className="text-xl">📋</span> My Bid List
                </Link>
                <Link href="/auctionlist" className="flex items-center gap-2 hover:text-purple-500 hover:underline">
                  <span className="text-xl">📄</span> View Vehicle List
                </Link>
              </div>

              <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-45  py-3 flex justify-between text-sm font-medium text-center">
                <div className='flex mx-auto justify-between gap-[70%]'>
                <div >
                  <p className="text-lg font-semibold">{auction.totalVehicles}</p>
                  <p>Total Vehicles</p>
                </div>
                <div>
                  <p className="text-lg font-semibold">{auction.myBids}</p>
                  <p>My Bids</p>
                </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-600 mt-10 text-center">
            No auctions found for selected filters.
          </p>
        )}

        {totalPages > 1 && (
          <div className="flex justify-center mt-6 gap-4">
            <button
              onClick={() => paginate('prev')}
              disabled={currentPage === 1}
              className="px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-50"
            >
              Previous
            </button>
            <span className="self-center">Page {currentPage} of {totalPages}</span>
            <button
              onClick={() => paginate('next')}
              disabled={currentPage === totalPages}
              className="px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-50"
            >
              Next
            </button>
          </div>
        )}
      </main>
    </div>
  );
}

