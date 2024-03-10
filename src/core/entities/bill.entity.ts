import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Driver } from "./driver.entity";
import { Passenger } from "./passenger.entity";
import { Trip } from './trip.entity';


@Entity()
export class Bill {
  @PrimaryGeneratedColumn({ type: 'integer' })
  id: number;

  @ManyToOne(() => Driver, driver => driver.bills)
  @JoinColumn({ name: 'driver_id' })  
  driver: Driver;

  @ManyToOne(() => Passenger, passenger => passenger.bills)
  @JoinColumn({ name: 'passenger_id' })  
  passenger: Passenger;

  @ManyToOne(() => Trip, trip => trip.bills)
  @JoinColumn({ name: 'trip_id' })  
  trip: Trip;

  @Column()
  distance: number;

  @Column()
  total: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
}
