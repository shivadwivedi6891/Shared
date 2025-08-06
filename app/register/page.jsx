
'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Car, RefreshCcw } from 'lucide-react';
import {
  LoadCanvasTemplate,
  loadCaptchaEnginge,
  validateCaptcha,
} from 'react-simple-captcha';

const indianStates = [
  'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh',
  'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand',
  'Karnataka', 'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur',
  'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Punjab',
  'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura',
  'Uttar Pradesh', 'Uttarakhand', 'West Bengal', 'Andaman and Nicobar Islands',
  'Chandigarh', 'Dadra and Nagar Haveli and Daman and Diu', 'Delhi',
  'Jammu and Kashmir', 'Ladakh', 'Lakshadweep', 'Puducherry',
];

const citiesByState = {
  'Andhra Pradesh': ['Vijayawada', 'Visakhapatnam', 'Guntur', 'Tirupati'],
  'Arunachal Pradesh': ['Itanagar', 'Tawang', 'Ziro', 'Pasighat'],
  'Assam': ['Guwahati', 'Silchar', 'Dibrugarh', 'Jorhat'],
  'Bihar': ['Patna', 'Gaya', 'Muzaffarpur', 'Bhagalpur'],
  'Chhattisgarh': ['Raipur', 'Bilaspur', 'Durg', 'Korba'],
  'Goa': ['Panaji', 'Margao', 'Vasco da Gama', 'Mapusa'],
  'Gujarat': ['Ahmedabad', 'Surat', 'Vadodara', 'Rajkot'],
  'Haryana': ['Gurugram', 'Faridabad', 'Panipat', 'Ambala'],
  'Himachal Pradesh': ['Shimla', 'Dharamshala', 'Mandi', 'Solan'],
  'Jharkhand': ['Ranchi', 'Jamshedpur', 'Dhanbad', 'Bokaro'],
  'Karnataka': ['Bengaluru', 'Mysuru', 'Mangalore', 'Hubli'],
  'Kerala': ['Thiruvananthapuram', 'Kochi', 'Kozhikode', 'Thrissur'],
  'Madhya Pradesh': ['Bhopal', 'Indore', 'Gwalior', 'Jabalpur'],
  'Maharashtra': ['Mumbai', 'Pune', 'Nagpur', 'Nashik'],
  'Manipur': ['Imphal', 'Bishnupur', 'Thoubal', 'Kakching'],
  'Meghalaya': ['Shillong', 'Tura', 'Jowai', 'Baghmara'],
  'Mizoram': ['Aizawl', 'Lunglei', 'Champhai', 'Serchhip'],
  'Nagaland': ['Kohima', 'Dimapur', 'Mokokchung', 'Tuensang'],
  'Odisha': ['Bhubaneswar', 'Cuttack', 'Rourkela', 'Puri'],
  'Punjab': ['Ludhiana', 'Amritsar', 'Jalandhar', 'Patiala'],
  'Rajasthan': ['Jaipur', 'Jodhpur', 'Udaipur', 'Kota'],
  'Sikkim': ['Gangtok', 'Namchi', 'Gyalshing', 'Mangan'],
  'Tamil Nadu': ['Chennai', 'Coimbatore', 'Madurai', 'Tiruchirappalli'],
  'Telangana': ['Hyderabad', 'Warangal', 'Nizamabad', 'Karimnagar'],
  'Tripura': ['Agartala', 'Udaipur', 'Dharmanagar', 'Kailasahar'],
  'Uttar Pradesh': ['Lucknow', 'Kanpur', 'Varanasi', 'Agra'],
  'Uttarakhand': ['Dehradun', 'Haridwar', 'Nainital', 'Haldwani'],
  'West Bengal': ['Kolkata', 'Howrah', 'Asansol', 'Siliguri'],
  'Andaman and Nicobar Islands': ['Port Blair', 'Mayabunder', 'Diglipur', 'Hut Bay'],
  'Chandigarh': ['Chandigarh'],
  'Dadra and Nagar Haveli and Daman and Diu': ['Daman', 'Diu', 'Silvassa'],
  'Delhi': ['New Delhi', 'Dwarka', 'Rohini', 'Saket'],
  'Jammu and Kashmir': ['Srinagar', 'Jammu', 'Anantnag', 'Baramulla'],
  'Ladakh': ['Leh', 'Kargil'],
  'Lakshadweep': ['Kavaratti', 'Agatti', 'Minicoy'],
  'Puducherry': ['Puducherry', 'Karaikal', 'Mahe', 'Yanam'],
};

