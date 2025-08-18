'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Car } from 'lucide-react';
import { useRouter } from 'next/navigation';
import {
  loadCaptchaEnginge,
  LoadCanvasTemplate,
  validateCaptcha,
} from 'react-simple-captcha';
import { loginWithOtp, sendOtp } from '@/services/AuthServices/AuthApiFunction';
import { useAuth } from '@/context/AuthContext';
import toast, { Toaster } from 'react-hot-toast';

export default function LoginPage() {
  const [captchaInput, setCaptchaInput] = useState('');
  const [formData, setFormData] = useState({ phone: '', otp: '' });
  const [otpSent, setOtpSent] = useState(false);
  const [resendDisabled, setResendDisabled] = useState(true);
  const [timer, setTimer] = useState(0);
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const { login } = useAuth();

  useEffect(() => {
    loadCaptchaEnginge(6);
  }, []);

  useEffect(() => {
    let countdown;
    if (timer > 0) {
      countdown = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    } else if (timer === 0 && otpSent) {
      setResendDisabled(false);
    }
    return () => clearInterval(countdown);
  }, [timer, otpSent]);

  const handleSendOtp = async () => {
    if (!formData.phone.match(/^\d{10}$/)) {
      toast.error('Please enter a valid 10-digit phone number.');
      return;
    }

    try {
      setLoading(true);
      const res = await sendOtp(formData.phone);
      if (res.data.success) {
        toast.success(`Your OTP has been sent to +91-${formData.phone}`);
        setOtpSent(true);
        setResendDisabled(true);
        setTimer(60);
      } else {
        toast.error(res.message || 'Failed to send OTP');
      }
    } catch (err) {
      toast.error(err.message || 'Error sending OTP');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateCaptcha(captchaInput)) {
      toast.error('Captcha is incorrect');
      setCaptchaInput('');
      loadCaptchaEnginge(6);
      return;
    }

    if (!formData.phone || !formData.otp) {
      toast.error('Please fill all fields');
      return;
    }

    try {
      setLoading(true);
      const res = await loginWithOtp({
        userName: formData.phone,
        otp: formData.otp,
      });

      if (res.data.success) {
        login({
          user: res.data.data.user,
          token: res.data.data.token,
          kyc: res.data.data.kyc,
          subscription: res.data.data.subscription,
        });
        toast.success('Login successful!');
        router.push('/dashboard/buyer');
      } else {
        toast.error(res.data.message || 'Invalid OTP');
      }
    } catch (err) {
      toast.error(err.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-white dark:from-gray-900 dark:via-black dark:to-gray-800 text-black dark:text-white px-4 py-8">
        <div className="w-full max-w-md bg-white/50 dark:bg-white/10 backdrop-blur-xl rounded-2xl shadow-xl p-6 border border-gray-300 dark:border-gray-700 space-y-5">
          <div className="text-center">
            <Car className="mx-auto h-8 w-8 text-white p-2 bg-gradient-to-r from-blue-500 to-fuchsia-500 rounded-full shadow-lg animate-pulse" />
            <h1 className="mt-4 text-3xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              AutoBid Login
            </h1>
            <p className="text-sm text-gray-600 dark:text-gray-300">Secure login to explore luxury auctions</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Mobile Number */}
            <div>
              <label className="text-sm text-gray-700 dark:text-gray-300 mb-1 block">Mobile Number</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  required
                  maxLength={10}
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value.replace(/[^0-9]/g, '') })
                  }
                  placeholder="Enter 10-digit phone"
                  className="w-full px-4 py-3 rounded-xl bg-white dark:bg-white/10 text-black dark:text-white border border-gray-300 dark:border-gray-600"
                />
                <button
                  type="button"
                  disabled={otpSent && resendDisabled}
                  onClick={handleSendOtp}
                  className={`px-3 py-2 text-xs rounded-xl transition-transform shadow 
                    ${(otpSent && resendDisabled) || loading
                      ? 'bg-gray-300 dark:bg-gray-700 cursor-not-allowed'
                      : 'bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:scale-105'
                    }`}
                >
                  {loading ? 'Sending...' : otpSent ? (timer > 0 ? `Wait ${timer}s` : 'Resend OTP') : 'Send OTP'}
                </button>
              </div>
            </div>

            {/* OTP */}
            <div>
              <label className="text-sm text-gray-700 dark:text-gray-300 mb-1 block">OTP</label>
              <input
                type="text"
                required
                maxLength={6}
                value={formData.otp}
                onChange={(e) =>
                  setFormData({ ...formData, otp: e.target.value.replace(/[^0-9]/g, '') })
                }
                placeholder="Enter OTP"
                className="w-full px-4 py-3 rounded-xl bg-white dark:bg-white/10 text-black dark:text-white border border-gray-300 dark:border-gray-600"
              />
            </div>

            {/* Captcha */}
            <div>
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">Captcha *</label>
              <LoadCanvasTemplate reloadText={false} />
              <input
                type="text"
                required
                value={captchaInput}
                onChange={(e) => setCaptchaInput(e.target.value)}
                placeholder="Enter Captcha"
                className="w-full mt-3 px-4 py-3 rounded-xl bg-white dark:bg-white/10 text-black dark:text-white border border-gray-300 dark:border-gray-600"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white rounded-xl font-semibold shadow-md hover:shadow-xl hover:scale-[1.02] transition-all"
            >
              {loading ? 'Logging in...' : 'Sign In'}
            </button>
          </form>

          <div className="text-center text-sm text-gray-600 dark:text-gray-400">
            Don't have an account?{' '}
            <Link href="/register" className="text-blue-500 hover:underline font-medium">
              Register here
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}



