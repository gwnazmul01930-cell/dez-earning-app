import React, { useState } from 'react';
import {
  X,
  Share2,
  Copy,
  Check,
  Globe,
  ExternalLink,
  Send,
  MessageCircle,
  QrCode,
  Sparkles
} from 'lucide-react';

interface ShareLinkModalProps {
  isOpen: boolean;
  onClose: () => void;
  referralCode?: string;
}

export const ShareLinkModal: React.FC<ShareLinkModalProps> = ({
  isOpen,
  onClose,
  referralCode,
}) => {
  if (!isOpen) return null;

  const [copiedApp, setCopiedApp] = useState(false);
  const [copiedRef, setCopiedRef] = useState(false);

  // Get dynamic current app URL or origin
  const appUrl = typeof window !== 'undefined' ? window.location.origin : 'https://digitalearningzone.app';
  const referralUrl = referralCode ? `${appUrl}?ref=${referralCode}` : appUrl;

  const handleCopyAppUrl = async () => {
    try {
      if (navigator.clipboard) {
        await navigator.clipboard.writeText(appUrl);
      } else {
        const textarea = document.createElement('textarea');
        textarea.value = appUrl;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
      }
      setCopiedApp(true);
      setTimeout(() => setCopiedApp(false), 2500);
    } catch (e) {
      console.error(e);
    }
  };

  const handleCopyReferralUrl = async () => {
    try {
      if (navigator.clipboard) {
        await navigator.clipboard.writeText(referralUrl);
      } else {
        const textarea = document.createElement('textarea');
        textarea.value = referralUrl;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
      }
      setCopiedRef(true);
      setTimeout(() => setCopiedRef(false), 2500);
    } catch (e) {
      console.error(e);
    }
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'DEZ - Digital Earning Zone',
          text: 'ডিজিটাল আর্নিং জোনে ঘরে বসে মোবাইল দিয়ে প্রতিদিন টাকা আয় করুন!',
          url: referralUrl,
        });
      } catch (err) {
        console.log('Share canceled or not supported');
      }
    } else {
      handleCopyAppUrl();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* BACKDROP */}
      <div
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity duration-200"
        onClick={onClose}
      />

      {/* MODAL */}
      <div className="relative z-10 max-h-[90vh] w-full max-w-md overflow-y-auto rounded-3xl bg-white p-5 sm:p-6 shadow-2xl hide-scrollbar animate-in zoom-in-95 duration-150">
        {/* HEADER */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
              <Share2 className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-base font-black text-slate-900">
                অ্যাপ ও ওয়েবসাইট লিঙ্ক
              </h2>
              <p className="text-[11px] text-slate-400">
                পাবলিক ইউআরএল কপি ও বন্ধুদের শেয়ার করুন
              </p>
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

        {/* MAIN APP URL BOX */}
        <div className="my-4 space-y-3.5">
          <div className="rounded-2xl border border-blue-100 bg-gradient-to-br from-blue-50/80 to-indigo-50/50 p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-blue-700 flex items-center gap-1.5">
                <Globe className="h-3.5 w-3.5 text-blue-600" />
                ওয়েবসাইটের মূল লিঙ্ক (App URL)
              </span>
              <span className="rounded-full bg-blue-600/10 px-2 py-0.5 text-[9px] font-extrabold text-blue-700">
                লাইভ লিঙ্ক
              </span>
            </div>

            <div className="rounded-xl border border-slate-200/90 bg-white p-2.5 shadow-2xs flex items-center justify-between gap-2">
              <div className="truncate font-mono text-xs font-semibold text-slate-800 select-all">
                {appUrl}
              </div>

              <button
                onClick={handleCopyAppUrl}
                className={`press shrink-0 flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-extrabold transition-all ${
                  copiedApp
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'bg-blue-600 hover:bg-blue-700 text-white shadow-xs'
                }`}
              >
                {copiedApp ? (
                  <>
                    <Check className="h-3.5 w-3.5" />
                    <span>কপি হয়েছে!</span>
                  </>
                ) : (
                  <>
                    <Copy className="h-3.5 w-3.5" />
                    <span>Copy Link</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* REFERRAL LINK BOX */}
          {referralCode && (
            <div className="rounded-2xl border border-emerald-100 bg-emerald-50/40 p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-800 flex items-center gap-1.5">
                  <Sparkles className="h-3.5 w-3.5 text-emerald-600" />
                  আপনার রেফারেল সাইট লিঙ্ক (১০% বোনাস)
                </span>
              </div>

              <div className="rounded-xl border border-slate-200/90 bg-white p-2.5 shadow-2xs flex items-center justify-between gap-2">
                <div className="truncate font-mono text-xs font-semibold text-slate-800 select-all">
                  {referralUrl}
                </div>

                <button
                  onClick={handleCopyReferralUrl}
                  className={`press shrink-0 flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-extrabold transition-all ${
                    copiedRef
                      ? 'bg-emerald-600 text-white shadow-xs'
                      : 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs'
                  }`}
                >
                  {copiedRef ? (
                    <>
                      <Check className="h-3.5 w-3.5" />
                      <span>কপি হয়েছে!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="h-3.5 w-3.5" />
                      <span>Copy Link</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          )}

          {/* QUICK SHARE ACTIONS */}
          <div className="pt-1">
            <h4 className="text-xs font-extrabold text-slate-700 mb-2">
              সোশ্যাল মিডিয়ায় সরাসরি শেয়ার করুন
            </h4>

            <div className="grid grid-cols-2 gap-2">
              <a
                href={`https://t.me/share/url?url=${encodeURIComponent(referralUrl)}&text=${encodeURIComponent('ডিজিটাল আর্নিং জোনে ঘরে বসে মোবাইল দিয়ে প্রতিদিন টাকা আয় করুন!')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="press flex items-center justify-center gap-2 rounded-xl bg-sky-500 hover:bg-sky-600 p-2.5 text-xs font-bold text-white shadow-xs transition-colors"
              >
                <Send className="h-4 w-4" />
                <span>টেলিগ্রামে শেয়ার</span>
              </a>

              <a
                href={`https://api.whatsapp.com/send?text=${encodeURIComponent(`ডিজিটাল আর্নিং জোনে ঘরে বসে মোবাইল দিয়ে প্রতিদিন টাকা আয় করুন! লিঙ্ক: ${referralUrl}`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="press flex items-center justify-center gap-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 p-2.5 text-xs font-bold text-white shadow-xs transition-colors"
              >
                <MessageCircle className="h-4 w-4" />
                <span>হোয়াটসঅ্যাপে শেয়ার</span>
              </a>
            </div>

            <button
              onClick={handleNativeShare}
              className="press mt-2.5 w-full flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 p-2.5 text-xs font-bold text-slate-700 transition-colors"
            >
              <ExternalLink className="h-4 w-4 text-slate-500" />
              <span>অন্যান্য অ্যাপে শেয়ার করুন</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
