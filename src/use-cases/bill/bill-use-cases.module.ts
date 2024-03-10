import { Module } from '@nestjs/common';
import { DataServicesModule } from '../../services/data-services/data-services.module';
import { BillUseCases } from './bill.use-case';
import { BillFactoryService } from './bill-factory.service';


@Module({
  imports: [DataServicesModule],
  providers: [BillFactoryService, BillUseCases],
  exports: [BillFactoryService, BillUseCases],
})
export class BillUseCasesModule {}