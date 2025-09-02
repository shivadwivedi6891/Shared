"use client";
import React, { useState } from "react";
import { X } from "lucide-react";
import PrivateRoute from "./PrivateRoute";


export default function PlaceBidTableModal({ vehicles = [], open, onClose, onPlaceBids }) {
  const [bids, setBids] = useState({});

  if (!open) return null;

  const handleBidChange = (vehicleId, value) => {
    setBids((prev) => ({
      ...prev,
      [vehicleId]: value.replace(/[^0-9]/g, ""),
    }));
  };

  const getIncrement = (category) => {
    if (category === "Bike" || category === "2 Wheeler" || category === "Bike/2 Wheelers") return 2000;
    if (category === "Car") return 5000;
    if (category === "Lot" || category === "HCV/LCV" || category === "construction-equipments" || category === "Construction Equipment’s") return 10000;
    return 1000;
  };

  const handleIncrease = (vehicle) => {
    setBids((prev) => {
      const current = Number(prev[vehicle.id]) || Number(vehicle.startingBid) || 0;
      const increment = getIncrement(vehicle.category);
      return {
        ...prev,
        [vehicle.id]: current + increment,
      };
    });
  };

  const handleDecrease = (vehicle) => {
    setBids((prev) => {
      const current = Number(prev[vehicle.id]) || Number(vehicle.startingBid) || 0;
      const increment = getIncrement(vehicle.category);
      const min = Number(vehicle.startingBid) || 0;
      let next = current - increment;
      if (next < min) next = min;
      return {
        ...prev,
        [vehicle.id]: next,
      };
    });
  };

  const handlePlaceBids = () => {
    // Collect all bids and pass to parent
    const placedBids = vehicles
      .filter((v) => bids[v.id] && Number(bids[v.id]) > 0)
      .map((v) => ({
        vehicleId: v.id,
        bidAmount: Number(bids[v.id]),
      }));
    onPlaceBids && onPlaceBids(placedBids);
    onClose && onClose();
  };

  return (
    <PrivateRoute>
    <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center">
      <div className="bg-white rounded-xl shadow-xl max-w-4xl w-full p-6 relative overflow-auto max-h-[90vh]">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-red-600"
        >
          <X size={24} />
        </button>
        <h2 className="text-2xl font-bold mb-6 text-center">Place Bids for All Vehicles in Slot</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-200 rounded-lg">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-4 py-2 border">#</th>
                <th className="px-4 py-2 border">Image</th>
                <th className="px-4 py-2 border">Name</th>
                <th className="px-4 py-2 border">Number</th>
                <th className="px-4 py-2 border">Category</th>
                <th className="px-4 py-2 border">Current Price</th>
                <th className="px-4 py-2 border">Your Bid</th>
              </tr>
            </thead>
            <tbody>
              {vehicles.map((vehicle, idx) => (
                <tr key={vehicle.id} className="hover:bg-gray-50">
                  <td className="px-2 py-2 border text-center">{idx + 1}</td>
                  <td className="px-2 py-2 border text-center">
                    <img
                      src={vehicle.image}
                      alt={vehicle.name}
                      className="w-16 h-12 object-cover rounded"
                    />
                  </td>
                  <td className="px-2 py-2 border">{vehicle.name}</td>
                  <td className="px-2 py-2 border">{vehicle.number}</td>
                  <td className="px-2 py-2 border">{vehicle.category}</td>
                  <td className="px-2 py-2 border text-green-700 font-semibold">
                    ₹{vehicle.startingBid?.toLocaleString() || "—"}
                  </td>
                  <td className="px-2 py-2 border">
                    <input
                      type="number"
                      min={vehicle.startingBid || 0}
                      step={getIncrement(vehicle.category)}
                      value={bids[vehicle.id] || ""}
                      onChange={(e) => handleBidChange(vehicle.id, e.target.value)}
                      className="w-28 px-2 py-1 border rounded text-center"
                      placeholder="Enter bid"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex justify-end mt-6 gap-4">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            onClick={handlePlaceBids}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Place All Bids
          </button>
        </div>
      </div>
    </div>
    </PrivateRoute>

  );
}
