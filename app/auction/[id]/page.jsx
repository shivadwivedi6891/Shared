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
        const res = await fetch(`/api/car/${id}`); // ✅ FIXED: path matches route.js
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

  if (error) return <div className="text-center text-red-500 mt-10">{error}</div>;
  if (!car) return <div className="text-center mt-10">Loading...</div>;

  return (
    <div className="p-4 max-w-3xl mx-auto bg-white dark:bg-gray-900 shadow-md rounded-lg mt-6">
      <h1 className="text-2xl font-bold text-gray-800 dark:text-white">{car.name}</h1>
      <img
        src={car.image}
        alt={car.name}
        className="w-full max-w-md mt-4 rounded-lg object-cover"
      />
      <div className="mt-4 space-y-1 text-gray-700 dark:text-gray-300">
        <p><strong>Location:</strong> {car.location}</p>
        <p><strong>Price:</strong> ${car.price.toLocaleString()}</p>
        <p><strong>Year:</strong> {car.year}</p>
        <p><strong>Mileage:</strong> {car.mileage} km</p>
        <p><strong>Fuel:</strong> {car.fuelType}</p>
        <p><strong>Transmission:</strong> {car.transmission}</p>
        <p><strong>Seller:</strong> {car.seller}</p>
        <p><strong>Watchers:</strong> {car.watchers}</p>
        <p><strong>Bids:</strong> {car.bids}</p>
        <p><strong>Time Left:</strong> {car.timeLeft}</p>
      </div>
    </div>
  );
}