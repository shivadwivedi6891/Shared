'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import CarBidModal from '@/components/carbidmodal';
import TermsConditionModal from '@/components/termsconditionModal';
import Link from 'next/link';

// Sample vehicle data
const vehiclesData = [
  {
    id: 1,
    name: 'BMW M5',
    brand: 'BMW',
    category: 'Car',
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
    brand: 'Mercedes',
    category: 'Lot',
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
    name: 'Harley davidson',
    brand: 'Harley',
    category: 'Two Wheeler',
    number: 'BR06GF2371',
    image: 'https://tse1.mm.bing.net/th/id/OIP.IY0U2CXbdMz99gWRduvGcAHaEK?pid=Api&P=0&h=180',
    state: 'Bihar',
    city: 'Patna',
    chassis: 'Dumper',
    year: '2021',
    images: ['https://tse4.mm.bing.net/th/id/OIP.1_NEjpJtaVlhlwt9CBbsCgHaEK?pid=Api&P=0&h=180','https://tse2.mm.bing.net/th/id/OIP.Pq1Vc6MzI0jZQXT9j8yMUwHaEJ?pid=Api&P=0&h=180',
      'https://tse2.mm.bing.net/th/id/OIP.ipmTQXAMc81wnlKDPrQImAHaEd?pid=Api&P=0&h=180'
   
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
const brands = ['All', 'BMW', 'Mercedes', 'harley'];
const categories = ['All', 'Two Wheeler', 'Car', 'Lot'];

// Main auction list page component
export default function AuctionPage() {
  const router = useRouter();
  const { user } = useAuth();

  const [filters, setFilters] = useState({ state: 'All', brand: 'All', category: 'All' });
  const [bids, setBids] = useState({});
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedCar, setSelectedCar] = useState(null);
  const [activeTab, setActiveTab] = useState('Gallery');
  const [termsModalOpen, setTermsModalOpen] = useState(false);
  const [confirmModalOpen, setConfirmModalOpen] = useState(false);
  const [bidVehicle, setBidVehicle] = useState(null);

  // Function to determine minimum bid increment based on vehicle category
  const getMinIncrement = (category) => {
    if (category === 'Two Wheeler') return 2000;
    if (category === 'Car') return 5000;
    if (category === 'Lot') return 10000;
    return 1000;
  };

  // Function to validate if a bid is valid based on amount, starting bid, and increment
  const isValidBid = (amount, startingBid, increment) => {
    return amount > startingBid && (amount - startingBid) % increment === 0;
  };

  // Function to open the confirmation modal for placing a bid
  const openConfirmModal = (vehicle) => {
    setBidVehicle(vehicle);
    setConfirmModalOpen(true);
  };

  // Function to confirm and place the bid
  const confirmPlaceBid = () => {
    if (bidVehicle) {
      alert(` Bid placed on ${bidVehicle.name} for ₹${bids[bidVehicle.id]?.amount}`);
      setConfirmModalOpen(false);
      setBidVehicle(null);
    }
  };

  // Filter vehicles based on selected filters (state, brand, category)
  const filteredVehicles = vehiclesData.filter(vehicle =>
    (filters.state === 'All' || vehicle.state === filters.state) &&
    (filters.brand === 'All' || vehicle.brand === filters.brand) &&
    (filters.category === 'All' || vehicle.category === filters.category)
  );

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-6 text-gray-900">
      <h1 className="text-4xl font-bold text-center mb-10">Vehicle Auction Listings</h1>
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar */}
        <aside className="w-full lg:w-64 bg-white border rounded-xl p-6 shadow space-y-6">
          {[{ label: 'State', options: states, key: 'state' },
            { label: 'Brand', options: brands, key: 'brand' },
            { label: 'Category', options: categories, key: 'category' }
          ].map(({ label, options, key }) => (
            <div key={key}>
              <label className="block text-sm font-medium mb-1">{label}</label>
              <select
                className="w-full px-3 py-2 border rounded"
                value={filters[key]}
                onChange={e => setFilters({ ...filters, [key]: e.target.value })}
              >
                {options.map(opt => <option key={opt}>{opt}</option>)}
              </select>
            </div>
          ))}

          <button
            className="w-full bg-red-500 hover:bg-green-500 text-white py-2 rounded-lg"
            onClick={() => setFilters({ state: 'All', brand: 'All', category: 'All' })}
          >
            Reset Filters
          </button>
        </aside>

        <main className="flex-1 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {filteredVehicles.length === 0 && (
            <p className="col-span-full text-center text-gray-600">
              No vehicles match the selected filters.
            </p>
          )}

          {filteredVehicles.map((vehicle, index) => {
            const increment = getMinIncrement(vehicle.category);
            const currentBid = bids[vehicle.id]?.amount ?? vehicle.startingBid;
            const agreed = bids[vehicle.id]?.agree ?? false;
            const isBidValid = isValidBid(currentBid, vehicle.startingBid, increment) && agreed;

            return (
              <div key={vehicle.id} className="bg-white rounded-xl border shadow-xl p-5 hover:scale-[1.02] transition">
                <img src={vehicle.image} alt={vehicle.name} className="w-full h-48 object-cover rounded-lg mb-4" />
                <h2 className="text-lg font-bold">{vehicle.name}</h2>
                <p className="text-blue-600">{vehicle.number}</p>

                <div className="flex flex-wrap gap-2 my-2">
                  {['Gallery', 'Vehicle Details','Other Details','Evaluation Report'].map(tab => (
                    <button
                      key={tab}
                      onClick={() => {
                        setSelectedCar(vehicle);
                        setActiveTab(tab);
                        setModalOpen(true);
                      }}
                      className="px-3 py-1 text-sm bg-gray-200 rounded"
                    >
                      {tab}
                    </button>
                  ))}
                </div>

                <div className='flex gap-1'>
                  <h2>Rank:</h2>
                  <p className="text-lg font-semibold text-center text-green-600">
                    {index + 1}
                  </p>
                </div>

                {/* Bid Controls */}
                <div className="mt-3 flex flex-wrap items-center justify-between gap-2 px-3 py-2 bg-gray-100 rounded-md">
                  <span className="text-sm font-medium">Your Bid:</span>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() =>
                        setBids(prev => {
                          const prevAmount = prev[vehicle.id]?.amount ?? vehicle.startingBid;
                          const newAmount = Math.max(vehicle.startingBid, prevAmount - increment);
                          return {
                            ...prev,
                            [vehicle.id]: {
                              ...prev[vehicle.id],
                              amount: newAmount
                            }
                          };
                        })
                      }
                      className="w-7 h-7 text-sm bg-red-500 text-white rounded hover:bg-red-600 transition"
                    >
                      –
                    </button>
                    <span className="px-2 text-sm font-semibold text-blue-700">
                      ₹{currentBid.toLocaleString("en-US")}
                    </span>
                    <button
                      onClick={() =>
                        setBids(prev => ({
                          ...prev,
                          [vehicle.id]: {
                            ...prev[vehicle.id],
                            amount: (prev[vehicle.id]?.amount ?? vehicle.startingBid) + increment
                          }
                        }))
                      }
                      className="w-7 h-7 text-sm bg-green-600 text-white rounded hover:bg-green-700 transition"
                    >
                      +
                    </button>
                  </div>
                </div>

                <label className="flex items-center mt-2 text-sm">
                  <input
                    type="checkbox"
                    checked={agreed}
                    onChange={e =>
                      setBids(prev => ({
                        ...prev,
                        [vehicle.id]: { ...prev[vehicle.id], agree: e.target.checked, amount: currentBid }
                      }))
                    }
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
                  <button
                    className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-white py-2 rounded-lg"
                    onClick={() => {
                      setSelectedCar(vehicle);
                      setActiveTab('Vehicle Details');
                      setModalOpen(true);
                    }}
                  >
                    View Details

                  </button>

                  <button
                    onClick={() => {
                      if (!user) {
                        router.push('/login');
                        return;
                      }

                     

                      const bidCountKey = `user_bid_count_${user.id}`;
                      const currentBidCount = parseInt(localStorage.getItem(bidCountKey)) || 0;

                      if (currentBidCount >= 10) {
                        alert('⚠ You have reached the maximum limit of 10 bids.');
                        return;
                      }

                      if (isBidValid) {
                        localStorage.setItem(bidCountKey, currentBidCount + 1);
                        openConfirmModal(vehicle);
                      }
                    }}
                    disabled={!isBidValid}
                    className={`flex-1 py-2 rounded-lg text-white ${isBidValid ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-300 cursor-not-allowed'}`}
                  >
                    Place Bid
                  </button>
                </div>
              </div>
            );
          })}
        </main>
      </div>

      {/* Modals */}
      {isModalOpen && selectedCar && (
        <CarBidModal car={selectedCar} initialTab={activeTab} onClose={() => setModalOpen(false)} />
      )}
      {termsModalOpen && (
        <TermsConditionModal onClose={() => setTermsModalOpen(false)} />
      )}
      {confirmModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white rounded-xl p-6 w-full max-w-sm shadow-lg">
            <h3 className="text-xl font-semibold mb-4">Confirm Your Bid</h3>
            <p className="mb-4 text-gray-700">
              Are you sure you want to place a bid of ₹{bids[bidVehicle?.id]?.amount} on <strong>{bidVehicle?.name}</strong>?
            </p>
            <div className="flex justify-end gap-4">
              <button
                onClick={() => {
                  setConfirmModalOpen(false);
                  setBidVehicle(null);
                }}
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
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