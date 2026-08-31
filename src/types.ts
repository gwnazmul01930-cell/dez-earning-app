export type WalletType = 'main' | 'fb' | 'mail' | 'insta';

export type TaskCategory = 'all' | 'facebook' | 'gmail' | 'instagram' | 'youtube' | 'daily' | 'special';

export interface UserProfile {
  id: string;
  name: string;
  phone: string;
  email: string;
  avatar: string;
  level: number;
  referralCode: string;
  referrerName?: string;
  totalEarnings: number;
  totalTasksCompleted: number;
  joinedDate: string;
  kycVerified: boolean;
  bkashNumber?: string;
  nagadNumber?: string;
  rocketNumber?: string;
}

export interface WalletBalances {
  main: number;
  fb: number;
  mail: number;
  insta: number;
}

export interface TaskItem {
  id: string;
  category: 'facebook' | 'gmail' | 'instagram' | 'youtube' | 'daily' | 'special';
  title: string;
  titleBn: string;
  description: string;
  reward: number; // in ৳ (BDT)
  targetWallet: WalletType;
  timeLimitMinutes: number;
  targetUrl: string;
  proofType: 'link' | 'screenshot' | 'username' | 'all';
  totalSlots: number;
  completedSlots: number;
  status: 'available' | 'submitted' | 'completed' | 'rejected';
  submittedAt?: string;
  submissionProof?: {
    username?: string;
    proofLink?: string;
    screenshotUrl?: string;
    note?: string;
  };
}

export interface Transaction {
  id: string;
  type: 'deposit' | 'withdraw' | 'transfer' | 'task_earning' | 'bonus' | 'referral';
  amount: number;
  method?: 'bKash' | 'Nagad' | 'Rocket' | 'Upay' | 'System' | 'FB Wallet' | 'Mail Wallet' | 'Insta Wallet';
  sourceWallet?: WalletType;
  targetWallet?: WalletType;
  accountNumber?: string;
  trxId?: string;
  status: 'completed' | 'pending' | 'rejected';
  date: string;
  note?: string;
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  time: string;
  read: boolean;
  type: 'info' | 'success' | 'alert' | 'reward';
}

export interface NoticeBanner {
  id: string;
  badge: string;
  title: string;
  subtitle: string;
  linkText: string;
  actionType: 'task' | 'spin' | 'telegram' | 'deposit';
}

export interface LeaderboardUser {
  rank: number;
  name: string;
  earnings: number;
  tasksDone: number;
  avatar: string;
  isCurrentUser?: boolean;
}
