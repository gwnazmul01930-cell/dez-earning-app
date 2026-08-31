/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import {
  INITIAL_USER,
  INITIAL_BALANCES,
  INITIAL_TASKS,
  INITIAL_TRANSACTIONS,
  INITIAL_NOTIFICATIONS,
  INITIAL_NOTICES,
  INITIAL_LEADERBOARD,
} from './data/initialData';
import {
  UserProfile,
  WalletBalances,
  TaskItem,
  Transaction,
  NotificationItem,
  WalletType,
  NoticeBanner,
} from './types';
import { Header } from './components/Header';
import { DrawerMenu } from './components/DrawerMenu';
import { BalanceOverview } from './components/BalanceOverview';
import { BannerCarousel } from './components/BannerCarousel';
import { QuickActions } from './components/QuickActions';
import { TaskSection } from './components/TaskSection';
import { TaskDetailModal } from './components/TaskDetailModal';
import { AddFundModal } from './components/AddFundModal';
import { WithdrawModal } from './components/WithdrawModal';
import { TransferModal } from './components/TransferModal';
import { DailySpinModal } from './components/DailySpinModal';
import { WalletDetailModal } from './components/WalletDetailModal';
import { ReferralSection } from './components/ReferralSection';
import { LeaderboardView } from './components/LeaderboardView';
import { TransactionsView } from './components/TransactionsView';
import { WalletsView } from './components/WalletsView';
import { NotificationModal } from './components/NotificationModal';
import { ProfileModal } from './components/ProfileModal';
import { TelegramSupportModal } from './components/TelegramSupportModal';
import { ShareLinkModal } from './components/ShareLinkModal';
import { BottomNavigation } from './components/BottomNavigation';
import { CheckCircle2, AlertCircle } from 'lucide-react';

