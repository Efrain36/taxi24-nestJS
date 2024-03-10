import { Injectable } from '@nestjs/common';
import { Passenger } from '../../core/entities';
import { CreatePassengerDto } from 'src/core/dtos';

@Injectable()
export class PassengerFactoryService {
  createNewPassenger(createPassengerDto: CreatePassengerDto) {
    const newPassenger = new Passenger();
    newPassenger.name = createPassengerDto.name;
    newPassenger.latitude = createPassengerDto.latitude;
    newPassenger.longitude = createPassengerDto.longitude

    return newPassenger;
  }

}