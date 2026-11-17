import { Module } from '@nestjs/common';
import { KpiController } from '../controllers/kpi.controller.js';
import { KpiService } from '../services/kpi.service.js';

@Module({
  controllers: [KpiController],
  providers: [KpiService],
  exports: [KpiService],
})
export class KpiModule {}
