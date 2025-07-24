"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import PrivateRoute from "@/components/PrivateRoute";

export default function AllCarsPage() {
  const [cars, setCars] = useState([]);
  const [filteredCars, setFilteredCars] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [error, setError] = useState(false);
  const [bids, setBids] = useState({});

  useEffect(() => {
    fetch("http://localhost:3000/api/car", { cache: "no-store" })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load cars");
        return res.json();
      })
      .then((data) => {
        setCars(data);
        setFilteredCars(data);
      })
      .catch(() => setError(true));
  }, []);

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);

    const filtered = cars.filter((car) =>
      car.name.toLowerCase().includes(query)
    );
    setFilteredCars(filtered);
  };

  const handleInputChange = (id, field, value) => {
    setBids((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        [field]: value,
      },
    }));
  };

  const handlePlaceBid = (carId, carName) => {
    const carBid = bids[carId];
    const car = cars.find((c) => c.id === carId);

    if (!carBid?.agree || !carBid?.bidAmount) {
      alert("Please enter a bid amount and agree to the terms.");
      return;
    }

    if (Number(carBid.bidAmount) <= Number(car.price)) {
      alert(`Bid must be higher than the current price ($${car.price}).`);
      return;
    }

    const newBid = {
      id: carId,
      name: carName,
      bidAmount: Number(carBid.bidAmount),
      timeLeft: "3d 2h 15m", // static for now
      image: car?.image || "",
      status: "leading",
    };

    const existingBids = JSON.parse(localStorage.getItem("myBids") || "[]");
    const updatedBids = [
      ...existingBids.filter((b) => b.id !== carId),
      newBid,
    ];
    localStorage.setItem("myBids", JSON.stringify(updatedBids));

    alert(`✅ Successfully placed a bid of $${carBid.bidAmount} on ${carName}`);
  };

  if (error) {
    return (
      <div className="text-center mt-20 text-red-500">Failed to load cars.</div>
    );
  }

  return (
    <PrivateRoute>
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-200 dark:from-[#0f0f0f] dark:to-[#1a1a1a] py-12 px-6">
        <h1 className="text-4xl font-extrabold text-center mb-6 text-gray-800 dark:text-white">
          Explore Cars for Auction
        </h1>

        <div className="flex justify-center mb-12">
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearch}
            placeholder="Search cars by name..."
            className="w-full max-w-3xl px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#1f1f1f] text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {filteredCars.map((car) => {
            const carBid = bids[car.id] || {};
            const isBidInvalid =
              !carBid.agree ||
              !carBid.bidAmount ||
              Number(carBid.bidAmount) <= Number(car.price);

            return (
              <div
                key={car.id}
                className="bg-white dark:bg-white/5 rounded-3xl overflow-hidden border border-gray-200 dark:border-white/10 shadow-xl group"
              >
                <div className="overflow-hidden">
                  <img
                    src={car.image}
                    alt={car.name}
                    className="w-full h-52 object-cover transform group-hover:scale-105 transition duration-300"
                  />
                </div>

                <div className="p-5 space-y-2">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                    {car.name}
                  </h2>
                  <p className="text-green-600 dark:text-green-400 font-semibold text-lg">
                    $ {Number(car.price).toLocaleString()}
                  </p>

                  <div className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
                    <p>
                      <span className="font-medium">📍 Location:</span>{" "}
                      {car.location}
                    </p>
                    <p>
                      <span className="font-medium">📅 Year:</span> {car.year} •{" "}
                      {car.mileage} km
                    </p>
                    <p>
                      <span className="font-medium">⚙ Specs:</span>{" "}
                      {car.fuelType} • {car.transmission}
                    </p>
                  </div>

                  <div className="mt-4 space-y-2">
                    <input
                      type="number"
                      placeholder="Your Bid"
                      value={carBid.bidAmount || ""}
                      onChange={(e) =>
                        handleInputChange(
                          car.id,
                          "bidAmount",
                          e.target.value
                        )
                      }
                      className="w-full px-3 py-2 rounded border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />

                    <label className="flex items-center space-x-2 text-sm">
                      <input
                        type="checkbox"
                        checked={carBid.agree || false}
                        onChange={(e) =>
                          handleInputChange(
                            car.id,
                            "agree",
                            e.target.checked
                          )
                        }
                        className="accent-purple-600"
                      />
                      <span className="text-gray-700 dark:text-gray-300">
                        I Agree{" "}
                        <span className="underline">
                          <Link href="/terms">Terms & Conditions</Link>
                        </span>
                      </span>
                    </label>

                    <div className="flex gap-2">
                      <button className="flex-1 bg-yellow-600 hover:bg-yellow-700 text-white py-2 rounded-lg text-sm">
                        <Link href={`/auction/${car.id}`}>View Details</Link>
                      </button>

                      <button
                        className="flex-1 bg-purple-700 hover:bg-purple-800 text-white py-2 rounded-lg text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                        disabled={isBidInvalid}
                        onClick={() => handlePlaceBid(car.id, car.name)}
                      >
                        Place Bid
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </PrivateRoute>
  );
}











