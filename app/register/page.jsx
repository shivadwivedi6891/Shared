



'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Car, RefreshCcw } from 'lucide-react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import toast from 'react-hot-toast';

import { useAuth } from '@/context/AuthContext';
import {
  LoadCanvasTemplate,
  loadCaptchaEnginge,
  validateCaptcha,
} from 'react-simple-captcha';
import { registerUser } from '@/services/AuthServices/AuthApiFunction';

// --- Yup Validation Schema ---
const schema = yup.object().shape({
  fullName: yup.string().required('Full name is required'),
  mobile: yup.string().required('Mobile number is required').matches(/^[0-9]{10}$/, 'Must be a 10-digit number'),
  email: yup.string().required('Email is required').email('Must be a valid email'),
  address: yup.string().required('Address is required'),
  state: yup.string().required('State is required'),
  city: yup.string().required('City is required'),
  pincode: yup.string().required('Pincode is required').matches(/^[0-9]{6}$/, 'Must be a 6-digit number'),
  captcha: yup.string().required('Captcha is required'),
});

// --- State & City Data ---
const indianStates = [
  'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh',
  'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand',
  'Karnataka', 'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur',
  'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Punjab',
  'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura',
  'Uttar Pradesh', 'Uttarakhand', 'West Bengal', 'Andaman and Nicobar Islands',
  'Chandigarh', 'Dadra and Nagar Haveli and Daman and Diu', 'Delhi',
  'Jammu and Kashmir', 'Ladakh', 'Lakshadweep', 'Puducherry',
];

const citiesByState = {
  'Andhra Pradesh': ['Vijayawada', 'Visakhapatnam', 'Guntur', 'Tirupati'],
  'Delhi': ['New Delhi', 'Dwarka', 'Rohini', 'Saket'],
  'Maharashtra': ['Mumbai', 'Pune', 'Nagpur', 'Nashik'],
  'Karnataka': ['Bengaluru', 'Mysuru', 'Mangalore', 'Hubli'],
  'Tamil Nadu': ['Chennai', 'Coimbatore', 'Madurai', 'Tiruchirappalli'],
  'Uttar Pradesh': ['Lucknow', 'Kanpur', 'Varanasi', 'Agra'],
  'West Bengal': ['Kolkata', 'Howrah', 'Asansol', 'Siliguri'],
  // (shortened list for readability)
};

