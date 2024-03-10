import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IDataServices } from 'src/core';
import { Driver, Passenger, Trip, Bill } from 'src/core/entities';
import { PostgresDataServices } from './postgres-data-services.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Driver, Trip, Passenger, Bill]),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        ...configService.get('database')
      }),
      inject: [ConfigService]
    }),
  ],
  providers: [
    {
      provide: IDataServices,
      useClass: PostgresDataServices,
    },
  ],
  exports: [IDataServices],
})
export class PostgresDataServicesModule { }