// 'use client';

// import { useEffect, useState } from 'react';
// import Link from 'next/link';
// import { Car } from 'lucide-react';
// import { useRouter } from 'next/navigation';
// // import { useAuth } from '../../context/AuthContext';
// // import { sendOtp, loginWithOtp } from '../../services/auth/AuthService';
// import {
//   loadCaptchaEnginge,
//   LoadCanvasTemplate,
//   validateCaptcha,
// } from 'react-simple-captcha';
// import { loginWithOtp, sendOtp } from '@/services/AuthServices/AuthApiFunction';
// import { useAuth } from '@/context/AuthContext';

// export default function LoginPage() {
//   const [captchaInput, setCaptchaInput] = useState('');
//   const [formData, setFormData] = useState({
//     phone: '',
//     otp: '',
//   });

//   const [otpSent, setOtpSent] = useState(false);
//   const [resendDisabled, setResendDisabled] = useState(true);
//   const [timer, setTimer] = useState(0);
//   const [loading, setLoading] = useState(false);

//   const router = useRouter();
//   const { login } = useAuth();;

//   useEffect(() => {
//     loadCaptchaEnginge(6);
//   }, []);

//   useEffect(() => {
//     let countdown;
//     if (timer > 0) {
//       countdown = setInterval(() => {
//         setTimer((prev) => prev - 1);
//       }, 1000);
//     } else if (timer === 0 && otpSent) {
//       setResendDisabled(false);
//     }
//     return () => clearInterval(countdown);
//   }, [timer, otpSent]);







//   const handleSendOtp = async () => {
//     if (!formData.phone.match(/^\d{10}$/)) {
//       alert('Please enter a valid 10-digit phone number.');
//       return;
//     }

//     try {
//       setLoading(true);
//       const res = await sendOtp(formData.phone);
//       console.log('OTP Response:', res);
//       if (res.data.success) {
//         alert(`Your OTP has been sent to +91-${formData.phone}`);
//         setOtpSent(true);
//         setResendDisabled(true);
//         setTimer(60);
//       } else {
//         alert(res.message || 'Failed to send OTP');
//       }
//     } catch (err) {
//       alert(err.message || 'Error sending OTP');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleResendOtp = () => {
//     handleSendOtp();
//   };








//   const handleSubmit = async (e) => {
//   e.preventDefault();

//   if (!validateCaptcha(captchaInput)) {
//     alert('Captcha is incorrect');
//     setCaptchaInput('');
//     loadCaptchaEnginge(6);
//     return;
//   }

//   if (!formData.phone || !formData.otp) {
//     alert('Please fill all fields');
//     return;
//   }

//   try {
//     setLoading(true);
//     const res = await loginWithOtp({
//       userName: formData.phone,
//       otp: formData.otp,
//     });

//     console.log('Login Response:', res);

