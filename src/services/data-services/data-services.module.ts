import { Module } from '@nestjs/common';
import { PostgresDataServicesModule } from 'src/frameworks/data-services/postgres';

@Module({
  imports: [PostgresDataServicesModule],
  exports: [PostgresDataServicesModule],
})
export class DataServicesModule {}