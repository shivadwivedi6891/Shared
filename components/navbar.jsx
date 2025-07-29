

// 'use client';

// import { useState, useEffect } from 'react';
// import Link from 'next/link';
// import { useTheme } from 'next-themes';
// import {
//   Menu,
//   X,
//   Sun,
//   Moon,
//   Car,
//   User,
//   Settings,
//   LogOut
// } from 'lucide-react';
// import { useAuth } from '../context/AuthContext';

// export default function Navbar() {
//   const [isOpen, setIsOpen] = useState(false);
//   const [dropdownOpen, setDropdownOpen] = useState(false);
//   const { theme, setTheme } = useTheme();
//   const { user, logout } = useAuth();
//   const [mounted, setMounted] = useState(false);

//   useEffect(() => {
//     setMounted(true); 
//   }, []);

//   const toggleMenu = () => setIsOpen(!isOpen);
//   const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

//   return (
//     <nav className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md shadow-xl sticky top-0 z-50 border-b border-gray-200/20 dark:border-gray-700/20">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex justify-between items-center h-16">
//           <Link href="/" className="flex items-center space-x-3 group">
//             <div className="p-2 bg-gradient-to-r from-yellow-600 to-skyblue-600 rounded-xl group-hover:scale-110 transition-transform duration-300">
//               <Car className="h-6 w-6 text-white" />
//             </div>
//             <span className="text-2xl font-bold bg-gradient-to-r from-yellow-600 to-purple-600 bg-clip-text text-transparent">
//               CAR AUCTION
//             </span>
//           </Link>

//           <div className="hidden md:flex items-center space-x-8">
//             {['/', '/auction', '/vehicles', '/about'].map((path, idx) => (
//               <Link
//                 key={idx}
//                 href={path}
//                 className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-300 font-medium px-3 py-2 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20"
//               >
//                 {path === '/' ? 'Home' : path.replace('/', '').charAt(0).toUpperCase() + path.slice(2)}
//               </Link>
//             ))}
//           </div>

//           <div className="hidden md:flex items-center space-x-4">
           

//             {user ? (
//               <div className="relative">
//                 <button
//                   onClick={toggleDropdown}
//                   className="p-2 rounded-full hover:bg-blue-100 dark:hover:bg-blue-900/30"
//                 >
//                   <User className="h-5 w-5" />
//                 </button>
//                 {dropdownOpen && (
//                   <div className="absolute right-0 mt-2 w-40 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg z-50">
//                     <Link
//                       href="/dashboard/buyer"
//                       className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-gray-700"
//                     >
//                       <User className="inline-block w-4 h-4 mr-2" />
//                       Dashboard
//                     </Link>
//                     <div className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-gray-700">
//                       <Settings className="inline-block w-4 h-4 mr-2" />
//                       <Link href="/settings">Settings</Link>
//                     </div>
//                     <button
//                       onClick={logout}
//                       className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-gray-700"
//                     >
//                       <LogOut className="inline-block w-4 h-4 mr-2" />
//                       <Link href="/">Logout</Link>
//                     </button>
//                   </div>
//                 )}
//               </div>
//             ) : (
//               <>
//                 <Link href="/login">
//                   <button className="px-4 py-2 border bg-amber-400 border-gray-300 rounded-md hover:bg-blue-50 transition-all">
//                     Login
//                   </button>
//                 </Link>
//                 <Link href="/register">
//                   <button className="px-4 py-2 rounded-md bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 transition-all shadow-md">
//                     Sign Up
//                   </button>
//                 </Link>
//               </>
//             )}
//           </div>

//           <div className="md:hidden flex items-center gap-2">
//             {mounted && (
//               <button
//                 onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
//                 className="p-2 rounded-full hover:bg-blue-100 dark:hover:bg-blue-900/30 transition"
//               >
//                 {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
//               </button>
//             )}
//             <button onClick={toggleMenu} className="p-2">
//               {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
//             </button>
//           </div>
//         </div>

