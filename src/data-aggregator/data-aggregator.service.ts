import { Injectable } from '@nestjs/common';
import { TransactionService } from '../transaction/transaction.service';
import { Cron } from '@nestjs/schedule';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TransactionEntity } from '../transaction/entities/transaction.entity';

@Injectable()
export class DataAggregatorService {
  constructor(
    @InjectRepository(TransactionEntity)
    private readonly transactionRepository: Repository<TransactionEntity>,
    private readonly transactionService: TransactionService,
  ) {}

  async getDataForUser(userId: string) {
    const dataRows = await this.transactionRepository.findBy({
      userId: userId,
    });
    let aggregatedData = {
      userId: userId,
      paid_out: 0.0,
      payout: 0.0,
      balance: 0.0,
      earned: 0.0,
      spent: 0.0,
    };
    // This could be done in a lot of ways, but this was the quickest. Depending on infrastructure,
    // this could also pretty much be done by using the "getRequestedPayouts" method we made.
    for (const row of dataRows) {
      switch (row.type) {
        case 'payout':
          aggregatedData.payout += row.amount;
          break;
        case 'spent':
          aggregatedData.spent += row.amount;
          break;
        case 'earned':
          aggregatedData.earned += row.amount;
          break;
        case 'paid_out':
          aggregatedData.paid_out += row.amount;
          break;
        default:
          break;
      }
    }
    return aggregatedData;
  }

  async getRequestedPayouts(userId: string) {
    // If we want the best performance, then making the Database do the calculations
    // is usually the best idea as to offload the task.
    return await this.transactionRepository
      .createQueryBuilder('transaction')
      .select('transaction.userId', 'userId')
      .addSelect('SUM(transaction.amount)', 'totalPaidOut')
      .where('transaction.userId = :userId', { userId })
      .where('transaction.type = :type', { type: 'payout' })

      .groupBy('transaction.userId')
      .getRawOne();
  }

  @Cron('*/15 * * * * *')
  async fetchTransactions() {
    /**
     *    We know we're allowed to call the Transaction API 5 times a minute, so that's why I chose every 15 seconds.
     *    I assume that in the Transaction API, then I can filter on the createdAt value.
     *    By filtering on the createdAt, and running every 15 seconds, then I can keep a local cache of all data.
     *    In the given challenge, 1200 transactions existed within a day, so I can safely assume that if I get a max of
     *     5000 transactions per minute, then I will never be out of date.
     *    Ideally pagination should also have been implemented in the event of more than 1000
     *    transactions per 15 seconds, but given the task at hand, it seemed un
     */

    const latestDate = await this.getNewestEntityDate();
    const data = await this.transactionService.fetchTransactions(
      null,
      null,
      latestDate,
    );
    /**
     * Do note that since we're doing a Greater Than Equal on the createdDate,
     * then I can get duplicates on Transactions that I already had before. I do this in the event that a transaction wasn't received on a earlier run, but has the same createdAt as another Transaction I have in the database.
     * In that event, then my primary key in the database ensures uniqueness
     */
    await Promise.all(
      data.map(async (item) => {
        const transactionEntity = new TransactionEntity();

        transactionEntity.id = item.id;
        transactionEntity.userId = item.userId;
        transactionEntity.type = item.type;
        transactionEntity.amount = item.amount;
        transactionEntity.createdAt = item.createdAt;
        await transactionEntity.save();
      }),
    );
  }

  async getNewestEntityDate(): Promise<Date> {
    // If I get the newest date, then I can later use this to only get updates I don't have yet.
    const all = await this.transactionRepository.find({
      order: {
        createdAt: 'DESC', // Sort by `createdAt` in descending order
      },
    });
    if (all.length <= 0) {
      return new Date('2000-01-01T12:33:11.000Z');
    }
    const latest = all[0];
    return latest.createdAt;
  }
}
