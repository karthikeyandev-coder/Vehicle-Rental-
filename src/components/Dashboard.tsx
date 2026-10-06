import React from 'react';
import { 
  Car, 
  Bike, 
  Truck, 
  Users, 
  Key, 
  DollarSign, 
  CheckCircle2, 
  Clock, 
  ArrowRight,
  TrendingUp,
  ShieldCheck,
  FileCheck2,
  Plus
} from 'lucide-react';
import { Vehicle, Customer, RentalRecord } from '../types/rental';
import { NavTab } from './Navbar';

interface DashboardProps {
  vehicles: Vehicle[];
  customers: Customer[];
  rentals: RentalRecord[];
  setActiveTab: (tab: NavTab) => void;
  onOpenRentModal: (vehicleId?: string) => void;
  onOpenReturnModal: (rentalId?: string) => void;
  onOpenAddVehicle: () => void;
  onOpenAddCustomer: () => void;
  onViewInvoice: (rental: RentalRecord) => void;
}

export const Dashboard: React.FC<DashboardProps> = ({
  vehicles,
  customers,
  rentals,
  setActiveTab,
  onOpenRentModal,
  onOpenReturnModal,
  onOpenAddVehicle,
  onOpenAddCustomer,
  onViewInvoice,
}) => {
  const totalVehicles = vehicles.length;
  const availableVehicles = vehicles.filter(v => v.status === 'Available').length;
  const rentedVehicles = vehicles.filter(v => v.status === 'Rented').length;
  const maintenanceVehicles = vehicles.filter(v => v.status === 'Maintenance').length;

  const cars = vehicles.filter(v => v.type === 'Car');
  const bikes = vehicles.filter(v => v.type === 'Bike');
  const vans = vehicles.filter(v => v.type === 'Van');

  const activeRentals = rentals.filter(r => r.status === 'Active');
  const completedRentals = rentals.filter(r => r.status === 'Completed');

  const totalRevenue = rentals.reduce((acc, r) => acc + (r.paymentStatus === 'Paid' ? r.totalRent : 0), 0);

  const methodologySteps = [
    { step: 1, title: 'Add Vehicle', desc: 'Admin enters vehicle specs & daily rate', icon: Car, action: onOpenAddVehicle, label: 'Add Vehicle' },
    { step: 2, title: 'Add Customer', desc: 'Customer info & Driving License logged', icon: Users, action: onOpenAddCustomer, label: 'Add Customer' },
    { step: 3, title: 'Check Availability', desc: 'Filter real-time status of Cars, Bikes, Vans', icon: CheckCircle2, action: () => setActiveTab('fleet'), label: 'View Fleet' },
    { step: 4, title: 'Rent Vehicle', desc: 'Assign available vehicle & set rental dates', icon: Key, action: () => onOpenRentModal(), label: 'Rent Now' },
    { step: 5, title: 'Calculate Rent', desc: 'Formula: Rental Days × Rent Per Day + OOP Rules', icon: DollarSign, action: () => setActiveTab('oop'), label: 'View Formula' },
    { step: 6, title: 'Return Vehicle', desc: 'Verify condition & restore vehicle to Available', icon: Clock, action: () => onOpenReturnModal(), label: 'Return' },
    { step: 7, title: 'Display Record', desc: 'Generate printable invoice with customer & rate', icon: FileCheck2, action: () => setActiveTab('rentals'), label: 'View Records' }
  ];

  return (
    <div className="space-y-8 pb-12">
      {/* Welcome Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 border border-slate-800 p-6 sm:p-8 text-white shadow-2xl">
        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold mb-3">
            <span>Assignment 1 Specification</span>
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
            <span>Java OOP Architecture</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white mb-2">
            Vehicle Rental Management System
          </h1>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Eliminating manual paperwork, spreadsheets, and calculation errors. Fully implements OOP principles—<span className="text-amber-300 font-semibold">Classes & Objects, Encapsulation, Inheritance, Polymorphism, and Abstraction</span>—for automated vehicle availability tracking, customer management, and rental billing.
          </p>

          <div className="flex flex-wrap gap-3 mt-6">
            <button
              onClick={() => onOpenRentModal()}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-sm shadow-lg shadow-amber-500/20 active:scale-95 transition-all"
            >
              <Key className="w-4 h-4" />
              <span>Rent a Vehicle</span>
            </button>
            <button
              onClick={onOpenAddVehicle}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-medium text-sm border border-slate-700 active:scale-95 transition-all"
            >
              <Plus className="w-4 h-4 text-emerald-400" />
              <span>Add New Vehicle</span>
            </button>
            <button
              onClick={() => setActiveTab('oop')}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-indigo-900/60 hover:bg-indigo-800 text-indigo-200 font-medium text-sm border border-indigo-700/50 transition-all"
            >
              <span>Explore OOP Classes</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Decorative background flair */}
        <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-gradient-to-l from-indigo-500/10 to-transparent pointer-events-none" />
        <div className="absolute -right-8 -bottom-8 w-64 h-64 rounded-full bg-amber-500/5 blur-3xl pointer-events-none" />
      </div>

      {/* Primary KPI Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm hover:shadow transition-shadow">
          <div className="flex items-center justify-between text-slate-500 text-xs font-medium">
            <span>Total Fleet</span>
            <div className="p-2 rounded-lg bg-blue-50 text-blue-600">
              <Car className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2 text-2xl font-bold text-slate-900">{totalVehicles}</div>
          <div className="text-[11px] text-slate-500 mt-1 flex items-center gap-1">
            <span className="text-emerald-600 font-semibold">{cars.length}</span> Cars • 
            <span className="text-amber-600 font-semibold">{bikes.length}</span> Bikes • 
            <span className="text-purple-600 font-semibold">{vans.length}</span> Vans
          </div>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm hover:shadow transition-shadow">
          <div className="flex items-center justify-between text-slate-500 text-xs font-medium">
            <span>Available for Rent</span>
            <div className="p-2 rounded-lg bg-emerald-50 text-emerald-600">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2 text-2xl font-bold text-emerald-600">{availableVehicles}</div>
          <div className="text-[11px] text-slate-500 mt-1">
            Ready for instant dispatch
          </div>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm hover:shadow transition-shadow">
          <div className="flex items-center justify-between text-slate-500 text-xs font-medium">
            <span>Currently Rented</span>
            <div className="p-2 rounded-lg bg-amber-50 text-amber-600">
              <Key className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2 text-2xl font-bold text-amber-600">{rentedVehicles}</div>
          <div className="text-[11px] text-slate-500 mt-1">
            {activeRentals.length} active customer trips
          </div>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm hover:shadow transition-shadow">
          <div className="flex items-center justify-between text-slate-500 text-xs font-medium">
            <span>Total Customers</span>
            <div className="p-2 rounded-lg bg-indigo-50 text-indigo-600">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2 text-2xl font-bold text-indigo-600">{customers.length}</div>
          <div className="text-[11px] text-slate-500 mt-1">
            Verified with Driving License
          </div>
        </div>

        <div className="col-span-2 lg:col-span-1 bg-white rounded-xl border border-slate-200 p-4 shadow-sm hover:shadow transition-shadow">
          <div className="flex items-center justify-between text-slate-500 text-xs font-medium">
            <span>Total Revenue</span>
            <div className="p-2 rounded-lg bg-emerald-50 text-emerald-600">
              <DollarSign className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2 text-2xl font-bold text-slate-900">${totalRevenue.toLocaleString()}</div>
          <div className="text-[11px] text-emerald-600 font-medium mt-1 flex items-center gap-1">
            <TrendingUp className="w-3 h-3" />
            <span>{completedRentals.length + activeRentals.length} total bookings</span>
          </div>
        </div>
      </div>

      {/* Fleet Class Composition (OOP Inheritance) */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6">
          <div>
            <h2 className="text-lg font-bold text-slate-900">Vehicle Hierarchy & Fleet Breakdown</h2>
            <p className="text-xs text-slate-500">
              Derived subclasses inheriting base attributes from <span className="font-mono text-indigo-600">Vehicle.java</span>
            </p>
          </div>
          <button
            onClick={() => setActiveTab('fleet')}
            className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 flex items-center gap-1 self-start"
          >
            <span>Manage All Fleet</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Cars Subclass Card */}
          <div className="rounded-xl border border-slate-200 bg-slate-50/50 p-4 hover:border-blue-300 transition-colors">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-lg bg-blue-100 text-blue-700">
                  <Car className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-sm">Car Subclass</h3>
                  <p className="text-[11px] text-slate-500">Sedans, SUVs, Hybrids & EVs</p>
                </div>
              </div>
              <span className="text-lg font-extrabold text-slate-900">{cars.length}</span>
            </div>
            <div className="space-y-1.5 text-xs text-slate-600 mb-4">
              <div className="flex justify-between">
                <span>Available:</span>
                <span className="font-semibold text-emerald-600">{cars.filter(c => c.status === 'Available').length}</span>
              </div>
              <div className="flex justify-between">
                <span>On Rent:</span>
                <span className="font-semibold text-amber-600">{cars.filter(c => c.status === 'Rented').length}</span>
              </div>
              <div className="flex justify-between">
                <span>OOP Specifics:</span>
                <span className="text-slate-500">Seating Cap, A/C, Transmission</span>
              </div>
            </div>
            <button
              onClick={() => setActiveTab('fleet')}
              className="w-full py-1.5 px-3 rounded-lg bg-white border border-slate-200 text-xs font-medium text-slate-700 hover:bg-slate-100 transition-colors"
            >
              Browse Cars
            </button>
          </div>

          {/* Bikes Subclass Card */}
          <div className="rounded-xl border border-slate-200 bg-slate-50/50 p-4 hover:border-amber-300 transition-colors">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-lg bg-amber-100 text-amber-700">
                  <Bike className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-sm">Bike Subclass</h3>
                  <p className="text-[11px] text-slate-500">Cruisers, Sports, Electric Scooters</p>
                </div>
              </div>
              <span className="text-lg font-extrabold text-slate-900">{bikes.length}</span>
            </div>
            <div className="space-y-1.5 text-xs text-slate-600 mb-4">
              <div className="flex justify-between">
                <span>Available:</span>
                <span className="font-semibold text-emerald-600">{bikes.filter(b => b.status === 'Available').length}</span>
              </div>
              <div className="flex justify-between">
                <span>On Rent:</span>
                <span className="font-semibold text-amber-600">{bikes.filter(b => b.status === 'Rented').length}</span>
              </div>
              <div className="flex justify-between">
                <span>OOP Specifics:</span>
                <span className="text-slate-500">Engine CC, Helmet Included</span>
              </div>
            </div>
            <button
              onClick={() => setActiveTab('fleet')}
              className="w-full py-1.5 px-3 rounded-lg bg-white border border-slate-200 text-xs font-medium text-slate-700 hover:bg-slate-100 transition-colors"
            >
              Browse Bikes
            </button>
          </div>

          {/* Vans Subclass Card */}
          <div className="rounded-xl border border-slate-200 bg-slate-50/50 p-4 hover:border-purple-300 transition-colors">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-lg bg-purple-100 text-purple-700">
                  <Truck className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-sm">Van Subclass</h3>
                  <p className="text-[11px] text-slate-500">Cargo & Passenger Transits</p>
                </div>
              </div>
              <span className="text-lg font-extrabold text-slate-900">{vans.length}</span>
            </div>
            <div className="space-y-1.5 text-xs text-slate-600 mb-4">
              <div className="flex justify-between">
                <span>Available:</span>
                <span className="font-semibold text-emerald-600">{vans.filter(v => v.status === 'Available').length}</span>
              </div>
              <div className="flex justify-between">
                <span>On Rent:</span>
                <span className="font-semibold text-amber-600">{vans.filter(v => v.status === 'Rented').length}</span>
              </div>
              <div className="flex justify-between">
                <span>OOP Specifics:</span>
                <span className="text-slate-500">Payload (kg), Commercial Permit</span>
              </div>
            </div>
            <button
              onClick={() => setActiveTab('fleet')}
              className="w-full py-1.5 px-3 rounded-lg bg-white border border-slate-200 text-xs font-medium text-slate-700 hover:bg-slate-100 transition-colors"
            >
              Browse Vans
            </button>
          </div>
        </div>
      </div>

      {/* Active Rentals Table with Immediate Return Action */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-bold text-slate-900">Currently Active Rentals</h2>
              <span className="px-2 py-0.5 text-xs font-semibold rounded-full bg-amber-100 text-amber-800">
                {activeRentals.length} vehicles on road
              </span>
            </div>
            <p className="text-xs text-slate-500">
              Live customer bookings requiring return settlement (Step 6 of Methodology)
            </p>
          </div>
          <button
            onClick={() => setActiveTab('rentals')}
            className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 flex items-center gap-1"
          >
            <span>View All Records & History</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {activeRentals.length === 0 ? (
          <div className="text-center py-8 text-slate-500 bg-slate-50 rounded-xl border border-dashed border-slate-300">
            <CheckCircle2 className="w-10 h-10 text-emerald-500 mx-auto mb-2" />
            <p className="text-sm font-medium text-slate-700">All vehicles are currently parked and available!</p>
            <p className="text-xs text-slate-500 mt-1">Start a new rental to see active tracking here.</p>
            <button
              onClick={() => onOpenRentModal()}
              className="mt-3 px-3 py-1.5 bg-emerald-600 text-white rounded-lg text-xs font-semibold"
            >
              Rent a Vehicle Now
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="bg-slate-50 text-slate-600 uppercase text-[11px] font-semibold border-y border-slate-200">
                <tr>
                  <th className="py-3 px-4">Rental ID</th>
                  <th className="py-3 px-4">Vehicle Details</th>
                  <th className="py-3 px-4">Customer</th>
                  <th className="py-3 px-4">Duration & Return</th>
                  <th className="py-3 px-4">Charges</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {activeRentals.map((rental) => (
                  <tr key={rental.id} className="hover:bg-slate-50/70 transition-colors">
                    <td className="py-3 px-4 font-mono font-bold text-indigo-600">
                      {rental.id}
                    </td>
                    <td className="py-3 px-4">
                      <div className="font-semibold text-slate-900">{rental.vehicleModel}</div>
                      <div className="text-xs text-slate-500 flex items-center gap-1">
                        <span className="font-mono bg-slate-100 px-1 py-0.5 rounded text-[11px]">
                          {rental.vehicleNumber}
                        </span>
                        <span className="text-[11px] text-slate-400">({rental.vehicleType})</span>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="font-medium text-slate-900">{rental.customerName}</div>
                      <div className="text-xs text-slate-500">{rental.customerPhone}</div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="text-slate-700 font-medium">{rental.rentalDays} Days</div>
                      <div className="text-xs text-slate-500">
                        Due: {new Date(rental.returnDate).toLocaleDateString()}
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="font-bold text-slate-900">${rental.totalRent}</div>
                      <div className="text-[11px] text-emerald-600 font-medium">
                        {rental.paymentMethod} • {rental.paymentStatus}
                      </div>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => onViewInvoice(rental)}
                          className="px-2.5 py-1 text-xs font-medium rounded bg-slate-100 text-slate-700 hover:bg-slate-200 transition-colors"
                          title="View Rental Invoice"
                        >
                          Invoice
                        </button>
                        <button
                          onClick={() => onOpenReturnModal(rental.id)}
                          className="px-2.5 py-1 text-xs font-semibold rounded bg-indigo-600 text-white hover:bg-indigo-500 transition-colors shadow-sm"
                          title="Process Return & Settle Bill"
                        >
                          Return Vehicle
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Working Methodology from Assignment-1 Page 5 */}
      <div className="bg-gradient-to-br from-slate-900 to-indigo-950 rounded-2xl border border-slate-800 p-6 sm:p-8 text-white shadow-xl">
        <div className="max-w-2xl mb-6">
          <span className="text-amber-400 text-xs font-bold tracking-wider uppercase">Section 7 of Assignment Specification</span>
          <h2 className="text-xl sm:text-2xl font-bold mt-1 text-white">System Working Methodology (Steps 1 – 7)</h2>
          <p className="text-slate-300 text-xs sm:text-sm mt-1">
            The standard end-to-end operational pipeline programmed using Java Object-Oriented principles.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {methodologySteps.map((item) => {
            const Icon = item.icon;
            return (
              <div 
                key={item.step} 
                className="bg-slate-800/80 rounded-xl p-4 border border-slate-700/80 flex flex-col justify-between hover:border-amber-400/50 transition-colors group"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="w-6 h-6 rounded-full bg-amber-500/20 text-amber-300 font-bold text-xs flex items-center justify-center border border-amber-500/30">
                      {item.step}
                    </span>
                    <Icon className="w-4 h-4 text-slate-400 group-hover:text-amber-400 transition-colors" />
                  </div>
                  <h3 className="font-bold text-sm text-white">{item.title}</h3>
                  <p className="text-xs text-slate-400 mt-1 leading-relaxed">{item.desc}</p>
                </div>
                <button
                  onClick={item.action}
                  className="mt-4 flex items-center justify-between text-xs font-semibold text-amber-400 hover:text-amber-300 pt-2 border-t border-slate-700"
                >
                  <span>{item.label}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