export default function RegisterPage() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    fullName: '',
    mobile: '',
    email: '',
    address: '',
    state: '',
    city: '',
    pincode: '',
  });

  const [captchaInput, setCaptchaInput] = useState('');
  const [availableCities, setAvailableCities] = useState([]);
  const [showOtpModal, setShowOtpModal] = useState(false);
  const [otpInput, setOtpInput] = useState('');
  const [otpError, setOtpError] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [resendTimer, setResendTimer] = useState(0);

  useEffect(() => {
    loadCaptchaEnginge(6);
  }, []);

  useEffect(() => {
    let timer;
    if (resendTimer > 0) {
      timer = setInterval(() => {
        setResendTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [resendTimer]);

  const handleStateChange = (state) => {
    setFormData({ ...formData, state, city: '' });
    setAvailableCities(citiesByState[state] || []);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateCaptcha(captchaInput)) {
      alert('Invalid Captcha!');
      return;
    }
    setOtpInput('');
    setOtpError(false);
    setOtpSent(true);
    setShowOtpModal(true);
    setResendTimer(60);
    alert('OTP sent!');
  };

  const handleVerifyOtp = () => {
    if (/^\d{6}$/.test(otpInput)) {
      router.push('/login');
    } else {
      setOtpError(true);
    }
  };

  const handleResendOtp = () => {
    setOtpSent(true);
    setOtpInput('');
    setOtpError(false);
    setResendTimer(60);
    alert('OTP resent!');
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
      <div className="w-full md:w-1/2 flex items-center justify-center px-4 sm:px-8 md:px-12 py-12">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <div className="p-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full shadow-md">
                <Car className="h-8 w-8 text-white" />
              </div>
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold">Register Now</h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1 text-sm">
              Join AutoBid to start buying and selling
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input required type="text" value={formData.fullName} onChange={(e) => setFormData({ ...formData, fullName: e.target.value })} placeholder="Full Name" className="w-full px-3 py-2 border rounded-lg" />

            <input
              required
              type="tel"
              pattern="[0-9]{10}"
              maxLength={10}
              value={formData.mobile}
              onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
              onKeyDown={(e) => {
                if (!/[0-9]/.test(e.key) && !['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'Tab'].includes(e.key)) {
                  e.preventDefault();
                }
              }}
              placeholder="Mobile Number"
              className="w-full px-3 py-2 border rounded-lg"
            />

            <input required type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} placeholder="Email" className="w-full px-3 py-2 border rounded-lg" />
            <input required type="text" value={formData.address} onChange={(e) => setFormData({ ...formData, address: e.target.value })} placeholder="Address" className="w-full px-3 py-2 border rounded-lg" />

            <select required value={formData.state} onChange={(e) => handleStateChange(e.target.value)} className="w-full px-3 py-2 border rounded-lg">
              <option value="">--Select State--</option>
              {indianStates.map((state) => <option key={state} value={state}>{state}</option>)}
            </select>

            <select required value={formData.city} onChange={(e) => setFormData({ ...formData, city: e.target.value })} className="w-full px-3 py-2 border rounded-lg">
              <option value="">--Select City--</option>
              {availableCities.map((city) => <option key={city} value={city}>{city}</option>)}
            </select>

            <input
              required
              type="text"
              pattern="[0-9]{6}"
              maxLength={6}
              value={formData.pincode}
              onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
              onKeyDown={(e) => {
                if (!/[0-9]/.test(e.key) && !['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'Tab'].includes(e.key)) {
                  e.preventDefault();
                }
              }}
              placeholder="Pincode"
              className="w-full px-3 py-2 border rounded-lg"
            />

            <div>
              <LoadCanvasTemplate />
              <div className="flex items-center gap-2 mt-2">
                <input
                  type="text"
                  required
                  value={captchaInput}
                  onChange={(e) => setCaptchaInput(e.target.value)}
                  placeholder="Enter Captcha"
                  className="w-full px-3 py-2 border rounded-lg"
                />
                <button type="button" onClick={() => loadCaptchaEnginge(6)}>
                  <RefreshCcw className="h-5 w-5" />
                </button>
              </div>
            </div>

            <button type="submit" className="w-full py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold">
              Register
            </button>
          </form>

          <div className="mt-4 text-center text-sm text-gray-600 dark:text-gray-400">
            Already have an account? <Link href="/login" className="text-blue-600 hover:underline">Sign in</Link>
          </div>
        </div>
      </div>

      <div className="hidden md:block md:w-1/2 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/70 via-black/40 to-transparent" />
        <div className="absolute top-1/3 left-8 text-white max-w-xs animate-fadeSlide">
          <h2 className="text-3xl font-extrabold mb-3">Fast Lane Access</h2>
          <p>Create your account and take the driver’s seat in online car auctions.</p>
        </div>
      </div>

      {showOtpModal && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-xl w-11/12 max-w-sm relative">
            <button
              onClick={() => setShowOtpModal(false)}
              className="absolute top-2 right-2 text-gray-500 hover:text-red-600"
              aria-label="Close"
            >
              ✕
            </button>

            <h2 className="text-xl font-bold mb-4 text-center">Verify OTP</h2>

            <input
              type="text"
              value={otpInput}
              onChange={(e) => {
                const value = e.target.value.replace(/\D/g, '');
                if (value.length <= 6) {
                  setOtpInput(value);
                  setOtpError(false);
                }
              }}
              placeholder="Enter 6-digit OTP"
              maxLength={6}
              className="w-full px-4 py-2 border rounded-lg mb-2 dark:bg-gray-700 dark:border-gray-600"
            />

            {otpError && (
              <p className="text-red-500 text-sm mb-2">Invalid OTP. Please try again.</p>
            )}

            <button
              onClick={handleVerifyOtp}
              disabled={otpInput.length !== 6}
              className={`w-full py-2 rounded-lg font-semibold mb-2 ${
                otpInput.length === 6
                  ? 'bg-blue-600 text-white hover:bg-blue-700'
                  : 'bg-gray-400 text-white cursor-not-allowed'
              }`}
            >
              Verify
            </button>

            {resendTimer > 0 ? (
              <p className="text-center text-gray-500 text-sm">Resend OTP in {resendTimer} seconds</p>
            ) : (
              <button
                onClick={handleResendOtp}
                className="w-full py-2 text-sm text-blue-600 hover:underline"
              >
                Resend OTP
              </button>
            )}
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes fadeSlide {
          0% { opacity: 0; transform: translateY(20px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeSlide {
          animation: fadeSlide 1.5s ease-out forwards;
        }
      `}</style>
    </div>
  );
}