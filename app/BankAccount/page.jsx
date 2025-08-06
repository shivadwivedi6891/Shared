"use client";

import { useState } from "react";
import { UploadCloud } from "lucide-react";
import { useRouter } from "next/navigation";

export default function BankAccountPage() {
  const router = useRouter();

  const [formData, setFormData] = useState({ 
    bankFrom: "",
    amount: "",
    transactionMode: "",
    reference: "",
    date: "",
  });
  const [proof, setProof] = useState(null);
  const [errors, setErrors] = useState({});
  const [showSuccess, setShowSuccess] = useState(false);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setProof(file);
    setErrors((prev) => ({ ...prev, proof: null }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.bankFrom.trim()) {
      newErrors.bankFrom = "Bank name is required.";
    } else if (!/^[A-Za-z ]{3,50}$/.test(formData.bankFrom)) {
      newErrors.bankFrom = "Bank name must be 3-50 letters only.";
    }

    if (!formData.amount) {
      newErrors.amount = "Amount is required.";
    } else if (!/^[0-9]+(\.[0-9]{1,2})?$/.test(formData.amount)) {
      newErrors.amount = "Enter a valid numeric amount.";
    }

    if (!formData.transactionMode) {
      newErrors.transactionMode = "Select transaction mode.";
    }

    if (!formData.reference.trim()) {
      newErrors.reference = "Reference is required.";
    } else {
      if (formData.transactionMode === "cheque") {
        if (!/^CHQ\d{5,10}$/i.test(formData.reference)) {
          newErrors.reference = "Cheque number must be like CHQ123456.";
        }
      } else if (formData.transactionMode === "cash") {
        if (!/^RCP\d{5,10}$/i.test(formData.reference)) {
          newErrors.reference = "Receipt number must be like RCP123456.";
        }
      } else if (formData.transactionMode === "online") {
        if (!/^TXN\d{6,15}$/i.test(formData.reference)) {
          newErrors.reference = "Transaction ID must be like TXN12345678.";
        }
      } else {
        if (!/^[A-Za-z0-9\-]{4,30}$/.test(formData.reference)) {
          newErrors.reference = "Invalid reference format.";
        }
      }
    }

    if (!formData.date) {
      newErrors.date = "Transaction date is required.";
    }

    if (!proof) {
      newErrors.proof = "Upload proof image.";
    } else if (!["image/png", "image/jpeg"].includes(proof.type)) {
      newErrors.proof = "Only PNG or JPG allowed.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    localStorage.setItem("premium_done", "true");
    setShowSuccess(true);
    setTimeout(() => {
      router.push("/dashboard/buyer");
    }, 2000);
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-white to-blue-50 dark:from-gray-900 dark:to-gray-800 p-6 flex flex-col items-center justify-center text-gray-900 dark:text-white">
      <div className="w-full max-w-6xl bg-white dark:bg-gray-900 rounded-xl shadow-lg overflow-hidden grid grid-cols-1 md:grid-cols-2 border border-gray-300 dark:border-gray-700">
        {/* Dealer Side (unchanged) */}
        <div className="p-8 border-r border-gray-300 dark:border-gray-700 bg-blue-50 dark:bg-gray-800">
          <h2 className="text-2xl font-bold text-blue-700 dark:text-blue-300 mb-6">Dealer Bank Details</h2>
          <ul className="space-y-4 text-sm text-gray-700 dark:text-gray-300">
            <li><strong>Bank Name:</strong> ICICI Bank</li>
            <li><strong>Account Number:</strong> 123456789012</li>
            <li><strong>IFSC Code:</strong> ICIC0001234</li>
            <li><strong>Account Holder:</strong> Car Auctions Pvt. Ltd.</li>
            <li><strong>UPI ID:</strong> tataauctions@icici</li>
          </ul>

          <div className="mt-6 space-y-2">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Use these details to transfer the premium membership fee. Upload your payment proof on the right.
            </p>
            <div className="mt-4">
              <p className="text-sm font-semibold text-gray-800 dark:text-gray-200 mb-2">Scan QR Code to Pay:</p>
              <img
                src="https://api.qrserver.com/v1/create-qr-code/?size=160x160&data=tataauctions@icici"
                alt="QR Code"
                className="w-40 h-40 rounded-lg border border-gray-400 dark:border-gray-600"
              />
            </div>
          </div>
        </div>

        {/* Customer Form */}
        <div className="p-8 bg-white dark:bg-gray-800">
          <h2 className="text-2xl font-bold text-purple-700 dark:text-purple-400 mb-6">Your Bank Details</h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm mb-1">From Bank *</label>
              <input
                type="text"
                value={formData.bankFrom}
                onChange={(e) => setFormData({ ...formData, bankFrom: e.target.value })}
                placeholder="Enter your bank name"
                className={`w-full border ${errors.bankFrom ? "border-red-500" : "border-gray-300 dark:border-gray-600"} px-4 py-2 rounded-md bg-white dark:bg-gray-700 text-black dark:text-white`}
              />
              {errors.bankFrom && <p className="text-sm text-red-500 mt-1">{errors.bankFrom}</p>}
            </div>

            <div>
              <label className="block text-sm mb-1">Amount *</label>
              <input
                type="number"
                value={formData.amount}
                onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                placeholder="Enter your amount"
                className={`w-full border ${errors.amount ? "border-red-500" : "border-gray-300 dark:border-gray-600"} px-4 py-2 rounded-md bg-white dark:bg-gray-700 text-black dark:text-white`}
              />
              {errors.amount && <p className="text-sm text-red-500 mt-1">{errors.amount}</p>}
            </div>

            <div>
              <label className="block text-sm mb-1">Transaction Mode *</label>
              <select
                value={formData.transactionMode}
                onChange={(e) => setFormData({ ...formData, transactionMode: e.target.value })}
                className={`w-full border ${errors.transactionMode ? "border-red-500" : "border-gray-300 dark:border-gray-600"} px-4 py-2 rounded-md bg-white dark:bg-gray-700 text-black dark:text-white`}
              >
                <option value="">-- Select --</option>
                <option value="cheque">Cheque</option>
                <option value="cash">Cash</option>
                <option value="online">Online Payment</option>
              </select>
              {errors.transactionMode && <p className="text-sm text-red-500 mt-1">{errors.transactionMode}</p>}
            </div>

            <div>
              <label className="block text-sm mb-1">
                {formData.transactionMode === "cheque"
                  ? "Cheque Number *"
                  : formData.transactionMode === "cash"
                  ? "Receipt No *"
                  : formData.transactionMode === "online"
                  ? "Transaction ID *"
                  : "Reference Number *"}
              </label>
              <input
                type="text"
                value={formData.reference}
                onChange={(e) => setFormData({ ...formData, reference: e.target.value })}
                placeholder={
                  formData.transactionMode === "cheque"
                    ? "e.g., CHQ987654"
                    : formData.transactionMode === "cash"
                    ? "e.g., RCP123456"
                    : formData.transactionMode === "online"
                    ? "e.g., TXN12345678"
                    : "e.g., REF123456"
                }
                className={`w-full border ${errors.reference ? "border-red-500" : "border-gray-300 dark:border-gray-600"} px-4 py-2 rounded-md bg-white dark:bg-gray-700 text-black dark:text-white`}
              />
              {errors.reference && <p className="text-sm text-red-500 mt-1">{errors.reference}</p>}
            </div>

            <div>
              <label className="block text-sm mb-1">Transaction Date *</label>
              <input
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                className={`w-full border ${errors.date ? "border-red-500" : "border-gray-300 dark:border-gray-600"} px-4 py-2 rounded-md bg-white dark:bg-gray-700 text-black dark:text-white`}
              />
              {errors.date && <p className="text-sm text-red-500 mt-1">{errors.date}</p>}
            </div>

            <div>
              <label className="block text-sm mb-1">Upload Payment Proof (PNG/JPG) *</label>
              <div className={`flex items-center gap-4 bg-white dark:bg-gray-700 border-dashed ${errors.proof ? "border-red-500" : "border-purple-400 dark:border-purple-600"} border px-4 py-3 rounded-lg`}>
                <label className="cursor-pointer flex items-center gap-2 text-purple-600 hover:underline">
                  <UploadCloud className="w-5 h-5" />
                  {proof ? "Change file" : "Choose file"}
                  <input type="file" accept="image/png, image/jpeg" onChange={handleFileChange} className="hidden" />
                </label>
                {proof && <span className="text-xs text-green-600 truncate max-w-[150px]">{proof.name}</span>}
              </div>
              {errors.proof && <p className="text-sm text-red-500 mt-1">{errors.proof}</p>}
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-purple-600 to-pink-500 hover:brightness-110 text-white font-semibold py-3 rounded-md transition"
            >
              Submit
            </button>
          </form>
        </div>
      </div>

      {showSuccess && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-6 max-w-md text-center animate-bounce-in">
            <h2 className="text-2xl font-bold text-green-600 mb-2">Premium Activated!</h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">Your premium membership has been successfully activated.</p>
            <div className="w-24 h-24 mx-auto mb-4">
              <img src="https://cdn-icons-png.flaticon.com/512/190/190411.png" alt="Success" className="w-full h-full" />
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400">Redirecting to Auctions...</p>
          </div>
        </div>
      )}
    </main>
  );
}
