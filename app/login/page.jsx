'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Car } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../context/AuthContext';
import {
  loadCaptchaEnginge,
  LoadCanvasTemplate,
  validateCaptcha,
} from 'react-simple-captcha';

export default function LoginPage() {
  const [captchaInput, setCaptchaInput] = useState('');
  const [formData, setFormData] = useState({
    phone: '',
    otp: '',
    userType: 'buyer',
  });

  const router = useRouter();
  const { login } = useAuth();

  useEffect(() => {
    loadCaptchaEnginge(6);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateCaptcha(captchaInput)) {
      alert('Captcha is incorrect');
      setCaptchaInput('');
      loadCaptchaEnginge(6);
      return;
    }

    const dummyUser = {
      name: formData.phone,
      id: crypto.randomUUID(),
      role: formData.userType,
      kycCompleted: false,
    };

    login(dummyUser);
    router.push(`/dashboard/buyer`);
  };

  const handleSendOtp = () => {
    if (!formData.phone.match(/^\d{10}$/)) {
      alert('Please enter a valid 10-digit phone number.');
      return;
    }
    alert(`Your OTP has been sent to +91-${formData.phone}`);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-white dark:from-gray-900 dark:via-black dark:to-gray-800 text-black dark:text-white px-4 py-8">
      <div className="w-full max-w-sm bg-white/50 dark:bg-white/10 backdrop-blur-xl rounded-2xl shadow-xl p-6 border border-gray-300 dark:border-gray-700 space-y-5">
        <div className="text-center">
          <Car className="mx-auto h-8 w-8 text-white p-2 bg-gradient-to-r from-blue-500 to-fuchsia-500 rounded-full shadow-lg animate-pulse" />
          <h1 className="mt-4 text-3xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            AutoBid Login
          </h1>
          <p className="text-sm text-gray-600 dark:text-gray-300">Secure login to explore luxury auctions</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-sm text-gray-700 dark:text-gray-300 mb-1 block">Phone Number</label>
            <input
              type="tel"
              name="phone"
              required
              pattern="[0-9]{10}"
              maxLength={10}
              value={formData.phone}
              onChange={(e) =>
                setFormData({ ...formData, phone: e.target.value })
              }
              placeholder="Enter 10-digit phone"
              className="w-full px-4 py-3 rounded-xl bg-white dark:bg-white/10 text-black dark:text-white border border-gray-300 dark:border-gray-600 placeholder-gray-500 dark:placeholder-gray-400"
            />
          </div>

          <div>
            <label className="text-sm text-gray-700 dark:text-gray-300 mb-1 block">OTP</label>
            <div className="flex items-center gap-2">
              <input
                type="text"
                name="otp"
                required
                maxLength={6}
                value={formData.otp}
                onChange={(e) =>
                  setFormData({ ...formData, otp: e.target.value })
                }
                placeholder="Enter OTP"
                className="w-full px-4 py-3 rounded-xl bg-white dark:bg-white/10 text-black dark:text-white border border-gray-300 dark:border-gray-600 placeholder-gray-500 dark:placeholder-gray-400"
              />
              <button
                type="button"
                onClick={handleSendOtp}
                className="px-3 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white text-xs rounded-xl hover:scale-105 transition-transform shadow"
              >
                Send OTP
              </button>
            </div>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">Captcha *</label>
            <div className="flex items-center gap-3">
              <LoadCanvasTemplate reloadText={false} />
            </div>
            <input
              type="text"
              required
              value={captchaInput}
              onChange={(e) => setCaptchaInput(e.target.value)}
              placeholder="Enter Captcha"
              className="w-full mt-3 px-4 py-3 rounded-xl bg-white dark:bg-white/10 text-black dark:text-white border border-gray-300 dark:border-gray-600 placeholder-gray-500 dark:placeholder-gray-400"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white rounded-xl font-semibold shadow-md hover:shadow-xl hover:scale-[1.02] transition-all"
          >
            Sign In
          </button>
        </form>

        <div className="text-center text-sm text-gray-600 dark:text-gray-400">
          Don't have an account?{' '}
          <Link href="/register" className="text-blue-500 hover:underline font-medium">
            Register here
          </Link>
        </div>
      </div>
    </div>
  );
}
