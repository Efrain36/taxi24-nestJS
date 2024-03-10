import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { Driver } from "./driver.entity";
import { Passenger } from "./passenger.entity";
import { Bill } from './bill.entity';

export enum TripStatus {
    ACTIVE = "ACTIVE",
    COMPLETED = "COMPLETED"
}

@Entity()
export class Trip {
  @PrimaryGeneratedColumn({ type: 'integer' })
  id: number;

  @Column({
    type: 'enum',
    enum: TripStatus,
    default: TripStatus.ACTIVE
  })
  status: TripStatus;

  @ManyToOne(() => Driver, driver => driver.trips)
  @JoinColumn({ name: 'driver_id' }) 
  driver: Driver;

  @ManyToOne(() => Passenger, passenger => passenger.trips)
  @JoinColumn({ name: 'passenger_id' })
  passenger: Passenger;

  @Column('double precision', { name: 'origin_latitude' })
  originLatitude: number;

  @Column('double precision', { name: 'origin_longitude' })
  originLongitude: number;

  @Column('double precision', { name: 'destination_latitude' })
  destinationLatitude: number;

  @Column('double precision', { name: 'destination_longitude' })
  destinationlongitude: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @OneToMany(() => Bill, bill => bill.trip, {lazy: true})
  bills: Promise<Bill[]>;
}
