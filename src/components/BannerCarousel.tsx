import React, { useState, useEffect } from 'react';
import { Sparkles, ChevronRight, Send, Flame, Zap } from 'lucide-react';
import { NoticeBanner } from '../types';

interface BannerCarouselProps {
  notices: NoticeBanner[];
  onAction: (actionType: NoticeBanner['actionType']) => void;
}

export const BannerCarousel: React.FC<BannerCarouselProps> = ({ notices, onAction }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (notices.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % notices.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [notices.length]);

  const current = notices[currentIndex] || notices[0];

  return (
    <section className="relative overflow-hidden rounded-3xl border border-blue-100 bg-gradient-to-br from-blue-50/90 via-white to-cyan-50/70 p-4 sm:p-5 shadow-sm">
      {/* Background radial accent */}
      <div className="absolute -right-6 -top-6 h-28 w-28 rounded-full bg-blue-200/40 blur-lg pointer-events-none" />
      <div className="absolute -left-6 -bottom-6 h-24 w-24 rounded-full bg-cyan-200/30 blur-lg pointer-events-none" />

      <div className="relative z-10">
        <div className="mb-2 flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <span className="flex items-center gap-1 rounded-full bg-blue-600 px-2.5 py-0.5 text-[9px] font-black uppercase text-white shadow-xs">
              <Zap className="h-2.5 w-2.5 fill-current" />
              {current.badge}
            </span>
            <span className="text-[11px] font-bold text-slate-400">DEZ Official Announcement</span>
          </div>

          {/* Dots Indicator */}
          <div className="flex items-center gap-1">
            {notices.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                aria-label={`Go to slide ${idx + 1}`}
                className={`h-1.5 rounded-full transition-all ${
                  idx === currentIndex ? 'w-4 bg-blue-600' : 'w-1.5 bg-slate-300'
                }`}
              />
            ))}
          </div>
        </div>

        <h2 className="text-base font-extrabold text-slate-900 leading-snug">
          {current.title}
        </h2>
        <p className="mt-1 text-xs text-slate-600 leading-relaxed line-clamp-2">
          {current.subtitle}
        </p>

        <div className="mt-3 flex items-center justify-between">
          <button
            onClick={() => onAction(current.actionType)}
            className="press inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 px-4 py-1.5 text-xs font-bold text-white shadow-md hover:from-blue-700 hover:to-indigo-700 transition-all"
          >
            <span>{current.linkText}</span>
            <ChevronRight className="h-3.5 w-3.5" />
          </button>

          <span className="text-[10px] font-semibold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-md">
            সক্রিয় সুযোগ
          </span>
        </div>
      </div>
    </section>
  );
};
