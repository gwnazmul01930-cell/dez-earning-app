import React from 'react';
import { Menu, Bell, Share2, User as UserIcon } from 'lucide-react';
import { UserProfile } from '../types';

interface HeaderProps {
  user: UserProfile;
  unreadCount: number;
  onOpenMenu: () => void;
  onOpenNotifications: () => void;
  onOpenProfile: () => void;
  onOpenShareLink: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  user,
  unreadCount,
  onOpenMenu,
  onOpenNotifications,
  onOpenProfile,
  onOpenShareLink,
}) => {
  return (
    <header className="sticky top-0 z-40 border-b border-slate-200/80 bg-white/95 backdrop-blur-xl shadow-xs">
      <div className="mx-auto flex h-16 max-w-2xl items-center justify-between px-4">
        {/* MENU BUTTON */}
        <button
          id="menuButton"
          onClick={onOpenMenu}
          aria-label="Open Navigation Menu"
          className="press flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-slate-700 hover:bg-slate-200 transition-colors"
        >
          <Menu className="h-5 w-5" />
        </button>

        {/* LOGO CENTER */}
        <div className="text-center select-none">
          <div className="brand-gradient text-2xl font-black leading-none tracking-tight">
            DEZ
          </div>
          <div className="mt-1 text-[8px] font-extrabold tracking-[0.2em] text-slate-400">
            DIGITAL EARNING ZONE
          </div>
        </div>

        {/* RIGHT ACTIONS: SHARE, NOTIFICATIONS & PROFILE */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          <button
            id="shareLinkButton"
            onClick={onOpenShareLink}
            aria-label="Copy App Link"
            title="অ্যাপের লিঙ্ক কপি করুন"
            className="press flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors border border-blue-100/80"
          >
            <Share2 className="h-4.5 w-4.5" />
          </button>

          <button
            onClick={onOpenNotifications}
            aria-label="Notifications"
            className="press relative flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-slate-700 hover:bg-slate-200 transition-colors"
          >
            <Bell className="h-5 w-5" />
            {unreadCount > 0 && (
              <span className="absolute right-1 top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-red-500 px-1 text-[9px] font-bold text-white shadow-xs">
                {unreadCount > 9 ? '9+' : unreadCount}
              </span>
            )}
          </button>

          <button
            id="profileButton"
            onClick={onOpenProfile}
            aria-label="User Profile"
            className="press flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-slate-700 hover:bg-slate-200 transition-colors"
          >
            {user.avatar ? (
              <img
                src={user.avatar}
                alt={user.name}
                className="h-8 w-8 rounded-lg object-cover"
                referrerPolicy="no-referrer"
              />
            ) : (
              <UserIcon className="h-5 w-5" />
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