// "use client";
// import React, { useEffect, useState } from "react";
// import Link from "next/link";
// import PrivateRoute from "@/components/PrivateRoute";

// export default function AllCarsPage() {
//   const [cars, setCars] = useState([]);
//   const [filteredCars, setFilteredCars] = useState([]);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [error, setError] = useState(false);
//   const [bids, setBids] = useState({});

//   useEffect(() => {
//     fetch("http://localhost:3000/api/car", { cache: "no-store" })
//       .then((res) => {
//         if (!res.ok) throw new Error("Failed to load cars");
//         return res.json();
//       })
//       .then((data) => {
//         setCars(data);
//         setFilteredCars(data);
//       })
//       .catch(() => setError(true));
//   }, []);

//   const handleSearch = (e) => {
//     const query = e.target.value.toLowerCase();
//     setSearchQuery(query);

//     const filtered = cars.filter((car) =>
//       car.name.toLowerCase().includes(query)
//     );
//     setFilteredCars(filtered);
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

//   const handlePlaceBid = (carId, carName) => {
//     const carBid = bids[carId];
//     if (carBid?.agree && carBid?.bidAmount) {
//       const newBid = {
//         id: carId,
//         name: carName,
//         bidAmount: Number(carBid.bidAmount),
//         timeLeft: "3d 2h 15m", // for now, static
//         image: cars.find((c) => c.id === carId)?.image || "",
//         status: "leading",
//       };

//       // ✅ Save to localStorage
//       const existingBids = JSON.parse(localStorage.getItem("myBids") || "[]");
//       const updatedBids = [...existingBids.filter((b) => b.id !== carId), newBid];
//       localStorage.setItem("myBids", JSON.stringify(updatedBids));

//       alert(`Placed a bid of $${carBid.bidAmount} on ${carName}`);
//     }
//   };

//   if (error) {
//     return (
//       <div className="text-center mt-20 text-red-500">Failed to load cars.</div>
//     );
//   }

//   return (

//     <PrivateRoute>
//     <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-200 dark:from-[#0f0f0f] dark:to-[#1a1a1a] py-12 px-6">
//       <h1 className="text-4xl font-extrabold text-center mb-6 text-gray-800 dark:text-white">
//         Explore Cars for Auction
//       </h1>

//       <div className="flex justify-center mb-12">
//         <input
//           type="text"
//           value={searchQuery}
//           onChange={handleSearch}
//           placeholder="Search cars by name..."
//           className="w-full max-w-3xl px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#1f1f1f] text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
//         />
//       </div>

//       <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
//         {filteredCars.map((car) => {
//           const carBid = bids[car.id] || {};
//           return (
//             <div
//               key={car.id}
//               className="bg-white dark:bg-white/5 rounded-3xl overflow-hidden border border-gray-200 dark:border-white/10 shadow-xl group"
//             >
//               <div className="overflow-hidden">
//                 <img
//                   src={car.image}
//                   alt={car.name}
//                   className="w-full h-52 object-cover transform group-hover:scale-105 transition duration-300"
//                 />
//               </div>

//               <div className="p-5 space-y-2">
//                 <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
//                   {car.name}
//                 </h2>
//                 <p className="text-green-600 dark:text-green-400 font-semibold text-lg">
//                   $ {Number(car.price).toLocaleString()}
//                 </p>

//                 <div className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
//                   <p><span className="font-medium">📍 Location:</span> {car.location}</p>
//                   <p><span className="font-medium">📅 Year:</span> {car.year} • {car.mileage} km</p>
//                   <p><span className="font-medium">⚙ Specs:</span> {car.fuelType} • {car.transmission}</p>
//                 </div>

//                 <div className="mt-4 space-y-2">
//                   <input
//                     type="number"
//                     placeholder="Your Bid"
//                     value={carBid.bidAmount || ""}
//                     onChange={(e) =>
//                       handleInputChange(car.id, "bidAmount", e.target.value)
//                     }
//                     className="w-full px-3 py-2 rounded border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
//                   />

//                   <label className="flex items-center space-x-2 text-sm">
//                     <input
//                       type="checkbox"
//                       checked={carBid.agree || false}
//                       onChange={(e) =>
//                         handleInputChange(car.id, "agree", e.target.checked)
//                       }
//                       className="accent-purple-600"
//                     />
//                     <span className="text-gray-700 dark:text-gray-300">
//                       I Agree <span className="underline">
//                         <Link href="/terms">Terms & Conditions
//                         </Link></span>
//                     </span>
//                   </label>

