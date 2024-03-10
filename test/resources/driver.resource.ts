import { IDataServices } from "src/core";
import { CreateDriverDto } from "src/core/dtos/create-driver.dto";
import { Driver, DriverStatus } from "src/core/entities";
import { DriverFactoryService } from "src/use-cases/driver/driver-factory.service";

export class DriverResource {
    constructor(
        private dataService: IDataServices,
        private driverFactoryService: DriverFactoryService
      ) {}


    createDriver(): Promise<Driver> {
        const driverDto = new CreateDriverDto();
        driverDto.name = 'test Driver'
        driverDto.status = DriverStatus.ACTIVE
        driverDto.latitude = 8.9;
        driverDto.longitude = 9;
        const driver = this.driverFactoryService.createNewDriver(driverDto)
        return this.dataService.drivers.create(driver)
    }

    createCustomDriver(driverDto: CreateDriverDto): Promise<Driver> {
        const driver = this.driverFactoryService.createNewDriver(driverDto)
        return this.dataService.drivers.create(driver)
    }
}