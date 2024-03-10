import { Repository } from 'typeorm';
import { Driver, DriverStatus } from 'src/core/entities';
import { PostgresGenericRepository } from 'src/frameworks/data-services/postgres/postgres-generic-repository';
// import { PostgresGenericRepository } from 'src/frameworks/data-services/postgres';

export class DriverRepository extends PostgresGenericRepository<Driver> {
  constructor(repository: Repository<Driver>) {
    super(repository);
  }

  findAvailableDrivers(): Promise<Driver[]> {
    return this._repository.find({where:{
        status: DriverStatus.ACTIVE
    }})

  }

  findNearbyDrivers(latitude: number, longitude: number, kilometersAround: number): Promise<Driver[]>{
    return this._repository
    .createQueryBuilder('driver')
    .where('earth_distance(ll_to_earth(:lat, :long), ll_to_earth(driver.latitude, driver.longitude)) <= :radius', {
      lat: latitude,
      long: longitude,
      radius: kilometersAround * 1000,
    })
    .andWhere('driver.status = :status', { status: DriverStatus.ACTIVE })
    .getMany();
  }

}