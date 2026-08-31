import React, { useState } from 'react';
import { X, User, Phone, Mail, ShieldCheck, Check, Edit2, Save, Award } from 'lucide-react';
import { UserProfile } from '../types';

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: UserProfile;
  onUpdateUser: (updated: Partial<UserProfile>) => void;
}

export const ProfileModal: React.FC<ProfileModalProps> = ({
  isOpen,
  onClose,
  user,
  onUpdateUser,
}) => {
  if (!isOpen) return null;

  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(user.name);
  const [bkash, setBkash] = useState(user.bkashNumber || '');
  const [nagad, setNagad] = useState(user.nagadNumber || '');
  const [rocket, setRocket] = useState(user.rocketNumber || '');
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateUser({
      name: name.trim(),
      bkashNumber: bkash.trim() || undefined,
      nagadNumber: nagad.trim() || undefined,
      rocketNumber: rocket.trim() || undefined,
    });
    setIsEditing(false);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* BACKDROP */}
      <div
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      {/* MODAL */}
      <div className="relative z-10 max-h-[90vh] w-full max-w-md overflow-y-auto rounded-3xl bg-white p-5 sm:p-6 shadow-2xl hide-scrollbar animate-in zoom-in-95 duration-150">
        {/* HEADER */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
              <User className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-base font-black text-slate-900">
                ইউজার প্রোফাইল
              </h2>
              <p className="text-[11px] text-slate-400">একাউন্ট সেটিংস</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="press flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-slate-600 hover:bg-slate-200"
            aria-label="Close"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* AVATAR & BASIC DETAILS */}
        <div className="my-4 flex items-center gap-3.5 rounded-2xl bg-gradient-to-r from-blue-50 to-indigo-50 p-4 border border-blue-100">
          <img
            src={user.avatar}
            alt={user.name}
            className="h-16 w-16 rounded-full object-cover border-2 border-white shadow-md"
            referrerPolicy="no-referrer"
          />
          <div>
            <div className="flex items-center gap-1.5">
              <h3 className="text-base font-black text-slate-900">{user.name}</h3>
              {user.kycVerified && (
                <span title="ভেরিফাইড ইউজার" className="text-emerald-600">
                  <ShieldCheck className="h-4 w-4" />
                </span>
              )}
            </div>
            <div className="text-xs text-slate-500 font-mono font-bold mt-0.5">
              ইউজার আইডি: {user.id}
            </div>
            <div className="mt-1 flex items-center gap-1 text-[11px] font-bold text-indigo-700 bg-indigo-100/60 px-2 py-0.5 rounded-md inline-flex">
              <Award className="h-3 w-3" />
              <span>Level {user.level} VIP Earner</span>
            </div>
          </div>
        </div>

        {savedSuccess && (
          <div className="mb-3 flex items-center gap-2 rounded-xl bg-emerald-50 p-2.5 text-xs font-bold text-emerald-700 border border-emerald-200">
            <Check className="h-4 w-4" />
            <span>প্রোফাইল সফলভাবে আপডেট হয়েছে!</span>
          </div>
        )}

        {/* PROFILE INFO OR EDIT FORM */}
        {!isEditing ? (
          <div className="space-y-3 text-xs">
            <div className="rounded-xl bg-slate-50 p-3 border border-slate-200/60 space-y-2">
              <div className="flex justify-between text-slate-600">
                <span>ইমেইল:</span>
                <span className="font-semibold text-slate-900">{user.email}</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>যোগদানের তারিখ:</span>
                <span className="font-semibold text-slate-900">{user.joinedDate}</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>মোট সম্পন্ন টাস্ক:</span>
                <span className="font-bold text-blue-600">{user.totalTasksCompleted} টি</span>
              </div>
            </div>

            <div className="rounded-xl bg-slate-50 p-3 border border-slate-200/60 space-y-2">
              <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                সংরক্ষিত পেমেন্ট মেথড
              </div>
              <div className="flex justify-between text-slate-600">
                <span>bKash নাম্বার:</span>
                <span className="font-mono font-bold text-slate-900">
                  {user.bkashNumber || 'যুক্ত করা হয়নি'}
                </span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Nagad নাম্বার:</span>
                <span className="font-mono font-bold text-slate-900">
                  {user.nagadNumber || 'যুক্ত করা হয়নি'}
                </span>
              </div>
            </div>

            <button
              onClick={() => setIsEditing(true)}
              className="press w-full flex items-center justify-center gap-2 rounded-xl bg-slate-900 hover:bg-slate-800 py-2.5 text-xs font-bold text-white shadow-md transition-colors"
            >
              <Edit2 className="h-3.5 w-3.5" />
              <span>তথ্য সম্পাদনা করুন</span>
            </button>
          </div>
        ) : (
          <form onSubmit={handleSave} className="space-y-3 text-xs">
            <div>
              <label className="font-bold text-slate-700 block mb-1">আপনার পূর্ণ নাম</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 p-2.5 text-xs font-semibold text-slate-900 focus:bg-white focus:border-blue-500 focus:outline-hidden"
              />
            </div>

            <div>
              <label className="font-bold text-slate-700 block mb-1">ডিফল্ট বিকাশ নাম্বার</label>
              <input
                type="text"
                value={bkash}
                onChange={(e) => setBkash(e.target.value)}
                placeholder="01XXXXXXXXX"
                className="w-full rounded-xl border border-slate-200 bg-slate-50 p-2.5 text-xs font-semibold text-slate-900 focus:bg-white focus:border-blue-500 focus:outline-hidden"
              />
            </div>

            <div>
              <label className="font-bold text-slate-700 block mb-1">ডিফল্ট নগদ নাম্বার</label>
              <input
                type="text"
                value={nagad}
                onChange={(e) => setNagad(e.target.value)}
                placeholder="01XXXXXXXXX"
                className="w-full rounded-xl border border-slate-200 bg-slate-50 p-2.5 text-xs font-semibold text-slate-900 focus:bg-white focus:border-blue-500 focus:outline-hidden"
              />
            </div>

            <div className="flex gap-2 pt-2">
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="press flex-1 rounded-xl bg-slate-100 py-2.5 text-xs font-bold text-slate-700 hover:bg-slate-200"
              >
                বাতিল
              </button>
              <button
                type="submit"
                className="press flex-1 flex items-center justify-center gap-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 py-2.5 text-xs font-bold text-white shadow-md"
              >
                <Save className="h-3.5 w-3.5" />
                <span>সংরক্ষণ করুন</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
