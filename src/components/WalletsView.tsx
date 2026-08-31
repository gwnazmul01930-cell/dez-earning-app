import React from 'react';
import {
  Wallet,
  Plus,
  ArrowUpRight,
  Facebook,
  Mail,
  Instagram,
} from 'lucide-react';
import { WalletBalances } from '../types';

interface WalletsViewProps {
  balances: WalletBalances;
  onOpenDeposit: () => void;
  onOpenWithdraw: () => void;
}

export const WalletsView: React.FC<WalletsViewProps> = ({
  balances,
  onOpenDeposit,
  onOpenWithdraw,
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

          <div className="mt-5 grid grid-cols-2 gap-2.5">
            <button
              onClick={onOpenDeposit}
              className="press flex items-center justify-center gap-2 rounded-2xl bg-white/10 hover:bg-white/20 p-3 backdrop-blur-md border border-white/10 transition-colors font-bold text-xs text-white"
            >
              <Plus className="h-4 w-4 text-blue-300" />
              <span>ডিপোজিট (Add Fund)</span>
            </button>

            <button
              onClick={onOpenWithdraw}
              className="press flex items-center justify-center gap-2 rounded-2xl bg-emerald-500/30 hover:bg-emerald-500/40 p-3 backdrop-blur-md border border-emerald-400/30 transition-colors font-bold text-xs text-emerald-100"
            >
              <ArrowUpRight className="h-4 w-4 text-emerald-300" />
              <span>উইথড্র (Withdraw)</span>
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
        <div className="soft-card flex items-center justify-between rounded-2xl bg-white p-4 border-l-4 border-l-blue-600 shadow-xs">
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
              উইথড্র
            </button>
          </div>
        </div>

        {/* FB WALLET */}
        <div className="soft-card select-none flex items-center justify-between rounded-2xl bg-white p-4 border-l-4 border-l-blue-500 shadow-xs">
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
              অর্জিত ব্যালেন্স
            </span>
          </div>
        </div>

        {/* MAIL WALLET */}
        <div className="soft-card select-none flex items-center justify-between rounded-2xl bg-white p-4 border-l-4 border-l-red-500 shadow-xs">
          <div className="flex items-center gap-3">
            <div className="google-gradient flex h-11 w-11 items-center justify-center rounded-xl text-white shadow-xs">
              <Mail className="h-6 w-6" />
            </div>
            <div>
              <h4 className="font-extrabold text-sm text-slate-900">
                Mail / Google Wallet
              </h4>
              <p className="text-xs text-slate-400 mt-0.5">
                জিমেইল ক্রিয়েট ও গুগল টাস্ক আয়
              </p>
            </div>
          </div>

          <div className="text-right">
            <div className="text-base font-black text-red-600">
              ৳{balances.mail.toFixed(2)}
            </div>
            <span className="text-[10px] font-bold text-slate-400">
              অর্জিত ব্যালেন্স
            </span>
          </div>
        </div>

        {/* INSTA WALLET */}
        <div className="soft-card select-none flex items-center justify-between rounded-2xl bg-white p-4 border-l-4 border-l-pink-500 shadow-xs">
          <div className="flex items-center gap-3">
            <div className="instagram-gradient flex h-11 w-11 items-center justify-center rounded-xl text-white shadow-xs">
              <Instagram className="h-6 w-6" />
            </div>
            <div>
              <h4 className="font-extrabold text-sm text-slate-900">
                Instagram Wallet
              </h4>
              <p className="text-xs text-slate-400 mt-0.5">
                ইনস্টাগ্রাম টাস্কের আয়
              </p>
            </div>
          </div>

          <div className="text-right">
            <div className="text-base font-black text-pink-600">
              ৳{balances.insta.toFixed(2)}
            </div>
            <span className="text-[10px] font-bold text-slate-400">
              অর্জিত ব্যালেন্স
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
