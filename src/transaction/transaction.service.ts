import { Injectable } from '@nestjs/common';
import { Transaction } from './dto/transaction.interface';

@Injectable()
export class TransactionService {
  fetchTransactions(
    startDate?: string,
    endDate?: string,
    latestCreatedAt?: Date,
  ): Promise<Transaction[]> {
    // Simulated API response
    let transactions: Transaction[] = [
      {
        id: '41bbdf81-735c-4aea-beb3-3e5f433a30c5',
        userId: '074092',
        type: 'earned',
        amount: 1.2,
        createdAt: new Date('2023-03-15T12:33:11.000Z'),
      },
      {
        id: '41bbdf81-735c-4aea-beb3-3e5fasfsdfef',
        userId: '074092',
        type: 'spent',
        amount: 12,
        createdAt: new Date('2023-03-12T12:33:11.000Z'),
      },
      {
        id: '41bbdf81-735c-4aea-beb3-342jhj234nj234',
        userId: '074092',
        type: 'payout',
        amount: 30,
        createdAt: new Date('2023-03-16T12:33:11.000Z'),
      },
    ];
    if (latestCreatedAt != null) {
      transactions = transactions.filter(
        (trans) => trans.createdAt >= latestCreatedAt,
      );
    }
    return Promise.resolve(transactions);
  }
}
