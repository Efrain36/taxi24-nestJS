import { Injectable, NotFoundException } from '@nestjs/common';
import { IDataServices } from '../../core/abstracts';
import { Driver, Passenger } from 'src/core/entities';

@Injectable()
export class PassengerUseCases {
  constructor(
    private dataServices: IDataServices,
  ) {}

  getAllPassengers(): Promise<Passenger[]> {
    return this.dataServices.passengers.getAll();
  }

  async getPassengerById(id: any): Promise<Passenger> {
    const passenger = await this.dataServices.passengers.get(id);
    if (!passenger) {
      throw new NotFoundException('Passenger not found');
    }
    return passenger;
  }

  async getNearbyDrivers(id: any, kilometersAround: number): Promise<Driver[]> {
    const passenger = await this.dataServices.passengers.get(id)
    if (!passenger) {
      throw new NotFoundException('Passenger not found');
    }
    return this.dataServices.drivers.findNearbyDrivers(passenger.latitude, passenger.longitude, kilometersAround)
  }

}