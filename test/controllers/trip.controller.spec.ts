import { HttpStatus, INestApplication, ValidationPipe } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { AppModule } from 'src/app.module';
import * as request from 'supertest';
import { DriverFactoryService } from 'src/use-cases/driver/driver-factory.service';
import { DriverResource } from '../resources/driver.resource';
import { IDataServices } from 'src/core';
import { DataSource } from 'typeorm';
import { Bill, Driver, Passenger, Trip, TripStatus } from 'src/core/entities';
import { PassengerFactoryService } from 'src/use-cases/passenger/passenger-factory.service';
import { PassengerResource } from '../resources/passenger.resource';
import { TripResource } from '../resources/trip.resource';
import { CreateTripRequestDto } from 'src/core/dtos';
import { TripFactoryService } from 'src/use-cases/trip/trip-factory.service';

describe('TripController', () => {
  let app: INestApplication;
  let tripResource: TripResource
  let passengerResource: PassengerResource;
  let driverResource: DriverResource;
  let trip: Trip;
  let passenger: Passenger
  let driver: Driver


  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();

    const dataService = moduleRef.get<IDataServices>(IDataServices);
    const tripFactoryService = moduleRef.get<TripFactoryService>(TripFactoryService)
    const passengerFactoryService = moduleRef.get<PassengerFactoryService>(PassengerFactoryService);
    const driverFactoryService = moduleRef.get<DriverFactoryService>(DriverFactoryService);

    tripResource = new TripResource(dataService, tripFactoryService)
    passengerResource = new PassengerResource(dataService, passengerFactoryService);
    driverResource = new DriverResource(dataService, driverFactoryService)

  });

  beforeEach(async () => {
    driver = await driverResource.createDriver();
    passenger = await passengerResource.createPassenger()
    trip = await tripResource.createTrip(driver, passenger)
  })

  afterEach(async () => {
    const dataSource = app.get(DataSource);
    await dataSource.createQueryBuilder().delete().from(Bill).execute();
    await dataSource.createQueryBuilder().delete().from(Trip).execute();
    await dataSource.createQueryBuilder().delete().from(Passenger).execute();
    await dataSource.createQueryBuilder().delete().from(Driver).execute();
  });

  afterAll(() => {
    app.close()
  })

  describe('getActives', () => {
    const createCompletedTrip = async () => {
      const tripDto = new CreateTripRequestDto()
      tripDto.destinationLatitude = driver.latitude;
      tripDto.destinationLongitude = driver.longitude;
      tripDto.originLatitude = driver.latitude;
      tripDto.originLongitude = driver.longitude;
      tripDto.status = TripStatus.COMPLETED

      return await tripResource.createCustomTrip(tripDto)
    }

    it('/trips/active (GET) should return an array with one trip', async () => {

      const completedTrip = await createCompletedTrip();

      return request(app.getHttpServer())
        .get('/trip/active')
        .expect(HttpStatus.OK)
        .expect((res) => {
          expect(Array.isArray(res.body)).toBe(true);
          expect(res.body.length).toBe(1);
          expect(res.body).toEqual(
            expect.arrayContaining([
              expect.objectContaining({ id: trip.id }),
            ]))
          expect(res.body).not.toEqual(
            expect.arrayContaining([
              expect.objectContaining({ id: completedTrip.id }),
            ]))
        });
    });
  });


  describe('createTrip', () => {
    it('/trips (POST) create a trip and return it', async () => {

      const tripDto = {
        driverId: driver.id,
        passangerId: passenger.id,
        originLatitude: 12.34,
        originLongitude: 56.78,
        destinationLatitude: 90.12,
        destinationLongitude: 34.56,
        status: TripStatus.ACTIVE
      };

      return request(app.getHttpServer())
        .post('/trip')
        .send(tripDto)
        .expect(HttpStatus.CREATED)
    })

    it('/trips (POST) should response bad request (empty body)', async () => {


      return request(app.getHttpServer())
        .post('/trip')
        .send({})
        .expect(HttpStatus.BAD_REQUEST)
    })
  })

  describe('completeTrip', () => {

    const createCompletedTrip = async () => {
      const tripDto = new CreateTripRequestDto()
      tripDto.destinationLatitude = driver.latitude;
      tripDto.destinationLongitude = driver.longitude;
      tripDto.originLatitude = driver.latitude;
      tripDto.originLongitude = driver.longitude;
      tripDto.status = TripStatus.COMPLETED

      return await tripResource.createCustomTrip(tripDto)
    }

    it('/trip/complete/:id (PATCH) should update the trip', async () => {

      return request(app.getHttpServer())
        .patch(`/trip/complete/${trip.id}`)
        .expect(HttpStatus.OK)

    })

    
    it('/trip/complete/:id (PATCH) should not found the trip', async () => {

      return request(app.getHttpServer())
        .patch(`/trip/complete/0`)
        .expect(HttpStatus.NOT_FOUND)
    })

        
    it('/trip/complete/:id (PATCH) should response bad request, trip already completed', async () => {

      const completedTrip = await createCompletedTrip();

      return request(app.getHttpServer())
        .patch(`/trip/complete/${completedTrip.id}`)
        .expect(HttpStatus.BAD_REQUEST)
    })
  })

});
