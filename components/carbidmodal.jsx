'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';
import Image from 'next/image';
import clsx from 'clsx';
import TermsConditionModal from './termsconditionModal'; 

const tabs = ['Gallery', 'Vehicle Details', 'Other Details', 'Evaluation Report'];

export default function CarBidModal({ car, onClose, initialTab = 'Gallery' }) {
  const [activeTab, setActiveTab] = useState(initialTab);
  const [selectedImage, setSelectedImage] = useState('');
  const [bidAmount, setBidAmount] = useState('');
  const [agree, setAgree] = useState(false);
  const [bidError, setBidError] = useState('');
  const [showTermsModal, setShowTermsModal] = useState(false); 

  useEffect(() => {
    if (car?.images?.length) {
      setSelectedImage(car.images[0]);
    }
  }, [car]);

  useEffect(() => {
    setActiveTab(initialTab);
  }, [initialTab, car]);

  const handleSubmit = () => {
    const enteredBid = parseFloat(bidAmount);
    const baseBid = parseFloat(car?.startingBid || 0);
    if (enteredBid > baseBid) {
      alert(` Bid placed successfully: ₹${enteredBid}`);
      setBidError('');
      onClose();
    } else {
      setBidError(` Bid must be greater than ₹${baseBid}`);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center">
      {/*  Show Terms Modal on top */}
      {showTermsModal && (
        <TermsConditionModal onClose={() => setShowTermsModal(false)} />
      )}

      <motion.div
        initial={{ opacity: 0, y: -60 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -60 }}
        className="bg-white shadow-xl rounded-xl w-full max-w-6xl max-h-[90vh] overflow-auto p-6 relative"
      >
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-500 hover:text-red-500"
        >
          <X size={24} />
        </button>

        <div className="flex justify-between flex-wrap gap-4 mb-4">
          <div>
            <h2 className="font-bold text-lg">{car?.title || 'Untitled Car'}</h2>
            <p className="text-sm text-gray-500">Mfg. Year: {car?.year || 'N/A'}</p>
            <p className="text-sm text-gray-500">
              Evaluation Report: <a href="#" className="text-blue-500 underline">View</a>
            </p>
          </div>
          <div className="flex items-center gap-4 text-sm">
            <p>Your Last Bid: <span className="text-gray-700">No bid placed</span></p>
            <p>No. of Bids: {car?.bids || 0}</p>
            <p>Contract No: <span className="font-medium">{car?.contractNo || 'N/A'}</span></p>
          </div>
        </div>

        <div className="flex gap-2 mb-4 flex-wrap">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={clsx(
                'px-4 py-2 rounded-md border transition',
                activeTab === tab
                  ? 'bg-blue-500 text-white border-blue-500'
                  : 'bg-white text-gray-700 border-gray-300'
              )}
            >
              {tab}
            </button>
          ))}
          <button className="ml-auto border px-4 py-2 rounded-md bg-yellow-100 text-yellow-800 shadow">
            ❤ Add to Watchlist
          </button>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div>
            {activeTab === 'Gallery' && (
              <>
                <div className="mb-2 border rounded-lg overflow-hidden">
                  <Image
                    src={selectedImage}
                    alt="Selected"
                    width={600}
                    height={400}
                    className="w-full h-[300px] object-cover"
                  />
                </div>
                <div className="flex gap-2 overflow-x-auto">
                  {(car?.images || []).map((img) => (
                    <Image
                      key={img}
                      src={img}
                      alt="thumb"
                      width={80}
                      height={60}
                      onClick={() => setSelectedImage(img)}
                      className={clsx(
                        'cursor-pointer rounded border',
                        selectedImage === img ? 'border-blue-500' : 'border-transparent'
                      )}
                    />
                  ))}
                </div>
              </>
            )}
            {activeTab === 'Vehicle Details' && (
              <p className="text-gray-700">
                Vehicle Type: {car?.type || 'N/A'}<br />
                Fuel Type: {car?.fuel || 'N/A'}<br />
                Registration: {car?.registration || 'N/A'}
              </p>
            )}
            {activeTab === 'Other Details' && (
              <p className="text-gray-700">
                Insurance Validity: {car?.insurance || 'N/A'}<br />
                RC Status: {car?.rcStatus || 'N/A'}<br />
                Permit: {car?.permit || 'N/A'}
              </p>
            )}
            {activeTab === 'Evaluation Report' && (
              <p className="text-gray-700">
                {car?.evaluation || 'Evaluation not available'}
              </p>
            )}
          </div>

          <div className="bg-gray-100 p-4 rounded-lg shadow-inner space-y-4">
            <p className="text-lg">Open Bid: <strong>₹{car?.startingBid || '0'}</strong></p>
            <p>Your Last Bid: <span className="text-gray-500">No bid placed</span></p>

            <div className="space-y-2">
              <label htmlFor="yourBid" className="block font-medium">Your Bid</label>
              <input
                type="number"
                id="yourBid"
                className="w-full border px-3 py-2 rounded-md outline-none"
                value={bidAmount}
                onChange={(e) => setBidAmount(e.target.value)}
              />
              {bidError && <p className="text-red-600 text-sm">{bidError}</p>}

              <div className="flex items-center gap-2 text-sm">
                <input type="checkbox" id="agree" checked={agree} onChange={() => setAgree(!agree)} />
                <label htmlFor="agree">
                  I Agree to{' '}
                  <button
                    type="button"
                    onClick={() => setShowTermsModal(true)}
                    className="text-blue-600 underline"
                  >
                    Terms & Conditions
                  </button>
                </label>
              </div>

              <button
                onClick={handleSubmit}
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition disabled:opacity-50"
                disabled={!bidAmount || !agree}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}