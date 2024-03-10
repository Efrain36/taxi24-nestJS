import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { DriverStatus, Trip, TripStatus } from 'src/core/entities';
import { CreateBillDto, CreateTripRequestDto } from 'src/core/dtos';
import { TripFactoryService } from './trip-factory.service';
import { IDataServices } from 'src/core';
import * as geolib from 'geolib';
import { BillUseCases } from '../bill/bill.use-case';
import { DriverUseCases } from '../driver';


@Injectable()
export class TripUseCases {
  constructor(
    private dataServices: IDataServices,
    private tripFactoryService: TripFactoryService,
    private billUseCases: BillUseCases,
    private driverIseCases: DriverUseCases
  ) { }

  getActiveTrips(): Promise<Trip[]> {
    return this.dataServices.trips.findActiveTrips();
  }

  getTripById(id: any): Promise<Trip> {
    return this.dataServices.trips.get(id);
  }

  async createTripRequest(tripDto: CreateTripRequestDto): Promise<Trip> {
    await this.validateTripRequest(tripDto.driverId, tripDto.passangerId);
    const newTrip = await this.createTrip(tripDto);
    await this.driverIseCases.changeDriverStatus(tripDto.driverId, DriverStatus.BUSY)
    return newTrip;
  }

  async completeTrip(tripId: number): Promise<string> {
    const trip = await this.validateTripCompletion(tripId);

    await this.dataServices.trips.completeTrip(tripId);
    await this.createTripBill(trip);
    await this.driverIseCases.changeDriverStatus(trip.driver.id, DriverStatus.ACTIVE)
    return 'Trip Completed succesfully';
  }

  private async createTripBill(trip: Trip){
    const  distance = geolib.getDistance(
      { latitude: trip.originLatitude, longitude: trip.originLongitude },
      { latitude: trip.destinationLatitude, longitude: trip.destinationlongitude }
    )

    const newBillDto = new CreateBillDto();
    newBillDto.driverId = trip.driver.id;
    newBillDto.passangerId = trip.passenger.id;
    newBillDto.tripId = trip.id;
    newBillDto.distance = distance;

    await this.billUseCases.createBill(newBillDto)
  }

  private async validateTripRequest(driverId: number, passengerId: number) {
    const [driver, passenger] = await Promise.all([
      this.dataServices.drivers.get(driverId),
      this.dataServices.passengers.get(passengerId)
    ]);

    if (!driver) {
      throw new BadRequestException(`Driver with ID ${driverId} does not exist`);
    }

    if (!passenger) {
      throw new BadRequestException(`Passenger with ID ${passengerId} does not exist`);
    }

    if (driver.status !== 'ACTIVE') {
      throw new BadRequestException(`Driver with ID ${driverId} is not active`);
    }
  }

  private async createTrip(tripDto: CreateTripRequestDto): Promise<Trip> {
    try {
      const trip = this.tripFactoryService.createNewTrip(tripDto);
      return await this.dataServices.trips.create(trip);
    } catch (error) {

      throw new InternalServerErrorException('An error occurred while creating the trip');
    }
  }

  private async validateTripCompletion(tripId: number): Promise<Trip> {
    const trip = await this.dataServices.trips.get(tripId, ['driver', 'passenger']);

    if (!trip) {
      throw new NotFoundException(`Trip with id ${tripId} not found`);
    }

    if (trip.status === TripStatus.COMPLETED) {
      throw new BadRequestException(`Trip with id ${tripId} is already completed`);
    }

    return trip;
  }
}