
'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Car, Eye, EyeOff, RefreshCcw } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../context/AuthContext';
import {
  loadCaptchaEnginge,
  LoadCanvasTemplate,
  validateCaptcha,
} from 'react-simple-captcha';

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [loginMethod, setLoginMethod] = useState('email');
  const [captchaInput, setCaptchaInput] = useState('');
  const [formData, setFormData] = useState({
    email: '',
    password: '',
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
      name: loginMethod === 'email' ? formData.email : formData.phone,
      id: crypto.randomUUID(),
      role: formData.userType,
      kycCompleted: false,
    };

    login(dummyUser);
    router.push(`/dashboard/buyer`);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white px-4 py-8">
      <div className="w-full max-w-sm bg-white/10 backdrop-blur-xl rounded-2xl shadow-xl p-6 border border-gray-700 space-y-5">
        <div className="text-center">
          <Car className="mx-auto h-8 w-8 text-white p-2 bg-gradient-to-r from-blue-500 to-fuchsia-500 rounded-full shadow-lg animate-pulse" />
          <h1 className="mt-4 text-3xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            AutoBid Login
          </h1>
          <p className="text-sm text-gray-300">Secure login to explore luxury auctions</p>
        </div>

        <div className="flex justify-center">
          <div className="flex items-center gap-2 bg-white/10 p-1 rounded-full border border-gray-700 shadow-inner">
            <button
              type="button"
              onClick={() => setLoginMethod('email')}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
                loginMethod === 'email'
                  ? 'bg-gradient-to-r from-blue-500 to-fuchsia-500 text-white shadow-md'
                  : 'text-gray-300 hover:text-white'
              }`}
            >
              Email
            </button>
            <button
              type="button"
              onClick={() => setLoginMethod('phone')}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
                loginMethod === 'phone'
                  ? 'bg-gradient-to-r from-blue-500 to-fuchsia-500 text-white shadow-md'
                  : 'text-gray-300 hover:text-white'
              }`}
            >
              Phone
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {loginMethod === 'email' ? (
            <>
              <div>
                <label className="text-sm text-gray-300 mb-1 block">Email</label>
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  placeholder="xyz@example.com"
                  className="w-full px-4 py-3 rounded-xl bg-white/10 text-white border border-gray-600 placeholder-gray-400"
                />
              </div>
              <div>
                <label className="text-sm text-gray-300 mb-1 block">Password</label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    required
                    value={formData.password}
                    onChange={(e) =>
                      setFormData({ ...formData, password: e.target.value })
                    }
                    placeholder="••••••••"
                    className="w-full px-4 py-3 pr-12 rounded-xl bg-white/10 text-white border border-gray-600 placeholder-gray-400"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3 text-gray-400 hover:text-gray-200"
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>
            </>
          ) : (
            <>
              <div>
                <label className="text-sm text-gray-300 mb-1 block">Phone Number</label>
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
                  className="w-full px-4 py-3 rounded-xl bg-white/10 text-white border border-gray-600 placeholder-gray-400"
                />
              </div>
              <div>
                <label className="text-sm text-gray-300 mb-1 block">OTP</label>
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
                  className="w-full px-4 py-3 rounded-xl bg-white/10 text-white border border-gray-600 placeholder-gray-400"
                />
              </div>
            </>
          )}

          <div>
            <label className="text-sm font-medium text-gray-300 mb-2 block">Captcha *</label>
            <div className="flex items-center gap-3">
              <LoadCanvasTemplate />
              <button
                type="button"
                onClick={() => loadCaptchaEnginge(6)}
                className="text-white hover:text-blue-400 bg-white/10 border border-gray-600 p-2 rounded-full shadow"
                title="Refresh Captcha"
              >
                <RefreshCcw className="h-5 w-5" />
              </button>
            </div>
            <input
              type="text"
              required
              value={captchaInput}
              onChange={(e) => setCaptchaInput(e.target.value)}
              placeholder="Enter Captcha"
              className="w-full mt-3 px-4 py-3 rounded-xl bg-white/10 text-white border border-gray-600 placeholder-gray-400"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white rounded-xl font-semibold shadow-md hover:shadow-xl hover:scale-[1.02] transition-all"
          >
            Sign In
          </button>
        </form>

        <div className="text-center text-sm text-gray-400">
          Don't have an account?{' '}
          <Link href="/register" className="text-blue-400 hover:underline font-medium">
            Register here
          </Link>
        </div>
      </div>
    </div>
  );
}