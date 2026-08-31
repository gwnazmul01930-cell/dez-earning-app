import React from 'react';
import { ArrowLeft, CalendarCheck2, Target, Trophy, Sparkles, CheckCircle2, Clock } from 'lucide-react';
import { UserProfile } from '../../types';

interface MonthlySalaryViewProps {
  user: UserProfile;
  onBack: () => void;
}

export const MonthlySalaryView: React.FC<MonthlySalaryViewProps> = ({
  user,
  onBack,
}) => {
  const levels = [
    {
      level: 1,
      reward: '৳50.00',
      reqRefer: 15,
      curRefer: 0,
      reqWork: 15,
      curWork: 0,
      reqType: 'microjob',
      color: 'border-blue-200 bg-blue-50/30',
      tagColor: 'bg-blue-600 text-white',
    },
    {
      level: 2,
      reward: '৳100.00',
      reqRefer: 25,
      curRefer: 0,
      reqIncome: 200.00,
      curIncome: 0.00,
      reqType: 'income',
      color: 'border-purple-200 bg-purple-50/30',
      tagColor: 'bg-purple-600 text-white',
    },
    {
      level: 3,
      reward: '৳300.00',
      reqRefer: 50,
      curRefer: 0,
      reqIncome: 300.00,
      curIncome: 0.00,
      reqType: 'income',
      color: 'border-amber-200 bg-amber-50/30',
      tagColor: 'bg-amber-600 text-white',
    },
    {
      level: 4,
      reward: '৳700.00',
      reqRefer: 100,
      curRefer: 0,
      reqIncome: 1000.00,
      curIncome: 0.00,
      reqType: 'income',
      color: 'border-emerald-200 bg-emerald-50/30',
      tagColor: 'bg-emerald-600 text-white',
    },
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
          Monthly Target Rewards
        </h1>
        <div className="w-10" />
      </div>

      {/* HEADER CARD */}
      <div className="rounded-3xl bg-gradient-to-r from-blue-700 via-indigo-700 to-purple-800 p-6 text-white shadow-lg space-y-2 text-center">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-white/20 backdrop-blur-md border border-white/30">
          <CalendarCheck2 className="h-8 w-8 text-white" />
        </div>
        <p className="text-[11px] font-extrabold tracking-widest text-blue-200 uppercase">
          MONTHLY TARGETS: August 2026
        </p>
        <p className="text-xl font-black">মাসিক টার্গেট বোনাস ও স্যালারি</p>
      </div>

      {/* COUNTDOWN TIMER BANNER */}
      <div className="flex items-center justify-center gap-2 rounded-2xl bg-slate-900 p-3.5 text-center text-xs font-bold text-amber-300 shadow-xs border border-slate-800">
        <Clock className="h-4 w-4 text-amber-400" />
        <span>এই মাস শেষ হতে বাকি আছে: 02 দিন 01 ঘণ্টা 52 মিনিট</span>
      </div>

      {/* TARGET TIERS */}
      <div className="space-y-3">
        {levels.map((lvl) => (
          <div
            key={lvl.level}
            className={`rounded-3xl p-5 shadow-xs border bg-white ${lvl.color} space-y-3`}
          >
            <div className="flex items-center justify-between">
              <span className={`text-xs font-black px-3 py-1 rounded-full ${lvl.tagColor}`}>
                Level {lvl.level}
              </span>
              <span className="text-lg font-black text-emerald-600">
                + {lvl.reward}
              </span>
            </div>

            <div className="space-y-2 text-xs">
              {/* REFER PROGRESS */}
              <div>
                <div className="flex justify-between font-bold text-slate-700 mb-1">
                  <span>রেফার টার্গেট</span>
                  <span>{lvl.curRefer} / {lvl.reqRefer}</span>
                </div>
                <div className="h-2 w-full rounded-full bg-slate-200 overflow-hidden">
                  <div
                    className="h-full bg-blue-600 rounded-full"
                    style={{ width: `${(lvl.curRefer / lvl.reqRefer) * 100}%` }}
                  />
                </div>
              </div>

              {/* SECOND TARGET */}
              <div>
                <div className="flex justify-between font-bold text-slate-700 mb-1">
                  <span>{lvl.reqType === 'microjob' ? 'মাইক্রোজব সম্পন্ন' : 'ইনকাম টার্গেট'}</span>
                  <span>
                    {lvl.reqType === 'microjob'
                      ? `${lvl.curWork} / ${lvl.reqWork}`
                      : `৳${lvl.curIncome?.toFixed(2)} / ৳${lvl.reqIncome?.toFixed(2)}`}
                  </span>
                </div>
                <div className="h-2 w-full rounded-full bg-slate-200 overflow-hidden">
                  <div
                    className="h-full bg-indigo-600 rounded-full"
                    style={{ width: '0%' }}
                  />
                </div>
              </div>
            </div>

            <button
              disabled
              className="w-full rounded-xl bg-slate-200/80 py-2.5 text-xs font-bold text-slate-400 cursor-not-allowed"
            >
              🔒 টার্গেট পূরণ হয়নি
            </button>
          </div>
        ))}
      </div>

      {/* RECENT WINNERS */}
      <div className="rounded-3xl bg-white p-5 shadow-xs border border-slate-100 space-y-3">
        <div className="flex items-center gap-2">
          <Trophy className="h-4 w-4 text-amber-500" />
          <h3 className="text-xs font-extrabold text-slate-800">
            Recent Target Achievers
          </h3>
        </div>
        <p className="text-xs text-slate-400 text-center py-3">
          টার্গেট পূরণ করে আপনিও বোনাস অর্জন করুন!
        </p>
      </div>
    </div>
  );
};
