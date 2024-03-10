import { Module } from '@nestjs/common';
import {
  DriverController,
  PassengerController,
  TripController,
} from './controllers';
import { DataServicesModule } from './services/data-services/data-services.module';
import { PassengerUseCasesModule } from './use-cases/passenger/passenger-use-cases.module';
import { TripUseCasesModule } from './use-cases/trip/trip-use-cases.module';
import { ConfigModule } from '@nestjs/config';
import { DriverUseCasesModule } from './use-cases/driver/driver-use-cases.module';
import { BillUseCasesModule } from './use-cases/bill/bill-use-cases.module';
import { AppConfig, DatabaseConfig } from './configuration';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [AppConfig, DatabaseConfig]
    }),
    DataServicesModule,
    PassengerUseCasesModule,
    TripUseCasesModule,
    DriverUseCasesModule,
    BillUseCasesModule
  ],
  controllers: [
    DriverController,
    PassengerController,
    TripController,
  ],
  providers: [],
})
export class AppModule {}
