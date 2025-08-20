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
        paymentProofPath: proof.name, // or upload logic if needed
      };

      const res = await subscribePlan(body);
      if (res.data.success) {
        message.success("Subscription activated successfully!");
        localStorage.setItem("subscription", true);
        setShowSuccess(true);
        setTimeout(() => router.push("/dashboard/buyer"), 1500);
      } else {
        message.error(res.data.message || "Subscription failed.");
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


























// const auctionsData = [
//   {
//     id: 1,
//     title: "Vijayawada Lot-1",
//     state: "Andhra Pradesh",
//     category: "Car",
//     date: "Jul 25, 2025",
//     published: "24-07-2025 10:00:00 AM",
//     start: "25-07-2025 09:00:00 AM",
//     end: "27-07-2025 06:00:00 PM",
//     totalVehicles: 12,
//     totalBids: 15,
//     myBids: 0,
//     image: "https://tse1.mm.bing.net/th/id/OIP.X42b4q5g88ldlViDnsLj9QHaEK?pid=Api&P=0&h=180"
//   },
//   {
//     id: 2,
//     title: "Vizag Lot-2",
//     state: "Andhra Pradesh",
//     category: "Bike/2 Wheelers",
//     date: "Jul 28, 2025",
//     published: "27-07-2025 11:00:00 AM",
//     start: "28-07-2025 10:00:00 AM",
//     end: "30-07-2025 05:00:00 PM",
//     totalVehicles: 9,
//     totalBids: 11,
//     myBids: 0,
//     image: "https://tse3.mm.bing.net/th/id/OIP.CmsstI9Sf4OsZPIftUmiSQHaFj?pid=Api&P=0&h=180"
//   },
//   {
//     id: 3,
//     title: "Kochi Lot-1",
//     state: "Kerala",
//     category: "Construction Equipment’s",
//     date: "Jul 26, 2025",
//     published: "25-07-2025 09:00:00 AM",
//     start: "26-07-2025 10:00:00 AM",
//     end: "28-07-2025 04:00:00 PM",
//     totalVehicles: 8,
//     totalBids: 6,
//     myBids: 0,
//     image: "https://tse4.mm.bing.net/th/id/OIP.mixIW9FmVpB2v9Bk241QgQHaEG?pid=Api&P=0&h=180"
//   },
//   {
//     id: 4,
//     title: "Trivandrum Lot-2",
//     state: "Kerala",
//     category: "HCV/LCV",
//     date: "Jul 29, 2025",
//     published: "28-07-2025 10:30:00 AM",
//     start: "29-07-2025 09:00:00 AM",
//     end: "31-07-2025 03:00:00 PM",
//     totalVehicles: 10,
//     totalBids: 14,
//     myBids: 0,
//     image: "https://tse4.mm.bing.net/th/id/OIP.J36CNDhVLjfVg-mvYIe6EAHaDt?pid=Api&P=0&h=180"
//   },
//   {
//     id: 5,
//     title: "Indore Lot-1",
//     state: "Madhya Pradesh",
//     category: "Tractors",
//     date: "Jul 24, 2025",
//     published: "23-07-2025 10:00:00 AM",
//     start: "24-07-2025 09:00:00 AM",
//     end: "26-07-2025 05:00:00 PM",
//     totalVehicles: 13,
//     totalBids: 18,
//     myBids: 0,
//     image: "https://tse4.mm.bing.net/th/id/OIP.nHvUt60D-48BpzF55z3NBAHaFj?pid=Api&P=0&h=180"
//   },
//   {
//     id: 6,
//     title: "Bhopal Lot-2",
//     state: "Madhya Pradesh",
//     category: "Car",
//     date: "Jul 27, 2025",
//     published: "26-07-2025 10:00:00 AM",
//     start: "27-07-2025 10:00:00 AM",
//     end: "29-07-2025 06:00:00 PM",
//     totalVehicles: 9,
//     totalBids: 10,
//     myBids: 0,
//     image: "https://tse1.mm.bing.net/th/id/OIP.w_rdqE8oOcis2s8fut6LGQHaEK?pid=Api&P=0&h=180"
//   },
//   {
//     id: 7,
//     title: "Hyderabad Lot-1",
//     state: "Telangana",
//     category: "Bike/2 Wheelers",
//     date: "Jul 30, 2025",
//     published: "29-07-2025 09:00:00 AM",
//     start: "30-07-2025 10:00:00 AM",
//     end: "01-08-2025 05:00:00 PM",
//     totalVehicles: 11,
//     totalBids: 13,
//     myBids: 0,
//     image: "https://tse4.mm.bing.net/th/id/OIP.ZKDvuHTGTV1FLv3aBnGb2gHaEK?pid=Api&P=0&h=180"
//   },
//   {
//     id: 8,
//     title: "Udaipur Lot-1",
//     state: "Rajasthan",
//     category: "Construction Equipment’s",
//     date: "Jul 31, 2025",
//     published: "30-07-2025 10:00:00 AM",
//     start: "31-07-2025 11:00:00 AM",
//     end: "02-08-2025 04:00:00 PM",
//     totalVehicles: 7,
//     totalBids: 9,
//     myBids: 0,
//     image: "https://tse1.mm.bing.net/th/id/OIP.x9gbNBkJNwDNemQzDuznLQHaEK?pid=Api&P=0&h=180"
//   },
//   {
//     id: 9,
//     title: "Bhubaneswar Lot-1",
//     state: "Orissa",
//     category: "HCV/LCV",
//     date: "Jul 26, 2025",
//     published: "25-07-2025 11:00:00 AM",
//     start: "26-07-2025 10:00:00 AM",
//     end: "28-07-2025 04:00:00 PM",
//     totalVehicles: 7,
//     totalBids: 5,
//     myBids: 0,
//     image: "https://tse1.mm.bing.net/th/id/OIP.POGEGE8X32J5zwVsmEkkPwHaFO?pid=Api&P=0&h=180",
//   },
//   {
//     id: 10,
//     title: "Cuttack Lot-2",
//     state: "Orissa",
//     category: "Tractors",
//     date: "Jul 29, 2025",
//     published: "28-07-2025 12:00:00 PM",
//     start: "29-07-2025 09:00:00 AM",
//     end: "31-07-2025 03:00:00 PM",
//     totalVehicles: 6,
//     totalBids: 4,
//     myBids: 0,
//     image: "https://tse3.mm.bing.net/th/id/OIP.2tW6ABdcdFx5Ha84V3pGQQHaFT?pid=Api&P=0&h=180",
//   },
//   {
//     id: 11,
//     title: "Jaipur Lot-1",
//     state: "Rajasthan",
//     category: "Car",
//     date: "Jul 24, 2025",
//     published: "23-07-2025 03:00:00 PM",
//     start: "24-07-2025 10:00:00 AM",
//     end: "26-07-2025 06:00:00 PM",
//     totalVehicles: 14,
//     totalBids: 20,
//     myBids: 0,
//     image: "https://tse3.mm.bing.net/th/id/OIP.VXhbwWPbcudJ1WbhwQTCIwHaEc?pid=Api&P=0&h=180",
//   },
//   {
//     id: 12,
//     title: "Udaipur Lot-2",
//     state: "Rajasthan",
//     category: "Bike/2 Wheelers",
//     date: "Jul 27, 2025",
//     published: "26-07-2025 04:00:00 PM",
//     start: "27-07-2025 11:00:00 AM",
//     end: "29-07-2025 05:00:00 PM",
//     totalVehicles: 10,
//     totalBids: 8,
//     myBids: 0,
//     image: "https://tse1.mm.bing.net/th/id/OIP.g_fBwQQ74NqqxUU9valV6wHaEo?pid=Api&P=0&h=180",
//   },

//   {
//     id: 13,
//     title: "Hyderabad Lot-1",
//     state: "Telangana",
//     category: "Car",
//     date: "Jul 26, 2025",
//     published: "25-07-2025 10:00:00 AM",
//     start: "26-07-2025 09:00:00 AM",
//     end: "28-07-2025 04:00:00 PM",
//     totalVehicles: 13,

//     totalBids: 17,
//     myBids: 0,
//     image: "https://tse4.mm.bing.net/th/id/OIP.lgL6Pb6es2TmyZa6F5qHmAHaE7?pid=Api&P=0&h=180",
//   },
//   {
//     id: 14,
//     title: "Warangal Lot-2",
//     state: "Telangana",
//     category: "Bike/2 Wheelers",
//     date: "Jul 29, 2025",
//     published: "28-07-2025 10:00:00 AM",
//     start: "29-07-2025 10:00:00 AM",
//     end: "31-07-2025 05:00:00 PM",
//     totalVehicles: 8,
//     totalBids: 9,
//     myBids: 0,
//     image: "https://tse3.mm.bing.net/th/id/OIP.h0svHgYOGB-eHMgIYehsqAHaEo?pid=Api&P=0&h=180",
//   },

//   {
//     id: 15,
//     title: "Kolkata Lot-1",
//     state: "West Bengal",
//     category: "Car",
//     date: "Jul 25, 2025",
//     published: "24-07-2025 11:30:00 AM",
//     start: "25-07-2025 10:00:00 AM",
//     end: "27-07-2025 06:00:00 PM",
//     totalVehicles: 15,
//     totalBids: 22,
//     myBids: 0,
//     image: "https://tse2.mm.bing.net/th/id/OIP.b4bS1jFf5fzQw_GjWYNigwHaE-?pid=Api&P=0&h=180",
//   },
//   {
//     id: 16,
//     title: "Siliguri Lot-2",
//     state: "West Bengal",
//     category: "Bike/2 Wheelers",
//     date: "Jul 28, 2025",
//     published: "27-07-2025 02:00:00 PM",
//     start: "28-07-2025 11:00:00 AM",
//     end: "30-07-2025 05:00:00 PM",
//     totalVehicles: 9,
//     totalBids: 13,
//     myBids: 0,
//     image: "https://tse4.mm.bing.net/th/id/OIP.ZKDvuHTGTV1FLv3aBnGb2gHaEK?pid=Api&P=0&h=180",
//   },
//   {
//     id: 17,
//     title: "Nagpur Lot-3",
//     state: "Maharashtra",
//     category: "HCV/LCV",
//     date: "Jul 30, 2025",
//     published: "29-07-2025 10:00:00 AM",
//     start: "30-07-2025 09:00:00 AM",
//     end: "01-08-2025 06:00:00 PM",
//     totalVehicles: 10,
//     totalBids: 13,
//     myBids: 0,
//     image: "https://tse2.mm.bing.net/th/id/OIP.l-hnqA3HmCTuCDllY5PTswHaFH?pid=Api&P=0&h=180"
//   },
//   {
//     id: 18,
//     title: "Raipur Lot-2",
//     state: "Chhattisgarh",
//     category: "Tractors",
//     date: "Jul 31, 2025",
//     published: "30-07-2025 11:00:00 AM",
//     start: "31-07-2025 09:00:00 AM",
//     end: "02-08-2025 06:00:00 PM",
//     totalVehicles: 7,
//     totalBids: 9,
//     myBids: 0,
//     image: "https://tse1.mm.bing.net/th/id/OIP.PX-kOMdZF84Qm0MHGOzJTwHaFG?pid=Api&P=0&h=180"
//   },
//   {
//     id: 19,
//     title: "Bangalore Lot-4",
//     state: "Karnataka",
//     category: "Bike/2 Wheelers",
//     date: "Aug 01, 2025",
//     published: "31-07-2025 12:00:00 PM",
//     start: "01-08-2025 10:00:00 AM",
//     end: "03-08-2025 05:00:00 PM",
//     totalVehicles: 15,
//     totalBids: 20,
//     myBids: 0,
//     image: "https://tse3.mm.bing.net/th/id/OIP.dSyheQuHr-YnOewMtItETwHaFe?pid=Api&P=0&h=180"
//   },
//   {
//     id: 20,
//     title: "Surat Lot-5",
//     state: "Gujarat",
//     category: "HCV/LCV",
//     date: "Aug 02, 2025",
//     published: "01-08-2025 09:00:00 AM",
//     start: "02-08-2025 10:00:00 AM",
//     end: "04-08-2025 05:00:00 PM",
//     totalVehicles: 11,
//     totalBids: 14,
//     myBids: 0,
//     image: "https://tse4.mm.bing.net/th/id/OIP.swELERI0nCXykTcnWmvDFQHaDp?pid=Api&P=0&h=180"
//   },
//   {
//     id: 21,
//     title: "Ahmedabad Lot-6",
//     state: "Gujarat",
//     category: "HCV/LCV",
//     date: "Aug 03, 2025",
//     published: "02-08-2025 10:00:00 AM",
//     start: "03-08-2025 09:30:00 AM",
//     end: "05-08-2025 04:30:00 PM",
//     totalVehicles: 8,
//     totalBids: 12,
//     myBids: 0,
//     image: "https://tse1.mm.bing.net/th/id/OIP.A93v6PqTWhDfL4E1eE4pvQHaEZ?pid=Api&P=0&h=180"
//   }
//   ,
//   {
//     id: 24,
//     title: "Chennai Lot-3",
//     state: "Tamil Nadu",
//     category: "Bike/2 Wheelers",
//     date: "Aug 02, 2025",
//     published: "01-08-2025 09:00:00 AM",
//     start: "02-08-2025 10:00:00 AM",
//     end: "04-08-2025 04:00:00 PM",
//     totalVehicles: 17,
//     totalBids: 19,
//     myBids: 0,
//     image: "https://tse4.mm.bing.net/th/id/OIP.6l4LL73hJ08omlELqHgEFgHaE8?pid=Api&P=0&h=180"
//   },
// ];
