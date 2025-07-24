'use client';

import Link from 'next/link';

export default function FinanceInsurance() {
  return (
    <main className="bg-black text-white min-h-screen py-20 px-6 sm:px-12 lg:px-24">
      <section className="max-w-5xl mx-auto">
        <h1 className="text-4xl sm:text-5xl font-bold mb-6 text-purple-400">
          Finance & Insurance
        </h1>
        <p className="text-gray-300 mb-10 text-lg leading-relaxed">
          Whether you're buying your dream car or insuring a valuable investment, we’re here to help you navigate the process. Explore trusted partners, calculate estimates, and make informed decisions with ease.
        </p>

        {/* Finance Options */}
        <div className="bg-white/5 p-6 rounded-xl border border-white/10 mb-10 shadow-lg">
          <h2 className="text-2xl font-semibold mb-4 text-purple-300">Financing Options</h2>
          <ul className="list-disc list-inside text-gray-300 space-y-2">
            <li>Low-interest car loans available through our certified partners.</li>
            <li>Flexible loan terms ranging from 12 to 72 months.</li>
            <li>Instant loan pre-approval and credit check tools.</li>
            <li>Refinancing options for existing vehicle purchases.</li>
          </ul>
          <Link
            href="https://example-loan-provider.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-4 px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition"
          >
            <Link href="/finance" className="text-white hover:underline">
             Apply for Financing
            </Link>
            
          </Link>
        </div>

        {/* Insurance */}
        <div className="bg-white/5 p-6 rounded-xl border border-white/10 mb-10 shadow-lg">
          <h2 className="text-2xl font-semibold mb-4 text-purple-300">Insurance Guidance</h2>
          <ul className="list-disc list-inside text-gray-300 space-y-2">
            <li>Get competitive quotes from top auto insurance companies.</li>
            <li>Learn about classic, luxury, and exotic car insurance plans.</li>
            <li>Understand policy types: liability, comprehensive, and full coverage.</li>
            <li>Bundle options for savings on home and auto insurance.</li>
          </ul>
          <Link
            href="https://example-insurance-portal.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-4 px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition"
          >
            Compare Insurance Plans
          </Link>
        </div>

        {/* Finance Calculator */}
        <div className="bg-white/5 p-6 rounded-xl border border-white/10 shadow-lg">
          <h2 className="text-2xl font-semibold mb-4 text-purple-300">Estimate Your Payments</h2>
          <iframe
            src="https://www.calculator.net/auto-loan-calculator.html"
            title="Auto Loan Calculator"
            className="w-full h-96 rounded-lg border-0"
          ></iframe>
        </div>
      </section>

      {/* Optional FAQ */}
      <section className="mt-20 max-w-5xl mx-auto">
        <h2 className="text-3xl font-semibold mb-6 text-purple-400">Frequently Asked Questions</h2>
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold text-white">Do I need perfect credit to get financing?</h3>
            <p className="text-gray-400">Not at all. Many of our partners offer financing for a wide range of credit scores.</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white">Can I use my own bank for financing?</h3>
            <p className="text-gray-400">Yes, you're free to secure financing from your preferred bank or credit union.</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white">What kind of cars qualify for specialized insurance?</h3>
            <p className="text-gray-400">Vehicles over a certain value, rarity, or age may be eligible for classic/exotic coverage.</p>
          </div>
        </div>
      </section>
    </main>
  );
}
