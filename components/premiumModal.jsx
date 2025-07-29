'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { UploadCloud, CheckCircle, ArrowLeft } from 'lucide-react';

export default function PremiumModal({ onClose }) {
  const [step, setStep] = useState('plans');
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [screenshot, setScreenshot] = useState(null);
  const [formData, setFormData] = useState({
    bankName: '',
    accountNumber: '',
    ifscCode: '',
    amount: '',
  });

  const router = useRouter();
  const plans = [
    { name: 'Premium', price: '₹999 / Year', id: 'premium', numericAmount: 999 },
  ];

  const handleFileChange = (e) => {
    setScreenshot(e.target.files[0]);
  };

  const handleSubmitBankDetails = () => {
    const { bankName, accountNumber, ifscCode, amount } = formData;

    if (!bankName || !accountNumber || !ifscCode || !amount || !screenshot) {
      alert('Please fill in all fields and upload the payment screenshot.');
      return;
    }

    localStorage.setItem('premium_done', 'true');
    setStep('success');

    setTimeout(() => {
      onClose?.();
      router.push('/auctions');
    }, 1500);
  };

  return (
    <>
      {step === 'plans' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <div className="relative bg-white dark:bg-gray-900 text-black dark:text-white p-10 rounded-2xl w-full max-w-2xl border border-gray-200 dark:border-white/10 space-y-6 shadow-xl">
            <div className="text-center space-y-2">
              <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-500 to-pink-500 text-transparent bg-clip-text">
                Upgrade Your Experience
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                Unlock exclusive features, early access to auctions, and priority customer support by becoming a premium member.
              </p>
            </div>

            <div className="grid sm:grid-cols-1 gap-4">
              {plans.map((plan) => (
                <button
                  key={plan.id}
                  onClick={() => {
                    setSelectedPlan(plan);
                    setFormData((prev) => ({
                      ...prev,
                      amount: plan.numericAmount.toString(),
                    }));
                    setStep('bank');
                  }}
                  className="px-4 py-6 bg-gradient-to-r from-purple-600 to-pink-500 text-white font-semibold rounded-xl hover:scale-105 transition shadow-md"
                >
                  <div className="text-lg font-bold mb-1">{plan.name}</div>
                  <div className="text-sm">{plan.price}</div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {step === 'bank' && selectedPlan && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
          <div className="relative bg-white dark:bg-gray-900 text-black dark:text-white w-full max-w-xl rounded-2xl p-8 shadow-lg border border-gray-200 dark:border-white/10 space-y-6">
            <div className="flex items-center justify-between mb-2">
             <button
             onClick={() => setStep('plans')}
             className="text-purple-600 hover:text-purple-800 flex items-center gap-1 font-medium"
                  >
              <ArrowLeft size={18} /> Back
              </button>

              <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-500 to-pink-500 text-transparent bg-clip-text text-center w-full">
                Complete Payment – {selectedPlan.name}
              </h2>
            </div>

            <form onSubmit={(e) => { e.preventDefault(); handleSubmitBankDetails(); }} className="space-y-4">
              <div>
                <label className="block text-sm text-gray-600 dark:text-gray-300">Bank Name</label>
                <input
                  type="text"
                  value={formData.bankName}
                  onChange={(e) => setFormData({ ...formData, bankName: e.target.value })}
                  className="w-full bg-gray-100 dark:bg-white/10 border border-gray-300 dark:border-gray-700 rounded-lg px-4 py-2 text-black dark:text-white"
                  placeholder="Enter your bank name"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-600 dark:text-gray-300">Account Number</label>
                <input
                  type="text"
                  value={formData.accountNumber}
                  onChange={(e) => setFormData({ ...formData, accountNumber: e.target.value })}
                  className="w-full bg-gray-100 dark:bg-white/10 border border-gray-300 dark:border-gray-700 rounded-lg px-4 py-2 text-black dark:text-white"
                  placeholder="Enter your account number"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-600 dark:text-gray-300">IFSC Code</label>
                <input
                  type="text"
                  value={formData.ifscCode}
                  onChange={(e) => setFormData({ ...formData, ifscCode: e.target.value })}
                  className="w-full bg-gray-100 dark:bg-white/10 border border-gray-300 dark:border-gray-700 rounded-lg px-4 py-2 text-black dark:text-white"
                  placeholder="Enter IFSC code"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-600 dark:text-gray-300">Amount (₹)</label>
                <input
                  type="number"
                  value={formData.amount}
                  readOnly
                  className="w-full bg-gray-100 cursor-not-allowed dark:bg-white/10 border border-gray-300 dark:border-gray-700 rounded-lg px-4 py-2 text-black dark:text-white"
                  placeholder="Auto-filled"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-600 dark:text-gray-300 mb-1">Upload Payment Screenshot *</label>
                <div className="flex items-center justify-between gap-4 bg-white dark:bg-white/5 border border-dashed border-purple-400 px-4 py-3 rounded-lg">
                  <label className="cursor-pointer flex items-center gap-2 text-purple-600 dark:text-purple-400 hover:underline">
                    <UploadCloud className="w-5 h-5" />
                    {screenshot ? 'Change file' : 'Choose file'}
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                  </label>
                  {screenshot && (
                    <span className="text-xs text-green-600 truncate max-w-[160px]">
                      {screenshot.name}
                    </span>
                  )}
                </div>
              </div>

              <button
                type="submit"
                className="w-full mt-4 bg-gradient-to-r from-purple-600 to-pink-500 hover:brightness-110 text-white font-semibold py-3 rounded-xl transition shadow-lg hover:scale-105"
              >
                Submit Payment
              </button>
            </form>
          </div>
        </div>
      )}
      {step === 'success' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
          <div className="bg-white dark:bg-gray-900 text-black dark:text-white w-full max-w-md rounded-2xl p-8 shadow-xl text-center space-y-4 border border-gray-200 dark:border-white/10">
            <CheckCircle className="text-green-500 w-12 h-12 mx-auto" />
            <h3 className="text-2xl font-bold">Premium Membership Activated</h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Thank you! Redirecting you to explore premium auctions...
            </p>
          </div>
        </div>
      )}
    </>
  );
}
