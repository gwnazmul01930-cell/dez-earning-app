import React from 'react';
import { ArrowLeft, Target, Trophy, Award, Sparkles, Share2, AlertCircle } from 'lucide-react';
import { UserProfile } from '../../types';

interface MonthlyMegaBonusViewProps {
  user: UserProfile;
  onBack: () => void;
  onOpenReferral: () => void;
}

export const MonthlyMegaBonusView: React.FC<MonthlyMegaBonusViewProps> = ({
  user,
  onBack,
  onOpenReferral,
}) => {
  const currentReferrals = 0;
  const targetReferrals = 50;
  const bonusAmount = '60.00';
  const progressPercent = Math.min(100, Math.round((currentReferrals / targetReferrals) * 100));

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
          Monthly Mega Bonus
        </h1>
        <div className="w-10" />
      </div>

      {/* HERO CARD */}
      <div className="rounded-3xl bg-gradient-to-br from-amber-500 via-orange-500 to-rose-600 p-6 text-white shadow-lg text-center space-y-2">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-white/20 backdrop-blur-md border border-white/30">
          <Trophy className="h-9 w-9 text-yellow-200 fill-yellow-200/30" />
        </div>
        <h2 className="text-xl font-black">Monthly Mega Bonus</h2>
        <p className="text-xs text-amber-100 font-medium max-w-xs mx-auto leading-relaxed">
          ৩০ দিনে ৫০টি রেফারেল আইডি অ্যাক্টিভ করলেই পাচ্ছেন বিশেষ বোনাস!
        </p>
        <div className="pt-2">
          <span className="inline-block rounded-2xl bg-white/20 px-4 py-1.5 text-2xl font-black backdrop-blur-md">
            ৳{bonusAmount}
          </span>
        </div>
      </div>

      {/* PROGRESS CARD */}
      <div className="rounded-3xl bg-white p-5 shadow-xs border border-slate-100 space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-xs font-extrabold text-slate-800">
            Progress: {currentReferrals} / {targetReferrals} ({progressPercent}%)
          </span>
          <span className="text-[10px] font-bold text-orange-600 bg-orange-50 px-2 py-0.5 rounded-full border border-orange-100">
            30 Days Window
          </span>
        </div>

        <div className="h-3.5 w-full overflow-hidden rounded-full bg-slate-100 p-0.5">
          <div
            className="h-full rounded-full bg-gradient-to-r from-orange-400 to-rose-500 transition-all duration-500"
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        <div className="rounded-2xl bg-orange-50 p-3 text-center border border-orange-100 text-xs font-bold text-orange-900">
          ⚠️ বোনাস ক্লেইম করতে আরো {targetReferrals - currentReferrals}টি একটিভ রেফার প্রয়োজন
        </div>

        <button
          disabled
          className="w-full rounded-2xl bg-slate-200 py-3.5 text-xs font-black text-slate-400 cursor-not-allowed"
        >
          NOT ELIGIBLE YET (🔒 লক করা)
        </button>

        <button
          onClick={onOpenReferral}
          className="press flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 py-3.5 text-xs font-black text-white shadow-md hover:from-blue-700 hover:to-indigo-700"
        >
          <Share2 className="h-4 w-4" />
          <span>রেফার লিংক শেয়ার করুন</span>
        </button>
      </div>
    </div>
  );
};
