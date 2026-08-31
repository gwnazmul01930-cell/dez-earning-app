import React from 'react';
import {
  X,
  Wallet,
  PlusCircle,
  ArrowUpRight,
  ListTodo,
  History,
  Users,
  Trophy,
  HelpCircle,
  Send,
  ShieldCheck,
  Sparkles,
  ChevronRight,
  Share2,
  Globe
} from 'lucide-react';
import { UserProfile, WalletBalances } from '../types';

interface DrawerMenuProps {
  isOpen: boolean;
  onClose: () => void;
  user: UserProfile;
  balances: WalletBalances;
  onNavigate: (tab: string) => void;
  onOpenDeposit: () => void;
  onOpenWithdraw: () => void;
  onOpenSpin: () => void;
  onOpenTelegram: () => void;
  onOpenShareLink: () => void;
}

export const DrawerMenu: React.FC<DrawerMenuProps> = ({
  isOpen,
  onClose,
  user,
  balances,
  onNavigate,
  onOpenDeposit,
  onOpenWithdraw,
  onOpenSpin,
  onOpenTelegram,
  onOpenShareLink,
}) => {
  if (!isOpen) return null;

  const totalAllBalances =
    balances.main + balances.fb + balances.mail + balances.insta;

  return (
    <div className="fixed inset-0 z-50 flex">
      {/* BACKDROP */}
      <div
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity duration-200"
        onClick={onClose}
      />

      {/* DRAWER CONTENT */}
      <div className="relative z-10 flex h-full w-[85%] max-w-sm flex-col bg-white shadow-2xl animate-in slide-in-from-left duration-200">
        {/* HEADER USER CARD */}
        <div className="bg-gradient-to-br from-blue-600 via-indigo-700 to-blue-800 p-5 text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img
                src={user.avatar}
                alt={user.name}
                className="h-12 w-12 rounded-full border-2 border-white/40 object-cover shadow-sm"
                referrerPolicy="no-referrer"
              />
              <div>
                <div className="flex items-center gap-1.5">
                  <h3 className="font-extrabold text-base leading-tight">
                    {user.name}
                  </h3>
                  {user.kycVerified && (
                    <span title="Verified Earner" className="bg-emerald-400/20 text-emerald-300 rounded-full p-0.5">
                      <ShieldCheck className="h-3.5 w-3.5" />
                    </span>
                  )}
                </div>
                <p className="text-xs text-blue-200 mt-0.5">
                  ID: <span className="font-mono font-bold text-white">{user.id}</span>
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="press flex h-8 w-8 items-center justify-center rounded-lg bg-white/10 text-white hover:bg-white/20"
              aria-label="Close menu"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* BALANCE CHIP */}
          <div className="mt-4 rounded-xl bg-white/10 p-3 backdrop-blur-xs border border-white/10 flex items-center justify-between">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-blue-200">
                সর্বমোট ব্যালেন্স
              </span>
              <p className="text-xl font-black">৳{totalAllBalances.toFixed(2)}</p>
            </div>
            <div className="flex items-center gap-1.5">
              <button
                onClick={() => {
                  onClose();
                  onOpenDeposit();
                }}
                className="press rounded-lg bg-white px-2.5 py-1.5 text-xs font-bold text-blue-700 shadow-xs flex items-center gap-1"
              >
                <PlusCircle className="h-3.5 w-3.5" />
                ডিপোজিট
              </button>
              <button
                onClick={() => {
                  onClose();
                  onOpenWithdraw();
                }}
                className="press rounded-lg bg-blue-500/50 hover:bg-blue-500 px-2.5 py-1.5 text-xs font-bold text-white border border-white/20 flex items-center gap-1"
              >
                <ArrowUpRight className="h-3.5 w-3.5" />
                উইথড্র
              </button>
            </div>
          </div>
        </div>

        {/* NAVIGATION LIST */}
        <div className="flex-1 overflow-y-auto px-4 py-4 space-y-1 text-slate-700 hide-scrollbar">
          <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 px-3 py-1">
            মেনু ও সেবা
          </div>

          <button
            onClick={() => {
              onNavigate('tasks');
              onClose();
            }}
            className="press flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-left font-semibold text-slate-800 hover:bg-slate-100 transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                <ListTodo className="h-5 w-5" />
              </div>
              <div>
                <div className="text-sm">টাস্ক ও ইনকাম জোন</div>
                <div className="text-[11px] text-slate-400 font-normal">ফেসবুক, জিমেইল ও ইনস্টাগ্রাম কাজ</div>
              </div>
            </div>
            <ChevronRight className="h-4 w-4 text-slate-400" />
          </button>

          <button
            onClick={() => {
              onNavigate('wallets');
              onClose();
            }}
            className="press flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-left font-semibold text-slate-800 hover:bg-slate-100 transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
                <Wallet className="h-5 w-5" />
              </div>
              <div>
                <div className="text-sm">সব ওয়ালেট ও ব্যালেন্স</div>
                <div className="text-[11px] text-slate-400 font-normal">FB, Mail ও Insta ওয়ালেট</div>
              </div>
            </div>
            <ChevronRight className="h-4 w-4 text-slate-400" />
          </button>

          <button
            onClick={() => {
              onOpenSpin();
              onClose();
            }}
            className="press flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-left font-semibold text-slate-800 hover:bg-amber-50/80 transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-100 text-amber-600 animate-pulse-subtle">
                <Sparkles className="h-5 w-5" />
              </div>
              <div>
                <div className="text-sm text-amber-900 font-bold flex items-center gap-1.5">
                  লাকি স্পিন হুইল
                  <span className="rounded-full bg-red-500 px-1.5 py-0.2 text-[9px] font-extrabold text-white">
                    FREE
                  </span>
                </div>
                <div className="text-[11px] text-amber-700 font-normal">দৈনিক ফ্রি বোনাস জিতুন</div>
              </div>
            </div>
            <ChevronRight className="h-4 w-4 text-amber-500" />
          </button>

          <button
            onClick={() => {
              onNavigate('refer');
              onClose();
            }}
            className="press flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-left font-semibold text-slate-800 hover:bg-slate-100 transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                <Users className="h-5 w-5" />
              </div>
              <div>
                <div className="text-sm">রেফার ও আয় করুন</div>
                <div className="text-[11px] text-slate-400 font-normal">লাইফটাইম ১০% কমিশন বোনাস</div>
              </div>
            </div>
            <ChevronRight className="h-4 w-4 text-slate-400" />
          </button>

          <button
            onClick={() => {
              onNavigate('leaderboard');
              onClose();
            }}
            className="press flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-left font-semibold text-slate-800 hover:bg-slate-100 transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-purple-50 text-purple-600">
                <Trophy className="h-5 w-5" />
              </div>
              <div>
                <div className="text-sm">লিডারবোর্ড ও সেরা আর্নার</div>
                <div className="text-[11px] text-slate-400 font-normal">আজকের শীর্ষ ইনকামকারীগণ</div>
              </div>
            </div>
            <ChevronRight className="h-4 w-4 text-slate-400" />
          </button>

          <button
            onClick={() => {
              onNavigate('history');
              onClose();
            }}
            className="press flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-left font-semibold text-slate-800 hover:bg-slate-100 transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-100 text-slate-600">
                <History className="h-5 w-5" />
              </div>
              <div>
                <div className="text-sm">লেনদেনের ইতিহাস</div>
                <div className="text-[11px] text-slate-400 font-normal">উইথড্র ও ডিপোজিট হিস্টোরি</div>
              </div>
            </div>
            <ChevronRight className="h-4 w-4 text-slate-400" />
          </button>

          <button
            onClick={() => {
              onOpenShareLink();
              onClose();
            }}
            className="press flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-left font-semibold text-slate-800 hover:bg-blue-50 transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                <Share2 className="h-5 w-5" />
              </div>
              <div>
                <div className="text-sm font-bold text-blue-900">অ্যাপ ও ওয়েবসাইট লিঙ্ক</div>
                <div className="text-[11px] text-blue-600 font-normal">Copy Link ও বন্ধুদের শেয়ার</div>
              </div>
            </div>
            <ChevronRight className="h-4 w-4 text-blue-500" />
          </button>

          <div className="pt-3">
            <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 px-3 py-1">
              সাপোর্ট ও কমিউনিটি
            </div>

            <button
              onClick={() => {
                onOpenTelegram();
                onClose();
              }}
              className="press flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-left font-semibold text-slate-800 hover:bg-sky-50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-sky-500 text-white">
                  <Send className="h-4 w-4" />
                </div>
                <div>
                  <div className="text-sm font-bold text-sky-900">অফিশিয়াল টেলিগ্রাম</div>
                  <div className="text-[11px] text-sky-600 font-normal">২৪/৭ সরাসরি হেল্প ও আপডেট</div>
                </div>
              </div>
              <ChevronRight className="h-4 w-4 text-sky-500" />
            </button>
          </div>
        </div>

        {/* FOOTER APP VERSION */}
        <div className="border-t border-slate-100 p-4 text-center">
          <div className="text-xs font-bold text-slate-500">DEZ v2.4 Mini App</div>
          <div className="text-[10px] text-slate-400">Digital Earning Zone &copy; 2026</div>
        </div>
      </div>
    </div>
  );
};
