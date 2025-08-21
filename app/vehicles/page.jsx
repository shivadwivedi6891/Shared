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
      timeLeft: "3d 2h 15m",
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
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-200 py-12 px-6">
      <h1 className="text-4xl font-extrabold text-center mb-6 text-gray-800">
        Explore Cars for Auction
      </h1>

      <div className="flex justify-center mb-12">
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearch}
          placeholder="Search cars by name..."
          className="w-full max-w-3xl px-4 py-2 rounded-lg border border-gray-300 bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
              className="bg-white rounded-3xl overflow-hidden border border-gray-200 shadow-xl group"
            >
              <div className="overflow-hidden">
                <img
                  src={car.image}
                  alt={car.name}
                  className="w-full h-52 object-cover transform group-hover:scale-105 transition duration-300"
                />
              </div>

              <div className="p-5 space-y-2">
                <h2 className="text-2xl font-bold text-gray-900">
                  {car.name}
                </h2>
                <p className="text-green-600 font-semibold text-lg">
                  $ {Number(car.price).toLocaleString()}
                </p>

                <div className="text-sm text-gray-600 space-y-1">
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
                  <div className="flex gap-2">
                    <button className="flex-1 bg-purple-800 hover:bg-yellow-700 text-white py-2 rounded-lg text-sm">
                      <Link href={`/auction/${car.id}`}>View Details</Link>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}