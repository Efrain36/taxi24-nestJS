import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateBillDto {
  
  @IsNumber()
  @IsNotEmpty()
  driverId: number;

  @IsNumber()
  @IsNotEmpty()
  passangerId: number;

  @IsNumber()
  @IsNotEmpty()
  tripId: number;

  @IsNumber()
  @IsNotEmpty()
  distance: number;
}