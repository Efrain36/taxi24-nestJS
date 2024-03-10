import { Controller, Get, Param, Post, Body, Patch } from '@nestjs/common';
import { CreateTripRequestDto } from '../core/dtos';
import { TripUseCases } from 'src/use-cases/trip/trip.use-case';
import { ApiTags } from '@nestjs/swagger';
import { Trip } from 'src/core/entities';

@ApiTags('Trip')
@Controller('trip')
export class TripController {
  constructor(
    private tripUseCases: TripUseCases
  ) { }

  @Get('/active')
  async getActives() {
    return this.tripUseCases.getActiveTrips();
  }

  @Post()
  async createTripRequest(@Body() tripDto: CreateTripRequestDto): Promise<Trip> {
    return this.tripUseCases.createTripRequest(tripDto);
  }

  @Patch('complete/:id')
  completeTrip(@Param('id') tripId: number) {
    return this.tripUseCases.completeTrip(tripId);
  }
}