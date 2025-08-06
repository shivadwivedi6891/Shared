'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function WatchlistPage() {
  const [watchlist, setWatchlist] = useState([]);

  const router = useRouter();

  useEffect(() => {
    const stored = localStorage.getItem('watchlist');
    if (stored) {
      setWatchlist(JSON.parse(stored));
    }
  }, []);

  const handleRemove = (carId) => {
    const updatedList = watchlist.filter((car) => car.id !== carId);
    setWatchlist(updatedList);
    localStorage.setItem('watchlist', JSON.stringify(updatedList));
  };

  const handleView = (carId) => {
    router.push(`/car/${carId}`); 
  };

  return (
    <div className="min-h-screen px-4 py-10 bg-gray-50 dark:bg-gray-900 text-black dark:text-white">
      <h1 className="text-3xl font-bold mb-6">Your Watchlist</h1>
      {watchlist.length === 0 ? (
        <p className="text-gray-600 dark:text-gray-300">No cars in your watchlist yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {watchlist.map((car) => (
            <div key={car.id} className="bg-white dark:bg-white/10 p-4 rounded-xl shadow border border-gray-300 dark:border-gray-600">
              <h2 className="text-xl font-semibold mb-1">{car.title || 'Untitled Car'}</h2>
              <p className="text-sm text-gray-600 dark:text-gray-300">Registration: {car.registration}</p>
              <p className="text-sm text-gray-600 dark:text-gray-300">Fuel: {car.fuelType}</p>
              <p className="text-sm text-gray-600 dark:text-gray-300">Mfg. Year: {car.year}</p>
              <div className="flex justify-between mt-4">
                <button
                  onClick={() => handleView(car.id)}
                  className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  View
                </button>
                <button
                  onClick={() => handleRemove(car.id)}
                  className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
