import React, { useState } from 'react';
import { X, Send, MessageCircle, HelpCircle, ChevronRight, CheckCircle2 } from 'lucide-react';

interface TelegramSupportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const TelegramSupportModal: React.FC<TelegramSupportModalProps> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  const [message, setMessage] = useState('');
  const [sent, setSent] = useState(false);

  const handleSendQuery = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;
    setSent(true);
    setTimeout(() => {
      setMessage('');
      setSent(false);
      onClose();
    }, 1500);
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
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-sky-500 text-white">
              <Send className="h-4 w-4" />
            </div>
            <div>
              <h2 className="text-base font-black text-slate-900">
                টেলিগ্রাম ও কাস্টমার সাপোর্ট
              </h2>
              <p className="text-[11px] text-slate-400">২৪/৭ লাইভ সহায়তা</p>
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

        {/* TELEGRAM OFFICIAL BUTTONS */}
        <div className="my-4 space-y-2.5">
          <a
            href="https://t.me/digitalearningzone"
            target="_blank"
            rel="noopener noreferrer"
            className="press flex items-center justify-between rounded-2xl bg-gradient-to-r from-sky-500 to-blue-600 p-3.5 text-white shadow-md hover:from-sky-600 hover:to-blue-700 transition-all"
          >
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/20">
                <Send className="h-5 w-5" />
              </div>
              <div className="text-left">
                <div className="text-sm font-black">DEZ Official Channel</div>
                <div className="text-[11px] text-sky-100">টাস্ক আপডেট ও পেমেন্ট প্রুফ</div>
              </div>
            </div>
            <ChevronRight className="h-4 w-4 text-sky-200" />
          </a>

          <a
            href="https://t.me/dez_support_bot"
            target="_blank"
            rel="noopener noreferrer"
            className="press flex items-center justify-between rounded-2xl bg-slate-50 border border-slate-200 p-3.5 text-slate-800 hover:bg-slate-100 transition-all"
          >
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                <MessageCircle className="h-5 w-5" />
              </div>
              <div className="text-left">
                <div className="text-sm font-bold text-slate-900">Direct Admin Support Bot</div>
                <div className="text-[11px] text-slate-400">সরাসরি এডমিনের সাথে চ্যাট করুন</div>
              </div>
            </div>
            <ChevronRight className="h-4 w-4 text-slate-400" />
          </a>
        </div>

        {/* QUICK QUESTION FORM */}
        <div className="border-t border-slate-100 pt-3">
          <h3 className="text-xs font-black uppercase tracking-wider text-slate-700 mb-2">
            অ্যাপের ভেতর থেকে মেসেজ পাঠান
          </h3>

          {sent ? (
            <div className="flex items-center gap-2 rounded-xl bg-emerald-50 p-3 text-xs font-bold text-emerald-700 border border-emerald-200">
              <CheckCircle2 className="h-4 w-4" />
              <span>আপনার বার্তা পাঠানো হয়েছে! এডমিন দ্রুত রিপ্লাই দেবেন।</span>
            </div>
          ) : (
            <form onSubmit={handleSendQuery} className="space-y-2.5">
              <textarea
                rows={3}
                required
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="আপনার সমস্যা বা প্রশ্ন বিস্তারিত লিখুন..."
                className="w-full rounded-xl border border-slate-200 bg-slate-50 p-2.5 text-xs text-slate-800 focus:bg-white focus:border-sky-500 focus:outline-hidden"
              />

              <button
                type="submit"
                className="press w-full flex items-center justify-center gap-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 py-2.5 text-xs font-bold text-white shadow-md transition-colors"
              >
                <Send className="h-3.5 w-3.5" />
                <span>মেসেজ পাঠান</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
