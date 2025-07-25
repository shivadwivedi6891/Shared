'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Car } from 'lucide-react';

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '', // ✅ Added phone field
    password: '',
    confirmPassword: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match');
      return;
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
      
      {/* Left Form Section */}
      <div className="w-full md:w-1/2 flex items-center justify-center px-4 sm:px-8 md:px-12 py-12">
        <div className="w-full max-w-md">
          
          {/* Logo + Heading */}
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <div className="p-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full shadow-md">
                <Car className="h-8 w-8 text-white" />
              </div>
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold">Create Account</h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1 text-sm">
              Join AutoBid to start buying and selling
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">First Name</label>
                <input
                  type="text"
                  required
                  value={formData.firstName}
                  onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                  placeholder="Naman"
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Last Name</label>
                <input
                  type="text"
                  required
                  value={formData.lastName}
                  onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                  placeholder="Soni"
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="naman@example.com"
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700"
              />
            </div>

            {/* ✅ Phone Number Field */}
            <div>
              <label className="block text-sm font-medium mb-1">Phone Number</label>
              <input
                type="tel"
                required
                maxLength={10}
                pattern="[0-9]{10}"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="Enter 10-digit phone number"
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Password</label>
              <input
                type="password"
                required
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                placeholder="Create a password"
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Confirm Password</label>
              <input
                type="password"
                required
                value={formData.confirmPassword}
                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                placeholder="Confirm your password"
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold hover:from-purple-600 hover:to-pink-600 transition-all shadow-md hover:shadow-xl"
            >
              <Link href="/otp"> Create Account</Link>
            </button>
          </form>

          {/* Footer */}
          <div className="mt-6 text-center text-sm text-gray-600 dark:text-gray-400">
            Already have an account?{' '}
            <Link href="/login" className="text-blue-600 hover:underline font-medium">
              Sign in here
            </Link>
          </div>
        </div>
      </div>

      {/* Right Image Section */}
      <div className="hidden md:block md:w-1/2 relative overflow-hidden">
        <img
          src="https://images.pexels.com/photos/170812/pexels-photo-170812.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
          alt="Urban night drive"
          className="w-full h-full object-cover transform scale-110 brightness-90"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/70 via-black/40 to-transparent" />
        <div className="absolute top-1/3 left-8 text-white max-w-xs animate-fadeSlide">
          <h2 className="text-3xl font-extrabold mb-3 leading-tight tracking-wide drop-shadow-xl">
            Fast Lane Access
          </h2>
          <p className="text-base text-gray-300">
            Create your account and take the driver’s seat in the world of premium online car auctions.
          </p>
        </div>
      </div>

      {/* Animation */}
      <style jsx>{`
        @keyframes fadeSlide {
          0% {
            opacity: 0;
            transform: translateY(20px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeSlide {
          animation: fadeSlide 1.5s ease-out forwards;
        }
      `}</style>
    </div>
  );
}

