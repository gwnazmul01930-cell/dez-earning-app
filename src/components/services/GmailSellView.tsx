import React, { useState } from 'react';
import { ArrowLeft, Mail, Copy, Check, Send, History, Sparkles, Clock, AlertCircle } from 'lucide-react';
import { UserProfile } from '../../types';

interface GmailSellViewProps {
  user: UserProfile;
  onBack: () => void;
  onSubmitGmail: (details: { email: string; password: string }) => void;
}

export const GmailSellView: React.FC<GmailSellViewProps> = ({
  user,
  onBack,
  onSubmitGmail,
}) => {
  const dailyPassword = 'Digital28';
  const todayRate = '20';
  const [copied, setCopied] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState(dailyPassword);

  const [submissions, setSubmissions] = useState<Array<{ id: string; email: string; date: string; status: string; price: string }>>([
    {
      id: 'g-1',
      email: 'workdez.user89@gmail.com',
      date: 'Today, 11:20 AM',
      status: 'In Review',
      price: `৳${todayRate}.00`,
    }
  ]);

  const handleCopyPassword = () => {
    navigator.clipboard.writeText(dailyPassword);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@gmail.com')) {
      alert('সঠিক জিমেইল ঠিকানা দিন! (e.g. yourname@gmail.com)');
      return;
    }

    const newSub = {
      id: `g-${Date.now()}`,
      email,
      date: 'Just now',
      status: 'In Review',
      price: `৳${todayRate}.00`,
    };

    setSubmissions([newSub, ...submissions]);
    onSubmitGmail({ email, password });
    setEmail('');
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
          Gmail Account Sell
        </h1>
        <div className="w-10" />
      </div>

      {/* 24-HR REPORT TIME PILL */}
      <div className="flex items-center justify-center gap-2 rounded-2xl bg-rose-500 p-3 text-center text-xs font-bold text-white shadow-xs">
        <Clock className="h-4 w-4" />
        <span>রিপোর্ট টাইম ২৪ ঘণ্টা (ভেরিফিকেশন সম্পন্ন হলে ওয়ালেটে জমা হবে)</span>
      </div>

      {/* TODAY'S MANDATORY PASSWORD CARD */}
      <div className="rounded-3xl bg-gradient-to-br from-indigo-900 to-slate-900 p-5 text-white shadow-lg space-y-2">
        <p className="text-[11px] font-bold text-indigo-200">
          আজকে এই পাসওয়ার্ড দিয়ে অ্যাকাউন্ট খুলে সাবমিট করবেন:
        </p>
        <div className="flex items-center justify-between rounded-2xl bg-white/10 p-3 backdrop-blur-md border border-white/20">
          <span className="font-mono text-lg font-black tracking-widest text-amber-300">
            {dailyPassword}
          </span>
          <button
            onClick={handleCopyPassword}
            className="press flex items-center gap-1.5 rounded-xl bg-white px-3 py-1.5 text-xs font-black text-slate-900 shadow-sm hover:bg-slate-100 transition-colors"
          >
            {copied ? (
              <>
                <Check className="h-3.5 w-3.5 text-emerald-600" />
                <span className="text-emerald-700">কপি হয়েছে!</span>
              </>
            ) : (
              <>
                <Copy className="h-3.5 w-3.5" />
                <span>COPY PASSWORD</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* STATS CARDS */}
      <div className="grid grid-cols-2 gap-2.5">
        <div className="rounded-2xl bg-white p-4 shadow-xs border border-slate-100 text-center">
          <p className="text-[10px] font-black uppercase tracking-wider text-slate-400">
            TODAY RATE
          </p>
          <p className="text-xl font-black text-rose-600 mt-1">৳ {todayRate}</p>
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
          <Mail className="h-5 w-5 text-red-500" />
          <h2 className="text-sm font-extrabold text-slate-800">
            Gmail Account Submission
          </h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <label className="block text-[11px] font-bold text-slate-600 mb-1">
              Gmail Address *
            </label>
            <input
              type="email"
              required
              placeholder="e.g. nazmul.dez28@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-xs font-medium text-slate-800 placeholder-slate-400 focus:border-red-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-[11px] font-bold text-slate-600 mb-1">
              Gmail Password (নিচের পাসওয়ার্ড ব্যবহার করুন)
            </label>
            <input
              type="text"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-xs font-medium text-slate-800 bg-slate-50 focus:border-red-500 focus:outline-none"
            />
          </div>

          <button
            type="submit"
            className="press flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-red-600 to-rose-600 py-3 text-xs font-black text-white shadow-md hover:from-red-700 hover:to-rose-700"
          >
            <Send className="h-4 w-4" />
            <span>SUBMIT GMAIL NOW</span>
          </button>
        </form>
      </div>

      {/* RECENT SUBMISSION HISTORY */}
      <div className="rounded-3xl bg-white p-5 shadow-xs border border-slate-100 space-y-3">
        <div className="flex items-center gap-2">
          <History className="h-4 w-4 text-slate-500" />
          <h3 className="text-xs font-extrabold text-slate-800">
            আপনার সাম্প্রতিক জিমেইল সাবমিশন
          </h3>
        </div>

        <div className="divide-y divide-slate-100">
          {submissions.map((sub) => (
            <div key={sub.id} className="py-2.5 flex items-center justify-between text-xs">
              <div>
                <p className="font-bold text-slate-800">{sub.email}</p>
                <p className="text-[10px] text-slate-400">{sub.date}</p>
              </div>
              <div className="text-right">
                <span className="inline-block rounded-full bg-blue-50 px-2 py-0.5 text-[10px] font-bold text-blue-700 border border-blue-100">
                  {sub.status}
                </span>
                <p className="text-[11px] font-extrabold text-rose-600 mt-0.5">{sub.price}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