//     if (res.data.success) {  
//       login({
//         user: res.data.data.user,
//         token: res.data.data.token,
//          kyc: res.data.data.kyc,            // add this
//   subscription: res.data.data.subscription, 
//       });
//       router.push('/dashboard/buyer');
//     } else {
//       alert(res.data.message || 'Invalid OTP');
//     }
//   } catch (err) {
//     alert(err.message || 'Login failed');
//   } finally {
//     setLoading(false);
//   }
// };


//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-white dark:from-gray-900 dark:via-black dark:to-gray-800 text-black dark:text-white px-4 py-8">
//       <div className="w-full max-w-md bg-white/50 dark:bg-white/10 backdrop-blur-xl rounded-2xl shadow-xl p-6 border border-gray-300 dark:border-gray-700 space-y-5">
//         <div className="text-center">
//           <Car className="mx-auto h-8 w-8 text-white p-2 bg-gradient-to-r from-blue-500 to-fuchsia-500 rounded-full shadow-lg animate-pulse" />
//           <h1 className="mt-4 text-3xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
//             AutoBid Login
//           </h1>
//           <p className="text-sm text-gray-600 dark:text-gray-300">Secure login to explore luxury auctions</p>
//         </div>

//         <form onSubmit={handleSubmit} className="space-y-4">
//           {/* Mobile Number */}
//           <div>
//             <label className="text-sm text-gray-700 dark:text-gray-300 mb-1 block">Mobile Number</label>
//             <div className="flex gap-2">
//               <input
//                 type="text"
//                 required
//                 maxLength={10}
//                 value={formData.phone}
//                 onChange={(e) => {
//                   const onlyNums = e.target.value.replace(/[^0-9]/g, '');
//                   setFormData({ ...formData, phone: onlyNums });
//                 }}
//                 placeholder="Enter 10-digit phone"
//                 className="w-full px-4 py-3 rounded-xl bg-white dark:bg-white/10 text-black dark:text-white border border-gray-300 dark:border-gray-600"
//               />
//               <button
//                 type="button"
//                 disabled={otpSent && resendDisabled}
//                 onClick={handleSendOtp}
//                 className={`px-3 py-2 text-xs rounded-xl transition-transform shadow 
//                   ${(otpSent && resendDisabled) || loading
//                     ? 'bg-gray-300 dark:bg-gray-700 cursor-not-allowed'
//                     : 'bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:scale-105'
//                   }`}
//               >
//                 {loading ? 'Sending...' : otpSent ? (timer > 0 ? `Wait ${timer}s` : 'Resend OTP') : 'Send OTP'}
//               </button>
//             </div>
//           </div>

//           {/* OTP */}
//           <div>
//             <label className="text-sm text-gray-700 dark:text-gray-300 mb-1 block">OTP</label>
//             <input
//               type="text"
//               required
//               maxLength={6}
//               value={formData.otp}
//               onChange={(e) => {
//                 const value = e.target.value.replace(/[^0-9]/g, '');
//                 setFormData({ ...formData, otp: value });
//               }}
//               placeholder="Enter OTP"
//               className="w-full px-4 py-3 rounded-xl bg-white dark:bg-white/10 text-black dark:text-white border border-gray-300 dark:border-gray-600"
//             />
//           </div>

//           {/* Captcha */}
//           <div>
//             <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">Captcha *</label>
//             <LoadCanvasTemplate reloadText={false} />
//             <input
//               type="text"
//               required
//               value={captchaInput}
//               onChange={(e) => setCaptchaInput(e.target.value)}
//               placeholder="Enter Captcha"
//               className="w-full mt-3 px-4 py-3 rounded-xl bg-white dark:bg-white/10 text-black dark:text-white border border-gray-300 dark:border-gray-600"
//             />
//           </div>

//           <button
//             type="submit"
//             disabled={loading}
//             className="w-full py-3 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white rounded-xl font-semibold shadow-md hover:shadow-xl hover:scale-[1.02] transition-all"
//           >
//             {loading ? 'Logging in...' : 'Sign In'}
//           </button>
//         </form>

//         <div className="text-center text-sm text-gray-600 dark:text-gray-400">
//           Don't have an account?{' '}
//           <Link href="/register" className="text-blue-500 hover:underline font-medium">
//             Register here
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// }
