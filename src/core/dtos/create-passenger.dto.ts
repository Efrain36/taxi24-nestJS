import { IsString, IsNotEmpty, IsLatitude, IsLongitude } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';

export class CreatePassengerDto {
  
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsLatitude()
  latitude: number;

  @IsLongitude()
  longitude: number;
}