//         {isOpen && (
//           <div className="md:hidden px-2 pt-2 pb-3 space-y-1 sm:px-3">
//             <Link href="/" className="block px-3 py-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">
//               Home
//             </Link>
//             <Link href="/auction" className="block px-3 py-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">
//               Auction
//             </Link>
//             <Link href="/vehicles" className="block px-3 py-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">
//               Vehicles
//             </Link>
//             <Link href="/about" className="block px-3 py-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">
//               About
//             </Link>
//             <div className="flex items-center gap-2 mt-2 px-3">
//               {!user && (
//                 <>
//                   <Link href="/login">
//                     <button className="px-3 py-1 border border-gray-300 rounded-md text-sm">
//                       Login
//                     </button>
//                   </Link>
//                   <Link href="/signup">
//                     <button className="px-3 py-1 rounded-md bg-blue-600 text-white text-sm">
//                       Sign Up
//                     </button>
//                   </Link>
//                 </>
//               )}
//             </div>
//           </div>
//         )}
//       </div>
//     </nav>
//   );
// }



'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useTheme } from 'next-themes';
import {
  Menu,
  X,
  Sun,
  Moon,
  Car,
  User,
  Settings,
  LogOut
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const { user, logout } = useAuth();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleMenu = () => setIsOpen(!isOpen);
  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

  return (
    <nav className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md shadow-xl sticky top-0 z-50 border-b border-gray-200/20 dark:border-gray-700/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="p-2 bg-gradient-to-r from-yellow-600 to-skyblue-600 rounded-xl group-hover:scale-110 transition-transform duration-300">
              <Car className="h-6 w-6 text-white" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-yellow-600 to-purple-600 bg-clip-text text-transparent">
              CAR AUCTION
            </span>
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            {['/', '/auction', '/vehicles', '/about'].map((path, idx) => (
              <Link
                key={idx}
                href={path}
                className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-300 font-medium px-3 py-2 rounded-lg hover:bg-blue-50 dark:hover:bg-gray-700/50"
              >
                {path === '/' ? 'Home' : path.replace('/', '').charAt(0).toUpperCase() + path.slice(2)}
              </Link>
            ))}
          </div>

          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <div className="relative">
                <button
                  onClick={toggleDropdown}
                  className="p-2 rounded-full hover:bg-blue-100 dark:hover:bg-gray-800"
                >
                  <User className="h-5 w-5 text-gray-800 dark:text-gray-300" />
                </button>
                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-40 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg z-50">
                    <Link
                      href="/dashboard/buyer"
                      className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-gray-700"
                    >
                      <User className="inline-block w-4 h-4 mr-2" />
                      Dashboard
                    </Link>
                    <Link
                      href="/settings"
                      className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-gray-700"
                    >
                      <Settings className="inline-block w-4 h-4 mr-2" />
                      Settings
                    </Link>
                    <button
                      onClick={logout}
                      className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-gray-700"
                    >
                      <LogOut className="inline-block w-4 h-4 mr-2" />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Link href="/login">
                  <button className="px-4 py-2 border bg-amber-400 border-gray-300 rounded-md hover:bg-blue-50 dark:hover:bg-gray-700 transition-all">
                    Login
                  </button>
                </Link>
                <Link href="/register">
                  <button className="px-4 py-2 rounded-md bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 transition-all shadow-md">
                    Sign Up
                  </button>
                </Link>
              </>
            )}
          </div>

          <div className="md:hidden flex items-center gap-2">
            {mounted && (
              <button
                onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
                className="p-2 rounded-full hover:bg-blue-100 dark:hover:bg-gray-700 transition"
              >
                {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>
            )}
            <button onClick={toggleMenu} className="p-2">
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {isOpen && (
          <div className="md:hidden px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link href="/" className="block px-3 py-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">
              Home
            </Link>
            <Link href="/auction" className="block px-3 py-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">
              Auction
            </Link>
            <Link href="/vehicles" className="block px-3 py-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">
              Vehicles
            </Link>
            <Link href="/about" className="block px-3 py-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">
              About
            </Link>
            <div className="flex items-center gap-2 mt-2 px-3">
              {!user && (
                <>
                  <Link href="/login">
                    <button className="px-3 py-1 border border-gray-300 rounded-md text-sm dark:border-gray-600">
                      Login
                    </button>
                  </Link>
                  <Link href="/signup">
                    <button className="px-3 py-1 rounded-md bg-blue-600 text-white text-sm hover:bg-blue-700">
                      Sign Up
                    </button>
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
