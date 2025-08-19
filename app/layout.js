

'use client';
import React, { useEffect, useState } from 'react';

import './globals.css'; // your global styles


// import './globals.css';
import { Inter } from 'next/font/google';

import { Toaster } from 'react-hot-toast';
import Footer from '@/components/footer';
import { AuthProvider, useAuth } from '../context/AuthContext';
import ThemeProvider from '../context/ThemeProvider';
import Navbar from '@/components/navbar';
import KYCModal from '@/components/kycModel';
import { getUserKyc } from '@/services/AuthServices/AuthApiFunction';
import PremiumModal from '@/components/premiumModal';


const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({ children }) {
  // const [showKycModal, setShowKycModal] = useState(false);



  // useEffect(() => {
   
  //   const checkKYC = async () => {
  //      const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null;
  //     if (!user) {
    
  //       setShowKycModal(false);
  //       return;
  //     }

  //     try {
  //       const res = await getUserKyc();
  //       const kycData = res?.data?.data;

  //       if (!kycData || kycData.aadhaarStatus !== 1) {
  //         setShowKycModal(true);
  //       } else {
  //         setShowKycModal(false);
  //       }
  //     } catch (error) {
  //       console.error('Error fetching KYC details:', error);
  //       setShowKycModal(true);
  //     }
  //   };

  //   checkKYC();
  // }, []); 

  return (
    <html lang="en"suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider>
          <AuthProvider>
            <Navbar />
            {children}
                 <Toaster position="top-center" reverseOrder={false} />
            <Footer />
            {/* {showKycModal && <KYCModal onClose={() => setShowKycModal(false)} />} */}
            <KYCModal />
               <PremiumModal />
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

