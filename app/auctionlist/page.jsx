'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import CarBidModal from '@/components/carbidmodal';
import TermsConditionModal from '@/components/termsconditionModal';

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
    images: [
      'https://news.dupontregistry.com/wp-content/uploads/2022/09/2022-bmw-m5-cs-1.jpg',
      'https://th.bing.com/th/id/OIP.y0t8TF7rcnTidXQ3xjY4EQHaEK?w=265&h=180&c=7&r=0&o=7&dpr=1.7&pid=1.7&rm=3',
      'https://th.bing.com/th/id/OIP.AEzARprGIBMBFT3E9JpSswHaEu?w=271&h=180&c=7&r=0&o=7&dpr=1.7&pid=1.7&rm=3',
      'https://th.bing.com/th/id/OIP.LMk9vvk9EXDYhaaipCbmjAHaDV?w=295&h=180&c=7&r=0&o=7&dpr=1.7&pid=1.7&rm=3',

    ],
    fuel: 'Petrol',
    registration: 'DL01BM1234',
    insurance: 'Valid till 2025',
    rcStatus: 'Available',
    permit: 'Personal',
    evaluation: 'Excellent condition. No dents, brand-new tyres.',
    contractNo: 'CN-001122',
    bids: 4,
    startingBid: 7550000,
  },
  {
    id: 2,
    name: 'Mercedes 2518',
    number: 'TN18AV4185',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQPF93lDlRe4ektKrTnEguHYykeFXuXwyjzXw&s',
    state: 'Tamil Nadu',
    city: 'Chennai',
    chassis: 'Truck',
    year: '2020',
    images: [
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQPF93lDlRe4ektKrTnEguHYykeFXuXwyjzXw&s',
      'https://tse3.mm.bing.net/th/id/OIP.6YlFE5UXmw1Ynv6vTF471gHaEK?pid=Api&P=0&h=180',
      'https://th.bing.com/th/id/OIP.Kv_XKZmKBzWgF130XvcXJgHaDz?w=276&h=179&c=7&r=0&o=5&dpr=1.7&pid=1.7',
      'https://tse2.mm.bing.net/th/id/OIP.h1LlkP-TKSraZOAZPlUE5wHaFj?pid=Api&P=0&h=180'
    ],
    fuel: 'Diesel',
    registration: 'TN18AV4185',
    insurance: 'Expired',
    rcStatus: 'Available',
    permit: 'National',
    evaluation: 'Used vehicle. Body dents visible, engine serviced.',
    contractNo: 'CN-005533',
    bids: 2,
    startingBid: 1050000,
  },
  {
    id: 3,
    name: 'Audi R8',
    number: 'BR06GF2371',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4iaxyNoXdZK8JYyLN5HygkEF0Eats_IZE9w&s',
    state: 'Bihar',
    city: 'Patna',
    chassis: 'Dumper',
    year: '2021',
    images: [
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4iaxyNoXdZK8JYyLN5HygkEF0Eats_IZE9w&s',
      'https://tse3.mm.bing.net/th/id/OIP.0sY3gsMgyzIY25MVGn-48gHaFj?pid=Api&P=0&h=180',
      'https://tse4.mm.bing.net/th/id/OIP.PxI_45b_yzcSk7ttii4m6AHaE8?pid=Api&P=0&h=180',
      'https://tse1.mm.bing.net/th/id/OIP.sH5TZe6kKX_RA5KauuC1sQHaE8?pid=Api&P=0&h=180',
    ],
    fuel: 'Diesel',
    registration: 'BR06GF2371',
    insurance: 'Valid till 2024',
    rcStatus: 'Pending',
    permit: 'State',
    evaluation: 'Fair condition. Tyres replacement required.',
    contractNo: 'CN-007788',
    bids: 6,
    startingBid: 1250000,
  },
];

const states = ['All', 'Delhi', 'Tamil Nadu', 'Bihar'];
const cities = ['All', 'New Delhi', 'Chennai', 'Patna'];
const chassisOptions = ['All', 'Sedan', 'Truck', 'Dumper'];
const years = ['All', '2020', '2021', '2023'];

