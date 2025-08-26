'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Car } from 'lucide-react';
import { useRouter } from 'next/navigation';
import {
  loadCaptchaEnginge,
  LoadCanvasTemplate,
  validateCaptcha,
} from 'react-simple-captcha';
import { loginWithOtp, sendOtp } from '@/services/AuthServices/AuthApiFunction';
import { useAuth } from '@/context/AuthContext';
import toast, { Toaster } from 'react-hot-toast';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';


//  Yup Schema
const schema = yup.object().shape({
  phone: yup
    .string()
    .required('Phone is required')
    .matches(/^\d{10}$/, 'Enter a valid 10-digit phone number'),
  otp: yup.string().when('otpSent', {
    is: true,
    then: (schema) =>
      schema.required('OTP is required').matches(/^\d{6}$/, 'Enter a valid 6-digit OTP'),
  }),
  captcha: yup.string().required('Captcha is required'),
});

export default function LoginPage() {
  const [otpSent, setOtpSent] = useState(false);
  const [resendDisabled, setResendDisabled] = useState(true);
  const [timer, setTimer] = useState(0);
  const [sendingOtp, setSendingOtp] = useState(false);
  const [loggingIn, setLoggingIn] = useState(false);

  const router = useRouter();
  const { login, user } = useAuth();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    resetField,
    trigger,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: { phone: '', otp: '', captcha: '' },
  });

  const phone = watch('phone');
  const captchaInput = watch('captcha');

  //  Auto redirect if already logged in
  useEffect(() => {
    loadCaptchaEnginge(6);
    if (user) {
      router.push('/dashboard/buyer');
    }
  }, [user, router]);

  //  Timer for resend OTP
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

  //  Handle OTP Send
  const handleSendOtp = async () => {
    const isValid = await trigger('phone');
    if (!isValid) return;

    try {
      setSendingOtp(true);
      const res = await sendOtp(phone);
      // console.log('OTP Response:', res);
      if (res.data.success) {
        toast.success(`OTP sent to +91-${phone}`);
        setOtpSent(true);
        setResendDisabled(true);
        setTimer(60);
        resetField('otp'); // clear old OTP
        resetField('captcha');
        loadCaptchaEnginge(6);
      } else {
        toast.error(res.data.message || 'Failed to send OTP');
      }
    } catch (err) {
      toast.error(err.message || 'Error sending OTP');
    } finally {
      setSendingOtp(false);
    }
  };

  //  Handle Login Submit
  const onSubmit = async (data) => {
    if (!otpSent) {
      toast.error('Please request OTP first.');
      return;
    }

    if (!validateCaptcha(captchaInput)) {
      toast.error('Captcha is incorrect');
      resetField('captcha');
      loadCaptchaEnginge(6);
      return;
    }

    try {
      setLoggingIn(true);
      const res = await loginWithOtp({
        userName: data.phone,
        otp: data.otp,
      });

      // console.log('Login Response:', res.data);
     

      if (res.data.success) {
        login({
          user: res.data.data.user,
          token: res.data.data.token,
          kyc: res.data.data.kyc,
          subscription: res.data.data.subscription,
        });
        toast.success('Login successful!');
        router.push('/dashboard/buyer');
      } else {
        toast.error(res.data.message || 'Invalid OTP');
      }
    } catch (err) {
      toast.error(err.message || 'Login failed');
    } finally {
      setLoggingIn(false);
    }
  };

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-white text-black px-4 py-8">
        <div className="w-full max-w-md bg-white/50 backdrop-blur-xl rounded-2xl shadow-xl p-6 border border-gray-300 space-y-5">
          
          {/* Header */}
          <div className="text-center">
            <Car className="mx-auto h-8 w-8 text-white p-2 bg-gradient-to-r from-blue-500 to-fuchsia-500 rounded-full shadow-lg animate-pulse" />
            <h1 className="mt-4 text-3xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              AutoBid Login
            </h1>
            <p className="text-sm text-gray-600">
              Secure login to explore luxury auctions
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

            {/* Phone Input */}
            <div>
              <input
                type="text"
                maxLength={10}
                {...register('phone')}
                onChange={async (e) => {
                  setValue('phone', e.target.value.replace(/[^0-9]/g, ''));
                  await trigger('phone');
                }}
                placeholder="Enter 10-digit phone"
                className="w-full px-4 py-3 rounded-xl bg-white text-black border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
              {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>}

              <div className="flex justify-end mt-2">
                <button
                  type="button"
                  disabled={(otpSent && resendDisabled) || sendingOtp}
                  onClick={handleSendOtp}
                  className={`px-3 py-2 text-xs rounded-xl transition-transform shadow 
                    ${(otpSent && resendDisabled) || sendingOtp
                      ? 'bg-gray-300 cursor-not-allowed'
                      : 'bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:scale-105'
                    }`}
                >
                  {sendingOtp
                    ? 'Sending...'
                    : otpSent
                      ? timer > 0
                        ? `Wait ${timer}s`
                        : 'Resend OTP'
                      : 'Send OTP'}
                </button>
              </div>
            </div>

            {/* OTP Input */}
            { (
              <div>
                <input
                  type="text"
                  maxLength={6}
                  {...register('otp')}
                  onChange={async (e) => {
                    setValue('otp', e.target.value.replace(/[^0-9]/g, ''));
                    await trigger('otp');
                  }}
                  placeholder="Enter OTP"
                  className="w-full px-4 py-3 rounded-xl bg-white text-black border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
                {errors.otp && <p className="text-red-500 text-sm mt-1">{errors.otp.message}</p>}
              </div>
            )}

            {/* Captcha */}
            <div>
              <LoadCanvasTemplate reloadText={false} />
              <input
                type="text"
                {...register('captcha')}
                placeholder="Enter Captcha"
                className="w-full mt-3 px-4 py-3 rounded-xl bg-white text-black border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
              {errors.captcha && <p className="text-red-500 text-sm mt-1">{errors.captcha.message}</p>}
            </div>

            {/* Login Button */}
            <button
              type="submit"
              disabled={loggingIn}
              className="w-full py-3 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white rounded-xl font-semibold shadow-md hover:shadow-xl hover:scale-[1.02] transition-all disabled:opacity-50"
            >
              {loggingIn ? 'Logging in...' : 'Sign In'}
            </button>
          </form>

          {/* Footer */}
          <div className="text-center text-sm text-gray-600">
            Don&apos;t have an account?{' '}
            <Link href="/register" className="text-blue-500 hover:underline font-medium">
              Register here
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
