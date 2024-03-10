import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { Trip } from './trip.entity';
import { Bill } from './bill.entity';

@Entity()
export class Passenger {
  @PrimaryGeneratedColumn({ type: 'integer' })
  id: number;

  @Column('varchar', { length: 255, nullable: true })
  name: string;

  @Column('double precision')
  latitude: number;

  @Column('double precision')
  longitude: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @OneToMany(() => Trip, trip => trip.passenger, {lazy: true})
  trips: Promise<Trip[]>;

  @OneToMany(() => Bill, bill => bill.passenger, {lazy: true})
  bills: Promise<Trip[]>;
}