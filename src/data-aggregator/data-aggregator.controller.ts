import { Controller, Get, Param } from '@nestjs/common';
import { DataAggregatorService } from './data-aggregator.service';

@Controller('data-aggregator')
export class DataAggregatorController {
  constructor(private readonly dataAggregatorService: DataAggregatorService) {}

  // getDataForUser(@Param('user_id') user_id: string) {
  @Get(':user_id')
  getDataForUser(@Param('user_id') user_id: string) {
    return this.dataAggregatorService.getDataForUser(user_id);
  }

  @Get('/payouts/:id')
  getRequestedPayouts(@Param('user_id') user_id: string) {
    return this.dataAggregatorService.getRequestedPayouts(user_id);
  }
}
