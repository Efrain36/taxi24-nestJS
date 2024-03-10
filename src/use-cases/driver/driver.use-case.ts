import { Injectable, NotFoundException } from '@nestjs/common';
import { IDataServices } from '../../core/abstracts';
import { Driver } from 'src/core/entities';

@Injectable()
export class DriverUseCases {
  constructor(
    private dataServices: IDataServices
  ) {}

  getAllDrivers(): Promise<Driver[]> {
    return this.dataServices.drivers.getAll();
  }

  async getDriverById(id: any): Promise<Driver> {
    const driver = await this.dataServices.drivers.get(id);
    if (!driver) {
      throw new NotFoundException('Driver not found');
    }
    return driver;
  }
  
  getAvailableDrivers(): Promise<Driver[]> {
    return this.dataServices.drivers.findAvailableDrivers();
  }

  getNearbyDrivers(latitude: number, longitude:number, kilometersAround: number): Promise<Driver[]> {
    return this.dataServices.drivers.findNearbyDrivers(latitude, longitude, kilometersAround);
  }
}