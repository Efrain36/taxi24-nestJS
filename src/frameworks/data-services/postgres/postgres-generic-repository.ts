import { FindOneOptions, FindOptionsWhere, Repository } from 'typeorm';
import { IGenericRepository } from 'src/core/abstracts';

export class PostgresGenericRepository<T extends object> implements IGenericRepository<T> {
  protected _repository: Repository<T>;

  constructor(repository: Repository<T>) {
    this._repository = repository;
  }

  getAll(): Promise<T[]> {
    return this._repository.find();
  }

  get(id: any, relations?: string[]): Promise<T | null> {
    const options: FindOneOptions<T> = {
      where: { id } as FindOptionsWhere<T>,
    };
    if (relations) {
      options.relations = relations;
    }
    return this._repository.findOne(options);
  }
  
  create(item: T): Promise<T> {
    return this._repository.save(item);
  }

  update(id: string, item: T) {
    return this._repository.update(id, item);
  }
}