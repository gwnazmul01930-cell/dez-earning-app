import React from 'react';
import { Sparkles, CalendarCheck, Users, Send, CheckCircle2 } from 'lucide-react';

interface QuickActionsProps {
  hasCheckedInToday: boolean;
  onDailyCheckIn: () => void;
  onOpenSpin: () => void;
  onOpenReferral: () => void;
  onOpenTelegram: () => void;
}

export const QuickActions: React.FC<QuickActionsProps> = ({
  hasCheckedInToday,
  onDailyCheckIn,
  onOpenSpin,
  onOpenReferral,
  onOpenTelegram,
}) => {
  return (
    <section className="space-y-2.5">
      <div className="flex items-center justify-between">
        <h2 className="text-xs font-black uppercase tracking-wider text-slate-400">
          স্পেশাল রিওয়ার্ড ও ফিচার
        </h2>
        <span className="text-[11px] font-bold text-blue-600">প্রতিদিনের বোনাস</span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
        {/* DAILY CHECKIN */}
        <button
          onClick={onDailyCheckIn}
          disabled={hasCheckedInToday}
          className={`press soft-card rounded-2xl p-3 text-left transition-all border ${
            hasCheckedInToday
              ? 'bg-slate-50 border-slate-200 opacity-80 cursor-default'
              : 'bg-white border-emerald-100 hover:border-emerald-300 hover:bg-emerald-50/30'
          }`}
        >
          <div className="flex items-center justify-between mb-2">
            <div
              className={`flex h-8 w-8 items-center justify-center rounded-xl ${
                hasCheckedInToday
                  ? 'bg-emerald-100 text-emerald-600'
                  : 'bg-emerald-500 text-white shadow-xs'
              }`}
            >
              {hasCheckedInToday ? (
                <CheckCircle2 className="h-4 w-4" />
              ) : (
                <CalendarCheck className="h-4 w-4" />
              )}
            </div>
            <span
              className={`text-[9px] font-extrabold px-1.5 py-0.5 rounded-full ${
                hasCheckedInToday
                  ? 'bg-slate-200 text-slate-600'
                  : 'bg-emerald-100 text-emerald-700'
              }`}
            >
              {hasCheckedInToday ? 'সম্পন্ন' : '+৳১.৫০'}
            </span>
          </div>
          <div className="text-xs font-extrabold text-slate-800">
            {hasCheckedInToday ? 'চেক-ইন সম্পন্ন' : 'দৈনিক চেক-ইন'}
          </div>
          <div className="text-[10px] text-slate-400 mt-0.5">
            {hasCheckedInToday ? 'আগামীকাল আবার আসুন' : 'আজকের বোনাস নিন'}
          </div>
        </button>

        {/* LUCKY SPIN */}
        <button
          onClick={onOpenSpin}
          className="press soft-card rounded-2xl bg-white p-3 text-left border-amber-100 hover:border-amber-300 hover:bg-amber-50/30 transition-all group"
        >
          <div className="flex items-center justify-between mb-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-amber-500 text-white shadow-xs group-hover:rotate-45 transition-transform">
              <Sparkles className="h-4 w-4" />
            </div>
            <span className="text-[9px] font-extrabold px-1.5 py-0.5 rounded-full bg-amber-100 text-amber-800">
              ফ্রি স্পিন
            </span>
          </div>
          <div className="text-xs font-extrabold text-slate-800">লাকি স্পিন হুইল</div>
          <div className="text-[10px] text-amber-600 font-medium mt-0.5">
            ৳৫০ পর্যন্ত জিতুন
          </div>
        </button>

        {/* REFERRAL */}
        <button
          onClick={onOpenReferral}
          className="press soft-card rounded-2xl bg-white p-3 text-left border-indigo-100 hover:border-indigo-300 hover:bg-indigo-50/30 transition-all"
        >
          <div className="flex items-center justify-between mb-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-indigo-600 text-white shadow-xs">
              <Users className="h-4 w-4" />
            </div>
            <span className="text-[9px] font-extrabold px-1.5 py-0.5 rounded-full bg-indigo-100 text-indigo-700">
              ১০% কমিশন
            </span>
          </div>
          <div className="text-xs font-extrabold text-slate-800">রেফার ও আয়</div>
          <div className="text-[10px] text-slate-400 mt-0.5">বন্ধু ইনভাইট করুন</div>
        </button>

        {/* TELEGRAM */}
        <button
          onClick={onOpenTelegram}
          className="press soft-card rounded-2xl bg-white p-3 text-left border-sky-100 hover:border-sky-300 hover:bg-sky-50/30 transition-all"
        >
          <div className="flex items-center justify-between mb-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-sky-500 text-white shadow-xs">
              <Send className="h-4 w-4" />
            </div>
            <span className="text-[9px] font-extrabold px-1.5 py-0.5 rounded-full bg-sky-100 text-sky-700">
              অফিশিয়াল
            </span>
          </div>
          <div className="text-xs font-extrabold text-slate-800">টেলিগ্রাম চ্যানেল</div>
          <div className="text-[10px] text-sky-600 font-medium mt-0.5">
            সব আপডেট সবার আগে
          </div>
        </button>
      </div>
    </section>
  );
};
