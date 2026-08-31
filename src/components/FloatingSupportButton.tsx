import React from 'react';
import { Headset } from 'lucide-react';

interface FloatingSupportButtonProps {
  onOpenSupport: () => void;
}

export const FloatingSupportButton: React.FC<FloatingSupportButtonProps> = ({
  onOpenSupport,
}) => {
  return (
    <button
      id="floatingSupportBtn"
      onClick={onOpenSupport}
      aria-label="Contact Customer Support"
      title="২৪/৭ কাস্টমার সাপোর্ট"
      className="press fixed bottom-20 right-4 z-40 flex h-13 w-13 items-center justify-center rounded-full bg-blue-600 text-white shadow-xl shadow-blue-600/30 hover:bg-blue-700 hover:scale-105 active:scale-95 transition-all border-2 border-white"
    >
      <Headset className="h-6 w-6" />
      <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-emerald-500 border-2 border-white ring-1 ring-emerald-500 animate-pulse" />
    </button>
  );
};
