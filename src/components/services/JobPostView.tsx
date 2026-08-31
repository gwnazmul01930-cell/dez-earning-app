import React, { useState } from 'react';
import { ArrowLeft, UserPlus2, Send, Upload, Info, CheckCircle2, DollarSign } from 'lucide-react';
import { UserProfile, WalletBalances } from '../../types';

interface JobPostViewProps {
  user: UserProfile;
  balances: WalletBalances;
  onBack: () => void;
  onPostJob: (jobData: any) => void;
}

export const JobPostView: React.FC<JobPostViewProps> = ({
  user,
  balances,
  onBack,
  onPostJob,
}) => {
  const [category, setCategory] = useState('telegram');
  const [title, setTitle] = useState('');
  const [workerPay, setWorkerPay] = useState('0.50');
  const [targetWorkers, setTargetWorkers] = useState('20');
  const [targetUrl, setTargetUrl] = useState('');
  const [instructions, setInstructions] = useState('');
  const [proofType, setProofType] = useState('screenshot');

  const adminFeePerWork = 0.10;
  const payNum = parseFloat(workerPay) || 0;
  const workersNum = parseInt(targetWorkers) || 0;
  const estimatedCost = (payNum + adminFeePerWork) * workersNum;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !targetUrl || !instructions) {
      alert('সবগুলো প্রয়োজনীয় ঘর পূরণ করুন!');
      return;
    }
    if (balances.main < estimatedCost) {
      alert(`আপনার মেইন ব্যালেন্সে পর্যাপ্ত টাকা নেই! মোট খরচ: ৳${estimatedCost.toFixed(2)}, আপনার ব্যালেন্স: ৳${balances.main.toFixed(2)}`);
      return;
    }

    onPostJob({
      id: `job-${Date.now()}`,
      category,
      title,
      workerPay: payNum,
      targetWorkers: workersNum,
      targetUrl,
      instructions,
      proofType,
      estimatedCost,
    });
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
          Create New Campaign
        </h1>
        <div className="w-10" />
      </div>

      {/* BALANCE & ADMIN FEE BANNER */}
      <div className="rounded-3xl bg-slate-900 p-5 text-white shadow-lg space-y-2">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[10px] font-bold text-slate-400 uppercase">Main Wallet Balance</p>
            <p className="text-2xl font-black text-emerald-400">৳{balances.main.toFixed(2)}</p>
          </div>
          <div className="rounded-2xl bg-white/10 px-3 py-1.5 text-right border border-white/10">
            <p className="text-[9px] font-bold text-slate-300">Admin Platform Fee</p>
            <p className="text-xs font-black text-amber-300">৳0.10 / worker</p>
          </div>
        </div>
      </div>

      {/* FORM */}
      <form onSubmit={handleSubmit} className="rounded-3xl bg-white p-5 shadow-xs border border-slate-100 space-y-3.5">
        <div>
          <label className="block text-[11px] font-bold text-slate-600 mb-1">
            Task Category *
          </label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-xs font-medium text-slate-800 focus:border-blue-500 focus:outline-none"
          >
            <option value="telegram">TELEGRAM BOT / CHANNEL</option>
            <option value="youtube">YOUTUBE SUBSCRIBE / WATCH</option>
            <option value="facebook">FACEBOOK FOLLOW / LIKE</option>
            <option value="app_install">APP INSTALL & REVIEW</option>
            <option value="website">WEBSITE SIGNUP / VISIT</option>
          </select>
        </div>

        <div>
          <label className="block text-[11px] font-bold text-slate-600 mb-1">
            Campaign Title *
          </label>
          <input
            type="text"
            required
            placeholder="e.g. Subscribe Channel & Watch 1 Min"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-xs font-medium text-slate-800 focus:border-blue-500 focus:outline-none"
          >
          </input>
        </div>

        <div className="grid grid-cols-2 gap-2.5">
          <div>
            <label className="block text-[11px] font-bold text-slate-600 mb-1">
              Worker Pay (৳) *
            </label>
            <input
              type="number"
              step="0.05"
              min="0.10"
              required
              value={workerPay}
              onChange={(e) => setWorkerPay(e.target.value)}
              className="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-xs font-bold text-blue-600 focus:border-blue-500 focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-[11px] font-bold text-slate-600 mb-1">
              Target Workers *
            </label>
            <input
              type="number"
              min="5"
              required
              value={targetWorkers}
              onChange={(e) => setTargetWorkers(e.target.value)}
              className="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-xs font-bold text-slate-800 focus:border-blue-500 focus:outline-none"
            />
          </div>
        </div>

        {/* ESTIMATED TOTAL COST LIVE CARD */}
        <div className="flex items-center justify-between rounded-2xl bg-blue-50 p-3.5 border border-blue-100">
          <div>
            <span className="text-[10px] font-bold text-blue-600 uppercase tracking-wider block">
              ESTIMATED TOTAL COST
            </span>
            <span className="text-[10px] text-slate-400">
              (Pay ৳{payNum.toFixed(2)} + Fee ৳0.10) × {workersNum} Workers
            </span>
          </div>
          <span className="text-lg font-black text-blue-700">
            ৳{estimatedCost.toFixed(2)}
          </span>
        </div>

        <div>
          <label className="block text-[11px] font-bold text-slate-600 mb-1">
            Target URL / Link *
          </label>
          <input
            type="url"
            required
            placeholder="https://t.me/yourchannel or https://youtube.com/..."
            value={targetUrl}
            onChange={(e) => setTargetUrl(e.target.value)}
            className="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-xs font-medium text-slate-800 focus:border-blue-500 focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-[11px] font-bold text-slate-600 mb-1">
            Work Instructions *
          </label>
          <textarea
            rows={3}
            required
            placeholder="কাজের বিস্তারিত নিয়ম লিখে দিন যাতে কর্মীরা সঠিকভাবে কাজ করতে পারে..."
            value={instructions}
            onChange={(e) => setInstructions(e.target.value)}
            className="w-full rounded-xl border border-slate-200 px-3.5 py-2 text-xs font-medium text-slate-800 focus:border-blue-500 focus:outline-none resize-none"
          />
        </div>

        <button
          type="submit"
          className="press flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 py-3.5 text-xs font-black text-white shadow-md hover:from-blue-700 hover:to-indigo-700"
        >
          <Send className="h-4 w-4" />
          <span>LAUNCH CAMPAIGN NOW</span>
        </button>
      </form>
    </div>
  );
};
