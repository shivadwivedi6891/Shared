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

const cities = ['Mumbai', 'Delhi', 'Bengaluru', 'Chennai', 'Kolkata', 'Hyderabad', 'Pune', 'Ahmedabad'];
const pincodes = ['110001', '400001', '560001', '600001', '700001', '500001', '411001', '380001'];

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

  useEffect(() => {
    loadCaptchaEnginge(6);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateCaptcha(captchaInput)) {
      alert('Invalid Captcha!');
      return;
    }

    router.push('/otp');
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
            {[{ label: 'Full Name', name: 'fullName', type: 'text', required: true },
              { label: 'Mobile', name: 'mobile', type: 'tel', pattern: '[0-9]{10}', maxLength: 10, required: true },
              { label: 'E-mail', name: 'email', type: 'email', required: true },
              { label: 'Address', name: 'address', type: 'text', required: true },
            ].map((field) => (
              <div key={field.name}>
                <label className="block text-sm font-medium mb-1">
                  {field.label} {field.required && <span className="text-red-500">*</span>}
                </label>
                <input
                  type={field.type}
                  name={field.name}
                  pattern={field.pattern}
                  maxLength={field.maxLength}
                  required={field.required}
                  value={formData[field.name]}
                  onChange={(e) => setFormData({ ...formData, [field.name]: e.target.value })}
                  placeholder={field.label}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 text-black dark:text-white placeholder-gray-400 dark:placeholder-white/50"
                />
              </div>
            ))}

            {/* State */}
            <div>
              <label className="block text-sm font-medium mb-1">
                State <span className="text-red-500">*</span>
              </label>
              <select
                required
                value={formData.state}
                onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 text-black dark:text-white"
              >
                <option value="">--Select State--</option>
                {indianStates.map((state) => (
                  <option key={state} value={state}>{state}</option>
                ))}
              </select>
            </div>

            {/* City */}
            <div>
              <label className="block text-sm font-medium mb-1">
                City <span className="text-red-500">*</span>
              </label>
              <select
                required
                value={formData.city}
                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 text-black dark:text-white"
              >
                <option value="">--Select City--</option>
                {cities.map((city) => (
                  <option key={city} value={city}>{city}</option>
                ))}
              </select>
            </div>

            {/* Pincode */}
            <div>
              <label className="block text-sm font-medium mb-1">
                Pincode <span className="text-red-500">*</span>
              </label>
              <select
                required
                value={formData.pincode}
                onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 text-black dark:text-white"
              >
                <option value="">--Select Pincode--</option>
                {pincodes.map((pincode) => (
                  <option key={pincode} value={pincode}>{pincode}</option>
                ))}
              </select>
            </div>

            {/* Captcha */}
            <div>
              <label className="text-sm font-medium mb-2 block">
                Captcha <span className="text-red-500">*</span>
              </label>
              <div className="flex items-center gap-3">
                <LoadCanvasTemplate />
                <button
                  type="button"
                  onClick={() => loadCaptchaEnginge(6)}
                  className="text-yellow hover:text-red-400 bg-white/10 border border-gray-600 p-2 rounded-full shadow"
                  title="Refresh Captcha"
                >
                  <RefreshCcw className="h-5 w-5" />
                </button>
              </div>
              <input
                type="text"
                required
                value={captchaInput}
                onChange={(e) => setCaptchaInput(e.target.value)}
                placeholder="Enter Captcha"
                className="w-full mt-3 px-4 py-3 rounded-xl bg-white/10 text-black dark:text-white border border-gray-600 placeholder-gray-400 dark:placeholder-white/50"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold hover:from-purple-600 hover:to-pink-600 transition-all shadow-md hover:shadow-xl"
            >
              Register
            </button>
          </form>

          <div className="mt-6 text-center text-sm text-gray-600 dark:text-gray-400">
            Already have an account?{' '}
            <Link href="/login" className="text-blue-600 hover:underline font-medium">
              Sign in here
            </Link>
          </div>
        </div>
      </div>

      <div className="hidden md:block md:w-1/2 relative overflow-hidden">
        <img
          src="https://images.pexels.com/photos/170812/pexels-photo-170812.jpeg"
          alt="Urban night drive"
          className="w-full h-full object-cover transform scale-110 brightness-90"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/70 via-black/40 to-transparent" />
        <div className="absolute top-1/3 left-8 text-white max-w-xs animate-fadeSlide">
          <h2 className="text-3xl font-extrabold mb-3 leading-tight tracking-wide drop-shadow-xl">
            Fast Lane Access
          </h2>
          <p className="text-base text-gray-300">
            Create your account and take the driver’s seat in the world of premium online car auctions.
          </p>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeSlide {
          0% {
            opacity: 0;
            transform: translateY(20px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeSlide {
          animation: fadeSlide 1.5s ease-out forwards;
        }
      `}</style>
    </div>
  );
}








// 'use client';

// import { useState, useEffect } from 'react';
// import { useRouter } from 'next/navigation';
// import Link from 'next/link';
// import { Car, RefreshCcw } from 'lucide-react';
// import {
//   LoadCanvasTemplate,
//   loadCaptchaEnginge,
//   validateCaptcha,
// } from 'react-simple-captcha';

// const indianStates = [
//   'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh',
//   'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand',
//   'Karnataka', 'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur',
//   'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Punjab',
//   'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura',
//   'Uttar Pradesh', 'Uttarakhand', 'West Bengal', 'Andaman and Nicobar Islands',
//   'Chandigarh', 'Dadra and Nagar Haveli and Daman and Diu', 'Delhi',
//   'Jammu and Kashmir', 'Ladakh', 'Lakshadweep', 'Puducherry',
// ];

// export default function RegisterPage() {
//   const router = useRouter();

//   const [formData, setFormData] = useState({
//     fullName: '',
//     mobile: '',
//     email: '',
//     address: '',
//     state: '',
//   });

//   const [captchaInput, setCaptchaInput] = useState('');

//   useEffect(() => {
//     loadCaptchaEnginge(6);
//   }, []);

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (!validateCaptcha(captchaInput)) {
//       alert('Invalid Captcha!');
//       return;
//     }

//     // alert('Form submitted successfully!');
//     router.push('/otp');
//   };

//   return (
//     <div className="min-h-screen flex flex-col md:flex-row bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
//       {/* Form Section */}
//       <div className="w-full md:w-1/2 flex items-center justify-center px-4 sm:px-8 md:px-12 py-12">
//         <div className="w-full max-w-md">
//           <div className="text-center mb-8">
//             <div className="flex justify-center mb-4">
//               <div className="p-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full shadow-md">
//                 <Car className="h-8 w-8 text-white" />
//               </div>
//             </div>
//             <h1 className="text-3xl sm:text-4xl font-bold">Register Now</h1>
//             <p className="text-gray-600 dark:text-gray-400 mt-1 text-sm">
//               Join AutoBid to start buying and selling
//             </p>
//           </div>

//           <form onSubmit={handleSubmit} className="space-y-4">
//             {[{ label: 'Full Name', name: 'fullName', type: 'text', required: true },
//               { label: 'Mobile', name: 'mobile', type: 'tel', pattern: '[0-9]{10}', maxLength: 10, required: true },
//               { label: 'E-mail', name: 'email', type: 'email', required: true },
//               { label: 'Address', name: 'address', type: 'text', required: true },
//             ].map((field) => (
//               <div key={field.name}>
//                 <label className="block text-sm font-medium mb-1">
//                   {field.label} {field.required && <span className="text-red-500">*</span>}
//                 </label>
//                 <input
//                   type={field.type}
//                   name={field.name}
//                   pattern={field.pattern}
//                   maxLength={field.maxLength}
//                   required={field.required}
//                   value={formData[field.name]}
//                   onChange={(e) => setFormData({ ...formData, [field.name]: e.target.value })}
//                   placeholder={field.label}
//                   className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 text-black dark:text-white placeholder-gray-400 dark:placeholder-white/50"
//                 />
//               </div>
//             ))}

//             <div>
//               <label className="block text-sm font-medium mb-1">
//                 State <span className="text-red-500">*</span>
//               </label>
//               <select
//                 required
//                 value={formData.state}
//                 onChange={(e) => setFormData({ ...formData, state: e.target.value })}
//                 className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 text-black dark:text-white"
//               >
//                 <option value="">--Select State--</option>
//                 {indianStates.map((state) => (
//                   <option key={state} value={state}>{state}</option>
//                 ))}
//               </select>
//             </div>

//             <div>
//               <label className="text-sm font-medium mb-2 block">
//                 Captcha <span className="text-red-500">*</span>
//               </label>
//               <div className="flex items-center gap-3">
//                 <LoadCanvasTemplate />
//                 <button
//                   type="button"
//                   onClick={() => loadCaptchaEnginge(6)}
//                   className="text-yellow hover:text-red-400 bg-white/10 border border-gray-600 p-2 rounded-full shadow"
//                   title="Refresh Captcha"
//                 >
//                   <RefreshCcw className="h-5 w-5" />
//                 </button>
//               </div>
//               <input
//                 type="text"
//                 required
//                 value={captchaInput}
//                 onChange={(e) => setCaptchaInput(e.target.value)}
//                 placeholder="Enter Captcha"
//                 className="w-full mt-3 px-4 py-3 rounded-xl bg-white/10 text-black dark:text-white border border-gray-600 placeholder-gray-400 dark:placeholder-white/50"
//               />
//             </div>

//             <button
//               type="submit"
//               className="w-full py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold hover:from-purple-600 hover:to-pink-600 transition-all shadow-md hover:shadow-xl"
//             >
//               Register
//             </button>
//           </form>

//           <div className="mt-6 text-center text-sm text-gray-600 dark:text-gray-400">
//             Already have an account?{' '}
//             <Link href="/login" className="text-blue-600 hover:underline font-medium">
//               Sign in here
//             </Link>
//           </div>
//         </div>
//       </div>

//       {/* Image Side */}
//       <div className="hidden md:block md:w-1/2 relative overflow-hidden">
//         <img
//           src="https://images.pexels.com/photos/170812/pexels-photo-170812.jpeg"
//           alt="Urban night drive"
//           className="w-full h-full object-cover transform scale-110 brightness-90"
//         />
//         <div className="absolute inset-0 bg-gradient-to-br from-purple-900/70 via-black/40 to-transparent" />
//         <div className="absolute top-1/3 left-8 text-white max-w-xs animate-fadeSlide">
//           <h2 className="text-3xl font-extrabold mb-3 leading-tight tracking-wide drop-shadow-xl">
//             Fast Lane Access
//           </h2>
//           <p className="text-base text-gray-300">
//             Create your account and take the driver’s seat in the world of premium online car auctions.
//           </p>
//         </div>
//       </div>

//       <style jsx>{`
//         @keyframes fadeSlide {
//           0% {
//             opacity: 0;
//             transform: translateY(20px);
//           }
//           100% {
//             opacity: 1;
//             transform: translateY(0);
//           }
//         }
//         .animate-fadeSlide {
//           animation: fadeSlide 1.5s ease-out forwards;
//         }
//       `}</style>
//     </div>
//   );
// }
