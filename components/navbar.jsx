'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
// import { useTheme } from 'next-themes';
import {
  Menu,
  X,
  Car,
  User,
  LogOut,
  Home,
  Info,
  Gavel,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  // const { theme, setTheme } = useTheme();
  const { user, logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null; // prevents SSR/client mismatch
  }

  const toggleMenu = () => setIsOpen(!isOpen);
  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);
  const closeMenu = () => setIsOpen(false);

  return (
    <nav className="bg-white/90 backdrop-blur-md shadow-md sticky top-0 z-50 border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="p-2 bg-gradient-to-r from-yellow-600 to-sky-500 rounded-xl group-hover:scale-110 transition-transform duration-300">
              <Car className="h-6 w-6 text-white" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-yellow-600 to-purple-600 bg-clip-text text-transparent">
              CAR AUCTION
            </span>
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center space-x-8">
            {['/', '/auction', '/about'].map((path, idx) => (
              <Link
                key={idx}
                href={path}
                className="text-gray-800 hover:text-blue-600 transition-all duration-300 font-medium px-3 py-2 rounded-lg hover:bg-blue-50"
              >
                {path === '/'
                  ? 'Home'
                  : path === '/Category'
                  ? 'Auction'
                  : path.replace('/', '').charAt(0).toUpperCase() + path.slice(2)}
              </Link>
            ))}
          </div>

          {/* Desktop Right */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <div className="relative">
                <button
                  onClick={toggleDropdown}
                  className="p-2 rounded-full hover:bg-blue-100"
                >
                  <User className="h-5 w-5 text-gray-800" />
                </button>

                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                    <Link
                      href="/dashboard/buyer"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50"
                    >
                      <User className="inline-block w-4 h-4 mr-2" />
                      Dashboard
                    </Link>
                    <button
                      onClick={async () => {
                        await logout();
                        router.push('/');
                      }}
                      className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-blue-50"
                    >
                      <LogOut className="inline-block w-4 h-4 mr-2" />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Link href="/login">
                  <button className="px-5 py-2 rounded-lg bg-gradient-to-r from-amber-400 to-orange-500 text-white font-semibold shadow-md hover:from-amber-500 hover:to-orange-600 hover:shadow-lg transform hover:scale-105 transition-all duration-300">
                    Login
                  </button>
                </Link>

                <Link href="/register">
                  <button className="px-5 py-2 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold shadow-md hover:from-blue-700 hover:to-purple-700 hover:shadow-lg transform hover:scale-105 transition-all duration-300">
                    Sign Up
                  </button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden flex items-center gap-2">
            <button
              onClick={toggleMenu}
              className="p-2 rounded-lg border border-gray-300 bg-gray-100 hover:bg-gray-200 transition-transform duration-300 transform hover:scale-105 shadow-sm"
            >
              {isOpen ? (
                <X className="h-6 w-6 text-gray-800" />
              ) : (
                <Menu className="h-6 w-6 text-gray-800" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden bg-white shadow-md rounded-b-xl px-6 py-6 space-y-6 flex flex-col items-center">
            <div className="flex flex-col items-start w-full gap-4">
              <Link href="/" onClick={closeMenu} className="flex items-center gap-2 w-full text-gray-800 hover:text-blue-600">
                <Home className="h-5 w-5" /> Home
              </Link>

              <Link href="/auction" onClick={closeMenu} className="flex items-center gap-2 w-full text-gray-800 hover:text-blue-600">
                <Gavel className="h-5 w-5" /> Auction
              </Link>

              <Link href="/about" onClick={closeMenu} className="flex items-center gap-2 w-full text-gray-800 hover:text-blue-600">
                <Info className="h-5 w-5" /> About
              </Link>
            </div>

            <div className="w-full space-y-3 pt-2">
              {!user ? (
                <>
                  <Link href="/login">
                    <button onClick={closeMenu} className="w-full px-4 py-2 border border-gray-300 rounded-md text-gray-800 bg-white hover:bg-blue-50">
                      Login
                    </button>
                  </Link>
                  <Link href="/register">
                    <button onClick={closeMenu} className="w-full mt-1.5 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                      Sign Up
                    </button>
                  </Link>
                </>
              ) : (
                <button onClick={async () => { await logout(); closeMenu(); router.push('/'); }} className="w-full px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700">
                  Logout
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
