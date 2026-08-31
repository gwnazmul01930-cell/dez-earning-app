import React, { useState } from 'react';
import { X, Gift, Sparkles, Send, CheckCircle2, AlertCircle } from 'lucide-react';

interface GiftCodeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onRedeem: (code: string) => void;
}

export const GiftCodeModal: React.FC<GiftCodeModalProps> = ({
  isOpen,
  onClose,
  onRedeem,
}) => {
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  if (!isOpen) return null;

  const handleRedeem = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!code.trim()) {
      setError('অনুগ্রহ করে গিফট কোডটি লিখুন!');
      return;
    }

    const cleanCode = code.trim().toUpperCase();
    if (cleanCode === 'DEZ2026' || cleanCode === 'BONUS50' || cleanCode === 'WELCOME') {
      setSuccess('অভিনন্দন! গিফট কোড সফলভাবে রিডিম হয়েছে। আপনার মেইন ব্যালেন্সে ৳১০.০০ যোগ করা হয়েছে।');
      onRedeem(cleanCode);
      setTimeout(() => {
        setCode('');
        setSuccess('');
        onClose();
      }, 2500);
    } else {
      setError('দুঃখিত! এই গিফট কোডটি সঠিক নয় অথবা মেয়াদ শেষ হয়ে গেছে।');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* BACKDROP */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity"
      />

      {/* MODAL CARD */}
      <div className="relative w-full max-w-sm overflow-hidden rounded-3xl bg-white p-6 shadow-2xl space-y-4 text-center z-10 animate-scaleUp">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-slate-500 hover:bg-slate-200"
        >
          <X className="h-4 w-4" />
        </button>

        {/* ICON */}
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-3xl bg-gradient-to-tr from-purple-600 to-pink-500 text-white shadow-lg shadow-purple-500/20">
          <Gift className="h-8 w-8" />
        </div>

        <div>
          <h2 className="text-lg font-black text-slate-800">
            Redeem Gift Code
          </h2>
          <p className="mt-1 text-xs text-slate-500">
            অফিশিয়াল টেলিগ্রাম চ্যানেল থেকে পাওয়া গিফট কোড বসিয়ে ফ্রি ব্যালেন্স নিন।
          </p>
        </div>

        {error && (
          <div className="flex items-center gap-2 rounded-2xl bg-rose-50 p-3 text-left text-xs font-bold text-rose-700 border border-rose-200">
            <AlertCircle className="h-4 w-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {success && (
          <div className="flex items-center gap-2 rounded-2xl bg-emerald-50 p-3 text-left text-xs font-bold text-emerald-700 border border-emerald-200">
            <CheckCircle2 className="h-4 w-4 shrink-0" />
            <span>{success}</span>
          </div>
        )}

        <form onSubmit={handleRedeem} className="space-y-3">
          <div>
            <input
              type="text"
              placeholder="ENTER GIFT CODE (e.g. DEZ2026)"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="w-full rounded-2xl border-2 border-purple-100 bg-purple-50/40 px-4 py-3 text-center text-sm font-black uppercase tracking-widest text-purple-900 placeholder-purple-300 focus:border-purple-500 focus:bg-white focus:outline-none"
            />
          </div>

          <button
            type="submit"
            className="press flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600 py-3 text-xs font-black text-white shadow-md hover:from-purple-700 hover:to-indigo-700 transition-all"
          >
            <Sparkles className="h-4 w-4" />
            <span>REDEEM NOW</span>
          </button>
        </form>

        <div className="pt-2 border-t border-slate-100">
          <p className="text-[11px] text-slate-400">
            নতুন গিফট কোড পেতে{' '}
            <a
              href="https://t.me"
              target="_blank"
              rel="noreferrer"
              className="font-bold text-purple-600 hover:underline"
            >
              টেলিগ্রাম চ্যানেলে যুক্ত থাকুন
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};
