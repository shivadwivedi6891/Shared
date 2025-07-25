'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Car, Eye, EyeOff, ShieldCheck } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../context/AuthContext';

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    userType: 'buyer',
  });

  const router = useRouter();
  const { login, user } = useAuth();

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

 

  const handleSubmit = (e) => {
    e.preventDefault();

    const dummyUser = {
      name: formData.email,
      id: crypto.randomUUID(),
      role: formData.userType,
      kycCompleted: false,
    };

    login(dummyUser);
    router.push(`/dashboard/buyer`)
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white px-4 py-12">
      <div className="w-full max-w-md bg-white/10 backdrop-blur-2xl rounded-3xl shadow-2xl p-8 border border-gray-700 animate-slideFade">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="p-4 bg-gradient-to-r from-blue-500 to-fuchsia-500 rounded-full shadow-lg animate-pulse">
              <Car className="h-8 w-8 text-white" />
            </div>
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            AutoBid Login
          </h1>
          <p className="text-sm text-gray-300 mt-1">
            Secure login to explore luxury auctions
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">

          <div>
            <label className="text-sm font-medium text-gray-300 mb-1 block">Email</label>
            <input
              type="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              placeholder="xyz@example.com"
              className="w-full px-4 py-3 rounded-xl bg-white/10 text-white border border-gray-600 placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-300 mb-1 block">Password</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                required
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                className="w-full px-4 py-3 rounded-xl bg-white/10 text-white border border-gray-600 placeholder-gray-400 pr-12 focus:ring-2 focus:ring-blue-500 focus:outline-none"
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

          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white rounded-xl font-semibold shadow-md hover:shadow-xl hover:scale-[1.02] transition-all"
          >
            Sign In
          </button>
        </form>
        <div className="mt-6 text-center text-sm text-gray-400">
          Don't have an account?{' '}
          <Link href="/register" className="text-blue-400 hover:underline font-medium">
            Register here
          </Link>
        </div>
      </div>

      <style jsx>{`
        .animate-slideFade {
          animation: slideFade 1.2s ease-out;
        }

        @keyframes slideFade {
          0% {
            opacity: 0;
            transform: translateY(20px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}
