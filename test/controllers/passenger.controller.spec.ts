import { HttpStatus, INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { AppModule } from 'src/app.module';
import * as request from 'supertest';
import { DriverFactoryService } from 'src/use-cases/driver/driver-factory.service';
import { DriverResource } from '../resources/driver.resource';
import { IDataServices } from 'src/core';
import { DataSource } from 'typeorm';
import {  Driver, DriverStatus, Passenger } from 'src/core/entities';
import { CreateDriverDto } from 'src/core/dtos/create-driver.dto';
import { PassengerFactoryService } from 'src/use-cases/passenger/passenger-factory.service';
import { PassengerResource } from '../resources/passenger.resource';

describe('PassengerController', () => {
  let app: INestApplication;
  let passengerResource: PassengerResource;
  let driverResource: DriverResource;
  let passenger: Passenger;


  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();
    await app.init();

    const dataService = moduleRef.get<IDataServices>(IDataServices);
    const passengerFactoryService = moduleRef.get<PassengerFactoryService>(PassengerFactoryService);
    const driverFactoryService = moduleRef.get<DriverFactoryService>(DriverFactoryService);

    passengerResource = new PassengerResource(dataService, passengerFactoryService);
    driverResource = new DriverResource(dataService, driverFactoryService)

  });

  beforeEach(async () => {
    passenger = await passengerResource.createPassenger();
  })

  afterEach(async () => {
    const dataSource = app.get(DataSource);
    await dataSource.createQueryBuilder().delete().from(Passenger).execute();
    await dataSource.createQueryBuilder().delete().from(Driver).execute();
  });

  afterAll(() => {
    app.close()
  })

  describe('getAll', () => {
    it('/passenger (GET) should return an array with one passenger', () => {
      return request(app.getHttpServer())
        .get('/passenger')
        .expect(HttpStatus.OK)
        .expect((res) => {
          expect(Array.isArray(res.body)).toBe(true);
          expect(res.body.length).toBe(1);
        });
    });
  });

  describe('getById', () => {
    it('/passenger/:id (GET) it should return the passenger', () => {
      return request(app.getHttpServer())
        .get(`/passenger/${passenger.id}`)
        .expect(HttpStatus.OK)
        .expect((res) => {
          expect(typeof res.body).toBe('object');
          expect(res.body).toEqual(
            expect.objectContaining({
              id: passenger.id,
              name: passenger.name,
              latitude: passenger.latitude,
              longitude: passenger.longitude,
            }))
        });
    });

    it('/passenger/:id (GET) it should return the passenger', () => {
      return request(app.getHttpServer())
        .get(`/passenger/${passenger.id}`)
        .expect(HttpStatus.OK)
        .expect((res) => {
          expect(typeof res.body).toBe('object');
          expect(res.body).toEqual(
            expect.objectContaining({
              id: passenger.id,
              name: passenger.name,
              latitude: passenger.latitude,
              longitude: passenger.longitude,
            }))
        });
    });

    it('/passenger/:id (GET) it should return 404 Not Found', () => {
      return request(app.getHttpServer())
        .get(`/passenger/0`)
        .expect(HttpStatus.NOT_FOUND);
    });
  });

  describe('getNearbyDrivers', () => {
    it('/passenger/:id/drivers (GET) should return one near driver', async () => {

      const nearDriverDto = new CreateDriverDto();
      nearDriverDto.latitude = passenger.latitude;
      nearDriverDto.longitude = passenger.longitude;
      nearDriverDto.name = 'Near Driver';
      nearDriverDto.status = DriverStatus.ACTIVE;

      const nearDriver = await driverResource.createCustomDriver(nearDriverDto);
      return request(app.getHttpServer())
        .get(`/passenger/${passenger.id}/drivers`)
        .expect(HttpStatus.OK)
        .expect(res => {
          expect(Array.isArray(res.body)).toBe(true);
          expect(res.body.length).toBe(1);
          expect(res.body).toEqual(
            expect.arrayContaining([
              expect.objectContaining({ id: nearDriver.id }),
            ]))
        })
    })
  })

});
