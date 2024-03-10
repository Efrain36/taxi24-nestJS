import { Repository } from 'typeorm';
import { Passenger } from 'src/core/entities';
import { PostgresGenericRepository } from 'src/frameworks/data-services/postgres/postgres-generic-repository';
// import { PostgresGenericRepository } from 'src/frameworks/data-services/postgres';

export class PassengerRepository extends PostgresGenericRepository<Passenger> {
  constructor(repository: Repository<Passenger>) {
    super(repository);
  }

}