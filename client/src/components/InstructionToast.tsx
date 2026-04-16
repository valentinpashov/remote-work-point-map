import { useEffect } from 'react';

interface InstructionToastProps {
  isVisible: boolean;
  onClose: () => void;
}

export default function InstructionToast({ isVisible, onClose }: InstructionToastProps) {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onClose();
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose]);

  if (!isVisible) return null;

  return (
    <div className="fixed top-28 left-1/2 transform -translate-x-1/2 z-[4000] animate-bounce-short">
      <div className="bg-gray-900/95 backdrop-blur text-white px-6 py-3.5 rounded-full shadow-2xl flex items-center gap-3 border border-gray-700">
        <div className="flex items-center justify-center w-8 h-8 bg-blue-500/20 text-blue-400 rounded-full">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122"></path></svg>
        </div>
        <span className="font-medium text-sm tracking-wide">
          To add a new location, simply click on its exact spot on the map!
        </span>
        <button 
          onClick={onClose} 
          className="ml-2 text-gray-400 hover:text-white bg-gray-800 hover:bg-gray-700 p-1.5 rounded-full transition-colors"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
        </button>
      </div>
    </div>
  );
}