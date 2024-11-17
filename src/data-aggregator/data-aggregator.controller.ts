import { Controller, Get, Param } from '@nestjs/common';
import { DataAggregatorService } from './data-aggregator.service';

@Controller('data-aggregator')
export class DataAggregatorController {
  constructor(private readonly dataAggregatorService: DataAggregatorService) {}

  // getDataForUser(@Param('userId') userId: string) {
  @Get(':userId')
  getDataForUser(@Param('userId') userId: string) {
    return this.dataAggregatorService.getDataForUser(userId);
  }

  @Get('/payouts/:userId')
  getRequestedPayouts(@Param('userId') userId: string) {
    return this.dataAggregatorService.getRequestedPayouts(userId);
  }
}
