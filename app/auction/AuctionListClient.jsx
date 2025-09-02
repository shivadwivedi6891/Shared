"use client";
import React, { useState, useEffect } from "react";
import { PlusCircle } from "lucide-react";
import PlaceBidTableModal from "@/components/placebidtable";
import { getAuctionList } from "@/services/AuctionServices/AuctionApiFunction";

const states = ["Andhra Pradesh", "Kerala"];
const brands = ["BMW", "Mercedes"];
const categories = ["Car", "Bike/2 Wheelers"];

export default function AuctionListClient({ initialAuctions, initialTotalPages }) {
  const [filters, setFilters] = useState({ state: "", brand: "", category: "" });
  const [auctions, setAuctions] = useState(initialAuctions || []);
  const [totalPages, setTotalPages] = useState(initialTotalPages || 1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (
      !filters.state &&
      !filters.brand &&
      !filters.category
    ) {
      setAuctions(initialAuctions || []);
      setTotalPages(initialTotalPages || 1);
      return;
    }
    setLoading(true);
    const fetchAuctions = async () => {
      try {
        const payload = {
          start: 0,
          number: 10,
          state: filters.state,
          brand: filters.brand,
          category: filters.category,
        };
        const res = await getAuctionList(payload);
        if (res?.data?.success) {
          setAuctions(res.data.data.result.items || []);
          setTotalPages(res.data.data.result.numberOfPages || 1);
        } else {
          setAuctions([]);
          setTotalPages(1);
        }
      } catch (error) {
        setAuctions([]);
        setTotalPages(1);
      }
      setLoading(false);
    };
    fetchAuctions();
  }, [filters]);

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const resetFilters = () => {
    setFilters({ state: "", brand: "", category: "" });
  };

  return (
    <div className="flex flex-col lg:flex-row bg-white min-h-screen text-black">
      {/* Sidebar Filter */}
      <aside className="w-full lg:w-1/4 bg-white p-5 border-b lg:border-b-0 lg:border-r border-gray-300 sticky top-0 h-fit">
        <h2 className="text-2xl font-bold mb-4">Filter By</h2>
        <button
          onClick={resetFilters}
          className="bg-blue-600 text-white text-sm px-4 py-2 rounded hover:bg-blue-700 w-full mb-6"
        >
          Reset
        </button>
        <div className="mb-4">
          <label className="block font-semibold mb-1">State</label>
          <select
            value={filters.state}
            onChange={(e) => handleFilterChange("state", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded bg-white text-black"
          >
            <option value="">All</option>
            {states.map((opt) => (
              <option key={opt} value={opt}>{opt}</option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label className="block font-semibold mb-1">Brand</label>
          <select
            value={filters.brand}
            onChange={(e) => handleFilterChange("brand", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded bg-white text-black"
          >
            <option value="">All</option>
            {brands.map((opt) => (
              <option key={opt} value={opt}>{opt}</option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label className="block font-semibold mb-1">Category</label>
          <select
            value={filters.category}
            onChange={(e) => handleFilterChange("category", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded bg-white text-black"
          >
            <option value="">All</option>
            {categories.map((opt) => (
              <option key={opt} value={opt}>{opt}</option>
            ))}
          </select>
        </div>
      </aside>
      {/* Main Content */}
      <main className="w-full lg:w-3/4 p-2 sm:p-4">
        <h1 className="text-2xl font-bold mb-6">Live Auction List</h1>
        {loading ? (
          <p className="text-center text-gray-600 mt-10">Loading auctions...</p>
        ) : auctions.length ? (
          auctions.map((auction) => (
            <div
              key={auction.id}
              className="bg-white rounded-xl shadow-md border border-gray-300 mb-6 overflow-hidden w-full max-w-5xl mx-auto"
            >
              {/* ...existing card code... */}
              <div className="flex flex-col sm:flex-row justify-between items-start gap-2 sm:gap-4 p-2 sm:p-4">
                <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 w-full">
                  <img
                    src={auction.imageUrl || "https://tse1.mm.bing.net/th/id/OIP.X42b4q5g88ldlViDnsLj9QHaEK?pid=Api&P=0&h=180"}
                    alt={auction.name}
                    className="w-full sm:w-36 h-36 sm:h-24 object-cover rounded border border-gray-300"
                  />
                  <div className="flex-1">
                    <p className="text-blue-600 text-xs sm:text-sm font-medium">
                      #{new Date(auction.startDate).toLocaleDateString()} <span className="text-green-600 ml-2">{auction.status || "Current"}</span>
                    </p>
                    <h2 className="text-base sm:text-xl font-semibold break-words">{auction.name || "Auction Lot"}</h2>
                    <div className="text-xs sm:text-sm text-gray-700 mt-1 grid grid-cols-1 sm:grid-cols-3 gap-x-2 sm:gap-x-6">
                      <p>Published date<br /><span className="break-words">{auction.publishedDate ? new Date(auction.publishedDate).toLocaleString() : "-"}</span></p>
                      <p>Start date<br /><span className="break-words">{auction.startDate ? new Date(auction.startDate).toLocaleString() : "-"}</span></p>
                      <p>End date<br /><span className="break-words">{auction.endDate ? new Date(auction.endDate).toLocaleString() : "-"}</span></p>
                    </div>
                  </div>
                </div>
                {/* Place Bid Button */}
                <div className="flex flex-row sm:flex-col items-center justify-center gap-2 sm:gap-0 mt-2 sm:mt-0">
                  <button className="flex flex-col items-center text-blue-600 hover:text-purple-500 hover:underline focus:outline-none">
                    <PlusCircle size={24} />
                    <span className="text-xs sm:text-sm hover:text-purple-500 hover:underline">Place Bids</span>
                  </button>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row justify-around text-xs sm:text-sm py-2 border-t border-gray-200 text-gray-800">
                <a href="/dashboard/buyer" className="flex items-center gap-2 hover:text-purple-500 hover:underline">
                  <span className="text-xl">📋</span> My Bid List
                </a>
                <a href="/auctionlist" className="flex items-center gap-2 hover:text-purple-500 hover:underline">
                  <span className="text-xl">📄</span> View Vehicle List
                </a>
              </div>
              <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-4 sm:px-20 py-2 sm:py-3 flex flex-col sm:flex-row justify-between text-xs sm:text-sm font-medium text-center">
                <div className="mb-2 sm:mb-0">
                  <p className="text-base sm:text-lg font-semibold">-</p>
                  <p>Total Vehicles</p>
                </div>
                <div>
                  <p className="text-base sm:text-lg font-semibold">-</p>
                  <p>My Bids</p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-600 mt-10">No auctions found.</p>
        )}
      </main>
    </div>
  );
}
