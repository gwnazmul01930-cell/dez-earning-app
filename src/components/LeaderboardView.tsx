import React, { useState } from 'react';
import { Trophy, Medal, Crown, Flame, Sparkles } from 'lucide-react';
import { LeaderboardUser } from '../types';

interface LeaderboardViewProps {
  leaderboard: LeaderboardUser[];
}

export const LeaderboardView: React.FC<LeaderboardViewProps> = ({ leaderboard }) => {
  const [period, setPeriod] = useState<'today' | 'month'>('today');

  const topThree = leaderboard.slice(0, 3);
  const others = leaderboard.slice(3);

  return (
    <div className="space-y-4">
      {/* HEADER WITH TOGGLE */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-base font-extrabold text-slate-900 tracking-tight flex items-center gap-1.5">
            <Trophy className="h-5 w-5 text-amber-500" />
            <span>শীর্ষ আর্নার লিডারবোর্ড</span>
          </h2>
          <p className="text-xs text-slate-500">
            প্রতিযোগিতা করুন এবং এক্সট্রা ক্যাশ বোনাস জিতুন
          </p>
        </div>

        {/* PERIOD SWITCH */}
        <div className="flex rounded-xl bg-slate-200/70 p-1">
          <button
            onClick={() => setPeriod('today')}
            className={`rounded-lg px-2.5 py-1 text-xs font-bold transition-all ${
              period === 'today'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            আজকে
          </button>
          <button
            onClick={() => setPeriod('month')}
            className={`rounded-lg px-2.5 py-1 text-xs font-bold transition-all ${
              period === 'month'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            এই মাসে
          </button>
        </div>
      </div>

      {/* TOP 3 PODIUM */}
      <div className="grid grid-cols-3 gap-2 pt-4 items-end">
        {/* RANK 2 */}
        {topThree[1] && (
          <div className="soft-card rounded-2xl bg-white p-3 text-center border-slate-200 shadow-xs relative">
            <div className="relative mx-auto -mt-7 mb-2 h-14 w-14 rounded-full border-2 border-slate-300 overflow-hidden shadow-sm">
              <img
                src={topThree[1].avatar}
                alt={topThree[1].name}
                className="h-full w-full object-cover"
                referrerPolicy="no-referrer"
              />
              <span className="absolute bottom-0 right-0 flex h-5 w-5 items-center justify-center rounded-full bg-slate-300 text-[10px] font-black text-slate-800 shadow-xs">
                2
              </span>
            </div>
            <p className="font-extrabold text-xs text-slate-800 line-clamp-1">
              {topThree[1].name}
            </p>
            <p className="text-xs font-black text-blue-700 mt-0.5">
              ৳{topThree[1].earnings.toFixed(2)}
            </p>
            <span className="text-[9px] text-slate-400 font-bold block">
              {topThree[1].tasksDone} কাজ
            </span>
          </div>
        )}

        {/* RANK 1 (CHAMPION) */}
        {topThree[0] && (
          <div className="soft-card rounded-2xl bg-gradient-to-b from-amber-50 to-white p-3.5 text-center border-amber-300 shadow-md relative -translate-y-2">
            <Crown className="h-5 w-5 text-amber-500 mx-auto -mb-1 animate-bounce" />
            <div className="relative mx-auto -mt-1 mb-2 h-16 w-16 rounded-full border-2 border-amber-400 overflow-hidden shadow-md">
              <img
                src={topThree[0].avatar}
                alt={topThree[0].name}
                className="h-full w-full object-cover"
                referrerPolicy="no-referrer"
              />
              <span className="absolute bottom-0 right-0 flex h-6 w-6 items-center justify-center rounded-full bg-amber-400 text-xs font-black text-slate-950 shadow-xs">
                1
              </span>
            </div>
            <p className="font-black text-xs text-slate-900 line-clamp-1">
              {topThree[0].name}
            </p>
            <p className="text-sm font-black text-emerald-600 mt-0.5">
              ৳{topThree[0].earnings.toFixed(2)}
            </p>
            <span className="text-[10px] text-amber-700 font-extrabold block">
              {topThree[0].tasksDone} কাজ সম্পন্ন
            </span>
          </div>
        )}

        {/* RANK 3 */}
        {topThree[2] && (
          <div className="soft-card rounded-2xl bg-white p-3 text-center border-amber-100 shadow-xs relative">
            <div className="relative mx-auto -mt-7 mb-2 h-14 w-14 rounded-full border-2 border-amber-600/40 overflow-hidden shadow-sm">
              <img
                src={topThree[2].avatar}
                alt={topThree[2].name}
                className="h-full w-full object-cover"
                referrerPolicy="no-referrer"
              />
              <span className="absolute bottom-0 right-0 flex h-5 w-5 items-center justify-center rounded-full bg-amber-700 text-[10px] font-black text-white shadow-xs">
                3
              </span>
            </div>
            <p className="font-extrabold text-xs text-slate-800 line-clamp-1">
              {topThree[2].name}
            </p>
            <p className="text-xs font-black text-blue-700 mt-0.5">
              ৳{topThree[2].earnings.toFixed(2)}
            </p>
            <span className="text-[9px] text-slate-400 font-bold block">
              {topThree[2].tasksDone} কাজ
            </span>
          </div>
        )}
      </div>

      {/* OTHER RANKS LIST */}
      <div className="space-y-2">
        {others.map((user) => (
          <div
            key={user.rank}
            className={`soft-card flex items-center justify-between rounded-2xl p-3 transition-all ${
              user.isCurrentUser
                ? 'bg-blue-50/70 border-blue-300 shadow-xs'
                : 'bg-white'
            }`}
          >
            <div className="flex items-center gap-3">
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-xs font-extrabold text-slate-700">
                #{user.rank}
              </span>

              <img
                src={user.avatar}
                alt={user.name}
                className="h-10 w-10 rounded-full object-cover border border-slate-200"
                referrerPolicy="no-referrer"
              />

              <div>
                <div className="flex items-center gap-1.5">
                  <span className="text-xs font-extrabold text-slate-900">
                    {user.name}
                  </span>
                  {user.isCurrentUser && (
                    <span className="rounded-md bg-blue-600 px-1.5 py-0.2 text-[9px] font-bold text-white">
                      YOU
                    </span>
                  )}
                </div>
                <span className="text-[11px] text-slate-400">
                  {user.tasksDone} টি সফল কাজ
                </span>
              </div>
            </div>

            <div className="text-right">
              <div className="text-sm font-black text-slate-900">
                ৳{user.earnings.toFixed(2)}
              </div>
              <span className="text-[10px] text-emerald-600 font-bold">
                ক্যাশ আর্নিং
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
