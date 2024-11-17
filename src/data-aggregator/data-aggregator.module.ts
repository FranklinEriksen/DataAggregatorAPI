import { Module } from '@nestjs/common';
import { DataAggregatorService } from './data-aggregator.service';
import { DataAggregatorController } from './data-aggregator.controller';
import { TransactionModule } from '../transaction/transaction.module';
import { TransactionService } from '../transaction/transaction.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TransactionEntity } from '../transaction/entities/transaction.entity';

@Module({
  controllers: [DataAggregatorController],
  providers: [DataAggregatorService, TransactionService],
  imports: [TransactionModule, TypeOrmModule.forFeature([TransactionEntity])],
})
export class DataAggregatorModule {}