//                   <div className="flex gap-2">
//                     <button className="flex-1 bg-yellow-600 hover:bg-yellow-700 text-white py-2 rounded-lg text-sm">
//                       <Link href={`/auction/${car.id}`}>View Details</Link>
//                     </button>

//                     <button
//                       className="flex-1 bg-purple-700 hover:bg-purple-800 text-white py-2 rounded-lg text-sm"
//                       disabled={!carBid.agree || !carBid.bidAmount}
//                       onClick={() => handlePlaceBid(car.id, car.name)}
//                     >
//                       Place Bid
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           );
//         })}
//       </div>
//     </div>
//     </PrivateRoute>
//   );
// }
































// "use client"
// import React, { useEffect, useState } from 'react';
// import Link from 'next/link';

// export default function AllCarsPage() {
//   const [cars, setCars] = useState([]);
//   const [filteredCars, setFilteredCars] = useState([]);
//   const [searchQuery, setSearchQuery] = useState('');
//   const [error, setError] = useState(false);

//   useEffect(() => {
//     fetch('http://localhost:3000/api/car', { cache: 'no-store' })
//       .then((res) => {
//         if (!res.ok) throw new Error('Failed to load cars');
//         return res.json();
//       })
//       .then((data) => {
//         setCars(data);
//         setFilteredCars(data);
//       })
//       .catch(() => setError(true));
//   }, []);

//   const handleSearch = (e) => {
//     const query = e.target.value.toLowerCase();
//     setSearchQuery(query);

//     const filtered = cars.filter((car) =>
//       car.name.toLowerCase().includes(query)
//     );

//     setFilteredCars(filtered);
//   };

//   if (error) {
//     return <div className="text-center mt-20 text-red-500">Failed to load cars.</div>;
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-200 dark:from-[#0f0f0f] dark:to-[#1a1a1a] py-12 px-6">
//       <h1 className="text-4xl font-extrabold text-center mb-6 text-gray-800 dark:text-white">
//         Explore Cars for Auction
//       </h1>

//       <div className="flex justify-center mb-12">
//         <input
//           type="text"
//           value={searchQuery}
//           onChange={handleSearch}
//           placeholder="Search cars by name..."
//             className="w-full max-w-3xl px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#1f1f1f] text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
//         />
//       </div>

//       <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
//         {filteredCars.map((car) => (
//           <div
//             key={car.id}
//             className="bg-white dark:bg-white/5 backdrop-blur-xl rounded-3xl overflow-hidden border border-gray-200 dark:border-white/10 shadow-xl transition hover:scale-[1.02] hover:shadow-2xl duration-300 group"
//           >
//             <div className="overflow-hidden">
//               <img
//                 src={car.image}
//                 alt={car.name}
//                 className="w-full h-52 object-cover transform group-hover:scale-105 transition duration-300"
//               />
//             </div>

//             <div className="p-5 space-y-2">
//               <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{car.name}</h2>
//               <p className="text-green-600 dark:text-green-400 font-semibold text-lg">
//                 $ {Number(car.price).toLocaleString()}
//               </p>

//               <div className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
//                 <p><span className="font-medium">📍 Location:</span> {car.location}</p>
//                 <p><span className="font-medium">📅 Year:</span> {car.year} • {car.mileage} km</p>
//                 <p><span className="font-medium">⚙ Specs:</span> {car.fuelType} • {car.transmission}</p>


            

//               <div>
//             <div className="mt-4 space-y-2">
//               <input
//                 type="number"
//                 placeholder="Your Bid"
//                 className="w-full px-3 py-2 rounded border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
//                 onChange={(e) => car.bidAmount = e.target.value}
//               />
  
//               <label className="flex items-center space-x-2 text-sm">
//                 <input
//                  type="checkbox"
//                  required
//                  onChange={(e) => car.agree = e.target.checked}
//                  className="accent-purple-600"
//                />
//                <span className="text-gray-700 dark:text-gray-300">I Agree <span className="underline">Terms & Conditions</span></span>       
//               </label>

//               <div className="flex gap-2">
//                 <button
//                   className="flex-1  bg-purple-800 hover:bg-purple-800 text-white py-2 rounded-lg text-sm"
//                 >
//                   <Link href={`/auction/${car.id}`} >View Details</Link>
//                 </button>
//                  <button
//                    className="flex-1 bg-purple-700 hover:bg-purple-800 text-white py-2 rounded-lg text-sm"
//                    disabled={!car.agree || !car.bidAmount}

//                    onClick={() => {
//                      if (car.agree && car.bidAmount) {
//                    alert(`Placed a bid of $${car.bidAmount} on ${car.name}`);
//                            }
//                          }}
//                        >
//                          Place Bid
//                        </button>
//                      </div>
//                   </div>
//                </div>
//               </div>
//             </div>  
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }
