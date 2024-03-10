import { IsString, IsNotEmpty, IsDate, IsEnum, IsLatitude, IsLongitude } from 'class-validator';
import { DriverStatus } from '../entities';

export class CreateDriverDto {

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsEnum(DriverStatus)
  status: DriverStatus;

  @IsLatitude()
  latitude: number;

  @IsLongitude()
  longitude: number;

}