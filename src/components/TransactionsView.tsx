import React, { useState } from 'react';
import {
  ArrowDownLeft,
  ArrowUpRight,
  ArrowRightLeft,
  CheckCircle2,
  Clock,
  XCircle,
  Filter,
  Sparkles,
  Gift
} from 'lucide-react';
import { Transaction } from '../types';

interface TransactionsViewProps {
  transactions: Transaction[];
}

export const TransactionsView: React.FC<TransactionsViewProps> = ({ transactions }) => {
  const [filter, setFilter] = useState<'all' | 'deposit' | 'withdraw' | 'task_earning' | 'transfer'>('all');

  const filteredTransactions = transactions.filter((t) => {
    if (filter === 'all') return true;
    return t.type === filter;
  });

  const getIcon = (type: Transaction['type']) => {
    switch (type) {
      case 'deposit':
        return (
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
            <ArrowDownLeft className="h-5 w-5" />
          </div>
        );
      case 'withdraw':
        return (
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
            <ArrowUpRight className="h-5 w-5" />
          </div>
        );
      case 'transfer':
        return (
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
            <ArrowRightLeft className="h-5 w-5" />
          </div>
        );
      case 'bonus':
      case 'referral':
        return (
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-50 text-amber-600">
            <Gift className="h-5 w-5" />
          </div>
        );
      default:
        return (
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-purple-50 text-purple-600">
            <Sparkles className="h-5 w-5" />
          </div>
        );
    }
  };

  const getStatusBadge = (status: Transaction['status']) => {
    switch (status) {
      case 'completed':
        return (
          <span className="flex items-center gap-1 rounded-md bg-emerald-50 px-1.5 py-0.5 text-[9px] font-bold text-emerald-700 border border-emerald-200">
            <CheckCircle2 className="h-3 w-3" />
            সফল
          </span>
        );
      case 'pending':
        return (
          <span className="flex items-center gap-1 rounded-md bg-amber-50 px-1.5 py-0.5 text-[9px] font-bold text-amber-700 border border-amber-200">
            <Clock className="h-3 w-3" />
            পেন্ডিং
          </span>
        );
      default:
        return (
          <span className="flex items-center gap-1 rounded-md bg-red-50 px-1.5 py-0.5 text-[9px] font-bold text-red-700 border border-red-200">
            <XCircle className="h-3 w-3" />
            বাতিল
          </span>
        );
    }
  };

  return (
    <section className="space-y-3">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-base font-extrabold text-slate-900 tracking-tight">
            লেনদেন হিস্টোরি (Transactions)
          </h2>
          <p className="text-xs text-slate-500">
            আপনার সকল আয়, ডিপোজিট ও উইথড্রয়াল বিবরণ
          </p>
        </div>

        <span className="text-xs font-bold text-slate-400">
          মোট {filteredTransactions.length} টি
        </span>
      </div>

      {/* FILTER BUTTONS */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 hide-scrollbar">
        {[
          { id: 'all', label: 'সব লেনদেন' },
          { id: 'deposit', label: 'ডিপোজিট' },
          { id: 'withdraw', label: 'উইথড্র' },
          { id: 'task_earning', label: 'টাস্ক আয়' },
          { id: 'transfer', label: 'ট্রান্সফার' }
        ].map((btn) => (
          <button
            key={btn.id}
            onClick={() => setFilter(btn.id as any)}
            className={`press shrink-0 rounded-xl px-3 py-1.5 text-xs font-bold transition-all ${
              filter === btn.id
                ? 'bg-slate-900 text-white shadow-xs'
                : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            {btn.label}
          </button>
        ))}
      </div>

      {/* LIST */}
      <div className="space-y-2">
        {filteredTransactions.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-slate-200 bg-white p-8 text-center">
            <p className="text-sm font-semibold text-slate-600">কোনো লেনদেন রেকর্ড নেই</p>
            <p className="text-xs text-slate-400 mt-1">টাস্ক সম্পন্ন বা উইথড্র করলে এখানে দৃশ্যমান হবে</p>
          </div>
        ) : (
          filteredTransactions.map((trx) => (
            <div
              key={trx.id}
              className="soft-card flex items-center justify-between rounded-2xl bg-white p-3.5"
            >
              <div className="flex items-center gap-3">
                {getIcon(trx.type)}

                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-extrabold text-xs text-slate-800">
                      {trx.note || trx.type.toUpperCase()}
                    </h3>
                  </div>

                  <div className="mt-0.5 flex items-center gap-2 text-[11px] text-slate-400">
                    <span>{trx.date}</span>
                    {trx.trxId && (
                      <>
                        <span>•</span>
                        <span className="font-mono font-bold text-slate-500">
                          {trx.trxId}
                        </span>
                      </>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex flex-col items-end shrink-0">
                <div
                  className={`text-sm font-black ${
                    trx.type === 'withdraw'
                      ? 'text-red-600'
                      : 'text-emerald-600'
                  }`}
                >
                  {trx.type === 'withdraw' ? '-' : '+'}৳{trx.amount.toFixed(2)}
                </div>

                <div className="mt-1">{getStatusBadge(trx.status)}</div>
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  );
};
