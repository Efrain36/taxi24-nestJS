import { IDataServices } from "src/core";
import { CreatePassengerDto } from "src/core/dtos";
import { Passenger } from "src/core/entities";
import { PassengerFactoryService } from "src/use-cases/passenger/passenger-factory.service";

export class PassengerResource {
    constructor(
        private dataService: IDataServices,
        private passengerFactoryService: PassengerFactoryService
      ) {}


    createPassenger(): Promise<Passenger> {
        const passenger = new Passenger()
        passenger.name = 'test Passenger'
        passenger.latitude = 8.9;
        passenger.longitude = 9;
        return this.dataService.passengers.create(passenger)
    }

    createCustomPassenger(passengerDto: CreatePassengerDto): Promise<Passenger> {
        const passenger = this.passengerFactoryService.createNewPassenger(passengerDto)
        return this.dataService.passengers.create(passenger)
    }
}