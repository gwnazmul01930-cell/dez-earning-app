import React, { useState } from 'react';
import { Copy, Check, Users, Gift, Share2, Award, ArrowRight } from 'lucide-react';
import { UserProfile } from '../types';

interface ReferralSectionProps {
  user: UserProfile;
}

export const ReferralSection: React.FC<ReferralSectionProps> = ({ user }) => {
  const [copiedCode, setCopiedCode] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  const referralLink = `https://dez.earn/join?ref=${user.referralCode}`;

  const handleCopyCode = () => {
    navigator.clipboard.writeText(user.referralCode);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(referralLink);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <div className="space-y-4">
      {/* HERO BANNER */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-900 via-blue-900 to-slate-900 p-5 text-white shadow-xl">
        <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-blue-500/20 blur-xl" />

        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-xl bg-indigo-500/30 text-indigo-300">
              <Users className="h-4 w-4" />
            </span>
            <span className="text-[10px] font-extrabold uppercase tracking-widest text-indigo-300">
              DEZ REFERRAL PROGRAM
            </span>
          </div>

          <h2 className="text-xl font-black leading-tight">
            বন্ধুদের ইনভাইট করুন এবং পান লাইফটাইম ১০% কমিশন!
          </h2>
          <p className="mt-1.5 text-xs text-blue-200 leading-relaxed">
            আপনার রেফারেল কোড বা লিংক ব্যবহার করে যে কেউ যুক্ত হয়ে কাজ করলেই আপনি তাদের আয়ের ১০% বোনাস পাবেন সরাসরি।
          </p>

          {/* CODE BOX */}
          <div className="mt-4 rounded-2xl bg-white/10 p-3 backdrop-blur-md border border-white/15">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[9px] font-extrabold text-blue-200 uppercase tracking-wider block">
                  আপনার রেফারেল কোড
                </span>
                <span className="font-mono text-lg font-black tracking-widest text-amber-300">
                  {user.referralCode}
                </span>
              </div>

              <button
                onClick={handleCopyCode}
                className="press flex items-center gap-1.5 rounded-xl bg-white px-3 py-1.5 text-xs font-black text-indigo-900 shadow-md hover:bg-slate-100"
              >
                {copiedCode ? (
                  <>
                    <Check className="h-3.5 w-3.5 text-emerald-600" />
                    <span className="text-emerald-700">কপি হয়েছে</span>
                  </>
                ) : (
                  <>
                    <Copy className="h-3.5 w-3.5 text-indigo-700" />
                    <span>কোড কপি</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* LINK BOX */}
          <div className="mt-2.5 flex items-center gap-2">
            <input
              type="text"
              readOnly
              value={referralLink}
              className="w-full rounded-xl bg-white/5 border border-white/10 px-3 py-2 text-[11px] font-mono text-blue-200 focus:outline-hidden"
            />
            <button
              onClick={handleCopyLink}
              className="press shrink-0 flex items-center gap-1 rounded-xl bg-blue-600 px-3 py-2 text-xs font-bold text-white hover:bg-blue-500 shadow-md"
            >
              {copiedLink ? <Check className="h-3.5 w-3.5 text-white" /> : <Share2 className="h-3.5 w-3.5" />}
              <span>{copiedLink ? 'কপি!' : 'শেয়ার'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* STATS OVERVIEW */}
      <div className="grid grid-cols-3 gap-2.5">
        <div className="soft-card rounded-2xl bg-white p-3 text-center">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
            মোট রেফারেল
          </span>
          <span className="text-lg font-black text-slate-900 mt-0.5 block">
            ১২ জন
          </span>
        </div>

        <div className="soft-card rounded-2xl bg-white p-3 text-center">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
            সক্রিয় আর্নার
          </span>
          <span className="text-lg font-black text-emerald-600 mt-0.5 block">
            ৮ জন
          </span>
        </div>

        <div className="soft-card rounded-2xl bg-white p-3 text-center">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
            রেফারেল আয়
          </span>
          <span className="text-lg font-black text-blue-700 mt-0.5 block">
            ৳৬৫.০০
          </span>
        </div>
      </div>

      {/* HOW IT WORKS */}
      <div className="soft-card rounded-2xl bg-white p-4 space-y-3">
        <h3 className="text-xs font-black uppercase tracking-wider text-slate-800 flex items-center gap-1.5">
          <Gift className="h-4 w-4 text-indigo-600" />
          কীভাবে রেফারেল কমিশন পাবেন?
        </h3>

        <div className="space-y-2.5 text-xs text-slate-600">
          <div className="flex items-start gap-2.5">
            <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-indigo-100 text-[10px] font-black text-indigo-700">
              ১
            </span>
            <p>আপনার রেফারেল লিংক বন্ধুদের সাথে সোশ্যাল মিডিয়ায় বা মেসেঞ্জারে শেয়ার করুন।</p>
          </div>
          <div className="flex items-start gap-2.5">
            <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-indigo-100 text-[10px] font-black text-indigo-700">
              ২
            </span>
            <p>বন্ধু আপনার লিংকে ক্লিক করে একাউন্ট খুলে যেকোনো টাস্ক বা কাজ সম্পন্ন করবে।</p>
          </div>
          <div className="flex items-start gap-2.5">
            <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-indigo-100 text-[10px] font-black text-indigo-700">
              ৩
            </span>
            <p>তার প্রতিটি সফল টাস্ক আয়ের ১০% বোনাস স্বয়ংক্রিয়ভাবে আপনার একাউন্টে যোগ হবে!</p>
          </div>
        </div>
      </div>
    </div>
  );
};
