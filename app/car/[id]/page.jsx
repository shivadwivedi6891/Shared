
'use client';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Clock, Eye, MapPin, Fuel, Settings } from 'lucide-react';
import Link from 'next/link';

export default function CarDetailPage() {
  const params = useParams(); 
  const [car, setCar] = useState(null);

  const cars = [
    {
      id: '1',
      name: 'Rolls-Royce Phantom Ultra Luxury',
      price: 485000,
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTpU2XqzCYUZgGzb-pAlgKoQJ-IlApC9B442Q&s',
      location: 'San Jose, CA',
      timeLeft: '2d 3h 11m',
      watchers: 312,
      bids: 52,
      mileage: 3200,
      year: 2023,
      fuelType: 'Electric',
      transmission: 'Automatic'
    },
    {
      id: '2',
      name: 'Mercedes AMG GT Limited Edition',
      price: 155000,
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSIGDX6A6DLidp0OkcRUC1wQ3xCmmWzlUq-Ew&s',
      location: 'Berlin, DE',
      timeLeft: '1d 6h 42m',
      watchers: 278,
      bids: 46,
      mileage: 1900,
      year: 2022,
      fuelType: 'Electric',
      transmission: 'Automatic'
    },
    {
      id: '3',
      name: 'Bentley Continental GT',
      price: 245000,
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRvFEKzSTu1G3jMFRDDKEp_3sIVWIimOJA-Ow&s',
      location: 'Paris, FR',
      timeLeft: '3d 14h 8m',
      watchers: 214,
      bids: 38,
      mileage: 700,
      year: 2024,
      fuelType: 'Electric',
      transmission: 'Automatic'
    },
    {
  id: '4',
  name: '2023 Chevrolet Corvette Z06',
  price: 105000,
  image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSfbtg2h_3mXv6wX82-1_SXzRTze7ZbUmIMsw&s',
  location: 'Orlando, FL',
  timeLeft: '2d 5h 30m',
  watchers: 185,
  bids: 33,
  mileage: 2100,
  year: 2023
},
{
  id: '5',
  name: '2021 Nissan GT-R NISMO',
  price: 185000,
  image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQXJVhKSwVDbiyh1E7dE6lxlJzVHJbxhDP3rw&s',
  location: 'Las Vegas, NV',
  timeLeft: '3d 7h 50m',
  watchers: 240,
  bids: 42,
  mileage: 8700,
  year: 2021
},
{
  id: '6',
  name: '2022 McLaren GT',
  price: 210000,
  image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRxcM-mXG40YDgf3vq1u1ia-zJRTZZBCpF0Ew&s',
  location: 'Los Angeles, CA',
  timeLeft: '1d 3h 20m',
  watchers: 298,
  bids: 55,
  mileage: 3300,
  year: 2022
},
{
  id: '7',
  name: '2022 Aston Martin Vantage',
  price: 139000,
  image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRAcGPp_vCF4sMQqsYHrrVQ07WTLLiw_fuEGQ&s',
  location: 'Scottsdale, AZ',
  timeLeft: '4d 9h 15m',
  watchers: 176,
  bids: 39,
  mileage: 4100,
  year: 2022
},
{
  id: '8',
  name: '2020 Lamborghini Aventador SVJ',
  price: 395000,
  image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJsEq6G39j_nDsvCOI9-tmeKZ0AQL_XZUrHw&s',
  location: 'Beverly Hills, CA',
  timeLeft: '1d 12h 5m',
  watchers: 322,
  bids: 63,
  mileage: 2900,
  year: 2020
},
{
  id: '9',
  name: '2023 Porsche 911 Turbo S',
  price: 204000,
  image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQqkq_WOxNe3ObrEusZad-Iykh6TfD9Tr7WmA&s',
  location: 'Miami Beach, FL',
  timeLeft: '5d 6h 45m',
  watchers: 245,
  bids: 48,
  mileage: 1800,
  year: 2023
}

  ];

  useEffect(() => {
    if (params?.id) {
      const foundCar = cars.find((c) => c.id === params.id);
      setCar(foundCar || null);
    }
  }, [params]);

  if (!car) {
    return <div className="p-10 text-center text-red-500">Car not found</div>;
  }

  return (
    <div className="min-h-screen bg-black text-white px-6 py-10">
      <div className="max-w-5xl mx-auto"> 
       <Link href="/auctions"
             className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-lg text-white bg-gradient-to-r from-purple-600 to-pink-500 hover:from-pink-500 hover:to-purple-600 transition-all duration-300 shadow-md hover:shadow-lg">
             ← Back to Auctions
           </Link> 

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <img src={car.image} alt={car.name} className="w-full rounded-xl shadow" />
          <div>
            <h1 className="text-3xl font-bold mb-4">{car.name}</h1>
            <p className="text-lg text-gray-400 mb-2">
              <MapPin className="inline w-4 h-4 mr-1" /> {car.location}
            </p>
            <p className="text-lg text-gray-400 mb-2">
              <Clock className="inline w-4 h-4 mr-1" /> {car.timeLeft} remaining
            </p>
            <p className="text-lg text-gray-400 mb-2">
              <Eye className="inline w-4 h-4 mr-1" /> {car.watchers} watching
            </p>
            <p className="text-lg text-gray-400 mb-2">
              <Fuel className="inline w-4 h-4 mr-1" /> Fuel: {car.fuelType}
            </p>
            <p className="text-lg text-gray-400 mb-4">
              <Settings className="inline w-4 h-4 mr-1" /> Transmission: {car.transmission}
            </p>
            <h2 className="text-2xl font-semibold text-purple-400 mb-4">
              ${car.price.toLocaleString()}
            </h2>
            <p className="text-sm text-gray-400">
              {car.mileage.toLocaleString()} miles • {car.year}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
