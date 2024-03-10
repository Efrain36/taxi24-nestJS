import { Module } from '@nestjs/common';
import { DataServicesModule } from '../../services/data-services/data-services.module';
import { PassengerFactoryService } from './passenger-factory.service';
import { PassengerUseCases } from './passenger.use-case';


@Module({
  imports: [DataServicesModule],
  providers: [PassengerFactoryService, PassengerUseCases],
  exports: [PassengerFactoryService, PassengerUseCases],
})
export class PassengerUseCasesModule {}