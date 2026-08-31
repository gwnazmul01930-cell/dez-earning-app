import React from 'react';
import {
  X,
  Home,
  Wallet,
  PlusCircle,
  Banknote,
  Briefcase,
  SquarePen,
  ListChecks,
  Users,
  Trophy,
  LogOut,
} from 'lucide-react';
import { UserProfile } from '../types';

interface DrawerMenuProps {
  isOpen: boolean;
  onClose: () => void;
  user: UserProfile;
  activeTab?: string;
  onNavigate: (tab: string) => void;
  onOpenDeposit: () => void;
  onOpenWithdraw: () => void;
  onSignOut?: () => void;
}

export const DrawerMenu: React.FC<DrawerMenuProps> = ({
  isOpen,
  onClose,
  user,
  activeTab = 'home',
  onNavigate,
  onOpenDeposit,
  onOpenWithdraw,
  onSignOut,
}) => {
  if (!isOpen) return null;

  const handleAction = (callback: () => void) => {
    onClose();
    callback();
  };

  return (
    <div className="fixed inset-0 z-50 flex">
      {/* BACKDROP */}
      <div
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity duration-200"
        onClick={onClose}
      />

      {/* DRAWER CONTENT */}
      <div className="relative z-10 flex h-full w-[76%] max-w-xs flex-col bg-white shadow-2xl animate-in slide-in-from-left duration-200">
        
        {/* TOP PROFILE HEADER MATCHING SCREENSHOT */}
        <div className="relative pt-6 pb-4 px-5 text-center border-b border-slate-100">
          {/* Close button top right */}
          <button
            onClick={onClose}
            className="press absolute top-4 right-4 flex h-8 w-8 items-center justify-center rounded-full bg-slate-100/80 text-slate-500 hover:bg-slate-200 transition-colors"
            aria-label="Close menu"
          >
            <X className="h-4 w-4 stroke-[2.5]" />
          </button>

          {/* Centered Avatar with emerald ring border */}
          <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full border-2 border-emerald-400 p-1 bg-white shadow-xs">
            <div className="h-full w-full rounded-full overflow-hidden bg-gradient-to-b from-sky-100 to-sky-200 flex items-center justify-center">
              {user.avatar ? (
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="h-full w-full object-cover"
                  referrerPolicy="no-referrer"
                />
              ) : (
                <div className="flex flex-col items-center justify-center">
                  <div className="h-9 w-9 rounded-full bg-slate-700 mt-2"></div>
                  <div className="h-8 w-14 rounded-t-full bg-blue-600 mt-0.5 flex items-center justify-center">
                    <div className="w-2 h-4 bg-red-500"></div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* User Name */}
          <h2 className="mt-3 text-base font-extrabold tracking-wide text-slate-800 uppercase">
            {user.name || 'MD NAZMUL'}
          </h2>

          {/* Verified Member Badge */}
          <div className="mt-2 inline-flex items-center gap-1 rounded-full border border-emerald-300 bg-emerald-50 px-3.5 py-0.5 text-xs font-semibold text-emerald-600">
            Verified Member
          </div>
        </div>

        {/* NAVIGATION LIST MATCHING SCREENSHOT */}
        <div className="flex-1 overflow-y-auto py-2 text-slate-700 hide-scrollbar space-y-1">
          
          {/* 1. DASHBOARD */}
          <button
            onClick={() => handleAction(() => onNavigate('home'))}
            className={`press flex w-full items-center gap-3.5 px-6 py-3 text-left transition-colors ${
              activeTab === 'home'
                ? 'border-l-4 border-blue-600 bg-blue-50/80 font-bold text-blue-600'
                : 'font-semibold text-slate-700 hover:bg-slate-50'
            }`}
          >
            <Home
              className={`h-5 w-5 ${
                activeTab === 'home'
                  ? 'text-blue-600 fill-blue-600'
                  : 'text-slate-500'
              }`}
            />
            <span className="text-sm">Dashboard</span>
          </button>

          {/* 2. MY WALLET SECTION */}
          <div className="pt-2">
            <div className="px-6 py-1.5 text-[11px] font-extrabold uppercase tracking-wider text-slate-400">
              MY WALLET
            </div>

            {/* Wallet & History */}
            <button
              onClick={() => handleAction(() => onNavigate('wallets'))}
              className={`press flex w-full items-center gap-3.5 px-6 py-2.5 text-left transition-colors ${
                activeTab === 'wallets' || activeTab === 'history'
                  ? 'border-l-4 border-blue-600 bg-blue-50/80 font-bold text-blue-600'
                  : 'font-semibold text-slate-700 hover:bg-slate-50'
              }`}
            >
              <Wallet className="h-5 w-5 text-slate-500" />
              <span className="text-sm">Wallet & History</span>
            </button>

            {/* Add Funds */}
            <button
              onClick={() => handleAction(onOpenDeposit)}
              className="press flex w-full items-center gap-3.5 px-6 py-2.5 text-left font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
            >
              <PlusCircle className="h-5 w-5 text-slate-500" />
              <span className="text-sm">Add Funds</span>
            </button>

            {/* Withdraw Money */}
            <button
              onClick={() => handleAction(onOpenWithdraw)}
              className={`press flex w-full items-center gap-3.5 px-6 py-2.5 text-left transition-colors ${
                activeTab === 'withdraw-funds'
                  ? 'border-l-4 border-blue-600 bg-blue-50/80 font-bold text-blue-600'
                  : 'font-semibold text-slate-700 hover:bg-slate-50'
              }`}
            >
              <Banknote className="h-5 w-5 text-slate-500" />
              <span className="text-sm">Withdraw Money</span>
            </button>
          </div>

          {/* 3. JOBS & TASK SECTION */}
          <div className="pt-2">
            <div className="px-6 py-1.5 text-[11px] font-extrabold uppercase tracking-wider text-slate-400">
              JOBS & TASK
            </div>

            {/* Microjobs */}
            <button
              onClick={() => handleAction(() => onNavigate('microjob'))}
              className={`press flex w-full items-center gap-3.5 px-6 py-2.5 text-left transition-colors ${
                activeTab === 'microjob' || activeTab === 'tasks'
                  ? 'border-l-4 border-blue-600 bg-blue-50/80 font-bold text-blue-600'
                  : 'font-semibold text-slate-700 hover:bg-slate-50'
              }`}
            >
              <Briefcase className="h-5 w-5 text-slate-500" />
              <span className="text-sm">Microjobs</span>
            </button>

            {/* Post New Job */}
            <button
              onClick={() => handleAction(() => onNavigate('job-post'))}
              className={`press flex w-full items-center gap-3.5 px-6 py-2.5 text-left transition-colors ${
                activeTab === 'job-post'
                  ? 'border-l-4 border-blue-600 bg-blue-50/80 font-bold text-blue-600'
                  : 'font-semibold text-slate-700 hover:bg-slate-50'
              }`}
            >
              <SquarePen className="h-5 w-5 text-slate-500" />
              <span className="text-sm">Post New Job</span>
            </button>

            {/* Manage My Jobs */}
            <button
              onClick={() => handleAction(() => onNavigate('job-post'))}
              className="press flex w-full items-center gap-3.5 px-6 py-2.5 text-left font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
            >
              <ListChecks className="h-5 w-5 text-slate-500" />
              <span className="text-sm">Manage My Jobs</span>
            </button>
          </div>

          {/* 4. AFFILIATE PROGRAM SECTION */}
          <div className="pt-2">
            <div className="px-6 py-1.5 text-[11px] font-extrabold uppercase tracking-wider text-slate-400">
              AFFILIATE PROGRAM
            </div>

            {/* Refer & Earn */}
            <button
              onClick={() => handleAction(() => onNavigate('refer'))}
              className={`press flex w-full items-center gap-3.5 px-6 py-2.5 text-left transition-colors ${
                activeTab === 'refer'
                  ? 'border-l-4 border-blue-600 bg-blue-50/80 font-bold text-blue-600'
                  : 'font-semibold text-slate-700 hover:bg-slate-50'
              }`}
            >
              <Users className="h-5 w-5 text-slate-500" />
              <span className="text-sm">Refer & Earn</span>
            </button>

            {/* Leadership Club */}
            <button
              onClick={() => handleAction(() => onNavigate('leadership'))}
              className={`press flex w-full items-center gap-3.5 px-6 py-2.5 text-left transition-colors ${
                activeTab === 'leadership'
                  ? 'border-l-4 border-blue-600 bg-blue-50/80 font-bold text-blue-600'
                  : 'font-semibold text-slate-700 hover:bg-slate-50'
              }`}
            >
              <Trophy className="h-5 w-5 text-amber-500 fill-amber-500/20" />
              <span className="text-sm">Leadership Club</span>
            </button>
          </div>

          {/* 5. SIGN OUT BUTTON */}
          <div className="pt-4 pb-6">
            <button
              onClick={() =>
                handleAction(() => {
                  if (onSignOut) {
                    onSignOut();
                  } else {
                    onNavigate('home');
                  }
                })
              }
              className="press flex w-full items-center gap-3.5 px-6 py-3 text-left font-bold text-red-500 hover:bg-red-50 transition-colors"
            >
              <LogOut className="h-5 w-5 text-red-500" />
              <span className="text-sm">Sign Out</span>
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};
