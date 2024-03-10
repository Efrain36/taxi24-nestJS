import { Module } from '@nestjs/common';
import { DataServicesModule } from '../../services/data-services/data-services.module';
import { DriverFactoryService } from './driver-factory.service';
import { DriverUseCases } from './driver.use-case';


@Module({
  imports: [DataServicesModule],
  providers: [DriverFactoryService, DriverUseCases],
  exports: [DriverFactoryService, DriverUseCases],
})
export class DriverUseCasesModule {}