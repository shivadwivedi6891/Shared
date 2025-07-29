'use client';
import React, { useState } from "react";
import { PlusCircle } from "lucide-react";
import Link from "next/link";
import PrivateRoute from "@/components/PrivateRoute";

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

// States list
const statesList = [
  "Andhra Pradesh",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Orissa",
  "Rajasthan",
  "Telangana",
  "West Bengal",
];

const AuctionList = () => {
  const [selectedState, setSelectedState] = useState(null);

  const handleStateClick = (state) => {
    setSelectedState(selectedState === state ? null : state);
  };

  const filteredAuctions = selectedState
    ? auctionsData.filter((auction) => auction.state === selectedState)
    : auctionsData;

  return (
   
      <div className="min-h-screen bg-gray-100 text-black dark:bg-[#121a26] dark:text-white px-4 sm:px-10 py-6">
        <div className="flex flex-col gap-4 lg:flex-row justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-center lg:text-left">
            {selectedState ? `Auctions in ${selectedState}` : "Live Auctions"}
          </h1>
          <button
            onClick={() => setSelectedState(null)}
            className="bg-blue-600 text-white text-sm px-4 py-2 rounded hover:bg-blue-700 transition"
          >
            Reset Filter
          </button>
        </div>

        <div className="flex flex-wrap gap-2 mb-8 justify-center lg:justify-start">
          {statesList.map((state) => (
            <button
              key={state}
              onClick={() => handleStateClick(state)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium border transition ${
                selectedState === state
                  ? "bg-blue-600 text-white border-blue-600"
                  : "bg-white dark:bg-[#1f2937] text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600 hover:bg-blue-100 dark:hover:bg-[#374151]"
              }`}
            >
              {state}
            </button>
          ))}
        </div>

        {filteredAuctions.length > 0 ? (
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

                <button className="flex flex-col items-center text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-500 transition">
                  <PlusCircle size={24} />
                  <span className="text-xs">
                    <Link href="/auctionlist">Place Bids</Link>
                  </span>
                </button>
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
          <p className="text-center text-gray-600 dark:text-gray-400 mt-10">
            No auctions available for the selected state.
          </p>
        )}
      </div>

  );
};

export default AuctionList;

