"use client";

import { useEffect, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";

export default function PageLoader() {
  const pathname = usePathname();
  // const searchParams = useSearchParams();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const timeout = setTimeout(() => setLoading(false), 400);
    return () => clearTimeout(timeout);
  }, [pathname]);

  if (!loading) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white/80 dark:bg-gray-900/80 z-[9999]">
      <div className="flex space-x-2">
        <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce"></div>
        <div className="w-3 h-3 bg-purple-500 rounded-full animate-bounce [animation-delay:0.2s]"></div>
        <div className="w-3 h-3 bg-pink-500 rounded-full animate-bounce [animation-delay:0.4s]"></div>
      </div>
    </div>
  );
}
