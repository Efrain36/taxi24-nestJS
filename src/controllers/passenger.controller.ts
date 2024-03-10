import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
import { PassengerUseCases } from 'src/use-cases/passenger/passenger.use-case';

@ApiTags('Passenger')
@Controller('passenger')
export class PassengerController {

  constructor(
    private passengerUseCases: PassengerUseCases,
  ) {}

  @Get()
  async getAll() {
    return this.passengerUseCases.getAllPassengers()
  }
  
  @ApiParam({ name: 'id', description: 'The id of the passenger' })
  @Get(':id')
  async getById(@Param('id') id: number) {
    return this.passengerUseCases.getPassengerById(id)
  }

  @Get(':id/drivers')
  @ApiQuery({ name: 'kilometersAround', required: false, description: 'The search radius in km', type: Number })
  async getNearbyDrivers(@Param('id') id: number, @Query('kilometersAround') kilometersAround: number = 3)  {
    return this.passengerUseCases.getNearbyDrivers(id, kilometersAround);
  }
  
}