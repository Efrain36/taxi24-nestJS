import { Repository } from 'typeorm';
import { Bill } from '../entities/bill.entity';
import { PostgresGenericRepository } from 'src/frameworks/data-services/postgres/postgres-generic-repository';


export class BillRepository extends PostgresGenericRepository<Bill> {
  constructor(repository: Repository<Bill>) {
    super(repository);
  }


}