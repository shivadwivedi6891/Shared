'use client';

import React, { useEffect } from 'react';

export default function TermsConditionModal({ onClose }) {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = 'auto'; };
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4">
      <div className="relative bg-white dark:bg-gray-900 text-gray-900 dark:text-white max-w-4xl w-full max-h-[90vh] overflow-y-auto rounded-xl shadow-2xl p-6 animate-fadeIn">
        <button
          onClick={onClose}
          className="absolute top-3 right-4 text-2xl text-gray-500 hover:text-red-500"
          aria-label="Close"
        >
          &times;
        </button>

        <h1 className="text-4xl font-bold mb-4 text-center">Terms & Conditions</h1>
        <p className="text-center text-sm text-gray-600 dark:text-gray-400 mb-6">
          Last Updated: July 2025
        </p>

        <section className="space-y-8 text-sm sm:text-base leading-relaxed">
          {[
            {
              title: '1. Introduction',
              content:
                'Welcome to LuxAuto Auctions. By accessing or using our platform, you agree to comply with and be bound by these Terms and Conditions. If you do not agree, please do not use our services.',
            },
            {
              title: '2. User Eligibility',
              content:
                'Users must be at least 18 years old and legally capable of entering into contracts. Users must provide accurate and truthful registration information.',
            },
            {
              title: '3. Auction Process',
              list: [
                'All bids are final and legally binding.',
                'Reserve prices may be set by sellers and must be met for a successful sale.',
                'LuxAuto reserves the right to cancel or suspend auctions at its discretion.',
              ],
            },
            {
              title: '4. Buyer Responsibility',
              content:
                'Buyers are responsible for reviewing the vehicle description and arranging inspections if needed. Payment must be completed within the stated timeframe after the auction ends.',
            },
            {
              title: '5. Seller Responsibility',
              content:
                'Sellers must ensure the information provided about the vehicle is accurate and truthful. Misleading or false information may result in account suspension or legal action.',
            },
            {
              title: '6. Fees and Payments',
              content:
                'LuxAuto may charge listing fees, transaction fees, or commissions. These will be clearly communicated before submission. All payments are handled through secure payment gateways.',
            },
            {
              title: '7. Dispute Resolution',
              content:
                'Disputes should first be resolved directly between buyer and seller. LuxAuto may assist in mediation but does not guarantee resolution.',
            },
            {
              title: '8. Account Termination',
              content:
                'LuxAuto reserves the right to suspend or terminate accounts for violations of these terms or any suspicious activity without notice.',
            },
            {
              title: '9. Changes to Terms',
              content:
                'We may update these Terms & Conditions from time to time. Continued use of our platform constitutes acceptance of the updated terms.',
            },
            {
              title: '10. Contact',
              content: (
                <>
                  For questions or concerns about these terms, please contact us at{' '}
                  <a
                    href="mailto:support@luxautoauctions.com"
                    className="text-purple-500 underline hover:text-purple-700"
                  >
                    support@luxautoauctions.com
                  </a>
                  .
                </>
              ),
            },
          ].map(({ title, content, list }) => (
            <div key={title}>
              <h2 className="text-xl font-semibold mb-2">{title}</h2>
              {content && <p>{content}</p>}
              {list && (
                <ul className="list-disc list-inside space-y-2 ml-4">
                  {list.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </section>
      </div>
    </div>
  );
}
