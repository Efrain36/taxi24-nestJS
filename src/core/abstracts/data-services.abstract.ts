
import { BillRepository, DriverRepository, PassengerRepository, TripRepository } from '../repositories';

export abstract class IDataServices {
  abstract drivers: DriverRepository;

  abstract trips: TripRepository;

  abstract passengers: PassengerRepository;

  abstract bills: BillRepository;
}