import React from 'react';

import './globals.css';
import { Inter } from 'next/font/google';
import Footer from '@/components/footer';
import { AuthProvider } from '../context/AuthContext';
import ThemeProvider from '../context/ThemeProvider';
import Navbar from '@/components/navbar';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({ children }) {
  return (
    <html lang="en"suppressHydrationWarning>
      <body className={inter.className}>
 <ThemeProvider>

          <AuthProvider>
          <Navbar/>
            {children}
          <Footer/>
          </AuthProvider>

 </ThemeProvider>
      </body>
    </html>
  );
}
