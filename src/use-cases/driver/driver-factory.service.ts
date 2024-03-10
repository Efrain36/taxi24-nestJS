import { Injectable } from '@nestjs/common';
import { Driver } from '../../core/entities';
import { CreateDriverDto } from 'src/core/dtos/create-driver.dto';

@Injectable()
export class DriverFactoryService {
  createNewDriver(createDriverDto: CreateDriverDto) {
    const newDriver = new Driver();
    newDriver.name = createDriverDto.name;
    newDriver.status = createDriverDto.status;
    newDriver.latitude = createDriverDto.latitude;
    newDriver.longitude = createDriverDto.longitude

    return newDriver;
  }
}