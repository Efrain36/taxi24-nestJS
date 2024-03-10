import { Injectable } from '@nestjs/common';
import { Driver, Passenger, Trip } from '../../core/entities';
import { CreateBillDto } from 'src/core/dtos/create-bill.dto';
import { Bill } from 'src/core/entities/bill.entity';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class BillFactoryService {

  constructor(private configService: ConfigService) {}

  createNewBill(createBillDto: CreateBillDto) {
    const newBill = new Bill();
    newBill.driver = new Driver();
    newBill.passenger = new Passenger();
    newBill.trip = new Trip();

    newBill.driver.id = createBillDto.driverId;
    newBill.passenger.id = createBillDto.passangerId;
    newBill.trip.id = createBillDto.tripId;
    newBill.distance = createBillDto.distance

    const rate = this.configService.get('RATE');

    newBill.total = createBillDto.distance * rate

    return newBill;
  }
}