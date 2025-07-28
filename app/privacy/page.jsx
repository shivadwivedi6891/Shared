'use client';

import PrivateRoute from "@/components/PrivateRoute";

export default function PrivacyPolicy() {
  return (
    <main className="min-h-screen bg-black text-white px-6 py-20 sm:px-12 lg:px-32">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-purple-500 mb-6">Privacy Policy</h1>

        <p className="text-gray-300 mb-6">
          At <span className="font-semibold text-white">Car Auction</span>, we are committed to protecting your privacy. This Privacy Policy outlines how we collect, use, and protect your personal data.
        </p>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-purple-400 mb-2">1. Information We Collect</h2>
          <ul className="list-disc list-inside text-gray-300">
            <li>Your name, email address, phone number, and billing information.</li>
            <li>Vehicle listing details if you're selling a car.</li>
            <li>Login credentials, preferences, and IP address.</li>
          </ul>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-purple-400 mb-2">2. How We Use Your Data</h2>
          <ul className="list-disc list-inside text-gray-300">
            <li>To process bids and facilitate transactions.</li>
            <li>To send notifications, confirmations, and updates.</li>
            <li>To improve our platform based on user feedback and analytics.</li>
          </ul>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-purple-400 mb-2">3. Sharing Your Data</h2>
          <p className="text-gray-300">
            We do not sell your personal information. Your data may be shared only with trusted third parties like payment processors or service partners to complete your transactions securely.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-purple-400 mb-2">4. Data Security</h2>
          <p className="text-gray-300">
            We use encryption, secure servers, and regular audits to safeguard your information. However, no digital transmission is 100% secure.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-purple-400 mb-2">5. Your Rights</h2>
          <ul className="list-disc list-inside text-gray-300">
            <li>Request access or deletion of your personal data.</li>
            <li>Opt out of marketing communications at any time.</li>
            <li>Update your account details via the settings page.</li>
          </ul>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-purple-400 mb-2">6. Cookies & Tracking</h2>
          <p className="text-gray-300">
            We use cookies to enhance your experience, personalize content, and analyze site traffic. You can disable cookies through your browser settings.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-purple-400 mb-2">7. Policy Updates</h2>
          <p className="text-gray-300">
            We may revise this policy occasionally. Any changes will be updated here with a revised date.
          </p>
        </section>

        <p className="text-gray-500 text-sm mt-8">
          Last updated: July 23, 2025
        </p>
      </div>
    </main>

  );
}