export default function App() {
  // --- PERSISTENT STATE ---
  const [user, setUser] = useState<UserProfile>(() => {
    const saved = localStorage.getItem('dez_user');
    return saved ? JSON.parse(saved) : INITIAL_USER;
  });

  const [balances, setBalances] = useState<WalletBalances>(() => {
    const saved = localStorage.getItem('dez_balances');
    return saved ? JSON.parse(saved) : INITIAL_BALANCES;
  });

  const [tasks, setTasks] = useState<TaskItem[]>(() => {
    const saved = localStorage.getItem('dez_tasks');
    return saved ? JSON.parse(saved) : INITIAL_TASKS;
  });

  const [transactions, setTransactions] = useState<Transaction[]>(() => {
    const saved = localStorage.getItem('dez_transactions');
    return saved ? JSON.parse(saved) : INITIAL_TRANSACTIONS;
  });

  const [notifications, setNotifications] = useState<NotificationItem[]>(() => {
    const saved = localStorage.getItem('dez_notifications');
    return saved ? JSON.parse(saved) : INITIAL_NOTIFICATIONS;
  });

  const [hasCheckedInToday, setHasCheckedInToday] = useState<boolean>(() => {
    const lastCheckin = localStorage.getItem('dez_last_checkin');
    const today = new Date().toDateString();
    return lastCheckin === today;
  });

  // --- SAVE TO LOCALSTORAGE ---
  useEffect(() => {
    localStorage.setItem('dez_user', JSON.stringify(user));
  }, [user]);

  useEffect(() => {
    localStorage.setItem('dez_balances', JSON.stringify(balances));
  }, [balances]);

  useEffect(() => {
    localStorage.setItem('dez_tasks', JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    localStorage.setItem('dez_transactions', JSON.stringify(transactions));
  }, [transactions]);

  useEffect(() => {
    localStorage.setItem('dez_notifications', JSON.stringify(notifications));
  }, [notifications]);

  // --- UI NAVIGATION & MODALS ---
  const [activeTab, setActiveTab] = useState<string>('home');
  const [toastMessage, setToastMessage] = useState<{ title: string; desc: string; type: 'success' | 'info' } | null>(null);

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isDepositOpen, setIsDepositOpen] = useState(false);
  const [isWithdrawOpen, setIsWithdrawOpen] = useState(false);
  const [isTransferOpen, setIsTransferOpen] = useState(false);
  const [isSpinOpen, setIsSpinOpen] = useState(false);
  const [isTelegramOpen, setIsTelegramOpen] = useState(false);
  const [isShareLinkOpen, setIsShareLinkOpen] = useState(false);

  const [selectedTask, setSelectedTask] = useState<TaskItem | null>(null);
  const [selectedWalletDetail, setSelectedWalletDetail] = useState<WalletType | null>(null);

  const showToast = (title: string, desc: string, type: 'success' | 'info' = 'success') => {
    setToastMessage({ title, desc, type });
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  const unreadNotificationCount = notifications.filter((n) => !n.read).length;

  // --- ACTIONS ---

  // 1. Daily Check-in
  const handleDailyCheckIn = () => {
    if (hasCheckedInToday) return;

    const reward = 1.50;
    setBalances((prev) => ({ ...prev, main: prev.main + reward }));
    setUser((prev) => ({
      ...prev,
      totalEarnings: prev.totalEarnings + reward,
    }));

    const todayStr = new Date().toDateString();
    localStorage.setItem('dez_last_checkin', todayStr);
    setHasCheckedInToday(true);

    const newTx: Transaction = {
      id: `TRX-${Math.floor(10000 + Math.random() * 90000)}`,
      type: 'bonus',
      amount: reward,
      status: 'completed',
      date: 'Just now',
      note: 'Daily Check-in Reward',
    };
    setTransactions((prev) => [newTx, ...prev]);

    showToast('দৈনিক বোনাস সফল!', 'আপনার মেইন ব্যালেন্সে ৳১.৫০ যোগ হয়েছে');
  };

  // 2. Lucky Spin Win
  const handleSpinWin = (wonAmount: number) => {
    setBalances((prev) => ({ ...prev, main: prev.main + wonAmount }));
    setUser((prev) => ({
      ...prev,
      totalEarnings: prev.totalEarnings + wonAmount,
    }));

    const newTx: Transaction = {
      id: `TRX-${Math.floor(10000 + Math.random() * 90000)}`,
      type: 'bonus',
      amount: wonAmount,
      status: 'completed',
      date: 'Just now',
      note: `Lucky Spin Wheel Winner: ৳${wonAmount.toFixed(2)}`,
    };
    setTransactions((prev) => [newTx, ...prev]);

    showToast('স্পিন উইন!', `অভিনন্দন! আপনি জিতেছেন ৳${wonAmount.toFixed(2)}`);
  };

  // 3. Task Proof Submission
  const handleSubmitTaskProof = (
    taskId: string,
    proof: { username?: string; proofLink?: string; screenshotUrl?: string; note?: string }
  ) => {
    const task = tasks.find((t) => t.id === taskId);
    if (!task) return;

    // Credit to task.targetWallet
    const target = task.targetWallet;
    setBalances((prev) => ({
      ...prev,
      [target]: prev[target] + task.reward,
    }));

    setUser((prev) => ({
      ...prev,
      totalEarnings: prev.totalEarnings + task.reward,
      totalTasksCompleted: prev.totalTasksCompleted + 1,
    }));

    // Update task status
    setTasks((prev) =>
      prev.map((t) =>
        t.id === taskId
          ? {
              ...t,
              status: 'completed',
              completedSlots: t.completedSlots + 1,
              submissionProof: proof,
            }
          : t
      )
    );

    const newTx: Transaction = {
      id: `TRX-${Math.floor(10000 + Math.random() * 90000)}`,
      type: 'task_earning',
      amount: task.reward,
      targetWallet: target,
      status: 'completed',
      date: 'Just now',
      note: `Task: ${task.titleBn}`,
    };
    setTransactions((prev) => [newTx, ...prev]);

    const newNotif: NotificationItem = {
      id: `notif-${Date.now()}`,
      title: `টাস্ক সম্পন্ন: ৳${task.reward.toFixed(2)} অর্জিত!`,
      message: `আপনার "${task.titleBn}" কাজের টাকা ${target.toUpperCase()} ওয়ালেটে সফলভাবে জমা হয়েছে।`,
      time: 'Just now',
      read: false,
      type: 'success',
    };
    setNotifications((prev) => [newNotif, ...prev]);

    showToast(
      'টাস্ক সফল!',
      `আপনার ${target.toUpperCase()} ওয়ালেটে ৳${task.reward.toFixed(2)} যুক্ত হয়েছে।`
    );
  };

  // 4. Deposit
  const handleSuccessDeposit = (amount: number, method: 'bKash' | 'Nagad' | 'Rocket', trxId: string) => {
    setBalances((prev) => ({ ...prev, main: prev.main + amount }));

    const newTx: Transaction = {
      id: `TRX-${Math.floor(10000 + Math.random() * 90000)}`,
      type: 'deposit',
      amount: amount,
      method: method,
      trxId: trxId,
      status: 'completed',
      date: 'Just now',
      note: `Deposit via ${method}`,
    };
    setTransactions((prev) => [newTx, ...prev]);

    const newNotif: NotificationItem = {
      id: `notif-${Date.now()}`,
      title: `ডিপোজিট সফল: ৳${amount.toFixed(2)}`,
      message: `${method} মাধ্যমে ৳${amount} ডিপোজিট সফলভাবে ভেরিফাই ও জমা হয়েছে।`,
      time: 'Just now',
      read: false,
      type: 'success',
    };
    setNotifications((prev) => [newNotif, ...prev]);

    showToast('ডিপোজিট সফল!', `আপনার মেইন ব্যালেন্সে ৳${amount.toFixed(2)} যোগ হয়েছে`);
  };

  // 5. Withdraw
  const handleSuccessWithdraw = (amount: number, method: 'bKash' | 'Nagad' | 'Rocket', accountNumber: string) => {
    setBalances((prev) => ({ ...prev, main: Math.max(0, prev.main - amount) }));

    const newTx: Transaction = {
      id: `TRX-${Math.floor(10000 + Math.random() * 90000)}`,
      type: 'withdraw',
      amount: amount,
      method: method,
      accountNumber: accountNumber,
      status: 'completed',
      date: 'Just now',
      note: `Withdraw to ${method} (${accountNumber})`,
    };
    setTransactions((prev) => [newTx, ...prev]);

    const newNotif: NotificationItem = {
      id: `notif-${Date.now()}`,
      title: `উইথড্রয়াল সম্পন্ন: ৳${amount.toFixed(2)}`,
      message: `আপনার ${method} (${accountNumber}) একাউন্টে ৳${amount} পাঠানোর অনুরোধ সফলভাবে সম্পন্ন হয়েছে।`,
      time: 'Just now',
      read: false,
      type: 'success',
    };
    setNotifications((prev) => [newNotif, ...prev]);

    showToast('উইথড্র সম্পন্ন!', `৳${amount.toFixed(2)} আপনার ${method} একাউন্টে পাঠানো হয়েছে`);
  };

  // 6. Transfer Sub-wallet to Main Balance
  const handleSuccessTransfer = (fromWallet: WalletType, amount: number) => {
    setBalances((prev) => ({
      ...prev,
      [fromWallet]: Math.max(0, prev[fromWallet] - amount),
      main: prev.main + amount,
    }));

    const newTx: Transaction = {
      id: `TRX-${Math.floor(10000 + Math.random() * 90000)}`,
      type: 'transfer',
      amount: amount,
      sourceWallet: fromWallet,
      targetWallet: 'main',
      status: 'completed',
      date: 'Just now',
      note: `Transferred ${fromWallet.toUpperCase()} Wallet to Main Balance`,
    };
    setTransactions((prev) => [newTx, ...prev]);

    showToast('ট্রান্সফার সম্পন্ন!', `৳${amount.toFixed(2)} মেইন ব্যালেন্সে যুক্ত হয়েছে`);
  };

  // Banner Carousel Actions
  const handleBannerAction = (actionType: NoticeBanner['actionType']) => {
    if (actionType === 'task') setActiveTab('tasks');
    else if (actionType === 'spin') setIsSpinOpen(true);
    else if (actionType === 'telegram') setIsTelegramOpen(true);
    else if (actionType === 'deposit') setIsDepositOpen(true);
  };

  return (
    <div id="app" className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans pb-24">
      {/* GLOBAL TOAST NOTIFICATION */}
      {toastMessage && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-sm rounded-2xl bg-slate-900 text-white p-3.5 shadow-2xl flex items-center gap-3 border border-slate-800 animate-in fade-in slide-in-from-top-4 duration-200">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-emerald-500/20 text-emerald-400">
            <CheckCircle2 className="h-5 w-5" />
          </div>
          <div>
            <h4 className="text-xs font-black">{toastMessage.title}</h4>
            <p className="text-[11px] text-slate-300 mt-0.5">{toastMessage.desc}</p>
          </div>
        </div>
      )}

      {/* TOP HEADER */}
      <Header
        user={user}
        unreadCount={unreadNotificationCount}
        onOpenMenu={() => setIsDrawerOpen(true)}
        onOpenNotifications={() => setIsNotificationOpen(true)}
        onOpenProfile={() => setIsProfileOpen(true)}
        onOpenShareLink={() => setIsShareLinkOpen(true)}
      />

      {/* MAIN CONTAINER */}
      <main className="mx-auto w-full max-w-2xl px-4 pt-4 flex-1">
        {/* VIEW: HOME */}
        {activeTab === 'home' && (
          <div className="space-y-6 animate-in fade-in duration-150">
            <BalanceOverview
              user={user}
              balances={balances}
              onOpenDeposit={() => setIsDepositOpen(true)}
              onOpenWithdraw={() => setIsWithdrawOpen(true)}
              onOpenTransfer={() => setIsTransferOpen(true)}
              onSelectWallet={(w) => setSelectedWalletDetail(w)}
            />

            <BannerCarousel
              notices={INITIAL_NOTICES}
              onAction={handleBannerAction}
            />

            <QuickActions
              hasCheckedInToday={hasCheckedInToday}
              onDailyCheckIn={handleDailyCheckIn}
              onOpenSpin={() => setIsSpinOpen(true)}
              onOpenReferral={() => setActiveTab('refer')}
              onOpenTelegram={() => setIsTelegramOpen(true)}
            />

            <TaskSection
              tasks={tasks}
              onSelectTask={(task) => setSelectedTask(task)}
            />
          </div>
        )}

        {/* VIEW: TASKS / EARN */}
        {activeTab === 'tasks' && (
          <div className="space-y-4 animate-in fade-in duration-150">
            <TaskSection
              tasks={tasks}
              onSelectTask={(task) => setSelectedTask(task)}
            />
          </div>
        )}

        {/* VIEW: WALLETS */}
        {activeTab === 'wallets' && (
          <div className="space-y-4 animate-in fade-in duration-150">
            <WalletsView
              balances={balances}
              onOpenDeposit={() => setIsDepositOpen(true)}
              onOpenWithdraw={() => setIsWithdrawOpen(true)}
              onOpenTransfer={() => setIsTransferOpen(true)}
              onSelectWallet={(w) => setSelectedWalletDetail(w)}
            />
          </div>
        )}

        {/* VIEW: TRANSACTIONS / HISTORY */}
        {activeTab === 'history' && (
          <div className="space-y-4 animate-in fade-in duration-150">
            <TransactionsView transactions={transactions} />
          </div>
        )}

        {/* VIEW: REFERRAL */}
        {activeTab === 'refer' && (
          <div className="space-y-4 animate-in fade-in duration-150">
            <ReferralSection user={user} />
          </div>
        )}

        {/* VIEW: LEADERBOARD */}
        {activeTab === 'leaderboard' && (
          <div className="space-y-4 animate-in fade-in duration-150">
            <LeaderboardView leaderboard={INITIAL_LEADERBOARD} />
          </div>
        )}
      </main>

      {/* BOTTOM NAVIGATION */}
      <BottomNavigation
        currentTab={activeTab}
        onTabChange={(tab) => {
          setActiveTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />

      {/* --- ALL INTERACTIVE MODALS --- */}

      {/* 1. Navigation Drawer */}
      <DrawerMenu
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        user={user}
        balances={balances}
        onNavigate={(tab) => {
          setActiveTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenDeposit={() => setIsDepositOpen(true)}
        onOpenWithdraw={() => setIsWithdrawOpen(true)}
        onOpenSpin={() => setIsSpinOpen(true)}
        onOpenTelegram={() => setIsTelegramOpen(true)}
        onOpenShareLink={() => setIsShareLinkOpen(true)}
      />

      {/* 2. Notifications Modal */}
      <NotificationModal
        isOpen={isNotificationOpen}
        onClose={() => setIsNotificationOpen(false)}
        notifications={notifications}
        onMarkAllAsRead={() => {
          setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
        }}
      />

      {/* 3. Profile Modal */}
      <ProfileModal
        isOpen={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
        user={user}
        onUpdateUser={(updated) => setUser((prev) => ({ ...prev, ...updated }))}
      />

      {/* 4. Task Detail / Submission Modal */}
      <TaskDetailModal
        task={selectedTask}
        onClose={() => setSelectedTask(null)}
        onSubmitProof={handleSubmitTaskProof}
      />

      {/* 5. Add Fund / Deposit Modal */}
      <AddFundModal
        isOpen={isDepositOpen}
        onClose={() => setIsDepositOpen(false)}
        onSuccessDeposit={handleSuccessDeposit}
      />

      {/* 6. Withdraw Modal */}
      <WithdrawModal
        isOpen={isWithdrawOpen}
        onClose={() => setIsWithdrawOpen(false)}
        mainBalance={balances.main}
        user={user}
        onSuccessWithdraw={handleSuccessWithdraw}
      />

      {/* 7. Transfer Sub-wallet Modal */}
      <TransferModal
        isOpen={isTransferOpen}
        onClose={() => setIsTransferOpen(false)}
        balances={balances}
        onSuccessTransfer={handleSuccessTransfer}
      />

      {/* 8. Daily Lucky Spin Wheel Modal */}
      <DailySpinModal
        isOpen={isSpinOpen}
        onClose={() => setIsSpinOpen(false)}
        onSpinWin={handleSpinWin}
      />

      {/* 9. Wallet Specific Detail Modal */}
      <WalletDetailModal
        walletType={selectedWalletDetail}
        onClose={() => setSelectedWalletDetail(null)}
        balances={balances}
        onOpenTransfer={() => {
          setSelectedWalletDetail(null);
          setIsTransferOpen(true);
        }}
        onNavigateToCategoryTasks={(cat) => {
          setSelectedWalletDetail(null);
          setActiveTab('tasks');
        }}
      />

      {/* 10. Telegram Support Modal */}
      <TelegramSupportModal
        isOpen={isTelegramOpen}
        onClose={() => setIsTelegramOpen(false)}
      />

      {/* 11. Share App Link Modal */}
      <ShareLinkModal
        isOpen={isShareLinkOpen}
        onClose={() => setIsShareLinkOpen(false)}
        referralCode={user.referralCode}
      />
    </div>
  );
}
