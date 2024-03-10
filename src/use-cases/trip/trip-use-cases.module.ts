import { Module } from '@nestjs/common';
import { DataServicesModule } from '../../services/data-services/data-services.module';
import { TripFactoryService } from './trip-factory.service';
import { TripUseCases } from './trip.use-case';
import { BillUseCasesModule } from '../bill/bill-use-cases.module';


@Module({
  imports: [DataServicesModule, BillUseCasesModule],
  providers: [TripFactoryService, TripUseCases],
  exports: [TripFactoryService, TripUseCases],
})
export class TripUseCasesModule {}