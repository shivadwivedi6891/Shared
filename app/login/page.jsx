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

  const [otpSent, setOtpSent] = useState(false);
  const [resendDisabled, setResendDisabled] = useState(true);
  const [timer, setTimer] = useState(0);

  const router = useRouter();
  const { login } = useAuth();

  useEffect(() => {
    loadCaptchaEnginge(6);
  }, []);

  useEffect(() => {
    const token = localStorage.getItem('user');
    if (token) {
      router.push(`/dashboard/buyer`);
    }
  }, []);

  useEffect(() => {
    let countdown;
    if (timer > 0) {
      countdown = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    } else if (timer === 0 && otpSent) {
      setResendDisabled(false);
    }
    return () => clearInterval(countdown);
  }, [timer, otpSent]);

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
    setOtpSent(true);
    setResendDisabled(false);
  };

  const handleResendOtp = () => {
    if (!formData.phone.match(/^\d{10}$/)) {
      alert('Please enter a valid 10-digit phone number to resend OTP.');
      return;
    }

    alert(`OTP resent to +91-${formData.phone}`);
    setResendDisabled(true);
    setTimer(60);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-white dark:from-gray-900 dark:via-black dark:to-gray-800 text-black dark:text-white px-4 py-8">
      <div className="w-full max-w-md bg-white/50 dark:bg-white/10 backdrop-blur-xl rounded-2xl shadow-xl p-6 border border-gray-300 dark:border-gray-700 space-y-5">
        <div className="text-center">
          <Car className="mx-auto h-8 w-8 text-white p-2 bg-gradient-to-r from-blue-500 to-fuchsia-500 rounded-full shadow-lg animate-pulse" />
          <h1 className="mt-4 text-3xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            AutoBid Login
          </h1>
          <p className="text-sm text-gray-600 dark:text-gray-300">Secure login to explore luxury auctions</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-sm text-gray-700 dark:text-gray-300 mb-1 block">Mobile Number</label>
            <div className="flex gap-2">
              <input
                type="text"
                name="Mobile"
                inputMode="numeric"
                required
                maxLength={10}
                value={formData.phone}
                onChange={(e) => {
                  const onlyNums = e.target.value.replace(/[^0-9]/g, '');
                  setFormData({ ...formData, phone: onlyNums });
                }}
                placeholder="Enter 10-digit phone"
                className="w-full px-4 py-3 rounded-xl bg-white dark:bg-white/10 text-black dark:text-white border border-gray-300 dark:border-gray-600 placeholder-gray-500 dark:placeholder-gray-400"
              />
              <button
                type="button"
                disabled={otpSent}
                onClick={handleSendOtp}
                className={`px-3 py-2 text-xs rounded-xl transition-transform shadow 
                  ${otpSent
                    ? 'bg-gray-300 dark:bg-gray-700 cursor-not-allowed'
                    : 'bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:scale-105'
                  }`}
              >
                Send OTP
              </button>
            </div>
          </div>

          <div>
            <label className="text-sm text-gray-700 dark:text-gray-300 mb-1 block">OTP</label>
            <div className="flex gap-2">
              <input
                type="text"
                name="otp"
                inputMode="numeric"
                pattern="\d{6}"
                maxLength={6}
                required
                value={formData.otp}
                onChange={(e) => {
                  const value = e.target.value;
                  if (/^\d{0,6}$/.test(value)) {
                    setFormData({ ...formData, otp: value });
                  }
                }}
                placeholder="Enter OTP"
                className="w-full px-4 py-3 rounded-xl bg-white dark:bg-white/10 text-black dark:text-white border border-gray-300 dark:border-gray-600 placeholder-gray-500 dark:placeholder-gray-400"
              />
              <button
                type="button"
                disabled={resendDisabled}
                onClick={handleResendOtp}
                className={`px-3 py-2 text-xs rounded-xl transition-transform shadow 
                  ${resendDisabled
                    ? 'bg-gray-300 dark:bg-gray-700 cursor-not-allowed'
                    : 'bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:scale-105'
                  }`}
              >
                {timer > 0 ? `Resend in ${timer}s` : 'Resend OTP'}
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