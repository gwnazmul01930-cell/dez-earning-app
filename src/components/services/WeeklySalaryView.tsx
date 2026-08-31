import React from 'react';
import { ArrowLeft, Calendar, Trophy, Sparkles, Clock, Crown, Users } from 'lucide-react';
import { UserProfile } from '../../types';

interface WeeklySalaryViewProps {
  user: UserProfile;
  onBack: () => void;
}

export const WeeklySalaryView: React.FC<WeeklySalaryViewProps> = ({
  user,
  onBack,
}) => {
  const topEarners = [
    { rank: 1, name: 'Rakib Hasan', income: '৳ 420.00', tag: 'LEADING #1' },
    { rank: 2, name: 'Tanvir Ahmed', income: '৳ 310.50', tag: '#2' },
    { rank: 3, name: 'MD NAZMUL', income: '৳ 245.50', tag: 'YOU' },
    { rank: 4, name: 'Sabbir Hossain', income: '৳ 180.00', tag: '#4' },
  ];

  const previousWinners = [
    { week: 'Week 34 (August 2026)', winner: 'Mahfuzur Rahman', prize: '৳ 100.00' },
    { week: 'Week 33 (August 2026)', winner: 'MD Sumon', prize: '৳ 100.00' },
  ];

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
          Weekly Salary Contest
        </h1>
        <div className="w-10" />
      </div>

      {/* REWARD BANNER */}
      <div className="rounded-3xl bg-gradient-to-r from-emerald-600 to-teal-700 p-6 text-white shadow-lg text-center space-y-2">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-white/20 backdrop-blur-md border border-white/30">
          <Trophy className="h-8 w-8 text-yellow-300 fill-yellow-300" />
        </div>
        <p className="text-[11px] font-extrabold tracking-widest text-emerald-100 uppercase">
          WEEKLY REWARD AMOUNT
        </p>
        <p className="text-3xl font-black tracking-tight">৳ 100.00</p>
        <p className="text-xs text-emerald-100 font-medium">
          সপ্তাহের সর্বোচ্চ ইনকামকারীর জন্য ফিক্সড উইকলি বোনাস
        </p>
      </div>

      {/* RULES CARD */}
      <div className="rounded-3xl bg-white p-5 shadow-xs border border-slate-100 space-y-2">
        <div className="flex items-center gap-2 font-bold text-xs text-slate-800 uppercase tracking-wider">
          <Clock className="h-4 w-4 text-emerald-600" />
          <span>নিয়মাবলী:</span>
        </div>
        <p className="text-xs text-slate-600 leading-relaxed">
          প্রতি শুক্রবার রাত ১২ টায় অটোমেটিক যে সবার উপরে (Top 1) থাকবে সে এই বোনাসটি তার মেইন ব্যালেন্সে পেয়ে যাবে। নিয়মিত বেশি বেশি কাজ এবং রেফার করে নিজের লিড ধরে রাখুন।
        </p>
      </div>

      {/* USER TARGET CARD */}
      <div className="rounded-3xl bg-amber-50 p-5 border border-amber-200 text-amber-900 space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold">আপনার এই সপ্তাহের ইনকাম:</span>
          <span className="text-sm font-black text-amber-700">৳245.50</span>
        </div>
        <p className="text-[11px] text-amber-800">
          ১ নাম্বারে থাকা ইউজারের পজিশন ধরতে আপনার আরও <strong className="font-extrabold">৳174.50</strong> ইনকাম করতে হবে!
        </p>
      </div>

      {/* LIVE TOP EARNERS */}
      <div className="rounded-3xl bg-white p-5 shadow-xs border border-slate-100 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Crown className="h-4 w-4 text-amber-500" />
            <h3 className="text-xs font-extrabold text-slate-800">
              Live Top Earners (This Week)
            </h3>
          </div>
          <span className="text-[10px] font-bold bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-full border border-emerald-100">
            Active Round
          </span>
        </div>

        <div className="space-y-2">
          {topEarners.map((earner) => (
            <div
              key={earner.rank}
              className={`flex items-center justify-between p-3 rounded-2xl border transition-all ${
                earner.tag === 'YOU'
                  ? 'bg-blue-50/70 border-blue-200 font-bold'
                  : earner.rank === 1
                  ? 'bg-amber-50/50 border-amber-200'
                  : 'bg-slate-50 border-slate-100'
              }`}
            >
              <div className="flex items-center gap-3">
                <span
                  className={`flex h-7 w-7 items-center justify-center rounded-xl text-xs font-black ${
                    earner.rank === 1
                      ? 'bg-amber-500 text-white shadow-xs'
                      : earner.rank === 2
                      ? 'bg-slate-300 text-slate-700'
                      : 'bg-slate-200 text-slate-600'
                  }`}
                >
                  #{earner.rank}
                </span>
                <div>
                  <p className="text-xs font-extrabold text-slate-800">{earner.name}</p>
                  <span className="text-[9px] font-bold text-slate-400">{earner.tag}</span>
                </div>
              </div>
              <span className="text-xs font-black text-emerald-600">{earner.income}</span>
            </div>
          ))}
        </div>
      </div>

      {/* PREVIOUS WEEKLY WINNERS */}
      <div className="rounded-3xl bg-white p-5 shadow-xs border border-slate-100 space-y-3">
        <div className="flex items-center gap-2">
          <Trophy className="h-4 w-4 text-purple-600" />
          <h3 className="text-xs font-extrabold text-slate-800">
            Previous Weekly Winners
          </h3>
        </div>

        <div className="divide-y divide-slate-100">
          {previousWinners.map((pw, i) => (
            <div key={i} className="py-2.5 flex items-center justify-between text-xs">
              <div>
                <p className="font-bold text-slate-800">{pw.winner}</p>
                <p className="text-[10px] text-slate-400">{pw.week}</p>
              </div>
              <span className="font-black text-emerald-600">{pw.prize}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
