import React from 'react';
import { Crown, Users, ArrowLeft, Zap, ShieldCheck, Share2, Sparkles, CheckCircle2 } from 'lucide-react';
import { UserProfile } from '../../types';

interface LeadershipViewProps {
  user: UserProfile;
  onBack: () => void;
  onOpenReferral: () => void;
  onNavigate: (tab: string) => void;
}

export const LeadershipView: React.FC<LeadershipViewProps> = ({
  user,
  onBack,
  onOpenReferral,
  onNavigate,
}) => {
  const activeReferrals = 0;
  const targetReferrals = 15;
  const progressPercent = Math.min(100, Math.round((activeReferrals / targetReferrals) * 100));

  return (
    <div className="space-y-4 pb-20">
      {/* TOP BAR */}
      <div className="flex items-center justify-between">
        <button
          onClick={onBack}
          className="press flex h-10 w-10 items-center justify-center rounded-xl bg-white text-slate-700 shadow-xs border border-slate-200"
        >
          <ArrowLeft className="h-5 w-5" />
        </button>
        <h1 className="text-base font-extrabold text-slate-800">
          Leadership Program
        </h1>
        <div className="w-10" />
      </div>

      {/* HEADER HERO CARD */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-amber-500 via-amber-600 to-yellow-600 p-6 text-white shadow-lg text-center">
        <div className="mx-auto mb-3 flex h-16 w-16 items-center justify-center rounded-2xl bg-white/20 backdrop-blur-md border border-white/30 shadow-inner">
          <Crown className="h-9 w-9 text-white fill-white/30" />
        </div>
        <h2 className="text-xl font-black tracking-tight">Leadership Program</h2>
        <p className="mt-1 text-xs text-amber-100 font-medium max-w-xs mx-auto leading-relaxed">
          নতুন মেম্বার রেফার করুন এবং লিডার হয়ে স্পেশাল কমিশন উপভোগ করুন!
        </p>
      </div>

      {/* PROGRESS CARD */}
      <div className="rounded-3xl bg-white p-5 shadow-xs border border-slate-100 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4 text-amber-600" />
            <span className="text-xs font-bold text-slate-700">Active Referrals</span>
          </div>
          <span className="text-xs font-black text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-100">
            {activeReferrals} / {targetReferrals}
          </span>
        </div>

        {/* PROGRESS BAR */}
        <div className="h-3 w-full overflow-hidden rounded-full bg-slate-100 p-0.5">
          <div
            className="h-full rounded-full bg-gradient-to-r from-amber-400 to-amber-600 transition-all duration-500"
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        <div className="rounded-2xl bg-amber-50/60 p-3 border border-amber-100/80 text-[11px] text-amber-900 leading-relaxed font-medium">
          ⚠️ লিডারশিপে জয়েন করতে আরো {targetReferrals - activeReferrals} টি নতুন 'অ্যাক্টিভ' রেফার লাগবে।
        </div>
      </div>

      {/* COMMISSION BENEFITS */}
      <div className="rounded-3xl bg-white p-5 shadow-xs border border-slate-100 space-y-3">
        <div className="flex items-center gap-2">
          <Zap className="h-4 w-4 text-blue-600" />
          <h3 className="text-xs font-black uppercase tracking-wider text-slate-800">
            লিডারশিপ কমিশন সুবিধা:
          </h3>
        </div>

        <div className="flex items-center justify-between rounded-2xl bg-slate-50 p-3.5 border border-slate-100">
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-blue-100 text-blue-600">
              <ShieldCheck className="h-4 w-4" />
            </div>
            <div>
              <p className="text-xs font-extrabold text-slate-800">All Services (Global)</p>
              <p className="text-[10px] text-slate-400">প্রতিটি সার্ভিসের অর্ডারে এক্সট্রা বোনাস</p>
            </div>
          </div>
          <span className="text-xs font-black text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-100">
            +10% Extra
          </span>
        </div>
      </div>

      {/* ACTIONS */}
      <div className="space-y-2.5 pt-2">
        <button
          disabled
          className="w-full rounded-2xl bg-slate-200 py-3.5 text-xs font-black text-slate-400 cursor-not-allowed uppercase tracking-wider"
        >
          TARGET NOT COMPLETED (🔒 লক করা)
        </button>

        <button
          onClick={onOpenReferral}
          className="press flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-600 py-3.5 text-xs font-black text-white shadow-md hover:from-emerald-600 hover:to-teal-700"
        >
          <Share2 className="h-4 w-4" />
          <span>বেশি বেশি রেফার করুন</span>
        </button>
      </div>

      {/* QUICK LINKS */}
      <div className="pt-4 border-t border-slate-100">
        <h4 className="text-[11px] font-black uppercase tracking-wider text-slate-400 mb-2.5">
          Quick Links
        </h4>
        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={() => onNavigate('home')}
            className="rounded-xl bg-slate-50 p-2.5 text-left text-xs font-bold text-slate-700 hover:bg-blue-50 hover:text-blue-600 transition-colors border border-slate-100"
          >
            Dashboard
          </button>
          <button
            onClick={() => onNavigate('microjob')}
            className="rounded-xl bg-slate-50 p-2.5 text-left text-xs font-bold text-slate-700 hover:bg-blue-50 hover:text-blue-600 transition-colors border border-slate-100"
          >
            Available Jobs
          </button>
          <button
            onClick={() => onNavigate('job-post')}
            className="rounded-xl bg-slate-50 p-2.5 text-left text-xs font-bold text-slate-700 hover:bg-blue-50 hover:text-blue-600 transition-colors border border-slate-100"
          >
            Post New Job
          </button>
          <button
            onClick={() => onNavigate('refer-earn')}
            className="rounded-xl bg-slate-50 p-2.5 text-left text-xs font-bold text-slate-700 hover:bg-blue-50 hover:text-blue-600 transition-colors border border-slate-100"
          >
            Refer & Earn
          </button>
        </div>
      </div>
    </div>
  );
};
