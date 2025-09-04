

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
import UserVerificationModal from '@/components/UserVerificationModal';
import PageLoader from '@/components/loader';


const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({ children }) {

  // const { user, token, logout } = useAuth();


  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body className={inter.className}>
        <ThemeProvider>
          <AuthProvider>
            <Navbar />
            <div className="relative min-h-screen">
              <PageLoader />
              {children}
            </div>
            <Toaster position="top-center" reverseOrder={false} />
            <Footer />
            <UserVerificationModal />
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

