import React, { useState } from 'react';
import {
  Facebook,
  Mail,
  Instagram,
  Youtube,
  Clock,
  CheckCircle,
  ChevronRight,
  Filter,
  Flame,
  Search,
  Sparkles
} from 'lucide-react';
import { TaskItem, TaskCategory, WalletType } from '../types';

interface TaskSectionProps {
  tasks: TaskItem[];
  onSelectTask: (task: TaskItem) => void;
}

export const TaskSection: React.FC<TaskSectionProps> = ({ tasks, onSelectTask }) => {
  const [activeCategory, setActiveCategory] = useState<TaskCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const categories: { id: TaskCategory; label: string; icon?: React.ReactNode }[] = [
    { id: 'all', label: 'সব কাজ' },
    { id: 'facebook', label: 'Facebook' },
    { id: 'gmail', label: 'Gmail / Google' },
    { id: 'instagram', label: 'Instagram' },
    { id: 'youtube', label: 'YouTube' },
    { id: 'daily', label: 'Daily Bonus' }
  ];

  const filteredTasks = tasks.filter((task) => {
    const matchesCategory =
      activeCategory === 'all' || task.category === activeCategory;
    const matchesSearch =
      task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.titleBn.includes(searchQuery);
    return matchesCategory && matchesSearch;
  });

  const getPlatformIcon = (category: TaskItem['category']) => {
    switch (category) {
      case 'facebook':
        return (
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
            <Facebook className="h-5 w-5 fill-current" />
          </div>
        );
      case 'gmail':
        return (
          <div className="google-gradient flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-white shadow-xs">
            <Mail className="h-5 w-5" />
          </div>
        );
      case 'instagram':
        return (
          <div className="instagram-gradient flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-white shadow-xs">
            <Instagram className="h-5 w-5" />
          </div>
        );
      case 'youtube':
        return (
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-red-50 text-red-600 shadow-xs">
            <Youtube className="h-5 w-5 fill-current" />
          </div>
        );
      default:
        return (
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-50 text-amber-600">
            <Sparkles className="h-5 w-5" />
          </div>
        );
    }
  };

  const getWalletBadge = (wallet: WalletType) => {
    switch (wallet) {
      case 'fb':
        return (
          <span className="rounded-md bg-blue-50 px-1.5 py-0.5 text-[9px] font-bold text-blue-700 border border-blue-100">
            FB Wallet
          </span>
        );
      case 'mail':
        return (
          <span className="rounded-md bg-red-50 px-1.5 py-0.5 text-[9px] font-bold text-red-700 border border-red-100">
            Mail Wallet
          </span>
        );
      case 'insta':
        return (
          <span className="rounded-md bg-pink-50 px-1.5 py-0.5 text-[9px] font-bold text-pink-700 border border-pink-100">
            Insta Wallet
          </span>
        );
      default:
        return (
          <span className="rounded-md bg-emerald-50 px-1.5 py-0.5 text-[9px] font-bold text-emerald-700 border border-emerald-100">
            Main Balance
          </span>
        );
    }
  };

  return (
    <section className="space-y-3">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-base font-extrabold text-slate-900 tracking-tight flex items-center gap-1.5">
            <Flame className="h-4 w-4 text-orange-500 fill-orange-500" />
            <span>উপলব্ধ কাজের তালিকা</span>
          </h2>
          <p className="text-xs text-slate-500">
            কাজ সম্পন্ন করুন এবং সরাসরি আপনার ওয়ালেটে টাকা আয় করুন
          </p>
        </div>

        <span className="rounded-full bg-blue-100 px-2.5 py-0.5 text-[10px] font-bold text-blue-700">
          {filteredTasks.length} টি কাজ
        </span>
      </div>

      {/* CATEGORY FILTER TABS */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 hide-scrollbar">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className={`press shrink-0 rounded-xl px-3 py-1.5 text-xs font-bold transition-all ${
              activeCategory === cat.id
                ? 'bg-blue-600 text-white shadow-sm'
                : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* SEARCH BAR */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
        <input
          type="text"
          placeholder="কাজের নাম বা ক্যাটাগরি খুঁজুন..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full rounded-2xl border border-slate-200 bg-white py-2 pl-9 pr-4 text-xs font-medium text-slate-800 placeholder-slate-400 focus:border-blue-500 focus:outline-hidden shadow-2xs"
        />
      </div>

      {/* TASK LIST */}
      <div className="space-y-2.5">
        {filteredTasks.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-slate-200 bg-white p-8 text-center">
            <p className="text-sm font-semibold text-slate-600">কোনো কাজ পাওয়া যায়নি</p>
            <p className="text-xs text-slate-400 mt-1">অন্য ক্যাটাগরি চেক করুন অথবা কিছুক্ষণ পর আবার চেষ্টা করুন</p>
          </div>
        ) : (
          filteredTasks.map((task) => (
            <div
              key={task.id}
              onClick={() => onSelectTask(task)}
              className="press soft-card group flex cursor-pointer items-center justify-between rounded-2xl bg-white p-3.5 hover:border-blue-300 transition-all"
            >
              <div className="flex items-center gap-3 min-w-0">
                {getPlatformIcon(task.category)}

                <div className="min-w-0">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span className="font-extrabold text-sm text-slate-800 line-clamp-1 group-hover:text-blue-600 transition-colors">
                      {task.titleBn}
                    </span>
                  </div>

                  <div className="mt-1 flex items-center gap-2 text-[11px] text-slate-400 flex-wrap">
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {task.timeLimitMinutes} মিনিট
                    </span>
                    <span>•</span>
                    <span>
                      স্লট: {task.completedSlots}/{task.totalSlots}
                    </span>
                    <span>•</span>
                    {getWalletBadge(task.targetWallet)}
                  </div>
                </div>
              </div>

              {/* REWARD BADGE & BUTTON */}
              <div className="ml-3 flex flex-col items-end shrink-0">
                <div className="rounded-xl bg-emerald-50 px-2.5 py-1 text-xs font-black text-emerald-700 border border-emerald-200/60 shadow-2xs">
                  +৳{task.reward.toFixed(2)}
                </div>

                <span className="mt-1 flex items-center text-[10px] font-bold text-blue-600 group-hover:translate-x-0.5 transition-transform">
                  কাজ করুন
                  <ChevronRight className="h-3 w-3" />
                </span>
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  );
};
