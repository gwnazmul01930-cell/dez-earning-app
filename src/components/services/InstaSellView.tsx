import React, { useState } from 'react';
import { ArrowLeft, Instagram, AlertTriangle, Send, History, Clock } from 'lucide-react';
import { UserProfile } from '../../types';

interface InstaSellViewProps {
  user: UserProfile;
  onBack: () => void;
  onSubmitInsta: (details: any) => void;
}

export const InstaSellView: React.FC<InstaSellViewProps> = ({
  user,
  onBack,
  onSubmitInsta,
}) => {
  const todayRate = '4.20';
  const isSubmissionOpen = false; // Closed as per screenshot

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [twoFactorKey, setTwoFactorKey] = useState('');

  const [submissions, setSubmissions] = useState<Array<{ id: string; username: string; date: string; status: string; price: string }>>([
    {
      id: 'inst-1',
      username: 'itz_nazmul_01',
      date: 'Yesterday, 06:15 PM',
      status: 'Approved',
      price: `৳${todayRate}`,
    }
  ]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!username || !password) {
      alert('ইনস্টাগ্রাম ইউজারনেম এবং পাসওয়ার্ড দিন!');
      return;
    }

    const newSub = {
      id: `inst-${Date.now()}`,
      username,
      date: 'Just now',
      status: 'Pending',
      price: `৳${todayRate}`,
    };

    setSubmissions([newSub, ...submissions]);
    onSubmitInsta({ username, password, twoFactorKey });
    setUsername('');
    setPassword('');
    setTwoFactorKey('');
  };

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
          Instagram Account Sell
        </h1>
        <div className="w-10" />
      </div>

      {/* 24-HR REPORT TIME PILL */}
      <div className="flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-pink-500 to-rose-500 p-3 text-center text-xs font-bold text-white shadow-xs">
        <Clock className="h-4 w-4" />
        <span>রিপোর্ট টাইম ২৪ ঘণ্টা</span>
      </div>

      {/* STATUS ALERT */}
      {!isSubmissionOpen && (
        <div className="rounded-2xl bg-rose-50 p-4 border border-rose-200 text-rose-800 space-y-1">
          <div className="flex items-center gap-2 font-bold text-sm">
            <AlertTriangle className="h-4 w-4 text-rose-600" />
            <span>নোটিশ:</span>
          </div>
          <p className="text-xs text-rose-700 leading-relaxed">
            বর্তমানে ইনস্টাগ্রাম আইডি জমা দেওয়া বন্ধ আছে! পুনরায় শুরু হলে নোটিফিকেশনের মাধ্যমে জানিয়ে দেওয়া হবে।
          </p>
        </div>
      )}

      {/* STATS CARDS */}
      <div className="grid grid-cols-2 gap-2.5">
        <div className="rounded-2xl bg-white p-4 shadow-xs border border-slate-100 text-center">
          <p className="text-[10px] font-black uppercase tracking-wider text-slate-400">
            TODAY RATE
          </p>
          <p className="text-xl font-black text-pink-600 mt-1">৳ {todayRate}</p>
        </div>
        <div className="rounded-2xl bg-white p-4 shadow-xs border border-slate-100 text-center">
          <p className="text-[10px] font-black uppercase tracking-wider text-slate-400">
            SUBMISSION
          </p>
          <p className="text-xl font-black text-slate-800 mt-1">
            {submissions.length} / 500
          </p>
        </div>
      </div>

      {/* SUBMISSION FORM */}
      <div className="rounded-3xl bg-white p-5 shadow-xs border border-slate-100 space-y-4">
        <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
          <Instagram className="h-5 w-5 text-pink-600" />
          <h2 className="text-sm font-extrabold text-slate-800">
            Instagram ID Details
          </h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <label className="block text-[11px] font-bold text-slate-600 mb-1">
              Instagram Username *
            </label>
            <input
              type="text"
              required
              placeholder="e.g. nazmul_official_dez"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-xs font-medium text-slate-800 placeholder-slate-400 focus:border-pink-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-[11px] font-bold text-slate-600 mb-1">
              Account Password *
            </label>
            <input
              type="password"
              required
              placeholder="Enter Instagram password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-xs font-medium text-slate-800 placeholder-slate-400 focus:border-pink-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-[11px] font-bold text-slate-600 mb-1">
              2FA Key / Codes (Optional)
            </label>
            <input
              type="text"
              placeholder="2FA secret key or 8-digit backup codes"
              value={twoFactorKey}
              onChange={(e) => setTwoFactorKey(e.target.value)}
              className="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-xs font-medium text-slate-800 placeholder-slate-400 focus:border-pink-500 focus:outline-none"
            />
          </div>

          <button
            type="submit"
            disabled={!isSubmissionOpen}
            className={`press flex w-full items-center justify-center gap-2 rounded-2xl py-3 text-xs font-black text-white shadow-md transition-all ${
              isSubmissionOpen
                ? 'bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-700 hover:to-rose-700'
                : 'bg-slate-300 cursor-not-allowed text-slate-500'
            }`}
          >
            <Send className="h-4 w-4" />
            <span>SUBMIT ACCOUNT NOW</span>
          </button>
        </form>
      </div>

      {/* RECENT SUBMISSIONS */}
      <div className="rounded-3xl bg-white p-5 shadow-xs border border-slate-100 space-y-3">
        <div className="flex items-center gap-2">
          <History className="h-4 w-4 text-slate-500" />
          <h3 className="text-xs font-extrabold text-slate-800">
            সাম্প্রতিক সাবমিশন
          </h3>
        </div>

        <div className="divide-y divide-slate-100">
          {submissions.map((sub) => (
            <div key={sub.id} className="py-2.5 flex items-center justify-between text-xs">
              <div>
                <p className="font-bold text-slate-800">@{sub.username}</p>
                <p className="text-[10px] text-slate-400">{sub.date}</p>
              </div>
              <div className="text-right">
                <span className="inline-block rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-bold text-emerald-700 border border-emerald-100">
                  {sub.status}
                </span>
                <p className="text-[11px] font-extrabold text-pink-600 mt-0.5">{sub.price}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
