import { IsNotEmpty, IsNumber } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';
import { TripStatus } from '../entities';

export class CreateTripRequestDto {
  
  @IsNumber()
  @IsNotEmpty()
  driverId: number;

  @IsNumber()
  @IsNotEmpty()
  passangerId: number;

  @IsNumber()
  @IsNotEmpty()
  originLatitude: number;

  @IsNumber()
  @IsNotEmpty()
  originLongitude: number;

  @IsNumber()
  @IsNotEmpty()
  destinationLatitude: number;

  @IsNumber()
  @IsNotEmpty()
  destinationLongitude: number;

  status: TripStatus = TripStatus.ACTIVE;
}