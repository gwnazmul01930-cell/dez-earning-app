import React from 'react';
import {
  Wallet,
  Plus,
  ArrowUpRight,
  ArrowRightLeft,
  Facebook,
  Mail,
  Instagram,
  ShieldCheck,
  Sparkles
} from 'lucide-react';
import { WalletBalances, WalletType } from '../types';

interface WalletsViewProps {
  balances: WalletBalances;
  onOpenDeposit: () => void;
  onOpenWithdraw: () => void;
  onOpenTransfer: () => void;
  onSelectWallet: (wallet: WalletType) => void;
}

export const WalletsView: React.FC<WalletsViewProps> = ({
  balances,
  onOpenDeposit,
  onOpenWithdraw,
  onOpenTransfer,
  onSelectWallet,
}) => {
  const totalAll = balances.main + balances.fb + balances.mail + balances.insta;

  return (
    <div className="space-y-4">
      {/* TOTAL ASSETS CARD */}
      <div className="rounded-3xl bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 p-5 text-white shadow-xl relative overflow-hidden">
        <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-blue-500/20 blur-xl pointer-events-none" />

        <div className="relative z-10">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400">
              সর্বমোট অর্জিত সম্পদ (Total Balance)
            </span>
            <span className="rounded-full bg-emerald-400/20 px-2 py-0.5 text-[10px] font-bold text-emerald-300 border border-emerald-400/30">
              ১০০% সুরক্ষিত
            </span>
          </div>

          <div className="mt-2 text-3xl sm:text-4xl font-black tracking-tight text-white flex items-baseline gap-1.5">
            <span>৳{totalAll.toFixed(2)}</span>
            <span className="text-xs font-bold text-slate-400 uppercase">BDT</span>
          </div>

          <div className="mt-5 grid grid-cols-3 gap-2">
            <button
              onClick={onOpenDeposit}
              className="press flex flex-col items-center justify-center rounded-2xl bg-white/10 hover:bg-white/20 p-2.5 backdrop-blur-md border border-white/10 transition-colors"
            >
              <Plus className="h-4 w-4 text-blue-300 mb-1" />
              <span className="text-[11px] font-bold">ডিপোজিট</span>
            </button>

            <button
              onClick={onOpenWithdraw}
              className="press flex flex-col items-center justify-center rounded-2xl bg-emerald-500/30 hover:bg-emerald-500/40 p-2.5 backdrop-blur-md border border-emerald-400/30 transition-colors"
            >
              <ArrowUpRight className="h-4 w-4 text-emerald-300 mb-1" />
              <span className="text-[11px] font-bold text-emerald-100">উইথড্র</span>
            </button>

            <button
              onClick={onOpenTransfer}
              className="press flex flex-col items-center justify-center rounded-2xl bg-indigo-500/30 hover:bg-indigo-500/40 p-2.5 backdrop-blur-md border border-indigo-400/30 transition-colors"
            >
              <ArrowRightLeft className="h-4 w-4 text-indigo-300 mb-1" />
              <span className="text-[11px] font-bold text-indigo-100">ট্রান্সফার</span>
            </button>
          </div>
        </div>
      </div>

      {/* INDIVIDUAL WALLETS LIST */}
      <div className="space-y-3">
        <h3 className="text-xs font-black uppercase tracking-wider text-slate-400">
          আপনার ওয়ালেটসমূহ
        </h3>

        {/* MAIN WALLET */}
        <div className="soft-card flex items-center justify-between rounded-2xl bg-white p-4 border-l-4 border-l-blue-600">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
              <Wallet className="h-6 w-6" />
            </div>
            <div>
              <h4 className="font-extrabold text-sm text-slate-900">
                মেইন ব্যালেন্স (Main Balance)
              </h4>
              <p className="text-xs text-slate-400 mt-0.5">
                সরাসরি বিকাশ/নগদে উত্তোলনের জন্য
              </p>
            </div>
          </div>

          <div className="text-right">
            <div className="text-base font-black text-slate-900">
              ৳{balances.main.toFixed(2)}
            </div>
            <button
              onClick={onOpenWithdraw}
              className="press mt-1 text-[11px] font-bold text-emerald-600 hover:underline"
            >
              ক্যাশআউট
            </button>
          </div>
        </div>

        {/* FB WALLET */}
        <div
          onClick={() => onSelectWallet('fb')}
          className="press soft-card cursor-pointer flex items-center justify-between rounded-2xl bg-white p-4 hover:border-blue-300 transition-all border-l-4 border-l-blue-500"
        >
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
              <Facebook className="h-6 w-6 fill-current" />
            </div>
            <div>
              <h4 className="font-extrabold text-sm text-slate-900">
                Facebook Wallet
              </h4>
              <p className="text-xs text-slate-400 mt-0.5">
                ফেসবুক টাস্ক থেকে অর্জিত আয়
              </p>
            </div>
          </div>

          <div className="text-right">
            <div className="text-base font-black text-blue-700">
              ৳{balances.fb.toFixed(2)}
            </div>
            <span className="text-[10px] font-bold text-slate-400">
              ট্যাপ করে দেখুন
            </span>
          </div>
        </div>

        {/* MAIL WALLET */}
        <div
          onClick={() => onSelectWallet('mail')}
          className="press cursor-pointer soft-card flex items-center justify-between rounded-2xl bg-white p-4 hover:border-red-300 transition-all border-l-4 border-l-red-500"
        >
          <div className="flex items-center gap-3">
            <div className="google-gradient flex h-11 w-11 items-center justify-center rounded-xl text-white shadow-xs">
              <Mail className="h-6 w-6" />
            </div>
            <div>
              <h4 className="font-extrabold text-sm text-slate-900">
                Mail / Google Wallet
              </h4>
              <p className="text-xs text-slate-400 mt-0.5">
                জিমেইল ক্রিয়েট ও গুগল অ্যাপ রিভিউ আয়
              </p>
            </div>
          </div>

          <div className="text-right">
            <div className="text-base font-black text-red-600">
              ৳{balances.mail.toFixed(2)}
            </div>
            <span className="text-[10px] font-bold text-slate-400">
              ট্যাপ করে দেখুন
            </span>
          </div>
        </div>

        {/* INSTA WALLET */}
        <div
          onClick={() => onSelectWallet('insta')}
          className="press cursor-pointer soft-card flex items-center justify-between rounded-2xl bg-white p-4 hover:border-pink-300 transition-all border-l-4 border-l-pink-500"
        >
          <div className="flex items-center gap-3">
            <div className="instagram-gradient flex h-11 w-11 items-center justify-center rounded-xl text-white shadow-xs">
              <Instagram className="h-6 w-6" />
            </div>
            <div>
              <h4 className="font-extrabold text-sm text-slate-900">
                Instagram Wallet
              </h4>
              <p className="text-xs text-slate-400 mt-0.5">
                ইনস্টাগ্রাম ফলো ও লাইক টাস্কের আয়
              </p>
            </div>
          </div>

          <div className="text-right">
            <div className="text-base font-black text-pink-600">
              ৳{balances.insta.toFixed(2)}
            </div>
            <span className="text-[10px] font-bold text-slate-400">
              ট্যাপ করে দেখুন
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
