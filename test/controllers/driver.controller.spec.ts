import { HttpStatus, INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { AppModule } from 'src/app.module';
import * as request from 'supertest';
import { DriverFactoryService } from 'src/use-cases/driver/driver-factory.service';
import { DriverResource } from '../resources/driver.resource';
import { IDataServices } from 'src/core';
import { DataSource } from 'typeorm';
import { Driver, DriverStatus } from 'src/core/entities';
import { CreateDriverDto } from 'src/core/dtos/create-driver.dto';

describe('DriverController', () => {
  let app: INestApplication;
  let driverResource: DriverResource;
  let driver: Driver;


  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();
    await app.init();

    const dataService = moduleRef.get<IDataServices>(IDataServices);
    const driverFactoryService = moduleRef.get<DriverFactoryService>(DriverFactoryService);

    driverResource = new DriverResource(dataService, driverFactoryService);

  });

  beforeEach(async () => {
    driver = await driverResource.createDriver();
  })

  afterEach(async () => {
    const dataSource = app.get(DataSource);
    await dataSource.createQueryBuilder().delete().from(Driver).execute();
  });

  afterAll(() => {
    app.close()
  })

  describe('getAll', () => {
    it('/driver (GET) should return an array with one driver', () => {
      return request(app.getHttpServer())
        .get('/driver')
        .expect(HttpStatus.OK)
        .expect((res) => {
          expect(Array.isArray(res.body)).toBe(true);
          expect(res.body.length).toBe(1);
        });
    });
  });

  describe('getAvailable', () => {
    const createBusyDriver = async () => {
      const busyDriverDto = new CreateDriverDto();
      busyDriverDto.latitude = 8;
      busyDriverDto.longitude = 8;
      busyDriverDto.name = 'busy driver'
      busyDriverDto.status = DriverStatus.BUSY;

      return await driverResource.createCustomDriver(busyDriverDto);
    }

    it('/driver/available (GET) should return one available driver', async () => {

      const driverBusy = await createBusyDriver()

      return request(app.getHttpServer())
        .get('/driver/available')
        .expect(HttpStatus.OK)
        .expect((res) => {
          expect(Array.isArray(res.body)).toBe(true);
          expect(res.body.length).toBe(1);
          expect(res.body).toEqual(
            expect.arrayContaining([
              expect.objectContaining({ id: driver.id }),
            ]))
          expect(res.body).not.toEqual(
            expect.arrayContaining([
              expect.objectContaining({ id: driverBusy.id }),
            ]))
        })
        ;
    });
  });

  describe('getNearby', () => {
    const createNearDriver = async (lat: number, long: number) => {
      const nearDriverDto = new CreateDriverDto();
      nearDriverDto.latitude = lat;
      nearDriverDto.longitude = long;
      nearDriverDto.name = 'near driver';
      nearDriverDto.status = DriverStatus.ACTIVE;

      return await driverResource.createCustomDriver(nearDriverDto);
    };

    it('/driver/nearby (GET) should return an array with one driver near', async () => {
      const latLong = {
        lat: 1,
        long: 1
      };

      const driverNear = await createNearDriver(latLong.lat, latLong.long);

      return request(app.getHttpServer())
        .get(`/driver/nearby?latitude=${latLong.lat}&longitude=${latLong.long}&kilometersAround=2`)
        .expect(HttpStatus.OK)
        .expect((res) => {
          expect(Array.isArray(res.body)).toBe(true);
          expect(res.body.length).toBe(1);
          expect(res.body).toEqual(
            expect.arrayContaining([
              expect.objectContaining({ id: driverNear.id }),
            ]))
          expect(res.body).not.toEqual(
            expect.arrayContaining([
              expect.objectContaining({ id: driver.id }),
            ]))
        });
    });
  });

  describe('getById', () => {

    it('/driver/:id (GET) it should return the driver', () => {
      return request(app.getHttpServer())
        .get(`/driver/${driver.id}`)
        .expect(HttpStatus.OK)
        .expect((res) => {
          expect(typeof res.body).toBe('object');
          expect(res.body).toEqual(
            expect.objectContaining({
              id: driver.id,
              name: driver.name,
              status: driver.status,
              latitude: driver.latitude,
              longitude: driver.longitude,
            }))
        });
    });

    it('/driver/:id (GET) it should return 404 Not Found', () => {
      return request(app.getHttpServer())
        .get(`/driver/0`)
        .expect(HttpStatus.NOT_FOUND);
    });

  });

});
