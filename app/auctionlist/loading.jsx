export default function Loading() {
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
