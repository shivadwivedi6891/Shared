"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { getSubscriptionDetails, subscribePlan } from "@/services/AuthServices/AuthApiFunction";
import { message } from "antd";
import { UploadCloud } from "lucide-react";

export default function SubscriptionPage() {
  const router = useRouter();

  const [plans, setPlans] = useState([]);
  const [selectedPlanId, setSelectedPlanId] = useState(null);
  const [reference, setReference] = useState("");
  const [proof, setProof] = useState(null);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    getSubscriptionDetails()
      .then((res) => {
        if (res.data.success) setPlans(res.data.data);
        console.log("Subscription Plans:", res.data.data);
      })
      .catch((err) => {
        console.error(err);
        message.error("Failed to fetch subscription plans.");
      });
  }, []);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setProof(file);
    setErrors((prev) => ({ ...prev, proof: null }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!selectedPlanId) newErrors.plan = "Please select a subscription plan.";
    if (!reference.trim()) newErrors.reference = "Reference number is required.";
    if (!proof) newErrors.proof = "Upload payment proof (PNG/JPG).";
    else if (!["image/png", "image/jpeg"].includes(proof.type)) newErrors.proof = "Only PNG or JPG allowed.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    try {
      const body = {
        subscriptionId: selectedPlanId,
        referenceNumber: reference,
        paymentProofPath: proof.name, 
      };

      const res = await subscribePlan(body);
      if (res.data.success) {
        // message.success("Subscription activated successfully!");
        // localStorage.setItem("subscription", true);
        setShowSuccess(true);
        setTimeout(() => router.push("/dashboard/buyer"), 1500);
      } else {
        // message.error(res.data.message || "Subscription failed.");
      }
    } catch (err) {
      console.error(err);
      message.error("Subscription failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-white to-blue-50 p-6 flex flex-col items-center justify-center text-gray-900">
      <div className="w-full max-w-6xl bg-white rounded-xl shadow-lg overflow-hidden grid grid-cols-1 md:grid-cols-2 border border-gray-300">
        {/* Dealer Side */}
        <div className="p-8 border-r border-gray-300 bg-blue-50">
          <h2 className="text-2xl font-bold text-blue-700 mb-6">Dealer Bank Details</h2>
          <ul className="space-y-4 text-sm text-gray-700">
            <li><strong>Bank Name:</strong> ICICI Bank</li>
            <li><strong>Account Number:</strong> 123456789012</li>
            <li><strong>IFSC Code:</strong> ICIC0001234</li>
            <li><strong>Account Holder:</strong> Car Auctions Pvt. Ltd.</li>
            <li><strong>UPI ID:</strong> tataauctions@icici</li>
          </ul>
          <div className="mt-6">
            <p className="text-sm text-gray-600">
              Use these details to transfer your subscription fee. Enter the reference number and upload payment proof on the right.
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

        {/* Subscription Form */}
        <div className="p-8 bg-white">
          <h2 className="text-2xl font-bold text-purple-700 mb-6">Subscribe to a Plan</h2>

          <form onSubmit={handleSubscribe} className="space-y-4">
            <div>
              <label className="block text-sm mb-1">Select Plan *</label>
              <select
                value={selectedPlanId || ""}
                onChange={(e) => setSelectedPlanId(Number(e.target.value))}
                className={`w-full border ${errors.plan ? "border-red-500" : "border-gray-300"} px-4 py-2 rounded-md bg-white text-black`}
              >
                <option value="">-- Select --</option>
                {plans.map((plan) => (
                  <option key={plan.id} value={plan.id}>
                    {plan.planName} - ₹{plan.price} ({plan.durationInDays} days)
                  </option>
                ))}
              </select>
              {errors.plan && <p className="text-sm text-red-500 mt-1">{errors.plan}</p>}
            </div>

            <div>
              <label className="block text-sm mb-1">Reference Number *</label>
              <input
                type="text"
                value={reference}
                onChange={(e) => setReference(e.target.value)}
                placeholder="Enter transaction/reference number"
                className={`w-full border ${errors.reference ? "border-red-500" : "border-gray-300"} px-4 py-2 rounded-md bg-white text-black`}
              />
              {errors.reference && <p className="text-sm text-red-500 mt-1">{errors.reference}</p>}
            </div>

            <div>
              <label className="block text-sm mb-1">Upload Payment Proof (PNG/JPG) *</label>
              <div className={`flex items-center gap-4 bg-white border-dashed ${errors.proof ? "border-red-500" : "border-purple-400"} border px-4 py-3 rounded-lg`}>
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
              disabled={loading}
              className="w-full bg-gradient-to-r from-purple-600 to-pink-500 hover:brightness-110 text-white font-semibold py-3 rounded-md transition disabled:opacity-50"
            >
              {loading ? "Processing..." : "Subscribe"}
            </button>
          </form>
        </div>
      </div>

      {showSuccess && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-lg p-6 max-w-md text-center animate-bounce-in">
            <h2 className="text-2xl font-bold text-green-600 mb-2">Subscription Activated!</h2>
            <p className="text-gray-700 mb-4">Your subscription has been successfully activated.</p>
            <div className="w-24 h-24 mx-auto mb-4">
              <img src="https://cdn-icons-png.flaticon.com/512/190/190411.png" alt="Success" className="w-full h-full" />
            </div>
            <p className="text-sm text-gray-500">Redirecting to Auctions...</p>
          </div>
        </div>
      )}
    </main>
  );
}
