import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { Trip } from './trip.entity';
import { Bill } from './bill.entity';

export enum DriverStatus {
  ACTIVE = 'ACTIVE',
  BUSY = 'BUSY'
}

@Entity()
export class Driver {
  @PrimaryGeneratedColumn({ type: 'integer' })
  id: number;

  @Column('varchar', { length: 255, nullable: true })
  name: string;

  @Column({
    type: 'enum',
    enum: DriverStatus,
    default: DriverStatus.ACTIVE
  })
  status: DriverStatus;

  @Column('double precision')
  latitude: number;

  @Column('double precision')
  longitude: number;

  @CreateDateColumn({ name: 'createdate' })
  createdate: Date;

  @UpdateDateColumn({ name: 'updateddate' })
  updateddate: Date;

  @OneToMany(() => Trip, trip => trip.driver,  {lazy: true})
  trips: Promise<Trip[]>;

  @OneToMany(() => Bill, bill => bill.driver, {lazy: true})
  bills: Promise<Trip[]>;
}


