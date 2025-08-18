'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Gavel, Heart, Trophy, Eye, Clock } from 'lucide-react';

import PrivateRoute from '@/components/PrivateRoute';
import { useAuth } from '../../../context/AuthContext';
import { useRouter } from 'next/navigation';

import KYCModal from '@/components/kycModel';
import PremiumModal from '@/components/premiumModal';

export default function BuyerDashboard() {

  const router = useRouter();
  const { user, kyc } = useAuth();
  const [activeTab, setActiveTab] = useState('bids');
  const [myBids, setMyBids] = useState([]);
  const [isKycOpen, setIsKycOpen] = useState(false);
  const [showPremiumModal, setShowPremiumModal] = useState(false);
  const [showChangePassword, setShowChangePassword] = useState(false);

  const wonAuctions = [
    {
      id: 1,
      carName: '2018 McLaren 570S',
      image: 'https://images.pexels.com/photos/1545743/pexels-photo-1545743.jpeg',
      winningBid: 175000,
      status: 'payment_pending',
    },
  ];

  const watchingList = [
    {
      id: 1,
      carName: '2022 BMW M3',
      image: 'https://images.pexels.com/photos/1592384/pexels-photo-1592384.jpeg',
      currentBid: 72000,
      timeLeft: '5d 12h 20m',
    },
  ];



  
 const [subscription, setSubscription] = useState(false);

  // ✅ Load subscription status from localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('subscription');
      console.log('Loaded subscription status:', stored);
      setSubscription(stored === 'true'); // ensures boolean
    }
  }, []);




  //  useEffect(() => {
  //   if (!kyc) {
  //     setIsKycOpen(true);
  //   } else if (!subscription) {
  //     setShowPremiumModal(true);
  //   }
  // }, [kyc, subscription]);

  useEffect(() => {
  if (kyc === false || kyc === null) {
    setIsKycOpen(true); // open modal if KYC not complete
  } else if (!subscription) {
    setShowPremiumModal(true);
  }
}, [kyc, subscription]);

  const handleKYCComplete = () => {
    setIsKycOpen(false);
    if (!subscription) {
      setTimeout(() => setShowPremiumModal(true), 300);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'leading':
        return 'bg-green-200 dark:bg-green-900 text-green-900 dark:text-green-100';
      case 'outbid':
        return 'bg-red-200 dark:bg-red-900 text-red-900 dark:text-red-100';
      case 'payment_pending':
        return 'bg-yellow-200 dark:bg-yellow-900 text-yellow-900 dark:text-yellow-100';
      default:
        return 'bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-100';
    }
  };

  useEffect(() => {
    try {
      const bidsFromStorage = localStorage.getItem('myBids');
      if (bidsFromStorage) {
        const parsedBids = JSON.parse(bidsFromStorage);
        setMyBids(Array.isArray(parsedBids) ? parsedBids : []);
      } else {
        setMyBids([]);
      }
    } catch (error) {
      console.error('Error parsing bids from localStorage', error);
      setMyBids([]);
    }
  }, []);const [mounted, setMounted] = useState(false);
useEffect(() => setMounted(true), []);

if (!mounted) return null; // or a safe SSR placeholder

  return (
    <PrivateRoute>
      <KYCModal open={isKycOpen} onClose={handleKYCComplete} />
      <PremiumModal open={showPremiumModal} onClose={() => setShowPremiumModal(false)} />

      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Welcome, {user?.name || user?.fullName || 'User'}!
            </h1>
            <p className="text-gray-600 dark:text-gray-300">
              Manage your bids and track your auction activity
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <StatCard icon={<Gavel />} label="Active Bids" value={myBids.length} color="blue" />
            <StatCard icon={<Trophy />} label="Won Auctions" value={wonAuctions.length} color="green" />
            <StatCard icon={<Heart />} label="Watching" value={watchingList.length} color="red" />
            <StatCard icon={<Eye />} label="Total Spent" value="$175K" color="purple" />
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg">
            <div className="border-b border-gray-200 dark:border-gray-700">
              <nav className="flex space-x-8 px-6">
                {['bids', 'won', 'watching'].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`py-4 px-1 border-b-2 font-medium text-sm ${
                      activeTab === tab
                        ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                        : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-white'
                    }`}
                  >
                    {tab === 'bids' ? 'My Bids' : tab === 'won' ? 'Won Auctions' : 'Watching'}
                  </button>
                ))}
              </nav>
            </div>

            <div className="p-6">
              {activeTab === 'bids' &&
                (myBids.length > 0 ? (
                  myBids.map((bid) => (
                    <BidCard bid={bid} statusColor={getStatusColor(bid.status)} key={bid.id} />
                  ))
                ) : (
                  <p className="text-gray-600 dark:text-gray-300">You have no active bids.</p>
                ))}

              {activeTab === 'won' &&
                wonAuctions.map((auction) => (
                  <AuctionCard auction={auction} key={auction.id} statusColor={getStatusColor(auction.status)} />
                ))}

              {activeTab === 'watching' &&
                watchingList.map((car) => <WatchingCard car={car} key={car.id} />)}
            </div>
          </div>

          {/* Toggle Button and Form */}
          <div className="mt-10 max-w-xl mx-auto">
            <button
              onClick={() => setShowChangePassword((prev) => !prev)}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              {showChangePassword ? 'Hide Change Password' : 'Change Password'}
            </button>

            {showChangePassword && (
              <div className="mt-4 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Change Password</h2>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    alert('Password changed successfully!');
                  }}
                  className="space-y-4"
                >
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Current Password
                    </label>
                    <input
                      type="password"
                      required
                      className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm sm:text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      New Password
                    </label>
                    <input
                      type="password"
                      required
                      className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm sm:text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Confirm New Password
                    </label>
                    <input
                      type="password"
                      required
                      className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm sm:text-sm"
                    />
                  </div>
                  <div className="flex justify-end">
                    <button
                      type="submit"
                      className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                    >
                      Change
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </PrivateRoute>
  );
}

