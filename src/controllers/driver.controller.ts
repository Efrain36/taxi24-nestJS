import { Controller, Get, Param, Post, Body, Put, Query } from '@nestjs/common';
import { ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
import { DriverUseCases } from 'src/use-cases/driver/driver.use-case';

@ApiTags('Driver')
@Controller('driver')
export class DriverController {
  constructor(private driverUseCases: DriverUseCases) { }


  @Get()
  async getAll() {
    return this.driverUseCases.getAllDrivers();
  }

  @Get('/available')
  async getAvailable() {
    return this.driverUseCases.getAvailableDrivers();
  }


  @Get('/nearby')
  @ApiQuery({ name: 'latitude', description: 'latitude of the location', type: Number })
  @ApiQuery({ name: 'longitude', description: 'longitude of the location', type: Number })
  @ApiQuery({ name: 'kilometersAround', required: false, description: 'The search radius in km', type: Number })
  async getNearby(
    @Query('latitude') latitude: number,
    @Query('longitude') longitude: number,
    @Query('kilometersAround') kilometersAround: number = 3
  ) {
    return this.driverUseCases.getNearbyDrivers(latitude, longitude, kilometersAround);
  }

  @ApiParam({ name: 'id', description: 'The id of the driver' })
  @Get(':id')
  async getById(@Param('id') id: number) {
    return this.driverUseCases.getDriverById(Number(id));
  }
}