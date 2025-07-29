'use client';

import { useState } from 'react';
import { ChevronLeft, ChevronRight, LocateFixed } from 'lucide-react';

const carImages = [
  'https://news.dupontregistry.com/wp-content/uploads/2022/09/2022-bmw-m5-cs-1.jpg',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQW2mmLq4cIT8QpPuinu9YfAnQikFPyGQPtpA&s',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR0NVSTdpOoyKA1hA5f2DWoMCbpXW5wfHAgoQ&s',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRvFEKzSTu1G3jMFRDDKEp_3sIVWIimOJA-Ow&s',
];

export default function HomePage() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? carImages.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === carImages.length - 1 ? 0 : prev + 1));
  };

  return (
    <main className="bg-gradient-to-b from-yellow-50 to-white min-h-screen">
      <section className="relative w-full h-screen overflow-hidden rounded-b-[50px] shadow-lg">

        <img
          src={carImages[currentIndex]}
          alt={`Car ${currentIndex + 1}`}
          className="absolute inset-0 w-full h-full object-cover opacity-30"
        />

        <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between h-full px-6 sm:px-10 lg:px-20">
          <div className="w-full lg:w-1/2 max-w-xl space-y-6 text-center lg:text-left pt-20 lg:pt-0">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900">
              Auctioning Platform for{' '}
              <span className="text-blue-800">Commercial Vehicles</span>
            </h1>
          </div>

          <div className="relative w-full lg:w-1/2 h-[300px] sm:h-[400px] md:h-[500px] lg:h-[520px] flex items-end justify-center">
            <img
              src={carImages[currentIndex]}
              alt={`Car ${currentIndex + 1}`}
              className="h-full object-contain drop-shadow-2xl"
            />
            <button
              onClick={prevSlide}
              className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white text-black p-2 rounded-full shadow-md hover:scale-110 transition"
            >
              <ChevronLeft size={28} />
            </button>

            <button
              onClick={nextSlide}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white text-black p-2 rounded-full shadow-md hover:scale-110 transition"
            >
              <ChevronRight size={28} />
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}


// import Link from 'next/link';

// export default function HomePage() {
//   return (
//     <main className="bg-white text-black dark:bg-black dark:text-white min-h-screen font-sans">
//       <section
//         className="relative flex flex-col justify-center items-center text-center px-6 py-32 sm:py-40 bg-cover bg-center bg-no-repeat"
//         style={{
//           backgroundImage: "url('https://images.pexels.com/photos/358070/pexels-photo-358070.jpeg')",
//         }}
//       >
//         <div className="absolute inset-0 bg-black/80 backdrop-blur-md" />
//         <div className="relative z-10 max-w-2xl">
//           <h1 className="text-4xl sm:text-6xl font-bold leading-tight tracking-tight bg-gradient-to-r from-white via-gray-300 to-white text-transparent bg-clip-text drop-shadow-xl">
//             Discover Premium Car Auctions
//           </h1>
//           <p className="mt-4 text-lg sm:text-xl text-gray-300">
//             Bid on rare luxury vehicles from top cities across the world.
//           </p>
//           <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
//             <Link href="/auctions">
//               <button className="px-6 py-3 rounded-xl bg-white text-black font-semibold hover:scale-105 transition shadow-lg hover:shadow-xl shine-effect">
//                 Explore Auctions
//               </button>
//             </Link>
//             <Link href="/login">
//               <button className="px-6 py-3 rounded-xl border border-white text-white hover:bg-white/10 transition shadow hover:shadow-md">
//                 Sell a Car
//               </button>
//             </Link>
//           </div>
//         </div>
//       </section>

//       <style jsx>{`
//         .shine-effect {
//           position: relative;
//           overflow: hidden;
//         }

//         .shine-effect::after {
//           content: '';
//           position: absolute;
//           top: -50%;
//           left: -50%;
//           width: 200%;
//           height: 200%;
//           background: linear-gradient(
//             120deg,
//             rgba(255, 255, 255, 0) 30%,
//             rgba(255, 255, 255, 0.4) 50%,
//             rgba(255, 255, 255, 0) 70%
//           );
//           transform: rotate(25deg);
//           animation: shine 2.5s infinite;
//         }

//         @keyframes shine {
//           0% {
//             left: -100%;
//           }
//           100% {
//             left: 100%;
//           }
//         }
//       `}</style>
//     </main>
//   );
// }
