// 'use client';

// import { useState } from 'react';

// const vehiclesData = [
//   {
//     id: 1,
//     name: 'BME M5',
//     number: 'NL01AA9365',
//     image: 'https://news.dupontregistry.com/wp-content/uploads/2022/09/2022-bmw-m5-cs-1.jpg',
//   },
//   {
//     id: 2,
//     name: '',
//     number: 'TN18AV4185',
//     image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQPF93lDlRe4ektKrTnEguHYykeFXuXwyjzXw&s',
//   },
//   {
//     id: 3,
//     name: 'Signa 2823',
//     number: 'BR06GF2371',
//     image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4iaxyNoXdZK8JYyLN5HygkEF0Eats_IZE9w&s',
//   },
// ];

// export default function AuctionPage() {
//   const [filters, setFilters] = useState({ state: '', city: '', chassis: '', year: '' });
//   const [bids, setBids] = useState({});

//   const handleFilterChange = (field, value) => {
//     setFilters({ ...filters, [field]: value });
//   };

//   const handleInputChange = (id, field, value) => {
//     setBids((prev) => ({
//       ...prev,
//       [id]: {
//         ...prev[id],
//         [field]: value,
//       },
//     }));
//   };

//   return (
//     <div className="flex min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 text-gray-900 dark:text-white">
//       {/* Sidebar Filter */}
//       <div className="w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 shadow px-4 py-6 space-y-4">
//         {['State', 'City', 'Chassis Description', 'Year of Manufacture'].map((filter) => (
//           <div key={filter} className="border rounded shadow-sm bg-gray-100 dark:bg-gray-700">
//             <button className="w-full text-left font-medium px-3 py-2 text-gray-800 dark:text-white">
//               {filter} <span className="float-right">+</span>
//             </button>
//           </div>
//         ))}
//       </div>

//       {/* Main Content */}
//       <div className="flex-1 px-6 py-8">
//         <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
//           {vehiclesData.map((vehicle) => {
//             const bid = bids[vehicle.id] || {};
//             return (
//               <div
//                 key={vehicle.id}
//                 className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-5 flex flex-col gap-4 border border-gray-200 dark:border-gray-700"
//               >
//                 <img src={vehicle.image} alt={vehicle.name} className="w-full h-48 object-cover rounded-xl" />

//                 <div>
//                   <h2 className="font-bold text-lg text-gray-800 dark:text-white">
//                     {vehicle.name} <span className="text-blue-600 dark:text-blue-400">{vehicle.number}</span>
//                   </h2>
//                 </div>

//                 <div className="flex flex-wrap gap-2">
//                   {['Gallery', 'Vehicle Details', 'Other Details', 'Evaluation Report'].map((label) => (
//                     <button
//                       key={label}
//                       className="px-3 py-1 text-sm bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-800 dark:text-white"
//                     >
//                       {label}
//                     </button>
//                   ))}
//                 </div>

//                 <button className="mt-2 px-4 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded shadow-sm flex items-center gap-2 text-gray-800 dark:text-white">
//                   💛 Add to Watchlist
//                 </button>

//                 <div className="text-sm mt-2">
//                   <label className="block mb-1">Your Bid:</label>
//                   <input
//                     type="number"
//                     value={bid.amount || ''}
//                     onChange={(e) => handleInputChange(vehicle.id, 'amount', e.target.value)}
//                     className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
//                     placeholder="Enter your bid"
//                   />
//                   <label className="flex items-center mt-2">
//                     <input
//                       type="checkbox"
//                       checked={bid.agree || false}
//                       onChange={(e) => handleInputChange(vehicle.id, 'agree', e.target.checked)}
//                       className="mr-2 accent-blue-600"
//                     />
//                     I Agree <a href="#" className="text-blue-600 dark:text-blue-400 ml-1 underline">Terms & Conditions</a>
//                   </label>
//                 </div>

//                 <div className="flex gap-2 mt-3">
//                   <button className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-white py-2 rounded-lg shadow-md">
//                     View Details
//                   </button>
//                   <button
//                     className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg shadow-md"
//                     disabled={!bid.agree || !bid.amount}
//                   >
//                     Place Bid
//                   </button>
//                 </div>
//               </div>
//             );
//           })}
//         </div>
//       </div>
//     </div>
//   );
// }



'use client';

import { useState } from 'react';

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
    <div className="flex min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 text-gray-900 dark:text-white">
      {/* Sidebar Filters */}
      <aside className="w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 shadow px-4 py-6 space-y-6">
        {/* State Filter */}
        <div>
          <label className="block text-sm font-medium mb-1">State</label>
          <select
            className="w-full px-3 py-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            value={filters.state}
            onChange={(e) => setFilters({ ...filters, state: e.target.value })}
          >
            {states.map((s) => (
              <option key={s}>{s}</option>
            ))}
          </select>
        </div>

        {/* City Filter */}
        <div>
          <label className="block text-sm font-medium mb-1">City</label>
          <select
            className="w-full px-3 py-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            value={filters.city}
            onChange={(e) => setFilters({ ...filters, city: e.target.value })}
          >
            {cities.map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>
        </div>

        {/* Chassis Filter */}
        <div>
          <label className="block text-sm font-medium mb-1">Chassis Description</label>
          <select
            className="w-full px-3 py-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            value={filters.chassis}
            onChange={(e) => setFilters({ ...filters, chassis: e.target.value })}
          >
            {chassisOptions.map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>
        </div>

        {/* Year Filter */}
        <div>
          <label className="block text-sm font-medium mb-1">Year of Manufacture</label>
          <select
            className="w-full px-3 py-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            value={filters.year}
            onChange={(e) => setFilters({ ...filters, year: e.target.value })}
          >
            {years.map((y) => (
              <option key={y}>{y}</option>
            ))}
          </select>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 px-6 py-8">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
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
                className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-5 flex flex-col gap-4 border border-gray-200 dark:border-gray-700"
              >
                <img src={vehicle.image} alt={vehicle.name} className="w-full h-48 object-cover rounded-xl" />

                <div>
                  <h2 className="font-bold text-lg text-gray-800 dark:text-white">
                    {vehicle.name}{' '}
                    <span className="text-blue-600 dark:text-blue-400">{vehicle.number}</span>
                  </h2>
                </div>

                <div className="flex flex-wrap gap-2">
                  {['Gallery', 'Vehicle Details', 'Other Details', 'Evaluation Report'].map((label) => (
                    <button
                      key={label}
                      className="px-3 py-1 text-sm bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-800 dark:text-white"
                    >
                      {label}
                    </button>
                  ))}
                </div>

                <button className="mt-2 px-4 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded shadow-sm flex items-center gap-2 text-gray-800 dark:text-white">
                  💛 Add to Watchlist
                </button>

                <div className="text-sm mt-2">
                  <label className="block mb-1">Your Bid:</label>
                  <input
                    type="number"
                    value={bid.amount || ''}
                    onChange={(e) => handleInputChange(vehicle.id, 'amount', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
                    placeholder="Enter your bid"
                  />
                  <label className="flex items-center mt-2">
                    <input
                      type="checkbox"
                      checked={bid.agree || false}
                      onChange={(e) => handleInputChange(vehicle.id, 'agree', e.target.checked)}
                      className="mr-2 accent-blue-600"
                    />
                    I Agree <a href="#" className="text-blue-600 dark:text-blue-400 ml-1 underline">Terms & Conditions</a>
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
            );
          })}
        </div>
      </main>
    </div>
  );
}
