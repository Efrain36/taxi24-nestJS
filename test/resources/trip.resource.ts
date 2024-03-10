import { IDataServices } from "src/core";
import { Driver, Passenger, Trip } from "src/core/entities";
import { CreateTripRequestDto } from "src/core/dtos";
import { TripFactoryService } from "src/use-cases/trip/trip-factory.service";

export class TripResource {
    constructor(
        private dataService: IDataServices,
        private tripFactoryService: TripFactoryService
    ) { }


    async createTrip(driver: Driver, passenger: Passenger): Promise<Trip> {
        const tripDto = new CreateTripRequestDto()
        tripDto.driverId = driver.id;
        tripDto.passangerId = passenger.id;
        tripDto.originLatitude = passenger.latitude;
        tripDto.originLongitude = passenger.longitude;
        tripDto.destinationLatitude = driver.latitude;
        tripDto.destinationLongitude = driver.longitude;

        const trip = this.tripFactoryService.createNewTrip(tripDto)
        return this.dataService.trips.create(trip)
    }

    async createCustomTrip(tripDto: CreateTripRequestDto): Promise<Trip> {
        const trip = this.tripFactoryService.createNewTrip(tripDto)
        return this.dataService.trips.create(trip)
    }
}