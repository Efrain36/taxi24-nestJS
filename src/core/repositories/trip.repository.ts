import { Repository } from 'typeorm';
import {Trip, TripStatus } from 'src/core/entities';
import { PostgresGenericRepository } from 'src/frameworks/data-services/postgres/postgres-generic-repository';

export class TripRepository extends PostgresGenericRepository<Trip> {
  constructor(repository: Repository<Trip>) {
    super(repository);
  }

  async findActiveTrips(): Promise<Trip[]>{
    return await this._repository.find({
      where:{
        status: TripStatus.ACTIVE
      },
      relations: ["driver", "passenger"]
    });
  }

  async completeTrip(tripId: any) {
    await this._repository.update(tripId, { status: TripStatus.COMPLETED });
  }
  
}