export default function AuctionPage() {
  const router = useRouter();
  const { user } = useAuth();

  const [filters, setFilters] = useState({ state: 'All', city: 'All', chassis: 'All', year: 'All' });
  const [bids, setBids] = useState({});
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedCar, setSelectedCar] = useState(null);
  const [activeTab, setActiveTab] = useState('Gallery');
  const [termsModalOpen, setTermsModalOpen] = useState(false);
  const [confirmModalOpen, setConfirmModalOpen] = useState(false);
  const [bidVehicle, setBidVehicle] = useState(null);

  const handleInputChange = (id, field, value) => {
    setBids(prev => ({ ...prev, [id]: { ...prev[id], [field]: value } }));
  };

  const openConfirmModal = (vehicle) => {
    setBidVehicle(vehicle);
    setConfirmModalOpen(true);
  };

  const confirmPlaceBid = () => {
    if (bidVehicle) {
      alert(`✅ Bid placed on ${bidVehicle.name} for ₹${bids[bidVehicle.id]?.amount}`);
      setConfirmModalOpen(false);
      setBidVehicle(null);
    }
  };

  const filteredVehicles = vehiclesData.filter(vehicle =>
    (filters.state === 'All' || vehicle.state === filters.state) &&
    (filters.city === 'All' || vehicle.city === filters.city) &&
    (filters.chassis === 'All' || vehicle.chassis === filters.chassis) &&
    (filters.year === 'All' || vehicle.year === filters.year)
  );

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 py-12 px-6 text-gray-900 dark:text-white">
      <h1 className="text-4xl font-bold text-center mb-10">Vehicle Auction Listings</h1>
      <div className="flex flex-col lg:flex-row gap-8">
        <aside className="w-full lg:w-64 bg-white dark:bg-white/5 border dark:border-white/10 rounded-xl p-6 shadow space-y-6">
          {[{ label: 'State', options: states, key: 'state' },
            { label: 'City', options: cities, key: 'city' },
            { label: 'Chassis', options: chassisOptions, key: 'chassis' },
            { label: 'Year', options: years, key: 'year' }
          ].map(({ label, options, key }) => (
            <div key={key}>
              <label className="block text-sm font-medium mb-1">{label}</label>
              <select
                className="w-full px-3 py-2 border rounded dark:bg-gray-700 dark:border-gray-600"
                value={filters[key]}
                onChange={e => setFilters({ ...filters, [key]: e.target.value })}
              >
                {options.map(opt => <option key={opt}>{opt}</option>)}
              </select>
            </div>
          ))}
        </aside>

        <main className="flex-1 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {filteredVehicles.length === 0 && (
            <p className="col-span-full text-center text-gray-600 dark:text-gray-300">
              No vehicles match the selected filters.
            </p>
          )}

          {filteredVehicles.map(vehicle => {
            const bid = bids[vehicle.id] || {};
            const isBidValid = bid.amount > vehicle.startingBid && bid.agree;

            return (
              <div
                key={vehicle.id}
                className="bg-white dark:bg-white/5 rounded-xl border dark:border-white/10 shadow-xl p-5 hover:scale-[1.02] transition"
              >
                <img
                  src={vehicle.image}
                  alt={vehicle.name}
                  className="w-full h-48 object-cover rounded-lg mb-4"
                />

                <h2 className="text-lg font-bold">{vehicle.name}</h2>
                <p className="text-blue-600 dark:text-blue-400">{vehicle.number}</p>

                <div className="flex flex-wrap gap-2 my-2">
                  {['Gallery', 'Vehicle Details', 'Evaluation Report'].map(tab => (
                    <button
                      key={tab}
                      onClick={() => {
                        setSelectedCar(vehicle);
                        setActiveTab(tab);
                        setModalOpen(true);
                      }}
                      className="px-3 py-1 text-sm bg-gray-200 dark:bg-gray-700 rounded"
                    >
                      {tab}
                    </button>
                  ))}
                </div>

                <div className='flex gap-1'>
                  <h2>Current car price</h2>
                  <p className="text-lg font-semibold text-center text-green-600 dark:text-green-400">
                    ₹{vehicle.startingBid.toLocaleString()}
                  </p>
                </div>

                <input
                  type="number"
                  placeholder="Enter your bid"
                  value={bid.amount ?? ''}
                  onChange={e => handleInputChange(vehicle.id, 'amount', Number(e.target.value))}
                  className="w-full mt-2 px-3 py-2 border rounded dark:bg-gray-700 dark:border-gray-600"
                />

                <label className="flex items-center mt-2 text-sm">
                  <input
                    type="checkbox"
                    checked={bid.agree ?? false}
                    onChange={e => handleInputChange(vehicle.id, 'agree', e.target.checked)}
                    className="mr-2"
                  />
                  I Agree to
                  <button
                    onClick={() => setTermsModalOpen(true)}
                    className="text-blue-600 ml-1 underline hover:underline hover:text-blue-800"
                  >
                    Terms & Conditions
                  </button>
                </label>

                <div className="flex gap-2 mt-4">
                  <button className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-white py-2 rounded-lg">
                    View Details
                  </button>

                  <button
                    onClick={() => {
                      if (!user) {
                        router.push('/login');
                        return;
                      }
                      const isPremium = localStorage.getItem('premium_done') === 'true';
                      if (!isPremium) {
                        alert('⚠️ You must complete Premium Membership to place bids.');
                        router.push('/dashboard/buyer');
                        return;
                      }
                      if (isBidValid) openConfirmModal(vehicle);
                    }}
                    disabled={!isBidValid}
                    className={`flex-1 py-2 rounded-lg text-white ${
                      isBidValid
                        ? 'bg-blue-600 hover:bg-blue-700'
                        : 'bg-blue-300 cursor-not-allowed'
                    }`}
                  >
                    Place Bid
                  </button>
                </div>
              </div>
            );
          })}
        </main>
      </div>

      {isModalOpen && selectedCar && (
        <CarBidModal car={selectedCar} initialTab={activeTab} onClose={() => setModalOpen(false)} />
      )}

      {termsModalOpen && (
        <TermsConditionModal onClose={() => setTermsModalOpen(false)} />
      )}

      {confirmModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 w-full max-w-sm shadow-lg">
            <h3 className="text-xl font-semibold mb-4">Confirm Your Bid</h3>
            <p className="mb-4 text-gray-700 dark:text-gray-200">
              Are you sure you want to place a bid of ₹{bids[bidVehicle?.id]?.amount} on <strong>{bidVehicle?.name}</strong>?
            </p>
            <div className="flex justify-end gap-4">
              <button
                onClick={() => {
                  setConfirmModalOpen(false);
                  setBidVehicle(null);
                }}
                className="px-4 py-2 bg-gray-300 dark:bg-gray-600 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={confirmPlaceBid}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}







