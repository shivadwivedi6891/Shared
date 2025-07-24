'use client';

import Link from 'next/link';
import { Facebook, Twitter, Instagram, Github } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
             <Link href = '/'>  CAR AUCTION </Link>
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Your premium car auction platform. Bid on top-tier vehicles or sell your own.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-gray-200">Navigation</h3>
            <ul className="space-y-2">
              <li><Link href="/" className="text-gray-600 dark:text-gray-400 hover:text-purple-500">Home</Link></li>
              <li><Link href="/auctions" className="text-gray-600 dark:text-gray-400 hover:text-purple-500">Auctions</Link></li>

              <li className="text-gray-600 dark:text-gray-400 hover:text-purple-500">
              <Link href="/finance-insurance" className="text-gray-600 dark:text-gray-400 hover:text-purple-500">Finance & Insurance</Link></li>
          

              <li><Link href="/about" className="text-gray-600 dark:text-gray-400 hover:text-purple-500">About</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-gray-200">Support</h3>
            <ul className="space-y-2">
              <li  className="text-gray-600 dark:text-gray-400 hover:text-purple-500">
             <Link href="/contactus" className="hover:text-purple-500">Contact Us</Link></li>

              <li className="text-gray-600 dark:text-gray-400 hover:text-purple-500">
              <Link href="/faq" className="hover:text-purple-500">FAQ</Link></li>

              <li className="text-gray-600 dark:text-gray-400  hover:text-purple-500">
              <Link href="/terms" className=" transition hover:text-purple-500">Terms & Conditions</Link></li>

              <li className="text-gray-600 dark:text-gray-400 hover:text-purple-500">
              <Link href="/privacy" className=" transition  hover:text-purple-500">Privacy</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-gray-200">Follow Us</h3>
            <div className="flex space-x-4">
              <Link href="https://www.facebook.com"><Facebook className="text-gray-500 hover:text-purple-500" /></Link>
              <Link href="https://www.twitter.com"><Twitter className="text-gray-500 hover:text-purple-500" /></Link>
              <Link href="https://www.instagram.com"><Instagram className="text-gray-500 hover:text-purple-500" /></Link>
              <Link href="https://www.github.com"><Github className="text-gray-500 hover:text-purple-500" /></Link>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-gray-200 dark:border-gray-700 pt-6 text-center text-gray-500 text-sm">
          &copy; {new Date().getFullYear()} . All rights reserved.
        </div>
      </div>
    </footer>
  );
}
