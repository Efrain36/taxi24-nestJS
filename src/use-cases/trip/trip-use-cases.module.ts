import { Module } from '@nestjs/common';
import { DataServicesModule } from '../../services/data-services/data-services.module';
import { TripFactoryService } from './trip-factory.service';
import { TripUseCases } from './trip.use-case';
import { BillUseCasesModule } from '../bill/bill-use-cases.module';
import { DriverUseCasesModule } from '../driver';


@Module({
  imports: [DataServicesModule, BillUseCasesModule, DriverUseCasesModule],
  providers: [TripFactoryService, TripUseCases],
  exports: [TripFactoryService, TripUseCases],
})
export class TripUseCasesModule {}