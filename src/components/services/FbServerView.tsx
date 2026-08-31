import React, { useState } from 'react';
import { ArrowLeft, Facebook, AlertTriangle, Send, CheckCircle2, History, Copy, Check } from 'lucide-react';
import { UserProfile } from '../../types';

interface FbServerViewProps {
  serverNumber: 1 | 2;
  user: UserProfile;
  onBack: () => void;
  onSubmitAccount: (details: any) => void;
}

export const FbServerView: React.FC<FbServerViewProps> = ({
  serverNumber,
  user,
  onBack,
  onSubmitAccount,
}) => {
  const isServer1 = serverNumber === 1;
  const rate = isServer1 ? '৮' : '16';
  const serverTitle = isServer1 ? 'FB Server 1 (Account Sell)' : 'FB Server 2 (Account Sell)';
  const announcement = isServer1
    ? '📢 আজকে ফেসবুকের কাজ বন্ধ'
    : '📢 Number Ofd Cookies আইডি দিবেন ✅';

  const isSubmissionOpen = !isServer1; // Server 1 is currently closed in screenshots, Server 2 is open

  const [uid, setUid] = useState('');
  const [password, setPassword] = useState('');
  const [twoFactorKey, setTwoFactorKey] = useState('');
  const [accountMail, setAccountMail] = useState('');
  const [mailToken, setMailToken] = useState('');

  const [submissions, setSubmissions] = useState<Array<{ id: string; uid: string; date: string; status: string; price: string }>>([
    {
      id: 'sub-1',
      uid: '100084938291032',
      date: 'Today, 02:40 PM',
      status: 'Pending',
      price: `৳${rate}.00`,
    }
  ]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!uid || !password) {
      alert('অনুগ্রহ করে ইউআইডি এবং পাসওয়ার্ড দিন!');
      return;
    }

    const newSub = {
      id: `sub-${Date.now()}`,
      uid,
      date: 'Just now',
      status: 'Pending',
      price: `৳${rate}.00`,
    };

    setSubmissions([newSub, ...submissions]);
    onSubmitAccount({
      type: `fb_server_${serverNumber}`,
      uid,
      password,
      twoFactorKey,
      accountMail,
      mailToken,
    });

    setUid('');
    setPassword('');
    setTwoFactorKey('');
    setAccountMail('');
    setMailToken('');
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
          {serverTitle}
        </h1>
        <div className="w-10" />
      </div>

      {/* ANNOUNCEMENT PILL */}
      <div className="rounded-2xl bg-amber-100/80 p-3 text-center text-xs font-bold text-amber-900 border border-amber-200">
        {announcement}
      </div>

      {/* SERVER STATUS ALERT */}
      {!isSubmissionOpen ? (
        <div className="rounded-2xl bg-rose-50 p-4 border border-rose-200 text-rose-800 space-y-1">
          <div className="flex items-center gap-2 font-bold text-sm">
            <AlertTriangle className="h-4 w-4 text-rose-600" />
            <span>নোটিশ:</span>
          </div>
          <p className="text-xs text-rose-700 leading-relaxed">
            দুঃখিত বস, বর্তমানে ফেসবুক আইডি জমা দেওয়া বন্ধ আছে! নতুন আপডেট আসলে টেলিগ্রাম চ্যানেলে জানানো হবে।
          </p>
        </div>
      ) : (
        <div className="rounded-2xl bg-emerald-50 p-4 border border-emerald-200 text-emerald-800 space-y-1">
          <div className="flex items-center gap-2 font-bold text-sm">
            <CheckCircle2 className="h-4 w-4 text-emerald-600" />
            <span>সার্ভার সক্রিয় আছে:</span>
          </div>
          <p className="text-xs text-emerald-700 leading-relaxed">
            সঠিক তথ্য দিয়ে একাউন্ট সাবমিট করুন। ভেরিফিকেশনের পর ২৪ ঘণ্টার মধ্যে আপনার FB WALLET এ টাকা জমা হবে।
          </p>
        </div>
      )}

      {/* STATS CARDS */}
      <div className="grid grid-cols-2 gap-2.5">
        <div className="rounded-2xl bg-white p-4 shadow-xs border border-slate-100 text-center">
          <p className="text-[10px] font-black uppercase tracking-wider text-slate-400">
            TODAY RATE
          </p>
          <p className="text-xl font-black text-blue-600 mt-1">৳ {rate}</p>
        </div>
        <div className="rounded-2xl bg-white p-4 shadow-xs border border-slate-100 text-center">
          <p className="text-[10px] font-black uppercase tracking-wider text-slate-400">
            YOUR SUBMISSION
          </p>
          <p className="text-xl font-black text-slate-800 mt-1">
            {submissions.length} / 500
          </p>
        </div>
      </div>

      {/* SUBMISSION FORM */}
      <div className="rounded-3xl bg-white p-5 shadow-xs border border-slate-100 space-y-4">
        <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
          <Facebook className="h-5 w-5 text-blue-600" />
          <h2 className="text-sm font-extrabold text-slate-800">
            Facebook ID Details
          </h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <label className="block text-[11px] font-bold text-slate-600 mb-1">
              Facebook UID / Link ID *
            </label>
            <input
              type="text"
              required
              placeholder="e.g. 100084938291032"
              value={uid}
              onChange={(e) => setUid(e.target.value)}
              className="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-xs font-medium text-slate-800 placeholder-slate-400 focus:border-blue-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-[11px] font-bold text-slate-600 mb-1">
              Account Password *
            </label>
            <input
              type="password"
              required
              placeholder="Enter account password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-xs font-medium text-slate-800 placeholder-slate-400 focus:border-blue-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-[11px] font-bold text-slate-600 mb-1">
              2FA Key / Backup Codes (Optional)
            </label>
            <input
              type="text"
              placeholder="2FA 32-digit secret key or 8-digit codes"
              value={twoFactorKey}
              onChange={(e) => setTwoFactorKey(e.target.value)}
              className="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-xs font-medium text-slate-800 placeholder-slate-400 focus:border-blue-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-[11px] font-bold text-slate-600 mb-1">
              Account Mail (If any)
            </label>
            <input
              type="email"
              placeholder="example@outlook.com"
              value={accountMail}
              onChange={(e) => setAccountMail(e.target.value)}
              className="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-xs font-medium text-slate-800 placeholder-slate-400 focus:border-blue-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-[11px] font-bold text-slate-600 mb-1">
              Mail Token / Cookies (Optional)
            </label>
            <textarea
              rows={2}
              placeholder="Paste token or cookie string here"
              value={mailToken}
              onChange={(e) => setMailToken(e.target.value)}
              className="w-full rounded-xl border border-slate-200 px-3.5 py-2 text-xs font-medium text-slate-800 placeholder-slate-400 focus:border-blue-500 focus:outline-none resize-none"
            />
          </div>

          <button
            type="submit"
            disabled={!isSubmissionOpen}
            className={`press flex w-full items-center justify-center gap-2 rounded-2xl py-3 text-xs font-black text-white shadow-md transition-all ${
              isSubmissionOpen
                ? 'bg-blue-600 hover:bg-blue-700'
                : 'bg-slate-300 cursor-not-allowed text-slate-500'
            }`}
          >
            <Send className="h-4 w-4" />
            <span>SUBMIT ACCOUNT NOW</span>
          </button>
        </form>
      </div>

      {/* RECENT SUBMISSION HISTORY */}
      <div className="rounded-3xl bg-white p-5 shadow-xs border border-slate-100 space-y-3">
        <div className="flex items-center gap-2">
          <History className="h-4 w-4 text-slate-500" />
          <h3 className="text-xs font-extrabold text-slate-800">
            সাম্প্রতিক সাবমিশন
          </h3>
        </div>

        {submissions.length === 0 ? (
          <p className="text-xs text-slate-400 text-center py-4">
            কোনো সাবমিশন হিস্ট্রি নেই
          </p>
        ) : (
          <div className="divide-y divide-slate-100">
            {submissions.map((sub) => (
              <div key={sub.id} className="py-2.5 flex items-center justify-between text-xs">
                <div>
                  <p className="font-bold text-slate-800">{sub.uid}</p>
                  <p className="text-[10px] text-slate-400">{sub.date}</p>
                </div>
                <div className="text-right">
                  <span className="inline-block rounded-full bg-amber-50 px-2 py-0.5 text-[10px] font-bold text-amber-700 border border-amber-100">
                    {sub.status}
                  </span>
                  <p className="text-[11px] font-extrabold text-blue-600 mt-0.5">{sub.price}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
