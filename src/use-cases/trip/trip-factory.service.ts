import { Injectable } from '@nestjs/common';
import { Driver, Passenger, Trip } from '../../core/entities';
import { CreateTripRequestDto } from '../../core/dtos';

@Injectable()
export class TripFactoryService {
  createNewTrip(createTripDto: CreateTripRequestDto) {
    const newTrip = new Trip();
    newTrip.driver = new Driver();
    newTrip.driver.id = createTripDto.driverId;
    newTrip.passenger = new Passenger();
    newTrip.passenger.id = createTripDto.passangerId;
    newTrip.originLatitude = createTripDto.originLatitude;
    newTrip.originLongitude = createTripDto.originLatitude;
    newTrip.destinationLatitude = createTripDto.destinationLatitude;
    newTrip.destinationlongitude =  createTripDto.destinationLongitude
    newTrip.status = createTripDto.status

    return newTrip;
  }
}