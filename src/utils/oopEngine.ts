/**
 * Object-Oriented Programming (OOP) Demonstration Engine
 * Modeled strictly after Section 7 & Page 5 of Assignment-1:
 * - Vehicle (Base Abstract Class)
 *   ├── Car (Inherits Vehicle)
 *   ├── Bike (Inherits Vehicle)
 *   └── Van (Inherits Vehicle)
 * - Customer Class (Encapsulation)
 * - Rental Class (Association)
 * - Payment Class
 *
 * Demonstrates:
 * 1. Classes and Objects
 * 2. Encapsulation (private fields & getter/setters)
 * 3. Inheritance (Vehicle -> Car, Bike, Van)
 * 4. Polymorphism (overridden calculateRentalCharges)
 * 5. Abstraction (abstract class Vehicle and IVehicleOperations interface)
 */

export interface IVehicleOperations {
  displayDetails(): string;
  calculateRentalCharges(days: number): {
    baseRent: number;
    specialFee: number;
    deposit: number;
    total: number;
    breakdown: string[];
  };
  checkAvailability(): boolean;
}

// 5. Abstraction & 2. Encapsulation
export abstract class OOPVehicle implements IVehicleOperations {
  private _vehicleId: string;
  private _vehicleNumber: string;
  private _brand: string;
  private _model: string;
  private _rentPerDay: number;
  private _isAvailable: boolean;

  constructor(
    vehicleId: string,
    vehicleNumber: string,
    brand: string,
    model: string,
    rentPerDay: number,
    isAvailable: boolean = true
  ) {
    this._vehicleId = vehicleId;
    this._vehicleNumber = vehicleNumber;
    this._brand = brand;
    this._model = model;
    this._rentPerDay = rentPerDay;
    this._isAvailable = isAvailable;
  }

  // Encapsulation: Getters and Setters
  public get vehicleId(): string {
    return this._vehicleId;
  }
  public get vehicleNumber(): string {
    return this._vehicleNumber;
  }
  public get brand(): string {
    return this._brand;
  }
  public get model(): string {
    return this._model;
  }
  public get rentPerDay(): number {
    return this._rentPerDay;
  }
  public set rentPerDay(value: number) {
    if (value <= 0) throw new Error("Rental price must be positive");
    this._rentPerDay = value;
  }
  public get isAvailable(): boolean {
    return this._isAvailable;
  }
  public set isAvailable(value: boolean) {
    this._isAvailable = value;
  }

  public checkAvailability(): boolean {
    return this._isAvailable;
  }

  public abstract getVehicleType(): string;

  // 4. Polymorphism: Abstract or overridable calculation method
  public abstract calculateRentalCharges(days: number): {
    baseRent: number;
    specialFee: number;
    deposit: number;
    total: number;
    breakdown: string[];
  };

  public displayDetails(): string {
    return `[${this.getVehicleType()}] ${this._brand} ${this._model} (Reg: ${this._vehicleNumber}) - $${this._rentPerDay}/day - ${this._isAvailable ? 'Available' : 'Rented'}`;
  }
}

// 3. Inheritance: Car inherits Vehicle
export class OOPCar extends OOPVehicle {
  private _seatingCapacity: number;
  private _hasAirCon: boolean;

  constructor(
    vehicleId: string,
    vehicleNumber: string,
    brand: string,
    model: string,
    rentPerDay: number,
    seatingCapacity: number = 5,
    hasAirCon: boolean = true,
    isAvailable: boolean = true
  ) {
    super(vehicleId, vehicleNumber, brand, model, rentPerDay, isAvailable);
    this._seatingCapacity = seatingCapacity;
    this._hasAirCon = hasAirCon;
  }

  public getVehicleType(): string {
    return "Car";
  }

  // 4. Polymorphism: Car calculation with passenger comprehensive insurance
  public calculateRentalCharges(days: number) {
    const baseRent = days * this.rentPerDay;
    const insuranceFee = 20; // flat safety cover
    const deposit = 50;
    const total = baseRent + insuranceFee + deposit;
    return {
      baseRent,
      specialFee: insuranceFee,
      deposit,
      total,
      breakdown: [
        `Base Rent: ${days} days × $${this.rentPerDay} = $${baseRent}`,
        `Comprehensive Car Insurance: $${insuranceFee}`,
        `Refundable Security Deposit: $${deposit}`,
      ],
    };
  }
}

