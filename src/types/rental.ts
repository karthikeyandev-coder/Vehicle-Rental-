export type VehicleType = 'Car' | 'Bike' | 'Van';
export type VehicleStatus = 'Available' | 'Rented' | 'Maintenance';
export type PaymentMethod = 'Cash' | 'Card' | 'Online';
export type RentalStatus = 'Active' | 'Completed' | 'Cancelled';

export interface BaseVehicle {
  id: string;
  vehicleNumber: string; // e.g. "KA-01-MJ-2024"
  type: VehicleType;
  brand: string;         // e.g. "Toyota", "Yamaha", "Ford"
  model: string;         // e.g. "Camry", "YZF R15", "Transit"
  rentPerDay: number;    // in USD or INR
  status: VehicleStatus;
  year: number;
  imageUrl: string;
  fuelType: 'Petrol' | 'Diesel' | 'Electric' | 'Hybrid';
}

export interface CarVehicle extends BaseVehicle {
  type: 'Car';
  seatingCapacity: number; // e.g. 5 or 7
  transmission: 'Automatic' | 'Manual';
  airConditioned: boolean;
}

export interface BikeVehicle extends BaseVehicle {
  type: 'Bike';
  engineCC: number;       // e.g. 150cc, 350cc
  helmetProvided: boolean;
  bikeCategory: 'Cruiser' | 'Sport' | 'Scooter' | 'Commuter';
}

export interface VanVehicle extends BaseVehicle {
  type: 'Van';
  cargoCapacityKg: number; // e.g. 1200 kg
  passengerCapacity: number; // e.g. 9 or 12
  vanType: 'Cargo' | 'Passenger';
}

export type Vehicle = CarVehicle | BikeVehicle | VanVehicle;

export interface Customer {
  id: string;
  name: string;
  contactNumber: string;
  address: string;
  drivingLicence: string;
  email?: string;
  registeredAt: string;
}

export interface RentalRecord {
  id: string;
  rentalDate: string;
  returnDate: string;
  actualReturnDate?: string;
  rentalDays: number;
  vehicleId: string;
  vehicleNumber: string;
  vehicleModel: string;
  vehicleType: VehicleType;
  rentPerDay: number;
  customerId: string;
  customerName: string;
  customerPhone: string;
  customerLicence: string;
  baseRent: number;
  typeSpecialFee: number; // e.g. car insurance, van commercial permit, bike helmet fee
  securityDeposit: number;
  discount: number;
  totalRent: number;
  status: RentalStatus;
  paymentMethod: PaymentMethod;
  paymentStatus: 'Paid' | 'Pending' | 'Refunded';
  notes?: string;
}

export interface DashboardStats {
  totalVehicles: number;
  availableVehicles: number;
  rentedVehicles: number;
  totalCustomers: number;
  activeRentalsCount: number;
  totalRevenue: number;
}
