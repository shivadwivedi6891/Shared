'use client';

export default function TermsPage() {
  return (
    <main className="min-h-screen px-6 py-16 bg-white dark:bg-black text-gray-900 dark:text-white">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-6 text-center">Terms & Conditions</h1>
        <p className="mb-8 text-gray-600 dark:text-gray-400 text-center">
          Last Updated: July 2025
        </p>

        <section className="space-y-8 text-sm sm:text-base leading-relaxed">
          <div>
            <h2 className="text-xl font-semibold mb-2">1. Introduction</h2>
            <p>
              Welcome to LuxAuto Auctions. By accessing or using our platform, you agree to comply with and be bound by these Terms and Conditions. If you do not agree, please do not use our services.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2">2. User Eligibility</h2>
            <p>
              Users must be at least 18 years old and legally capable of entering into contracts. Users must provide accurate and truthful registration information.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2">3. Auction Process</h2>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>All bids are final and legally binding.</li>
              <li>Reserve prices may be set by sellers and must be met for a successful sale.</li>
              <li>LuxAuto reserves the right to cancel or suspend auctions at its discretion.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2">4. Buyer Responsibility</h2>
            <p>
              Buyers are responsible for reviewing the vehicle description and arranging inspections if needed. Payment must be completed within the stated timeframe after the auction ends.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2">5. Seller Responsibility</h2>
            <p>
              Sellers must ensure the information provided about the vehicle is accurate and truthful. Misleading or false information may result in account suspension or legal action.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2">6. Fees and Payments</h2>
            <p>
              LuxAuto may charge listing fees, transaction fees, or commissions. These will be clearly communicated before submission. All payments are handled through secure payment gateways.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2">7. Dispute Resolution</h2>
            <p>
              Disputes should first be resolved directly between buyer and seller. LuxAuto may assist in mediation but does not guarantee resolution.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2">8. Account Termination</h2>
            <p>
              LuxAuto reserves the right to suspend or terminate accounts for violations of these terms or any suspicious activity without notice.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2">9. Changes to Terms</h2>
            <p>
              We may update these Terms & Conditions from time to time. Continued use of our platform constitutes acceptance of the updated terms.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2">10. Contact</h2>
            <p>
              For questions or concerns about these terms, please contact us at{' '}
              <a href="mailto:support@luxautoauctions.com" className="text-purple-500 underline">
                support@luxautoauctions.com
              </a>
              .
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}