// 3. Inheritance: Bike inherits Vehicle
export class OOPBike extends OOPVehicle {
  private _engineCC: number;
  private _helmetProvided: boolean;

  constructor(
    vehicleId: string,
    vehicleNumber: string,
    brand: string,
    model: string,
    rentPerDay: number,
    engineCC: number = 150,
    helmetProvided: boolean = true,
    isAvailable: boolean = true
  ) {
    super(vehicleId, vehicleNumber, brand, model, rentPerDay, isAvailable);
    this._engineCC = engineCC;
    this._helmetProvided = helmetProvided;
  }

  public getVehicleType(): string {
    return "Bike";
  }

  // 4. Polymorphism: Bike calculation with DOT helmet & protective gear fee
  public calculateRentalCharges(days: number) {
    const baseRent = days * this.rentPerDay;
    const gearFee = this._helmetProvided ? 10 : 0;
    const deposit = 25;
    const total = baseRent + gearFee + deposit;
    return {
      baseRent,
      specialFee: gearFee,
      deposit,
      total,
      breakdown: [
        `Base Rent: ${days} days × $${this.rentPerDay} = $${baseRent}`,
        `Protective Helmet & Riding Gear: $${gearFee}`,
        `Refundable Security Deposit: $${deposit}`,
      ],
    };
  }
}

// 3. Inheritance: Van inherits Vehicle
export class OOPVan extends OOPVehicle {
  private _cargoCapacityKg: number;
  private _passengerCapacity: number;

  constructor(
    vehicleId: string,
    vehicleNumber: string,
    brand: string,
    model: string,
    rentPerDay: number,
    cargoCapacityKg: number = 1000,
    passengerCapacity: number = 8,
    isAvailable: boolean = true
  ) {
    super(vehicleId, vehicleNumber, brand, model, rentPerDay, isAvailable);
    this._cargoCapacityKg = cargoCapacityKg;
    this._passengerCapacity = passengerCapacity;
  }

  public getVehicleType(): string {
    return "Van";
  }

  // 4. Polymorphism: Van calculation with commercial highway payload permit
  public calculateRentalCharges(days: number) {
    const baseRent = days * this.rentPerDay;
    const permitFee = 35; // Commercial road cargo permit
    const deposit = 100;
    const total = baseRent + permitFee + deposit;
    return {
      baseRent,
      specialFee: permitFee,
      deposit,
      total,
      breakdown: [
        `Base Rent: ${days} days × $${this.rentPerDay} = $${baseRent}`,
        `Commercial Haul & Transit Permit: $${permitFee}`,
        `Refundable Security Deposit: $${deposit}`,
      ],
    };
  }
}

