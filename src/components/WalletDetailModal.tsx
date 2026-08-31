import React from 'react';
import { X, ArrowRightLeft, Facebook, Mail, Instagram, CheckCircle2, TrendingUp, Sparkles } from 'lucide-react';
import { WalletBalances, WalletType } from '../types';

interface WalletDetailModalProps {
  walletType: WalletType | null;
  onClose: () => void;
  balances: WalletBalances;
  onOpenTransfer: () => void;
  onNavigateToCategoryTasks: (category: string) => void;
}

export const WalletDetailModal: React.FC<WalletDetailModalProps> = ({
  walletType,
  onClose,
  balances,
  onOpenTransfer,
  onNavigateToCategoryTasks,
}) => {
  if (!walletType || walletType === 'main') return null;

  const walletInfo = {
    fb: {
      name: 'Facebook Wallet',
      nameBn: 'ফেসবুক ইনকাম ওয়ালেট',
      balance: balances.fb,
      color: 'blue',
      icon: <Facebook className="h-6 w-6 fill-current text-blue-600" />,
      desc: 'ফেসবুক পেজ ফলো, লাইক, শেয়ার এবং কমেন্ট টাস্কের সমস্ত পারিশ্রমিক এই ওয়ালেটে স্বয়ংক্রিয়ভাবে জমা হয়।',
      category: 'facebook'
    },
    mail: {
      name: 'Mail Wallet',
      nameBn: 'জিমেইল ও গুগল ইনকাম ওয়ালেট',
      balance: balances.mail,
      color: 'red',
      icon: <Mail className="h-6 w-6 text-white" />,
      desc: 'নতুন জিমেইল তৈরি, অ্যাপ রিভিউ ও সার্ভে টাস্কের সমস্ত পারিশ্রমিক এই ওয়ালেটে জমা হয়।',
      category: 'gmail'
    },
    insta: {
      name: 'Instagram Wallet',
      nameBn: 'ইনস্টাগ্রাম ইনকাম ওয়ালেট',
      balance: balances.insta,
      color: 'pink',
      icon: <Instagram className="h-6 w-6 text-white" />,
      desc: 'ইনস্টাগ্রাম প্রোফাইল ফলো, রিলস লাইক ও স্টোরি শেয়ারের আয় এখানে জমা হয়।',
      category: 'instagram'
    }
  }[walletType];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* BACKDROP */}
      <div
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      {/* MODAL */}
      <div className="relative z-10 max-h-[90vh] w-full max-w-md overflow-y-auto rounded-3xl bg-white p-5 sm:p-6 shadow-2xl hide-scrollbar animate-in zoom-in-95 duration-150">
        {/* HEADER */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-100 shadow-xs">
              {walletInfo.icon}
            </div>
            <div>
              <h2 className="text-base font-black text-slate-900">
                {walletInfo.name}
              </h2>
              <p className="text-[11px] text-slate-400">{walletInfo.nameBn}</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="press flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-slate-600 hover:bg-slate-200"
            aria-label="Close modal"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* BALANCE BANNER */}
        <div className="my-5 rounded-2xl bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 p-5 text-white shadow-lg text-center relative overflow-hidden">
          <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-blue-500/20 blur-lg" />
          <span className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400">
            বর্তমান ব্যালেন্স
          </span>
          <div className="text-3xl font-black text-white mt-1">
            ৳{walletInfo.balance.toFixed(2)}
          </div>
          <span className="inline-block mt-2 text-[10px] font-bold text-emerald-400 bg-emerald-400/10 px-2.5 py-0.5 rounded-full border border-emerald-400/20">
            ✓ মেইন ব্যালেন্সে ট্রান্সফারের জন্য প্রস্তুত
          </span>
        </div>

        {/* INFO TEXT */}
        <p className="text-xs text-slate-600 leading-relaxed rounded-xl bg-slate-50 p-3 border border-slate-200/70">
          {walletInfo.desc}
        </p>

        {/* ACTIONS */}
        <div className="mt-5 space-y-2.5">
          <button
            onClick={() => {
              onClose();
              onOpenTransfer();
            }}
            className="press w-full flex items-center justify-center gap-2 rounded-xl bg-blue-600 hover:bg-blue-700 py-3 text-xs font-black text-white shadow-md transition-all"
          >
            <ArrowRightLeft className="h-4 w-4" />
            <span>মেইন ব্যালেন্সে রূপান্তর / ট্রান্সফার করুন</span>
          </button>

          <button
            onClick={() => {
              onClose();
              onNavigateToCategoryTasks(walletInfo.category);
            }}
            className="press w-full flex items-center justify-center gap-2 rounded-xl bg-slate-100 hover:bg-slate-200 py-3 text-xs font-bold text-slate-800 transition-all border border-slate-200"
          >
            <TrendingUp className="h-4 w-4 text-blue-600" />
            <span>আরও {walletInfo.name} এর কাজ খুঁজুন</span>
          </button>
        </div>
      </div>
    </div>
  );
};