export default function RegisterPage() {
  const router = useRouter();
  const [availableCities, setAvailableCities] = useState([]);
  const [showOtpModal, setShowOtpModal] = useState(false);
  const [otpInput, setOtpInput] = useState('');
  const [otpError, setOtpError] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [resendTimer, setResendTimer] = useState(0);

  const { user } = useAuth();

  const {
    register,
    handleSubmit,
    watch,
    setValue,
     trigger,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const stateValue = watch('state');

  useEffect(() => {
    loadCaptchaEnginge(6);
  }, []);

    useEffect(() => {
  if (user) {
    router.push('/dashboard/buyer');          
  }
}, [user]);
  

  useEffect(() => {
    let timer;
    if (resendTimer > 0) {
      timer = setInterval(() => {
        setResendTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [resendTimer]);

  useEffect(() => {
    if (stateValue) {
      setValue('city', '');
      setAvailableCities(citiesByState[stateValue] || []);
    }
  }, [stateValue, setValue]);

  const onSubmit = async (data) => {
    if (!validateCaptcha(data.captcha)) {
      toast.error('Invalid Captcha!');
      setValue('captcha', '');
      loadCaptchaEnginge(6);
      return;
    }

    try {
      const payload = {
        fullName: data.fullName,
        email: data.email,
        mobile: data.mobile,
        address: data.address,
        city: data.city,
        region: data.state,
        pinCode: data.pincode,
        state: data.state,
      };

      const res = await registerUser(payload);

      if (res.data.success) {
        toast.success('Registration successful! OTP sent to your mobile.');
        setOtpSent(true);
        setShowOtpModal(true);
        setResendTimer(60);
        setOtpInput('');
        setOtpError(false);
      } else {
        toast.error(res.data.message || 'Registration failed');
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Registration failed');
    }
  };

  const handleVerifyOtp = () => {
    if (/^\d{6}$/.test(otpInput)) {
      router.push('/login');
      toast.success('OTP Verified! Please log in.');
    } else {
      setOtpError(true);
    }
  };

  const handleResendOtp = () => {
    setOtpSent(true);
    setOtpInput('');
    setOtpError(false);
    setResendTimer(60);
    toast.success('OTP resent!');
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 text-gray-900 dark:text-white">
      {/* --- Left Section --- */}
      <div className="w-full md:w-1/2 flex items-center justify-center px-6 sm:px-12 py-12">
        <div className="w-full max-w-lg bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700">
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <div className="p-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full shadow-md">
                <Car className="h-8 w-8 text-white" />
              </div>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">Register Now</h1>
            <p className="text-gray-600 dark:text-gray-400 mt-2 text-sm">
              Join AutoBid to start buying and selling cars effortlessly.
            </p>
          </div>

          {/* --- Form --- */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Full Name */}
            <div>
              <input
                required
                type="text"
                {...register('fullName')}
                placeholder="Full Name"
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:focus:ring-purple-500 focus:outline-none transition"
                onChange={async (e) => {
                  setValue('fullName', e.target.value);
                  await trigger('fullName');
                }}
              />
              {errors.fullName && <p className="text-red-500 text-sm mt-1">{errors.fullName.message}</p>}
            </div>

            {/* Mobile Number */}
            <div>
              <input
                required
                type="tel"
                pattern="[0-9]{10}"
                maxLength={10}
                {...register('mobile')}
                placeholder="Mobile Number"
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:focus:ring-purple-500 focus:outline-none transition"
                onChange={async (e) => {
                  setValue('mobile', e.target.value.replace(/[^0-9]/g, ''));
                  await trigger('mobile');
                }}
              />
              {errors.mobile && <p className="text-red-500 text-sm mt-1">{errors.mobile.message}</p>}
            </div>

            {/* Email */}
            <div>
              <input
                required
                type="email"
                {...register('email')}
                placeholder="Email"
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:focus:ring-purple-500 focus:outline-none transition"
                onChange={async (e) => {
                  setValue('email', e.target.value);
                  await trigger('email');
                }}
              />
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
            </div>

            {/* Address */}
            <div>
              <input
                required
                type="text"
                {...register('address')}
                placeholder="Address"
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:focus:ring-purple-500 focus:outline-none transition"
                onChange={async (e) => {
                  setValue('address', e.target.value);
                  await trigger('address');
                }}
              />
              {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address.message}</p>}
            </div>

            <select
              required
              {...register('state')}
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:focus:ring-purple-500 focus:outline-none transition"
              onChange={async (e) => {
                setValue('state', e.target.value);
                await trigger('state');
              }}
            >
              <option value="">--Select State--</option>
              {indianStates.map((state) => (
                <option key={state} value={state}>{state}</option>
              ))}
            </select>
            {errors.state && <p className="text-red-500 text-sm">{errors.state.message}</p>}

            <select
              required
              {...register('city')}
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:focus:ring-purple-500 focus:outline-none transition"
              onChange={async (e) => {
                setValue('city', e.target.value);
                await trigger('city');
              }}
            >
              <option value="">--Select City--</option>
              {availableCities.map((city) => (
                <option key={city} value={city}>{city}</option>
              ))}
            </select>

            <input
              required
              type="text"
              {...register('pincode')}
              placeholder="Pincode"
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:focus:ring-purple-500 focus:outline-none transition"
              onChange={async (e) => {
                setValue('pincode', e.target.value.replace(/[^0-9]/g, ''));
                await trigger('pincode');
              }}
            />
            {errors.pincode && <p className="text-red-500 text-sm">{errors.pincode.message}</p>}

            {/* Captcha */}
            <div>
              <LoadCanvasTemplate />
              <div className="flex items-center gap-2 mt-3">
                <input
                  type="text"
                  required
                  {...register('captcha')}
                  placeholder="Enter Captcha"
                  className="flex-1 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:focus:ring-purple-500 focus:outline-none transition"
                  onChange={async (e) => {
                    setValue('captcha', e.target.value);
                    await trigger('captcha');
                  }}
                />
                <button
                  type="button"
                  onClick={() => loadCaptchaEnginge(6)}
                  className="p-2 rounded-lg border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 transition"
                >
                  <RefreshCcw className="h-5 w-5" />
                </button>
              </div>
              {errors.captcha && <p className="text-red-500 text-sm mt-1">{errors.captcha.message}</p>}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold shadow-md hover:opacity-90 transition disabled:opacity-50"
            >
              {isSubmitting ? 'Registering...' : 'Register'}
            </button>
          </form>

          <div className="mt-6 text-center text-sm text-gray-600 dark:text-gray-400">
            Already have an account?{' '}
            <Link href="/login" className="text-blue-600 dark:text-blue-400 font-medium hover:underline">
              Sign in
            </Link>
          </div>
        </div>
      </div>

      {/* --- Right Section --- */}
      <div className="hidden md:flex md:w-1/2 relative items-center justify-center bg-gradient-to-br from-blue-800 via-purple-700 to-indigo-900">
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative text-center text-white px-6 max-w-md animate-fadeSlide">
          <h2 className="text-4xl font-extrabold mb-4 drop-shadow-lg">Fast Lane Access</h2>
          <p className="text-lg text-gray-200 leading-relaxed">
            Create your account and take the driver’s seat in online car auctions.
          </p>
        </div>
      </div>

      {/* --- OTP Modal --- */}
      {showOtpModal && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-2xl w-full max-w-sm relative animate-fadeSlide">
            <button
              onClick={() => setShowOtpModal(false)}
              className="absolute top-2 right-2 text-gray-400 hover:text-red-500 transition"
              aria-label="Close"
            >
              ✕
            </button>

            <h2 className="text-xl font-bold mb-4 text-center">Verify OTP</h2>

            <input
              type="text"
              value={otpInput}
              onChange={(e) => {
                const value = e.target.value.replace(/\D/g, '');
                if (value.length <= 6) {
                  setOtpInput(value);
                  setOtpError(false);
                }
              }}
              placeholder="Enter 6-digit OTP"
              maxLength={6}
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:focus:ring-purple-500 focus:outline-none transition mb-2"
            />

            {otpError && (
              <p className="text-red-500 text-sm mb-2">Invalid OTP. Please try again.</p>
            )}

            <button
              onClick={handleVerifyOtp}
              disabled={otpInput.length !== 6}
              className={`w-full py-3 rounded-lg font-semibold mb-3 transition ${
                otpInput.length === 6
                  ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-md'
                  : 'bg-gray-400 text-white cursor-not-allowed'
              }`}
            >
              Verify
            </button>

            {resendTimer > 0 ? (
              <p className="text-center text-gray-500 text-sm">
                Resend OTP in {resendTimer} seconds
              </p>
            ) : (
              <button
                onClick={handleResendOtp}
                className="w-full py-2 text-sm text-blue-600 dark:text-blue-400 hover:underline"
              >
                Resend OTP
              </button>
            )}
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes fadeSlide {
          0% { opacity: 0; transform: translateY(20px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeSlide {
          animation: fadeSlide 1s ease-out forwards;
        }
      `}</style>
    </div>
  );
}
