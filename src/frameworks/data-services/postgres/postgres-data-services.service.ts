import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IDataServices } from 'src/core/abstracts';
import { Driver, Passenger, Trip } from 'src/core/entities';
import { DriverRepository, PassengerRepository, TripRepository } from 'src/core/repositories';
import { BillRepository } from 'src/core/repositories/bill.repository';
import { Bill } from 'src/core/entities/bill.entity';


@Injectable()
export class PostgresDataServices
  implements IDataServices, OnApplicationBootstrap
{
  drivers: DriverRepository;
  trips: TripRepository;
  passengers: PassengerRepository;
  bills: BillRepository;

  constructor(
    @InjectRepository(Driver)
    private DriverRepository: Repository<Driver>,
    @InjectRepository(Trip)
    private TripRepository: Repository<Trip>,
    @InjectRepository(Passenger)
    private PassengersRepository: Repository<Passenger>,
    @InjectRepository(Bill)
    private BillRepository: Repository<Bill>,
  ) {}

  onApplicationBootstrap() {
    this.drivers = new DriverRepository(this.DriverRepository);
    this.trips = new TripRepository(this.TripRepository);
    this.passengers = new PassengerRepository(this.PassengersRepository);
    this.bills = new BillRepository(this.BillRepository);
  }
}