'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';

export default function CarDetailPage() {
  const { id } = useParams();
  const [car, setCar] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCar = async () => {
      try {
        const res = await fetch(`/api/car/${id}`);
        if (!res.ok) throw new Error(`Error ${res.status}`);
        const data = await res.json();
        setCar(data);
      } catch (err) {
        console.error('Failed to fetch car data:', err);
        setError('Failed to load car.');
      }
    };
    if (id) fetchCar();

  }, [id]);

  if (error)
    return (
      <div className="text-center text-red-600 dark:text-red-400 mt-10">
        {error}
      </div>
    );

  if (!car)
    return (
      <div className="text-center text-gray-600 dark:text-gray-300 mt-10">
        Loading...
      </div>
    );

  return (
    <div className="p-6 max-w-3xl mx-auto bg-white dark:bg-[#0f0f0f] border border-gray-200 dark:border-gray-700 shadow-lg rounded-2xl mt-8 transition-colors duration-300">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
        {car.name}
      </h1>

      <img
        src={car.image}
        alt={car.name}
        className="w-full max-w-2xl rounded-lg object-cover mx-auto"
      />

      <div className="mt-6 space-y-3 text-gray-800 dark:text-gray-300 text-sm sm:text-base">
        <p><strong className="font-medium">Location:</strong> {car.location}</p>
        <p><strong className="font-medium">Price:</strong> ₹{car.price.toLocaleString()}</p>
        <p><strong className="font-medium">Year:</strong> {car.year}</p>
        <p><strong className="font-medium">Mileage:</strong> {car.mileage} km</p>
        <p><strong className="font-medium">Fuel:</strong> {car.fuelType}</p>
        <p><strong className="font-medium">Transmission:</strong> {car.transmission}</p>
        <p><strong className="font-medium">Seller:</strong> {car.seller}</p>
        <p><strong className="font-medium">Watchers:</strong> {car.watchers}</p>
        <p><strong className="font-medium">Bids:</strong> {car.bids}</p>
        <p><strong className="font-medium">Time Left:</strong> {car.timeLeft}</p>
      </div>
    </div>
  );
}
