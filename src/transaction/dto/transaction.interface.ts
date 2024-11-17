export interface Transaction {
  id: string;
  userId: string;
  type: 'earned' | 'spent' | 'payout' | 'paid_out';
  amount: number;
  createdAt: Date;
}
