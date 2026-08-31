import React from 'react';
import {
  Crown,
  Trophy,
  Facebook,
  Mail,
  Instagram,
  Inbox,
  LayoutGrid,
  Shield,
  Calendar,
  CalendarCheck2,
  UserPlus2,
  ListTodo,
  Target,
  Users,
  Gift,
  Landmark,
  Sparkles,
} from 'lucide-react';

export interface ServiceItem {
  id: string;
  title: string;
  badge?: string;
  icon: React.ReactNode;
  iconBg: string;
  actionId: string;
  category?: string;
}

interface ExploreServicesGridProps {
  onSelectService: (serviceId: string) => void;
}

export const ExploreServicesGrid: React.FC<ExploreServicesGridProps> = ({
  onSelectService,
}) => {
  const services: ServiceItem[] = [
    {
      id: 'leadership',
      title: 'Leadership',
      icon: <Crown className="h-5 w-5 text-amber-500 fill-amber-500/20" />,
      iconBg: 'bg-amber-50 border-amber-100',
      actionId: 'leadership',
    },
    {
      id: 'leaderboard',
      title: 'Leaderboard',
      icon: <Trophy className="h-5 w-5 text-purple-600 fill-purple-600/20" />,
      iconBg: 'bg-purple-50 border-purple-100',
      actionId: 'leaderboard',
    },
    {
      id: 'fb-server-1',
      title: 'FB Server 1',
      icon: <Facebook className="h-5 w-5 text-blue-600 fill-blue-600" />,
      iconBg: 'bg-blue-50 border-blue-100',
      actionId: 'fb-server-1',
    },
    {
      id: 'fb-server-2',
      title: 'FB Server 2',
      icon: <Facebook className="h-5 w-5 text-sky-500 fill-sky-500" />,
      iconBg: 'bg-sky-50 border-sky-100',
      actionId: 'fb-server-2',
    },
    {
      id: 'gmail-sell',
      title: 'Gmail Sell',
      icon: <Mail className="h-5 w-5 text-red-500" />,
      iconBg: 'bg-red-50 border-red-100',
      actionId: 'gmail-sell',
    },
    {
      id: 'insta-sell',
      title: 'Insta Sell',
      icon: <Instagram className="h-5 w-5 text-pink-600" />,
      iconBg: 'bg-pink-50 border-pink-100',
      actionId: 'insta-sell',
    },
    {
      id: 'outmail-sell',
      title: 'Outmail Sell',
      icon: <Inbox className="h-5 w-5 text-emerald-600" />,
      iconBg: 'bg-emerald-50 border-emerald-100',
      actionId: 'outmail-sell',
    },
    {
      id: 'hotmail-sell',
      title: 'Hotmail Sell',
      icon: <LayoutGrid className="h-5 w-5 text-blue-500" />,
      iconBg: 'bg-blue-50 border-blue-100',
      actionId: 'hotmail-sell',
    },
    {
      id: 'vpn-store',
      title: 'VPN Store',
      icon: <Shield className="h-5 w-5 text-indigo-600" />,
      iconBg: 'bg-indigo-50 border-indigo-100',
      actionId: 'vpn-store',
    },
    {
      id: 'weekly-salary',
      title: 'Weekly Salary',
      icon: <Calendar className="h-5 w-5 text-emerald-600" />,
      iconBg: 'bg-emerald-50 border-emerald-100',
      actionId: 'weekly-salary',
    },
    {
      id: 'monthly-salary',
      title: 'Monthly Salary',
      icon: <CalendarCheck2 className="h-5 w-5 text-purple-600" />,
      iconBg: 'bg-purple-50 border-purple-100',
      actionId: 'monthly-salary',
    },
    {
      id: 'job-post',
      title: 'Job Post',
      icon: <UserPlus2 className="h-5 w-5 text-blue-600" />,
      iconBg: 'bg-blue-50 border-blue-100',
      actionId: 'job-post',
    },
    {
      id: 'microjob',
      title: 'Microjob',
      icon: <ListTodo className="h-5 w-5 text-rose-500" />,
      iconBg: 'bg-rose-50 border-rose-100',
      actionId: 'microjob',
    },
    {
      id: 'target-bonus',
      title: 'Target Bonus',
      icon: <Target className="h-5 w-5 text-orange-500" />,
      iconBg: 'bg-orange-50 border-orange-100',
      actionId: 'target-bonus',
    },
    {
      id: 'refer-earn',
      title: 'Refer & Earn',
      icon: <Users className="h-5 w-5 text-teal-600" />,
      iconBg: 'bg-teal-50 border-teal-100',
      actionId: 'refer-earn',
    },
    {
      id: 'gift-code',
      title: 'Gift Code',
      icon: <Gift className="h-5 w-5 text-purple-600" />,
      iconBg: 'bg-purple-50 border-purple-100',
      actionId: 'gift-code',
    },
    {
      id: 'withdraw',
      title: 'Withdraw',
      icon: <Landmark className="h-5 w-5 text-blue-700" />,
      iconBg: 'bg-blue-50 border-blue-100',
      actionId: 'withdraw',
    },
  ];

  return (
    <section className="space-y-3">
      {/* SECTION TITLE */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="flex h-5 w-5 items-center justify-center rounded-md bg-blue-600 text-white shadow-xs">
            <Sparkles className="h-3 w-3" />
          </div>
          <h2 className="text-sm font-extrabold text-slate-800 tracking-tight">
            Explore Services
          </h2>
        </div>
        <span className="text-[11px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full border border-blue-100">
          ১৭টি সেবা লাইভ
        </span>
      </div>

      {/* 3 COLUMN GRID AS IN SCREENSHOT */}
      <div className="grid grid-cols-3 gap-2.5">
        {services.map((item) => (
          <button
            key={item.id}
            id={`service-${item.id}`}
            onClick={() => onSelectService(item.actionId)}
            className="press relative flex flex-col items-center justify-center rounded-2xl bg-white p-3.5 text-center shadow-xs border border-slate-100 hover:border-blue-200 hover:shadow-sm hover:bg-slate-50/50 transition-all duration-200 group"
          >
            {item.badge && (
              <span className="absolute top-2 right-2 flex h-5 min-w-5 items-center justify-center rounded-full bg-red-500 text-white text-[10px] font-black px-1.5 animate-pulse shadow-xs">
                {item.badge}
              </span>
            )}
            <div
              className={`flex h-12 w-12 items-center justify-center rounded-2xl border ${item.iconBg} mb-2 group-hover:scale-105 transition-transform duration-200`}
            >
              {item.icon}
            </div>
            <span className="text-xs font-extrabold text-slate-700 group-hover:text-blue-600 transition-colors line-clamp-1">
              {item.title}
            </span>
          </button>
        ))}
      </div>
    </section>
  );
};
