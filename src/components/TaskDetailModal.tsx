import React, { useState } from 'react';
import {
  X,
  ExternalLink,
  Upload,
  CheckCircle2,
  Clock,
  AlertCircle,
  HelpCircle,
  Sparkles,
  Link as LinkIcon
} from 'lucide-react';
import { TaskItem, WalletType } from '../types';

interface TaskDetailModalProps {
  task: TaskItem | null;
  onClose: () => void;
  onSubmitProof: (
    taskId: string,
    proof: { username?: string; proofLink?: string; screenshotUrl?: string; note?: string }
  ) => void;
}

export const TaskDetailModal: React.FC<TaskDetailModalProps> = ({
  task,
  onClose,
  onSubmitProof,
}) => {
  if (!task) return null;

  const [username, setUsername] = useState('');
  const [proofLink, setProofLink] = useState('');
  const [screenshotName, setScreenshotName] = useState('');
  const [note, setNote] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const getWalletName = (wallet: WalletType) => {
    switch (wallet) {
      case 'fb':
        return 'FB Wallet (ফেসবুক ওয়ালেট)';
      case 'mail':
        return 'Mail Wallet (জিমেইল ওয়ালেট)';
      case 'insta':
        return 'Insta Wallet (ইনস্টা ওয়ালেট)';
      default:
        return 'Main Balance (মেইন ব্যালেন্স)';
    }
  };

  const handleSimulateScreenshot = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setScreenshotName(e.target.files[0].name);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (task.proofType === 'all' || task.proofType === 'username') {
      if (!username.trim()) {
        setErrorMsg('অনুগ্রহ করে আপনার ব্যবহৃত সোশ্যাল প্রোফাইলের নাম বা ইউজারনেম দিন');
        return;
      }
    }

    if (task.proofType === 'all' || task.proofType === 'link') {
      if (!proofLink.trim() && !screenshotName) {
        setErrorMsg('অনুগ্রহ করে প্রুফ লিংক দিন অথবা স্ক্রিনশট সিলেক্ট করুন');
        return;
      }
    }

    setIsSubmitting(true);
    setTimeout(() => {
      onSubmitProof(task.id, {
        username: username.trim() || undefined,
        proofLink: proofLink.trim() || undefined,
        screenshotUrl: screenshotName ? `https://storage.local/${screenshotName}` : undefined,
        note: note.trim() || undefined,
      });
      setIsSubmitting(false);
      onClose();
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* BACKDROP */}
      <div
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      {/* MODAL CARD */}
      <div className="relative z-10 max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-3xl bg-white p-5 sm:p-6 shadow-2xl hide-scrollbar animate-in zoom-in-95 duration-150">
        {/* HEADER */}
        <div className="flex items-start justify-between border-b border-slate-100 pb-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="rounded-full bg-blue-100 px-2.5 py-0.5 text-[10px] font-black uppercase text-blue-700">
                {task.category} Task
              </span>
              <span className="text-xs font-bold text-slate-400">
                ID: {task.id}
              </span>
            </div>
            <h2 className="mt-1.5 text-base sm:text-lg font-black text-slate-900 leading-snug">
              {task.titleBn}
            </h2>
          </div>

          <button
            onClick={onClose}
            className="press flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-slate-600 hover:bg-slate-200"
            aria-label="Close modal"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* REWARD & WALLET HIGHLIGHT */}
        <div className="my-4 rounded-2xl bg-gradient-to-r from-blue-50 to-indigo-50 p-4 border border-blue-100 flex items-center justify-between">
          <div>
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
              কাজের পারিশ্রমিক
            </span>
            <div className="text-2xl font-black text-blue-700">
              ৳{task.reward.toFixed(2)}
            </div>
          </div>

          <div className="text-right">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
              জমা হবে
            </span>
            <div className="text-xs font-extrabold text-indigo-900 bg-white/80 border border-indigo-100 rounded-lg px-2.5 py-1 mt-0.5">
              {getWalletName(task.targetWallet)}
            </div>
          </div>
        </div>

        {/* INSTRUCTIONS */}
        <div className="space-y-3">
          <h3 className="text-xs font-black uppercase tracking-wider text-slate-600 flex items-center gap-1.5">
            <HelpCircle className="h-4 w-4 text-blue-600" />
            কাজ করার নিয়মাবলী:
          </h3>

          <div className="rounded-2xl bg-slate-50 p-3.5 text-xs text-slate-700 leading-relaxed border border-slate-200/70 space-y-2">
            <p>{task.description}</p>
            <div className="flex items-center gap-2 text-[11px] font-bold text-amber-800 bg-amber-50 p-2 rounded-xl border border-amber-200">
              <Clock className="h-3.5 w-3.5 shrink-0" />
              <span>সময়সীমা: {task.timeLimitMinutes} মিনিটের মধ্যে সাবমিট করতে হবে</span>
            </div>
          </div>

          {/* STEP 1: OPEN TARGET LINK */}
          <div className="pt-2">
            <label className="text-xs font-bold text-slate-700 block mb-1.5">
              ধাপ ১: প্রদত্ত লিংকে গিয়ে কাজটি সম্পন্ন করুন
            </label>
            <a
              href={task.targetUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="press flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 hover:bg-blue-700 px-4 py-2.5 text-xs font-extrabold text-white shadow-md transition-all"
            >
              <span>ওয়েবসাইট / পেজ ওপেন করুন</span>
              <ExternalLink className="h-4 w-4" />
            </a>
          </div>

          {/* STEP 2: PROOF SUBMISSION FORM */}
          <form onSubmit={handleSubmit} className="space-y-3 pt-3 border-t border-slate-100">
            <h3 className="text-xs font-black uppercase tracking-wider text-slate-700">
              ধাপ ২: প্রুফ সাবমিট করুন
            </h3>

            {errorMsg && (
              <div className="flex items-center gap-2 rounded-xl bg-red-50 p-2.5 text-xs font-bold text-red-700 border border-red-200">
                <AlertCircle className="h-4 w-4 shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            {(task.proofType === 'all' || task.proofType === 'username') && (
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  আপনার ব্যবহৃত সোশ্যাল প্রোফাইলের নাম / ইউজারনেম *
                </label>
                <input
                  type="text"
                  required
                  placeholder="যেমন: Nazmul Hossain বা @nazmul_01"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 p-2.5 text-xs text-slate-800 focus:bg-white focus:border-blue-500 focus:outline-hidden"
                />
              </div>
            )}

            {(task.proofType === 'all' || task.proofType === 'link') && (
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  শেয়ার পোস্ট বা রিভিউ লিংক (যদি থাকে)
                </label>
                <div className="relative">
                  <LinkIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
                  <input
                    type="url"
                    placeholder="https://..."
                    value={proofLink}
                    onChange={(e) => setProofLink(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-9 pr-3 text-xs text-slate-800 focus:bg-white focus:border-blue-500 focus:outline-hidden"
                  />
                </div>
              </div>
            )}

            {(task.proofType === 'all' || task.proofType === 'screenshot') && (
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  কাজের প্রমাণ হিসেবে স্ক্রিনশট দিন
                </label>
                <div className="relative rounded-xl border-2 border-dashed border-slate-200 bg-slate-50 p-4 text-center hover:bg-slate-100 transition-colors">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleSimulateScreenshot}
                    className="absolute inset-0 cursor-pointer opacity-0"
                  />
                  <div className="flex flex-col items-center justify-center">
                    <Upload className="h-6 w-6 text-slate-400 mb-1" />
                    <span className="text-xs font-bold text-slate-600">
                      {screenshotName ? screenshotName : 'ছবি সিলেক্ট করতে ক্লিক করুন'}
                    </span>
                    <span className="text-[10px] text-slate-400 mt-0.5">
                      PNG, JPG সর্বোচ্চ 5MB
                    </span>
                  </div>
                </div>
              </div>
            )}

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">
                অতিরিক্ত নোট (ঐচ্ছিক)
              </label>
              <textarea
                rows={2}
                placeholder="কাজের ব্যাপারে কোনো বিশেষ তথ্য থাকলে লিখুন..."
                value={note}
                onChange={(e) => setNote(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 p-2.5 text-xs text-slate-800 focus:bg-white focus:border-blue-500 focus:outline-hidden"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="press w-full flex items-center justify-center gap-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 py-3 text-xs font-black text-white shadow-lg transition-all"
            >
              {isSubmitting ? (
                <span>যাচাই করা হচ্ছে...</span>
              ) : (
                <>
                  <CheckCircle2 className="h-4 w-4" />
                  <span>প্রুফ জমা দিন ও টাকা গ্রহণ করুন</span>
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
