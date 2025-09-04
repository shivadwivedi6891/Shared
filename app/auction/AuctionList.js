'use client';
import React, { useState, useEffect } from 'react';
import { PlusCircle } from 'lucide-react';
import PlaceBidTableModal from "@/components/placebidtable";
import { getAuctionList } from '@/services/AuctionServices/AuctionApiFunction';

// Main auction list component
export default function AuctionList() {
  // State for filters, auctions, pagination, loading, and bid modal
  const [filters, setFilters] = useState({ state: '', brand: '', category: '' });
  const [auctions, setAuctions] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [showBidModal, setShowBidModal] = useState(false);
  const [selectedAuction, setSelectedAuction] = useState(null);
  const [showMobileFilter, setShowMobileFilter] = useState(false);

  const auctionsPerPage = 4;

  // Filter options
  const states = ['Andhra Pradesh', 'Kerala'];
  const brands = ['BMW', 'Mercedes'];
  const categories = ['Car', 'Bike/2 Wheelers'];

  // Fetch auctions
  const fetchAuctions = async () => {
    setLoading(true);
    try {
      const payload = {
        start: (currentPage - 1) * auctionsPerPage,
        number: auctionsPerPage,
        state: filters.state,
        category: filters.category,
        brand: filters.brand
      };
      const res = await getAuctionList(payload);
      if (res.data.success) {
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

  useEffect(() => {
    fetchAuctions();
  }, [filters, currentPage]);

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
    setCurrentPage(1);
  };

  const resetFilters = () => {
    setFilters({ state: '', brand: '', category: '' });
    setCurrentPage(1);
  };

  const paginate = (direction) => {
    if (direction === 'prev' && currentPage > 1) setCurrentPage(prev => prev - 1);
    if (direction === 'next' && currentPage < totalPages) setCurrentPage(prev => prev + 1);
  };

  const SelectFilter = ({ label, keyName, options }) => (
    <div className="mb-4">
      <label className="block font-semibold mb-1">{label}</label>
      <select
        value={filters[keyName]}
        onChange={e => handleFilterChange(keyName, e.target.value)}
        className="w-full px-3 py-2 border border-gray-300 rounded bg-white text-black"
      >
        <option value="">All</option>
        {options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
      </select>
    </div>
  );

  return (
    <div className="flex flex-col lg:flex-row bg-white min-h-screen text-black">
      
      {/* Mobile Accordion Filter */}
      <div className="lg:hidden p-3">
        <div className="border rounded-lg shadow-md overflow-hidden">
          {/* Header */}
          <button
            onClick={() => setShowMobileFilter(!showMobileFilter)}
            className="w-full flex justify-between items-center bg-blue-600 text-white px-4 py-2"
          >
            <span className="font-semibold">Filters</span>
            <svg
              className={`w-5 h-5 transform transition-transform duration-300 ${showMobileFilter ? "rotate-180" : ""}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {/* Collapsible Content */}
          {showMobileFilter && (
            <div className="p-4 bg-white">
              <button
                onClick={resetFilters}
                className="bg-blue-600 text-white text-sm px-4 py-2 rounded hover:bg-blue-700 w-full mb-4"
              >
                Reset
              </button>
              <SelectFilter label="State" keyName="state" options={states} />
              <SelectFilter label="Brand" keyName="brand" options={brands} />
              <SelectFilter label="Category" keyName="category" options={categories} />
            </div>
          )}
        </div>
      </div>

      {/* Sidebar Filter (Desktop) */}
      <aside className="hidden lg:block lg:w-1/4 bg-white p-5 border-r border-gray-300 sticky top-0 h-fit">
        <h2 className="text-2xl font-bold mb-4">Filter By</h2>
        <button
          onClick={resetFilters}
          className="bg-blue-600 text-white text-sm px-4 py-2 rounded hover:bg-blue-700 w-full mb-6"
        >
          Reset
        </button>
        <SelectFilter label="State" keyName="state" options={states} />
        <SelectFilter label="Brand" keyName="brand" options={brands} />
        <SelectFilter label="Category" keyName="category" options={categories} />
      </aside>

      {/* Main Content */}
      <main className="w-full lg:w-3/4 p-2 sm:p-4">
        <h1 className="text-2xl font-bold mb-6">Live Auction List</h1>
        {loading ? (
          <p className="text-center text-gray-600 mt-10">Loading auctions...</p>
        ) : auctions.length ? (
          auctions.map((auction) => (
            <div key={auction.id} className="bg-white rounded-xl shadow-md border border-gray-300 mb-6 overflow-hidden w-full max-w-5xl mx-auto">
              {/* --- your auction card content stays unchanged --- */}

            
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
                  <h2 className="text-base sm:text-xl font-semibold break-words">{auction.name || "Vijayawada Lot-1"}</h2>
                  <div className="text-xs sm:text-sm text-gray-700 mt-1 grid grid-cols-1 sm:grid-cols-3 gap-x-2 sm:gap-x-6">
                    <p>Published date<br /><span className="break-words">{auction.publishedDate ? new Date(auction.publishedDate).toLocaleString() : "24-07-2025 10:00:00 AM"}</span></p>
                    <p>Start date<br /><span className="break-words">{auction.startDate ? new Date(auction.startDate).toLocaleString() : "25-07-2025 09:00:00 AM"}</span></p>
                    <p>End date<br /><span className="break-words">{auction.endDate ? new Date(auction.endDate).toLocaleString() : "27-07-2025 06:00:00 PM"}</span></p>
                  </div>
                </div>
              </div>
              {/* Place Bid Button */}
              <div className="flex flex-row sm:flex-col items-center justify-center gap-2 sm:gap-0 mt-2 sm:mt-0">
                <button
                  className="flex flex-col items-center text-blue-600 hover:text-purple-500 hover:underline focus:outline-none"
                  onClick={() => {
                    setSelectedAuction(auction);
                    setShowBidModal(true);
                  }}
                >
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
                <p className="text-base sm:text-lg font-semibold">{'-'}</p>
                <p>Total Vehicles</p>
              </div>
              <div>
                <p className="text-base sm:text-lg font-semibold">{'-'}</p>
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














// 'use client';

// import React, { useState, useEffect } from 'react';
// import { PlusCircle, FileText, List } from 'lucide-react';
// import PlaceBidTableModal from "@/components/placebidtable";
// import { getAuctionList } from '@/services/AuctionServices/AuctionApiFunction';

// export default function AuctionList() {
//   const [filters, setFilters] = useState({ state: '', brand: '', category: '' });
//   const [auctions, setAuctions] = useState([]);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(1);
//   const [loading, setLoading] = useState(false);

//   const [showBidModal, setShowBidModal] = useState(false);
//   const [selectedAuction, setSelectedAuction] = useState(null);

//   const auctionsPerPage = 4;

//   // Filter options
//   const states = ['Andhra Pradesh', 'Kerala'];
//   const brands = ['BMW', 'Mercedes'];
//   const categories = ['Car', 'Bike/2 Wheelers'];

//   // Hardcoded slot vehicles for bid modal
//   const slotVehicles = [
//     { id: 1, name: "BMW M5", number: "NL01AA9365", category: "Car", image: "https://news.dupontregistry.com/wp-content/uploads/2022/09/2022-bmw-m5-cs-1.jpg", startingBid: 7550000 },
//     { id: 2, name: "Mercedes 2518", number: "TN18AV4185", category: "Lot", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQPF93lDlRe4ektKrTnEguHYykeFXuXwyjzXw&s", startingBid: 1050000 },
//   ];

//   // Fetch auctions
//   const fetchAuctions = async () => {
//     setLoading(true);
//     try {
//       const payload = {
//         start: (currentPage - 1) * auctionsPerPage,
//         number: auctionsPerPage,
//         state: filters.state,
//         category: filters.category,
//         brand: filters.brand
//       };

//       const res = await getAuctionList(payload);
//       if (res.data.success) {
//         setAuctions(res.data.data.result.items || []);
//         setTotalPages(res.data.data.result.numberOfPages || 1);
//       } else {
//         setAuctions([]);
//         setTotalPages(1);
//       }
//     } catch (error) {
//       console.error('Error fetching auctions:', error);
//       setAuctions([]);
//       setTotalPages(1);
//     }
//     setLoading(false);
//   };

//   useEffect(() => {
//     fetchAuctions();
//   }, [filters, currentPage]);

//   const handleFilterChange = (key, value) => {
//     setFilters(prev => ({ ...prev, [key]: value }));
//     setCurrentPage(1);
//   };

//   const resetFilters = () => {
//     setFilters({ state: '', brand: '', category: '' });
//     setCurrentPage(1);
//   };

//   const paginate = (direction) => {
//     if (direction === 'prev' && currentPage > 1) setCurrentPage(prev => prev - 1);
//     if (direction === 'next' && currentPage < totalPages) setCurrentPage(prev => prev + 1);
//   };

//   const SelectFilter = ({ label, keyName, options }) => (
//     <div className="mb-4">
//       <label className="block font-semibold mb-1">{label}</label>
//       <select
//         value={filters[keyName]}
//         onChange={e => handleFilterChange(keyName, e.target.value)}
//         className="w-full px-3 py-2 border border-gray-300 rounded bg-white text-black"
//       >
//         <option value="">All</option>
//         {options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
//       </select>
//     </div>
//   );

//   return (
//   <div className="flex flex-col lg:flex-row bg-white min-h-screen text-black">
//     {/* Sidebar Filter */}
//     <aside className="hidden lg:block lg:w-1/4 bg-white p-5 border-r border-gray-300 sticky top-0 h-fit">
//       <h2 className="text-2xl font-bold mb-4">Filter By</h2>
//       <button
//         onClick={resetFilters}
//         className="bg-blue-600 text-white text-sm px-4 py-2 rounded hover:bg-blue-700 w-full mb-6"
//       >
//         Reset
//       </button>
//       <SelectFilter label="State" keyName="state" options={states} />
//       <SelectFilter label="Brand" keyName="brand" options={brands} />
//       <SelectFilter label="Category" keyName="category" options={categories} />
//     </aside>

//     {/* Main Content */}
//     <main className="w-full lg:w-3/4 p-2 sm:p-4">
//       <h1 className="text-2xl font-bold mb-6">Live Auction List</h1>

//       {loading ? (
//         <p className="text-center text-gray-600 mt-10">Loading auctions...</p>
//       ) : auctions.length ? (
//         auctions.map((auction) => (
//           <div
//             key={auction.id}
//             className="bg-white rounded-xl shadow-md border border-gray-300 mb-6 overflow-hidden w-full max-w-5xl mx-auto"
//           >
//             {/* Top Section */}
            // <div className="flex flex-col sm:flex-row justify-between items-start gap-2 sm:gap-4 p-2 sm:p-4">
            //   <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 w-full">
            //     <img
            //       src={auction.imageUrl || "https://tse1.mm.bing.net/th/id/OIP.X42b4q5g88ldlViDnsLj9QHaEK?pid=Api&P=0&h=180"}
            //       alt={auction.name}
            //       className="w-full sm:w-36 h-36 sm:h-24 object-cover rounded border border-gray-300"
            //     />
            //     <div className="flex-1">
            //       <p className="text-blue-600 text-xs sm:text-sm font-medium">
            //         #{new Date(auction.startDate).toLocaleDateString()} <span className="text-green-600 ml-2">{auction.status || "Current"}</span>
            //       </p>
            //       <h2 className="text-base sm:text-xl font-semibold break-words">{auction.name || "Vijayawada Lot-1"}</h2>
            //       <div className="text-xs sm:text-sm text-gray-700 mt-1 grid grid-cols-1 sm:grid-cols-3 gap-x-2 sm:gap-x-6">
            //         <p>Published date<br /><span className="break-words">{auction.publishedDate ? new Date(auction.publishedDate).toLocaleString() : "24-07-2025 10:00:00 AM"}</span></p>
            //         <p>Start date<br /><span className="break-words">{auction.startDate ? new Date(auction.startDate).toLocaleString() : "25-07-2025 09:00:00 AM"}</span></p>
            //         <p>End date<br /><span className="break-words">{auction.endDate ? new Date(auction.endDate).toLocaleString() : "27-07-2025 06:00:00 PM"}</span></p>
            //       </div>
            //     </div>
            //   </div>
            //   {/* Place Bid Button */}
            //   <div className="flex flex-row sm:flex-col items-center justify-center gap-2 sm:gap-0 mt-2 sm:mt-0">
            //     <button
            //       className="flex flex-col items-center text-blue-600 hover:text-purple-500 hover:underline focus:outline-none"
            //       onClick={() => {
            //         setSelectedAuction(auction);
            //         setShowBidModal(true);
            //       }}
            //     >
            //       <PlusCircle size={24} />
            //       <span className="text-xs sm:text-sm hover:text-purple-500 hover:underline">Place Bids</span>
            //     </button>
            //   </div>
            // </div>
            // <div className="flex flex-col sm:flex-row justify-around text-xs sm:text-sm py-2 border-t border-gray-200 text-gray-800">
            //   <a href="/dashboard/buyer" className="flex items-center gap-2 hover:text-purple-500 hover:underline">
            //     <span className="text-xl">📋</span> My Bid List
            //   </a>
            //   <a href="/auctionlist" className="flex items-center gap-2 hover:text-purple-500 hover:underline">
            //     <span className="text-xl">📄</span> View Vehicle List
            //   </a>
            // </div>
            // <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-4 sm:px-20 py-2 sm:py-3 flex flex-col sm:flex-row justify-between text-xs sm:text-sm font-medium text-center">
            //   <div className="mb-2 sm:mb-0">
            //     <p className="text-base sm:text-lg font-semibold">{'-'}</p>
            //     <p>Total Vehicles</p>
            //   </div>
            //   <div>
            //     <p className="text-base sm:text-lg font-semibold">{'-'}</p>
            //     <p>My Bids</p>
            //   </div>
            // </div>
//           </div>
//         ))
//       ) : (
//         <p className="text-center text-gray-600 mt-10">No auctions found.</p>
//       )}
//     </main>
//   </div>
//   )
// }
