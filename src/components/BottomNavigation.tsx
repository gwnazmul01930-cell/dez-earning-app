import React from 'react';
import { Home, ListTodo, Wallet, History, Users } from 'lucide-react';

interface BottomNavigationProps {
  currentTab: string;
  onTabChange: (tab: string) => void;
}

export const BottomNavigation: React.FC<BottomNavigationProps> = ({
  currentTab,
  onTabChange,
}) => {
  const navItems = [
    { id: 'home', label: 'হোম', icon: Home },
    { id: 'tasks', label: 'টাস্ক/কাজ', icon: ListTodo },
    { id: 'wallets', label: 'ওয়ালেট', icon: Wallet },
    { id: 'history', label: 'হিস্টোরি', icon: History },
    { id: 'refer', label: 'রেফার', icon: Users },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 border-t border-slate-200/90 bg-white/95 backdrop-blur-xl shadow-lg pb-[env(safe-area-inset-bottom)]">
      <div className="mx-auto flex h-16 max-w-2xl items-center justify-around px-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={`press flex flex-1 flex-col items-center justify-center py-1 transition-colors ${
                isActive ? 'text-blue-600' : 'text-slate-400 hover:text-slate-600'
              }`}
            >
              <div
                className={`flex h-8 w-8 items-center justify-center rounded-xl transition-all ${
                  isActive ? 'bg-blue-50 text-blue-600 font-bold scale-110' : ''
                }`}
              >
                <Icon className={`h-5 w-5 ${isActive ? 'stroke-[2.5]' : 'stroke-2'}`} />
              </div>
              <span className={`text-[10px] tracking-tight mt-0.5 ${isActive ? 'font-black text-blue-600' : 'font-semibold text-slate-500'}`}>
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