// Complete Java Reference Code Snippets matching the Assignment Report
export const JAVA_OOP_SNIPPETS = {
  classAndObject: `// 1. CLASS AND OBJECT DEMONSTRATION
// Vehicles, Customers, and Rentals are modeled as blueprint classes and instantiated as objects.

public class VehicleRentalApp {
    public static void main(String[] args) {
        // Creating Objects (Instantiating classes)
        Car car1 = new Car("V101", "KA-01-AB-1024", "Toyota", "Camry Hybrid", 55.0, 5, true);
        Bike bike1 = new Bike("V102", "KA-05-BX-4482", "Royal Enfield", "Classic 350", 25.0, 350, true);
        Customer customer1 = new Customer("C101", "Rahul Sharma", "+91 98450 12345", "DL-KA0420180004921");

        // Calling object methods
        System.out.println("Vehicle 1: " + car1.getDetails());
        System.out.println("Customer: " + customer1.getName());
    }
}`,

  encapsulation: `// 2. ENCAPSULATION DEMONSTRATION
// Protects internal state using private variables and controlled public getters & setters.

public class Customer {
    // Private variables (data hiding)
    private String customerId;
    private String name;
    private String contactNumber;
    private String drivingLicence;

    // Parameterized Constructor
    public Customer(String customerId, String name, String contactNumber, String drivingLicence) {
        this.customerId = customerId;
        this.name = name;
        this.contactNumber = contactNumber;
        this.drivingLicence = drivingLicence;
    }

    // Getters and Setters with validation
    public String getCustomerId() { return customerId; }
    public String getName() { return name; }
    public void setName(String name) {
        if (name != null && !name.trim().isEmpty()) {
            this.name = name;
        }
    }
    public String getContactNumber() { return contactNumber; }
    public String getDrivingLicence() { return drivingLicence; }
}`,

  inheritance: `// 3. INHERITANCE DEMONSTRATION
// Car, Bike, and Van inherit common attributes and behaviors from the base Vehicle class.

// Base Class
public abstract class Vehicle {
    protected String vehicleId;
    protected String vehicleNumber;
    protected String brand;
    protected String model;
    protected double rentPerDay;
    protected boolean isAvailable;

    public Vehicle(String id, String regNo, String brand, String model, double rent) {
        this.vehicleId = id;
        this.vehicleNumber = regNo;
        this.brand = brand;
        this.model = model;
        this.rentPerDay = rent;
        this.isAvailable = true;
    }
}

// Derived Class: Car extends Vehicle
public class Car extends Vehicle {
    private int seatingCapacity;
    private boolean airConditioned;

    public Car(String id, String regNo, String brand, String model, double rent, int seats, boolean ac) {
        super(id, regNo, brand, model, rent); // Call superclass constructor
        this.seatingCapacity = seats;
        this.airConditioned = ac;
    }
}

// Derived Class: Bike extends Vehicle
public class Bike extends Vehicle {
    private int engineCC;
    private boolean helmetIncluded;

    public Bike(String id, String regNo, String brand, String model, double rent, int cc, boolean helmet) {
        super(id, regNo, brand, model, rent);
        this.engineCC = cc;
        this.helmetIncluded = helmet;
    }
}`,

  polymorphism: `// 4. POLYMORPHISM DEMONSTRATION
// Method overriding: calculateRentalCharges() executes subclass-specific logic at runtime.

// Base class abstract declaration
public abstract class Vehicle {
    // ...
    public abstract double calculateRentalCharges(int rentalDays);
}

// Car implementation: adds insurance cover
public class Car extends Vehicle {
    @Override
    public double calculateRentalCharges(int rentalDays) {
        double base = rentalDays * this.rentPerDay;
        double carInsurance = 20.0;
        return base + carInsurance;
    }
}

// Bike implementation: adds helmet charge
public class Bike extends Vehicle {
    @Override
    public double calculateRentalCharges(int rentalDays) {
        double base = rentalDays * this.rentPerDay;
        double helmetFee = 10.0;
        return base + helmetFee;
    }
}

// Polymorphic invocation at runtime:
Vehicle myVehicle = new Car("V1", "KA01", "Toyota", "Camry", 50.0, 5, true);
double carCost = myVehicle.calculateRentalCharges(3); // Calls Car's version: 3*50 + 20 = 170

myVehicle = new Bike("V2", "KA05", "Royal Enfield", "Classic", 25.0, 350, true);
double bikeCost = myVehicle.calculateRentalCharges(3); // Calls Bike's version: 3*25 + 10 = 85`,

  abstraction: `// 5. ABSTRACTION DEMONSTRATION
// Abstract classes & interfaces define standard contracts without exposing internal complexities.

public interface IVehicleOperations {
    void displayDetails();
    boolean checkAvailability();
    double calculateRentalCharges(int days);
}

public abstract class Vehicle implements IVehicleOperations {
    protected String vehicleNumber;
    protected String model;
    protected double rentPerDay;
    protected boolean isAvailable;

    @Override
    public boolean checkAvailability() {
        return this.isAvailable;
    }

    // Abstract method must be implemented by concrete subclasses
    @Override
    public abstract double calculateRentalCharges(int days);
}`
};
