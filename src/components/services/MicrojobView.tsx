import React, { useState } from 'react';
import { ArrowLeft, ListTodo, AlertTriangle, Send, CheckCircle2, Search, ExternalLink } from 'lucide-react';
import { TaskItem, UserProfile } from '../../types';

interface MicrojobViewProps {
  tasks: TaskItem[];
  user: UserProfile;
  onBack: () => void;
  onSelectTask: (task: TaskItem) => void;
}

export const MicrojobView: React.FC<MicrojobViewProps> = ({
  tasks,
  user,
  onBack,
  onSelectTask,
}) => {
  const [filter, setFilter] = useState('all');

  const microjobs = [
    {
      id: 'job-31',
      title: 'speed kick bot',
      category: 'TELEGRAM',
      reward: 0.50,
      totalSlots: 5000,
      completedSlots: 0,
      targetUrl: 'https://t.me/speedkickbot',
      instructions: 'বট স্টার্ট করুন এবং রেফারাল কোড সাবমিট করুন।',
    },
    {
      id: 'job-29',
      title: 'Get money by watching videos',
      category: 'YOUTUBE SUBSCRIBE',
      reward: 0.10,
      totalSlots: 5,
      completedSlots: 2,
      targetUrl: 'https://youtube.com',
      instructions: 'ভিডিওটি দেখে লাইক এবং সাবস্ক্রাইব করুন।',
    },
    {
      id: 'job-22',
      title: 'Earn Money Subscribing Channels',
      category: 'YOUTUBE SUBSCRIBE',
      reward: 0.01,
      totalSlots: 2,
      completedSlots: 1,
      targetUrl: 'https://youtube.com',
      instructions: 'চ্যানেলটি সাবস্ক্রাইব করে স্ক্রিনশট দিন।',
    },
    {
      id: 'job-18',
      title: 'Join Official VIP Telegram Community',
      category: 'TELEGRAM',
      reward: 0.75,
      totalSlots: 1000,
      completedSlots: 420,
      targetUrl: 'https://t.me',
      instructions: 'টেলিগ্রাম চ্যানেলে জয়েন করে আপনার ইউজারনেম দিন।',
    },
    {
      id: 'job-12',
      title: 'Playstore 5 Star Review with Text',
      category: 'APP REVIEW',
      reward: 1.50,
      totalSlots: 100,
      completedSlots: 65,
      targetUrl: 'https://play.google.com',
      instructions: 'অ্যাপে ৫ স্টার পজিটিভ রিভিউ দিন।',
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
          Available Microjobs
        </h1>
        <div className="w-10" />
      </div>

      {/* REPORT BANNER */}
      <div className="flex items-center justify-between rounded-2xl bg-amber-500/10 p-3.5 border border-amber-200">
        <div className="flex items-center gap-2">
          <AlertTriangle className="h-4 w-4 text-amber-600 shrink-0" />
          <p className="text-xs font-bold text-amber-900 leading-tight">
            টাকা পাননি? সঠিকভাবে কাজ করার পরও রিজেক্ট করলে রিপোর্ট করুন।
          </p>
        </div>
        <button
          onClick={() => alert('রিপোর্ট ফর্ম ওপেন হচ্ছে...')}
          className="press shrink-0 rounded-xl bg-amber-600 px-3 py-1.5 text-xs font-black text-white shadow-xs hover:bg-amber-700 transition-colors ml-2"
        >
          Report
        </button>
      </div>

      {/* SECTION HEADER */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <ListTodo className="h-4 w-4 text-blue-600" />
          <h2 className="text-sm font-extrabold text-slate-800">
            Active Microjobs ({microjobs.length} Jobs Live)
          </h2>
        </div>
      </div>

      {/* JOBS LIST */}
      <div className="space-y-3">
        {microjobs.map((job) => {
          const percent = Math.round((job.completedSlots / job.totalSlots) * 100);
          return (
            <div
              key={job.id}
              className="rounded-3xl bg-white p-4.5 shadow-xs border border-slate-100 space-y-3 hover:border-blue-200 transition-all"
            >
              <div className="flex items-start justify-between gap-2">
                <div>
                  <span className="inline-block text-[10px] font-black text-blue-600 bg-blue-50 px-2 py-0.5 rounded-md uppercase tracking-wider mb-1">
                    {job.category}
                  </span>
                  <h3 className="text-sm font-extrabold text-slate-800">
                    {job.title}
                  </h3>
                </div>
                <span className="text-base font-black text-emerald-600 shrink-0">
                  ৳{job.reward.toFixed(2)}
                </span>
              </div>

              {/* PROGRESS */}
              <div>
                <div className="flex justify-between text-[11px] font-bold text-slate-400 mb-1">
                  <span>Done: {job.completedSlots} / {job.totalSlots}</span>
                  <span>{percent}%</span>
                </div>
                <div className="h-2 w-full rounded-full bg-slate-100 overflow-hidden">
                  <div
                    className="h-full rounded-full bg-blue-600"
                    style={{ width: `${percent}%` }}
                  />
                </div>
              </div>

              <div className="flex items-center justify-between pt-1">
                <span className="text-[10px] text-slate-400 font-medium truncate max-w-[180px]">
                  {job.instructions}
                </span>
                <button
                  onClick={() =>
                    onSelectTask({
                      id: job.id,
                      category: 'microjob',
                      title: job.title,
                      titleBn: job.title,
                      description: job.instructions,
                      reward: job.reward,
                      targetWallet: 'main',
                      timeLimitMinutes: 15,
                      targetUrl: job.targetUrl,
                      proofType: 'all',
                      totalSlots: job.totalSlots,
                      completedSlots: job.completedSlots,
                      status: 'available',
                    })
                  }
                  className="press flex items-center gap-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 px-4 py-2 text-xs font-black text-white shadow-xs transition-colors"
                >
                  <span>WORK NOW</span>
                  <ExternalLink className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