// Reusable Components
function StatCard({ icon, label, value, color }) {
  const bg = {
    blue: 'bg-blue-100 dark:bg-blue-900',
    green: 'bg-green-100 dark:bg-green-900',
    red: 'bg-red-100 dark:bg-red-900',
    purple: 'bg-purple-100 dark:bg-purple-900',
  }[color];

  const text = {
    blue: 'text-blue-600 dark:text-blue-300',
    green: 'text-green-600 dark:text-green-300',
    red: 'text-red-600 dark:text-red-300',
    purple: 'text-purple-600 dark:text-purple-300',
  }[color];

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
      <div className="flex items-center">
        <div className={`p-3 ${bg} rounded-lg`}>{icon && <span className={`${text}`}>{icon}</span>}</div>
        <div className="ml-4">
          <p className="text-sm text-gray-600 dark:text-gray-300">{label}</p>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">{value}</p>
        </div>
      </div>
    </div>
  );
}

function BidCard({ bid, statusColor }) {
  return (
    <div className="flex items-center space-x-4 p-4 border border-gray-200 dark:border-gray-700 rounded-lg mb-4">
      <img src={bid.image} alt={bid.carName} className="w-20 h-20 rounded-lg object-cover" />
      <div className="flex-1">
        <h3 className="font-semibold text-lg dark:text-white">{bid.carName}</h3>
        <p className="text-gray-600 dark:text-gray-300">Your bid: ${bid.bidAmount?.toLocaleString()}</p>
        <div className="flex items-center space-x-4 mt-2">
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColor}`}>
            {bid.status === 'leading' ? 'Leading' : 'Outbid'}
          </span>
          <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
            <Clock className="h-4 w-4 mr-1" />
            {bid.timeLeft}
          </div>
        </div>
      </div>
      <Link href={`/car/${bid.id}`} className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
        View
      </Link>
    </div>
  );
}

function AuctionCard({ auction, statusColor }) {
  return (
    <div className="flex items-center space-x-4 p-4 border border-gray-200 dark:border-gray-700 rounded-lg mb-4">
      <img src={auction.image} alt={auction.carName} className="w-20 h-20 rounded-lg object-cover" />
      <div className="flex-1">
        <h3 className="font-semibold text-lg dark:text-white">{auction.carName}</h3>
        <p className="text-gray-600 dark:text-gray-300">
          Winning bid: ${auction.winningBid.toLocaleString()}
        </p>
        <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium mt-2 ${statusColor}`}>
          Payment Pending
        </span>
      </div>
      <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">Pay Now</button>
    </div>
  );
}

function WatchingCard({ car }) {
  return (
    <div className="flex items-center space-x-4 p-4 border border-gray-200 dark:border-gray-700 rounded-lg mb-4">
      <img src={car.image} alt={car.carName} className="w-20 h-20 rounded-lg object-cover" />
      <div className="flex-1">
        <h3 className="font-semibold text-lg dark:text-white">{car.carName}</h3>
        <p className="text-gray-600 dark:text-gray-300">
          Current bid: ${car.currentBid.toLocaleString()}
        </p>
        <div className="flex items-center text-sm text-gray-600 dark:text-gray-300 mt-2">
          <Clock className="h-4 w-4 mr-1" />
          {car.timeLeft}
        </div>
      </div>
      <Link href={`/car/${car.id}`} className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
        View
      </Link>
    </div>
  );
}
