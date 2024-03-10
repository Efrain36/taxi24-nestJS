import { Injectable } from '@nestjs/common';
import { IDataServices } from 'src/core';
import { BillFactoryService } from './bill-factory.service';
import { CreateBillDto } from 'src/core/dtos';
import { Bill } from 'src/core/entities/bill.entity';

@Injectable()
export class BillUseCases {
  constructor(
    private dataServices: IDataServices,
    private billFactoryService: BillFactoryService
  ) { }

  createBill(createBillDto: CreateBillDto): Promise<Bill> {
    const newBill = this.billFactoryService.createNewBill(createBillDto)
    return this.dataServices.bills.create(newBill)
  }
  
}