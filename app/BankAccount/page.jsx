'use client';

import { useState } from 'react';
import { UploadCloud } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function BankAccountPage() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    bankName: '',
    accountNumber: '',
    ifscCode: '',
    accountHolder: '',
  });

  const [errors, setErrors] = useState({});
  const [screenshot, setScreenshot] = useState(null);

  const validateIFSC = (code) => /^[A-Z]{4}0[A-Z0-9]{6}$/.test(code);
  const validateAccountNumber = (num) => /^\d{9,18}$/.test(num);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.bankName.trim()) newErrors.bankName = 'Bank name is required.';
    if (!formData.accountNumber.trim()) {
      newErrors.accountNumber = 'Account number is required.';
    } else if (!validateAccountNumber(formData.accountNumber)) {
      newErrors.accountNumber = 'Account number must be 9–18 digits.';
    }

    if (!formData.ifscCode.trim()) {
      newErrors.ifscCode = 'IFSC code is required.';
    } else if (!validateIFSC(formData.ifscCode)) {
      newErrors.ifscCode = 'Invalid IFSC code format.';
    }

    if (!formData.accountHolder.trim()) newErrors.accountHolder = 'Account holder name is required.';

    if (!screenshot) newErrors.screenshot = 'Screenshot is required.';
    else if (!screenshot.type.startsWith('image/')) newErrors.screenshot = 'File must be an image.';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleFileChange = (e) => {
    setScreenshot(e.target.files[0]);
    setErrors((prev) => ({ ...prev, screenshot: null }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    localStorage.setItem('premium_done', 'true');
    alert('Your details have been submitted!');
    router.push('/auctions');
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-white to-blue-50 p-6 flex flex-col items-center justify-center">
      <div className="w-full max-w-6xl bg-white rounded-xl shadow-lg overflow-hidden grid grid-cols-1 md:grid-cols-2 border border-gray-300">
        
        {/* Dealer Side */}
        <div className="p-8 border-r border-gray-300 bg-blue-50">
          <h2 className="text-2xl font-bold text-blue-700 mb-6">Dealer Bank Details</h2>
          <ul className="space-y-4 text-sm text-gray-700">
            <li><strong>Bank Name:</strong> ICICI Bank</li>
            <li><strong>Account Number:</strong> 123456789012</li>
            <li><strong>IFSC Code:</strong> ICIC0001234</li>
            <li><strong>Account Holder:</strong> Tata Auctions Pvt. Ltd.</li>
            <li><strong>UPI ID:</strong> tataauctions@icici</li>
          </ul>

          <div className="mt-6 space-y-2">
            <p className="text-sm text-gray-600">
              Use these details to transfer the premium membership fee. Upload your payment proof on the right.
            </p>
            <div className="mt-4">
              <p className="text-sm font-semibold text-gray-800 mb-2">Scan QR Code to Pay:</p>
              <img
                src="https://api.qrserver.com/v1/create-qr-code/?size=160x160&data=tataauctions@icici"
                alt="QR Code"
                className="w-40 h-40 rounded-lg border border-gray-400"
              />
            </div>
          </div>
        </div>

        {/* Customer Form */}
        <div className="p-8">
          <h2 className="text-2xl font-bold text-purple-700 mb-6">Your Bank Details</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Bank Name */}
            <div>
              <label className="block text-sm mb-1">Bank Name *</label>
              <input
                type="text"
                placeholder="Enter your bank name"
                value={formData.bankName}
                onChange={(e) => setFormData({ ...formData, bankName: e.target.value })}
                className={`w-full border ${errors.bankName ? 'border-red-500' : 'border-gray-300'} px-4 py-2 rounded-md`}
              />
              {errors.bankName && <p className="text-sm text-red-500 mt-1">{errors.bankName}</p>}
            </div>

            {/* Account Number */}
            <div>
              <label className="block text-sm mb-1">Account Number *</label>
              <input
                type="text"
                placeholder="Enter your account number"
                value={formData.accountNumber}
                onChange={(e) => setFormData({ ...formData, accountNumber: e.target.value })}
                className={`w-full border ${errors.accountNumber ? 'border-red-500' : 'border-gray-300'} px-4 py-2 rounded-md`}
              />
              {errors.accountNumber && <p className="text-sm text-red-500 mt-1">{errors.accountNumber}</p>}
            </div>

            {/* IFSC Code */}
            <div>
              <label className="block text-sm mb-1">IFSC Code *</label>
              <input
                type="text"
                placeholder="Enter IFSC code (e.g. ICIC0001234)"
                value={formData.ifscCode}
                onChange={(e) => setFormData({ ...formData, ifscCode: e.target.value.toUpperCase() })}
                className={`w-full border ${errors.ifscCode ? 'border-red-500' : 'border-gray-300'} px-4 py-2 rounded-md`}
              />
              {errors.ifscCode && <p className="text-sm text-red-500 mt-1">{errors.ifscCode}</p>}
            </div>

            {/* Account Holder */}
            <div>
              <label className="block text-sm mb-1">Account Holder Name *</label>
              <input
                type="text"
                placeholder="Enter account holder's name"
                value={formData.accountHolder}
                onChange={(e) => setFormData({ ...formData, accountHolder: e.target.value })}
                className={`w-full border ${errors.accountHolder ? 'border-red-500' : 'border-gray-300'} px-4 py-2 rounded-md`}
              />
              {errors.accountHolder && <p className="text-sm text-red-500 mt-1">{errors.accountHolder}</p>}
            </div>

            {/* Screenshot Upload */}
            <div>
              <label className="block text-sm mb-1">Upload Payment Screenshot *</label>
              <div className={`flex items-center justify-between gap-4 bg-white border-dashed ${errors.screenshot ? 'border-red-500' : 'border-purple-400'} border px-4 py-3 rounded-lg`}>
                <label className="cursor-pointer flex items-center gap-2 text-purple-600 hover:underline">
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
                  <span className="text-xs text-green-600 truncate max-w-[150px]">
                    {screenshot.name}
                  </span>
                )}
              </div>
              {errors.screenshot && <p className="text-sm text-red-500 mt-1">{errors.screenshot}</p>}
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-purple-600 to-pink-500 hover:brightness-110 text-white font-semibold py-3 rounded-md transition"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}
