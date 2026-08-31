import React from 'react';
import {
  Wallet,
  Plus,
  ArrowUpRight,
  RefreshCw,
  Facebook,
  Mail,
  Instagram,
  ArrowRightLeft
} from 'lucide-react';
import { UserProfile, WalletBalances, WalletType } from '../types';

interface BalanceOverviewProps {
  user: UserProfile;
  balances: WalletBalances;
  onOpenDeposit: () => void;
  onOpenWithdraw: () => void;
  onOpenTransfer: () => void;
  onSelectWallet: (wallet: WalletType) => void;
}

export const BalanceOverview: React.FC<BalanceOverviewProps> = ({
  user,
  balances,
  onOpenDeposit,
  onOpenWithdraw,
  onOpenTransfer,
  onSelectWallet,
}) => {
  return (
    <div className="space-y-4">
      {/* GREETING SECTION */}
      <section className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div
            id="avatar"
            className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 text-white shadow-md overflow-hidden border border-blue-200"
          >
            {user.avatar ? (
              <img
                src={user.avatar}
                alt={user.name}
                className="h-full w-full object-cover"
                referrerPolicy="no-referrer"
              />
            ) : (
              <span className="font-bold text-lg">{user.name.charAt(0)}</span>
            )}
          </div>

          <div>
            <p className="text-xs font-medium text-slate-400">
              Welcome back 👋
            </p>
            <h1
              id="userName"
              className="text-lg font-extrabold text-slate-900 tracking-tight"
            >
              Hi, {user.name.split(' ')[0] || 'User'}
            </h1>
          </div>
        </div>

        {/* TRANSFER ACTION PILL */}
        <button
          onClick={onOpenTransfer}
          title="ওয়ালেট থেকে মেইন ব্যালেন্সে ট্রান্সফার"
          className="press flex items-center gap-1.5 rounded-xl bg-indigo-50 hover:bg-indigo-100 border border-indigo-100 px-3 py-2 text-xs font-bold text-indigo-700 transition-colors"
        >
          <ArrowRightLeft className="h-3.5 w-3.5" />
          <span>কনভার্ট / ট্রান্সফার</span>
        </button>
      </section>

      {/* MAIN BALANCE CARD */}
      <section className="main-gradient relative overflow-hidden rounded-3xl p-5 text-white shadow-xl">
        {/* Decorative background shapes */}
        <div className="absolute -right-10 -top-10 h-36 w-36 rounded-full bg-white/10 blur-xs" />
        <div className="absolute -bottom-16 right-16 h-36 w-36 rounded-full bg-white/5 blur-xs" />

        <div className="relative z-10">
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center gap-2">
                <p className="text-[11px] font-extrabold tracking-[0.16em] text-blue-100 uppercase">
                  MAIN BALANCE (মেইন ব্যালেন্স)
                </p>
                <span className="rounded-full bg-emerald-400/20 text-emerald-200 text-[10px] font-bold px-2 py-0.5 border border-emerald-400/30">
                  Ready to Cashout
                </span>
              </div>

              <div
                id="mainBalance"
                className="mt-1.5 text-3xl sm:text-4xl font-black tracking-tight flex items-baseline gap-1"
              >
                <span>৳{balances.main.toFixed(2)}</span>
                <span className="text-xs font-semibold text-blue-200 uppercase tracking-widest">BDT</span>
              </div>
            </div>

            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/15 backdrop-blur-md border border-white/20 shadow-inner">
              <Wallet className="h-6 w-6 text-white" />
            </div>
          </div>

          {/* ACTION BUTTONS */}
          <div className="mt-5 flex items-center gap-2.5">
            <button
              id="addFundButton"
              onClick={onOpenDeposit}
              className="press flex-1 flex items-center justify-center gap-1.5 rounded-xl bg-white px-4 py-2.5 text-xs font-black text-blue-700 shadow-md hover:bg-slate-50 transition-colors"
            >
              <Plus className="h-4 w-4 stroke-[3]" />
              <span>Add Fund (ডিপোজিট)</span>
            </button>

            <button
              id="withdrawButton"
              onClick={onOpenWithdraw}
              className="press flex-1 flex items-center justify-center gap-1.5 rounded-xl bg-blue-500/40 hover:bg-blue-500/60 border border-white/30 backdrop-blur-md px-4 py-2.5 text-xs font-extrabold text-white shadow-md transition-colors"
            >
              <ArrowUpRight className="h-4 w-4" />
              <span>Withdraw (উইথড্র)</span>
            </button>
          </div>
        </div>
      </section>

      {/* THREE DEDICATED WALLETS */}
      <section className="grid grid-cols-3 gap-2.5">
        {/* FB WALLET */}
        <button
          onClick={() => onSelectWallet('fb')}
          className="press soft-card rounded-2xl bg-white p-3 text-left hover:border-blue-200 transition-all group"
        >
          <div className="mb-2.5 flex h-9 w-9 items-center justify-center rounded-xl bg-blue-50 text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors shadow-xs">
            <Facebook className="h-4 w-4 fill-current" />
          </div>

          <p className="text-sm font-extrabold text-slate-800 tracking-tight">
            ৳{balances.fb.toFixed(2)}
          </p>

          <p className="mt-0.5 text-[9px] font-bold tracking-wider text-slate-400 uppercase">
            FB WALLET
          </p>
        </button>

        {/* MAIL WALLET */}
        <button
          onClick={() => onSelectWallet('mail')}
          className="press soft-card rounded-2xl bg-white p-3 text-left hover:border-red-200 transition-all group"
        >
          <div className="google-gradient mb-2.5 flex h-9 w-9 items-center justify-center rounded-xl text-white shadow-xs">
            <Mail className="h-4 w-4" />
          </div>

          <p className="text-sm font-extrabold text-slate-800 tracking-tight">
            ৳{balances.mail.toFixed(2)}
          </p>

          <p className="mt-0.5 text-[9px] font-bold tracking-wider text-slate-400 uppercase">
            MAIL WALLET
          </p>
        </button>

        {/* INSTA WALLET */}
        <button
          onClick={() => onSelectWallet('insta')}
          className="press soft-card rounded-2xl bg-white p-3 text-left hover:border-pink-200 transition-all group"
        >
          <div className="instagram-gradient mb-2.5 flex h-9 w-9 items-center justify-center rounded-xl text-white shadow-xs">
            <Instagram className="h-4 w-4" />
          </div>

          <p className="text-sm font-extrabold text-slate-800 tracking-tight">
            ৳{balances.insta.toFixed(2)}
          </p>

          <p className="mt-0.5 text-[9px] font-bold tracking-wider text-slate-400 uppercase">
            INSTA WALLET
          </p>
        </button>
      </section>
    </div>
  );
};
