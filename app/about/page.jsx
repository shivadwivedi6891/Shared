'use client'

import Link from 'next/link';

export default function AboutPage() {
  return (
    <main className="bg-white text-black dark:bg-black dark:text-white min-h-screen font-sans">
      <section
        className="relative flex items-center justify-center text-center px-6 py-32 sm:py-40 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('https://images.pexels.com/photos/305070/pexels-photo-305070.jpeg')",
        }}
      >
        <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />
        <div className="relative z-10 max-w-3xl">
          <h1 className="text-4xl sm:text-6xl font-bold tracking-tight bg-gradient-to-r from-purple-500 via-black to-pink-500 dark:from-purple-400 dark:via-white dark:to-pink-400 text-transparent bg-clip-text drop-shadow-lg">
            About Us
          </h1>
          <p className="mt-4 text-lg sm:text-xl text-gray-700 dark:text-gray-300">
            Driving trust in every bid.
          </p>
        </div>
      </section>

      <section className="py-20 px-6 sm:px-12 lg:px-20 bg-gray-100 dark:bg-gradient-to-br dark:from-gray-950 dark:to-black">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold mb-6 text-black dark:text-white">Our Story</h2>
          <p className="text-gray-700 dark:text-gray-400 mb-8 leading-relaxed">
            Founded in 2024, Premium Car Auctions was born from a passion for performance, luxury, and transparency.
            We’ve built a trusted marketplace that connects car enthusiasts, collectors, and dealers through
            real-time bidding. Whether it’s a rare supercar or a pristine classic, our platform ensures that every vehicle
            tells a story — and finds the right owner.
          </p>

          <h2 className="text-3xl font-bold mb-6 text-black dark:text-white">What Makes Us Different?</h2>
          <ul className="space-y-6 text-gray-800 dark:text-gray-300 list-disc pl-5">
            <li>
              <span className="text-black dark:text-white font-semibold">Curated Listings:</span> Every car is verified for quality, condition, and documentation.
            </li>
            <li>
              <span className="text-black dark:text-white font-semibold">Real-Time Auctions:</span> Transparent, secure, and fast bidding experience.
            </li>
            <li>
              <span className="text-black dark:text-white font-semibold">Global Reach:</span> Buyers and sellers from over 30 countries.
            </li>
            <li>
              <span className="text-black dark:text-white font-semibold">24/7 Support:</span> Our expert support team is always available to help.
            </li>
          </ul>

          <div className="mt-16 text-center">
            <h3 className="text-2xl font-semibold mb-4 text-black dark:text-white">Ready to get started?</h3>
            <div className="flex justify-center gap-4">
              <Link href="/auctions">
                <button className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-500 text-white font-semibold rounded-lg hover:scale-105 transition shadow">
                  Browse Auctions
                </button>
              </Link>
              <Link href="/">
                <button className="px-6 py-3 border border-black dark:border-white text-black dark:text-white rounded-lg hover:bg-black/10 dark:hover:bg-white/10 transition">
                  Sell a Car
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
