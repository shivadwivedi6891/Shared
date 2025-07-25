'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function OtpVerification() {
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleVerify = (e) => {
    e.preventDefault();

    if (otp.length !== 6 || !/^\d+$/.test(otp)) {
      setError('Please enter a valid 6-digit OTP');
      return;
    }

    alert('OTP verified successfully ✅');
    router.push('/login');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-900 px-4">
      <div className="max-w-md w-full bg-white dark:bg-gray-800 shadow-lg rounded-xl p-8 space-y-6">
        <h2 className="text-2xl font-bold text-center text-gray-800 dark:text-white">Verify OTP
        </h2>
        <p className="text-center text-sm text-gray-500 dark:text-gray-400">
          We’ve sent a 6-digit OTP to your phone/email.
        </p>

        <form onSubmit={handleVerify} className="space-y-4">
          <input
            type="text"
            maxLength={6}
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-center tracking-widest text-lg"
            placeholder="Enter OTP"
          />
          {error && (
            <p className="text-red-600 text-sm text-center">{error}</p>
          )}

          <button
            type="submit"
            className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold">
             Verify OTP
          </button>
        </form>

        <div className="text-sm text-center text-gray-600 dark:text-gray-400">
          Didn't get the OTP? <button className="text-blue-500 hover:underline">Resend</button>
        </div>
      </div>
    </div>
  );
}
