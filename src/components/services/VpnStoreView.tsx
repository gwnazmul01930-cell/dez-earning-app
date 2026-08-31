import React from 'react';
import { ArrowLeft, Shield, AlertCircle, ShoppingBag, History, Lock } from 'lucide-react';
import { UserProfile, WalletBalances } from '../../types';

interface VpnStoreViewProps {
  user: UserProfile;
  balances: WalletBalances;
  onBack: () => void;
}

export const VpnStoreView: React.FC<VpnStoreViewProps> = ({
  user,
  balances,
  onBack,
}) => {
  const vpnList = [
    {
      id: 'express',
      name: 'Express VPN',
      price: '৳0.00',
      totalSold: '124',
      status: 'Out of Stock',
      color: 'bg-red-50 text-red-600 border-red-100',
    },
    {
      id: 'bilbil',
      name: 'Bilbil VPN',
      price: '৳0.00',
      totalSold: '86',
      status: 'Out of Stock',
      color: 'bg-blue-50 text-blue-600 border-blue-100',
    },
    {
      id: 'hma',
      name: 'HMA VPN',
      price: '৳0.00',
      totalSold: '210',
      status: 'Out of Stock',
      color: 'bg-amber-50 text-amber-600 border-amber-100',
    },
    {
      id: 'surfshark',
      name: 'Surfshark Vpn',
      price: '৳0.00',
      totalSold: '95',
      status: 'Out of Stock',
      color: 'bg-teal-50 text-teal-600 border-teal-100',
    },
    {
      id: 'avg',
      name: 'AVG VPN',
      price: '৳0.00',
      totalSold: '64',
      status: 'Out of Stock',
      color: 'bg-purple-50 text-purple-600 border-purple-100',
    },
    {
      id: 'nord',
      name: 'Nord vpn',
      price: '৳0.00',
      totalSold: '340',
      status: 'Out of Stock',
      color: 'bg-sky-50 text-sky-600 border-sky-100',
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
          VPN STORE
        </h1>
        <div className="w-10" />
      </div>

      {/* HEADER CARD */}
      <div className="rounded-3xl bg-gradient-to-r from-indigo-700 to-purple-800 p-5 text-white shadow-lg flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-indigo-300" />
            <span className="text-xs font-bold text-indigo-200">Official VPN Store</span>
          </div>
          <p className="text-xl font-black mt-1">প্রিমিয়াম ভিপিএন কালেকশন</p>
        </div>
        <div className="text-right">
          <p className="text-[10px] font-bold text-indigo-200">Main Balance</p>
          <p className="text-lg font-black text-emerald-300">৳{balances.main.toFixed(2)}</p>
        </div>
      </div>

      {/* VPN PRODUCTS GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {vpnList.map((vpn) => (
          <div
            key={vpn.id}
            className="rounded-3xl bg-white p-4.5 shadow-xs border border-slate-100 space-y-3"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className={`flex h-11 w-11 items-center justify-center rounded-2xl border ${vpn.color}`}>
                  <Shield className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-sm font-extrabold text-slate-800">{vpn.name}</h3>
                  <p className="text-[10px] text-slate-400">Total Sold: {vpn.totalSold}</p>
                </div>
              </div>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-rose-50 text-rose-700 border border-rose-100">
                {vpn.status}
              </span>
            </div>

            <div className="flex items-center justify-between pt-1">
              <span className="text-base font-black text-slate-900">{vpn.price}</span>
              <button
                disabled
                className="press flex items-center gap-1 rounded-xl bg-slate-100 px-4 py-2 text-xs font-black text-slate-400 cursor-not-allowed"
              >
                <Lock className="h-3 w-3" />
                <span>UNAVAILABLE</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* RECENT ORDERS */}
      <div className="rounded-3xl bg-white p-5 shadow-xs border border-slate-100 space-y-3">
        <div className="flex items-center gap-2">
          <History className="h-4 w-4 text-slate-500" />
          <h3 className="text-xs font-extrabold text-slate-800">
            RECENT ORDERS
          </h3>
        </div>
        <p className="text-xs text-slate-400 text-center py-3">
          নতুন ভিপিএন স্টক খুব শীঘ্রই যোগ করা হবে!
        </p>
      </div>
    </div>
  );
};
