export type UserRole = 'admin' | 'member';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  walletAddress?: string;
  balance: number;
  hashrate: number; // in TH/s
  refCode: string;
  referredBy?: string;
  avatar: string;
  createdAt: string;
}

export interface Contract {
  id: string;
  userId: string;
  packageName: string;
  price: number;
  hashrate: number;
  durationDays: number;
  progress: number; // 0 to 100
  status: 'active' | 'completed';
  dailyEarnings: number;
  earningsAccumulated: number;
  lastTickTime: string;
  createdAt: string;
}

export interface Transaction {
  id: string;
  userId: string;
  userName: string;
  type: 'deposit' | 'withdraw';
  amount: number;
  currency: string;
  walletAddress: string;
  status: 'pending' | 'success' | 'failed';
  txHash: string;
  createdAt: string;
}

export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  read: boolean;
  createdAt: string;
}

export interface MiningPackage {
  id: string;
  name: string;
  price: number;
  hashrate: number; // in TH/s
  durationDays: number;
  dailyProfitPercent: number;
  features: string[];
  color: string; // Tailwind color class or border hex
  popular?: boolean;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: 'general' | 'mining' | 'financial' | 'security';
}
