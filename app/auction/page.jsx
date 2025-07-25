import React from "react";
import { PlusCircle } from "lucide-react";
import Link from "next/link";

const auctions = [
  {
    id: 1,
    title: "Jaipur Lot-1",
    date: "Jul 19, 2025",
    published: "18-07-2025 05:12:19 PM",
    start: "19-07-2025 09:00:00 AM",
    end: "21-07-2025 03:00:00 PM",
    totalVehicles: 16,
    totalBids: 19,
    myBids: 0,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSWqN2EANln9bj2b9J_oqKBBzLmR8_uWCyTFA&s",
  },
  {
    id: 2,
    title: "Indore Lot-2",
    date: "Jul 19, 2025",
    published: "18-07-2025 05:14:13 PM",
    start: "19-07-2025 09:00:00 AM",
    end: "21-07-2025 03:00:00 PM",
    totalVehicles: 13,
    totalBids: 10,
    myBids: 0,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTvSdgKNTZUv6UdvxOuQID7-h9mpCxzq4DrZQ&s",
  },
  {
    id: 3,
    title: "Mumbai Lot-1",
    date: "Jul 20, 2025",
    published: "18-07-2025 06:30:00 PM",
    start: "20-07-2025 10:00:00 AM",
    end: "22-07-2025 04:00:00 PM",
    totalVehicles: 11,
    totalBids: 18,
    myBids: 0,
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQTmEbLFNCoZfJC8b8wgNHJbUM5im1ApoexlQ&s",
  },
  {
    id: 4,
    title: "Bhopal Lot-2",
    date: "Jul 20, 2025",
    published: "18-07-2025 04:45:00 PM",
    start: "20-07-2025 11:00:00 AM",
    end: "22-07-2025 06:00:00 PM",
    totalVehicles: 9,
    totalBids: 26,
    myBids: 0,
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTW5GGrFLrWvSf4Ae3UcZVw3ZJvUdJT-3b-tQ&s",
  },
];

const AuctionList = () => {
  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-gray-100 text-black dark:bg-[#121a26] dark:text-white">
      {/* Sidebar */}
      <aside className="w-full lg:w-64 bg-gray-200 dark:bg-[#1f2937] p-5 border-b lg:border-b-0 lg:border-r border-gray-700">
        <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-gray-200">Filter By</h2>
        <button className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition">
          Reset
        </button>

        <div className="mt-6">
          <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">State</h3>
          <div className="flex flex-wrap gap-2">
            {[
              "Andhra Pradesh",
              "Kerala",
              "Madhya Pradesh",
              "Orissa",
              "Rajasthan",
              "Telangana",
              "West Bengal",
            ].map((state) => (
              <span
                key={state}
                className="bg-gray-300 dark:bg-[#374151] text-black dark:text-gray-300 text-xs px-2 py-1 rounded hover:bg-gray-400 dark:hover:bg-[#4b5563] cursor-pointer"
              >
                {state}
              </span>
            ))}
          </div>
        </div>

        {["Regions", "Brand Type", "Year of Manufacture"].map((cat) => (
          <div key={cat} className="mt-6">
            <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400 cursor-pointer">
              + {cat}
            </h3>
          </div>
        ))}
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-4 sm:p-6 bg-gray-100 dark:bg-transparent">
        <h1 className="text-2xl font-bold text-black dark:text-white mb-6 text-center lg:text-left">
          Live Auctions List
        </h1>

        {auctions.map((auction) => (
          <div
            key={auction.id}
            className="bg-white dark:bg-[#1e293b] rounded-xl shadow-md border border-gray-300 dark:border-gray-700 mb-6 overflow-hidden"
          >
            {/* Header */}
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
                  <h2 className="text-lg font-semibold text-black dark:text-white">{auction.title}</h2>
                  <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    <p>Published: {auction.published}</p>
                    <p>Start: {auction.start}</p>
                    <p>End: {auction.end}</p>
                  </div>
                </div>
              </div>

              <button className="flex flex-col items-center text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-500 transition">
                <PlusCircle size={24} />
                <span className="text-xs">Place Bids</span>
              </button>
            </div>

            {/* Footer */}
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
                <button className="text-blue-600 dark:text-blue-500 hover:underline w-full">My Bid List</button>
              </div>
              <div>
                <Link href="/auctionlist" className="text-blue-600 dark:text-blue-500 hover:underline w-full">
                  View Vehicle List
                </Link>
              </div>
            </div>
          </div>
        ))}
      </main>
    </div>
  );
};

export default AuctionList;
