"use client";

import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { CheckCircle } from "lucide-react";
import {
  getUserKyc,
  getUserSubscriptions,
} from "@/services/AuthServices/AuthApiFunction";
import { useAuth } from "@/context/AuthContext";

export default function PremiumModal() {
  const [step, setStep] = useState("plans");
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [open, setOpen] = useState(false);
  const [subscriptionStatus, setSubscriptionStatus] = useState(null);
  const pathname = usePathname();
  const router = useRouter();

  const { user, token, logout } = useAuth();

  const plans = [
    { name: "Premium", price: "₹999 / Year", id: "premium", numericAmount: 999 },
  ];

  const handlePlanSelect = (plan) => {
    setSelectedPlan(plan);
    localStorage.setItem("selected_plan", JSON.stringify(plan));
    router.push("/BankAccount");
  };

  const checkSubscription = async () => {
    const user = localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user"))
      : null;

    if (!user) {
      setOpen(false);
      logout();
      return;
    }

    if (!token) {
      setOpen(false);
      logout();
      return;
    }

    try {
      // 1. Check KYC
      const kycRes = await getUserKyc();
      const kycData = kycRes?.data?.data;

      console.log("KYC Response:", kycRes);
      console.log("KYC Data: from bank", kycData);



      if (!kycData || kycData.aadhaarStatus !== 2 || kycData.panStatus !== 2) {
        setOpen(false);
        return;
      }

      // 2. Check subscription
      const res = await getUserSubscriptions();
      const subscriptionList = res?.data?.data || [];

      if (subscriptionList.length === 0) {
        setOpen(true); // no subscription -> open modal
        setSubscriptionStatus(null);
      } else {
        const subscriptionData = subscriptionList[0];
        setSubscriptionStatus(subscriptionData.status);

        if (subscriptionData.status === "Pending") {
          setOpen(true); // pending subscription -> show modal
        } else {
          setOpen(false); // active/other status -> hide modal
        }
      }
    } catch (error) {
      console.error("Error checking subscription:", error);
      setOpen(true);
    }
  };

  // helper: retry until KYC is updated
  const waitForKyc = async (retries = 5, delay = 2000) => {
    for (let i = 0; i < retries; i++) {
      try {
        const kycRes = await getUserKyc();
        const kycData = kycRes?.data?.data;
        if (kycData?.aadhaarStatus === 1 && kycData?.panStatus === 1) {
          return true;
        }
      } catch (err) {
        console.error("KYC polling error:", err);
      }
      await new Promise((resolve) => setTimeout(resolve, delay));
    }
    return false;
  };

  // Run check on mount & on route change
  useEffect(() => {
    const allowlist = ["/BankAccount", "/checkout", "/payment-success"];
    if (allowlist.includes(pathname)) {
      setOpen(false);
      return;
    }
    checkSubscription();
  }, [pathname]);

  // 🔥 Listen for KYC completion event
  useEffect(() => {
    const handleKycComplete = async () => {
      const verified = await waitForKyc();
      if (verified) {
        checkSubscription();
      }
    };
    window.addEventListener("kycCompleted", handleKycComplete);

    return () => {
      window.removeEventListener("kycCompleted", handleKycComplete);
    };
  }, []);

  if (!open) return null;

  return (
    <>
      {step === "plans" && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <div className="relative bg-white dark:bg-gray-900 text-black dark:text-white p-10 rounded-2xl w-full max-w-2xl border border-gray-200 dark:border-white/10 space-y-6 shadow-xl">
            <div className="text-center space-y-2">
              <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-500 to-pink-500 text-transparent bg-clip-text">
                Upgrade Your Experience
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                Unlock exclusive features, early access to auctions, and
                priority support by becoming a premium member.
              </p>
            </div>

            <div className="grid sm:grid-cols-1 gap-4">
              {plans.map((plan) => (
                <button
                  key={plan.id}
                  onClick={() => handlePlanSelect(plan)}
                  disabled={subscriptionStatus === 'Pending'}
                  className={`px-4 py-6 bg-gradient-to-r from-purple-600 to-pink-500 text-white font-semibold rounded-xl transition shadow-md ${subscriptionStatus === 'Pending' ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105'}`}>
                  <div className="text-lg font-bold mb-1">{plan.name}</div>
                  <div className="text-sm">{subscriptionStatus === 'Pending' ? 'Pending' : plan.price}</div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {step === "success" && (
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