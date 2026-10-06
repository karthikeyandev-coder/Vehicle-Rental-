import React, { useState } from 'react';
import { 
  Users, 
  Search, 
  Plus, 
  Phone, 
  MapPin, 
  CreditCard, 
  Calendar, 
  CheckCircle2, 
  History,
  Key,
  ShieldCheck,
  UserCheck
} from 'lucide-react';
import { Customer, RentalRecord } from '../types/rental';

interface CustomerManagementProps {
  customers: Customer[];
  rentals: RentalRecord[];
  onOpenAddCustomer: () => void;
  onOpenRentModal: (vehicleId?: string, customerId?: string) => void;
  onViewInvoice: (rental: RentalRecord) => void;
}

export const CustomerManagement: React.FC<CustomerManagementProps> = ({
  customers,
  rentals,
  onOpenAddCustomer,
  onOpenRentModal,
  onViewInvoice
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);

  const filteredCustomers = customers.filter((c) => {
    const q = searchQuery.toLowerCase();
    return (
      c.name.toLowerCase().includes(q) ||
      c.contactNumber.toLowerCase().includes(q) ||
      c.drivingLicence.toLowerCase().includes(q) ||
      c.address.toLowerCase().includes(q)
    );
  });

  const getCustomerRentals = (customerId: string) => {
    return rentals.filter(r => r.customerId === customerId);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900">Customer Management</h1>
            <span className="text-xs bg-indigo-50 text-indigo-700 px-2.5 py-0.5 rounded-full font-semibold border border-indigo-200">
              {customers.length} Registered Drivers
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Store, verify, and inspect customer profiles and driving licence records (Scope Section 4).
          </p>
        </div>

        <button
          onClick={onOpenAddCustomer}
          className="flex items-center justify-center gap-2 px-4 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-semibold text-sm shadow-sm active:scale-95 transition-all self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Register New Customer</span>
        </button>
      </div>

      {/* Search Bar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between gap-4">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by name, phone number, driving licence (e.g. Rahul, KA042018...)..."
            className="w-full pl-9 pr-4 py-2 text-sm rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500"
          />
        </div>
      </div>

      {/* Customers List & Detail View */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Customer Cards Column */}
        <div className="lg:col-span-2 space-y-4">
          {filteredCustomers.length === 0 ? (
            <div className="bg-white rounded-2xl border border-dashed border-slate-300 p-12 text-center">
              <Users className="w-12 h-12 text-slate-300 mx-auto mb-3" />
              <h3 className="font-bold text-slate-700 text-base">No customers found</h3>
              <p className="text-xs text-slate-500 mt-1">Register a new customer to start booking rentals.</p>
              <button
                onClick={onOpenAddCustomer}
                className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-lg text-xs font-semibold"
              >
                Register Customer
              </button>
            </div>
          ) : (
            filteredCustomers.map((customer) => {
              const customerRentals = getCustomerRentals(customer.id);
              const activeCount = customerRentals.filter(r => r.status === 'Active').length;
              const isSelected = selectedCustomer?.id === customer.id;

              return (
                <div
                  key={customer.id}
                  className={`bg-white rounded-2xl border p-5 transition-all cursor-pointer ${
                    isSelected
                      ? 'border-indigo-500 ring-2 ring-indigo-500/20 shadow-md'
                      : 'border-slate-200 hover:border-slate-300 shadow-sm'
                  }`}
                  onClick={() => setSelectedCustomer(customer)}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="w-11 h-11 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold text-sm">
                        {customer.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-bold text-slate-900 text-base">{customer.name}</h3>
                          <span className="font-mono text-[11px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded">
                            {customer.id}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-slate-500 mt-0.5">
                          <Phone className="w-3.5 h-3.5 text-slate-400" />
                          <span>{customer.contactNumber}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      {activeCount > 0 && (
                        <span className="px-2.5 py-1 text-xs font-semibold rounded-full bg-amber-100 text-amber-800 border border-amber-200 flex items-center gap-1">
                          <Key className="w-3 h-3" />
                          {activeCount} Active Trip
                        </span>
                      )}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onOpenRentModal(undefined, customer.id);
                        }}
                        className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold shadow-sm active:scale-95 transition-all"
                      >
                        Rent Vehicle
                      </button>
                    </div>
                  </div>

                  {/* Customer Information Grid */}
                  <div className="mt-4 pt-3 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-600">
                    <div className="flex items-center gap-2">
                      <CreditCard className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <span>Licence: </span>
                      <span className="font-mono font-bold text-slate-800">{customer.drivingLicence}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <Calendar className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <span>Registered: </span>
                      <span>{customer.registeredAt}</span>
                    </div>

                    <div className="sm:col-span-2 flex items-start gap-2 text-slate-500">
                      <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
                      <span className="truncate">{customer.address}</span>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Selected Customer Profile & Rental History Panel */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm h-fit">
          {selectedCustomer ? (
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <h3 className="font-bold text-slate-900 text-base">Driver Dossier</h3>
                <span className="text-xs bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full font-semibold flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3" />
                  Verified DL
                </span>
              </div>

              <div>
                <h4 className="text-xl font-bold text-slate-900">{selectedCustomer.name}</h4>
                <p className="text-xs font-mono text-slate-500 mt-0.5">ID: {selectedCustomer.id}</p>
              </div>

              <div className="space-y-2 text-xs bg-slate-50 p-3 rounded-xl border border-slate-100">
                <div>
                  <span className="text-slate-400">Phone:</span>
                  <div className="font-medium text-slate-800">{selectedCustomer.contactNumber}</div>
                </div>
                <div>
                  <span className="text-slate-400">Driving Licence:</span>
                  <div className="font-mono font-bold text-indigo-700">{selectedCustomer.drivingLicence}</div>
                </div>
                <div>
                  <span className="text-slate-400">Residential Address:</span>
                  <div className="text-slate-800">{selectedCustomer.address}</div>
                </div>
              </div>

              {/* Rental History */}
              <div className="pt-2">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-bold text-slate-900 text-xs flex items-center gap-1">
                    <History className="w-3.5 h-3.5 text-slate-400" />
                    <span>Rental History ({getCustomerRentals(selectedCustomer.id).length})</span>
                  </h4>
                </div>

                <div className="space-y-2 max-h-60 overflow-y-auto">
                  {getCustomerRentals(selectedCustomer.id).length === 0 ? (
                    <p className="text-xs text-slate-400 italic py-2">No previous rental bookings yet.</p>
                  ) : (
                    getCustomerRentals(selectedCustomer.id).map((r) => (
                      <div
                        key={r.id}
                        onClick={() => onViewInvoice(r)}
                        className="p-2.5 rounded-lg border border-slate-200 hover:border-indigo-300 hover:bg-slate-50 cursor-pointer transition-colors text-xs flex items-center justify-between"
                      >
                        <div>
                          <div className="font-bold text-slate-900">{r.vehicleModel}</div>
                          <div className="text-[11px] text-slate-500">
                            {r.rentalDays} days • ${r.totalRent}
                          </div>
                        </div>
                        <div className="text-right">
                          <span
                            className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                              r.status === 'Active'
                                ? 'bg-amber-100 text-amber-800'
                                : 'bg-emerald-100 text-emerald-800'
                            }`}
                          >
                            {r.status}
                          </span>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>

              <button
                onClick={() => onOpenRentModal(undefined, selectedCustomer.id)}
                className="w-full mt-2 py-2 px-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow-sm transition-all flex items-center justify-center gap-1.5"
              >
                <Key className="w-3.5 h-3.5" />
                <span>Create Rental for {selectedCustomer.name.split(' ')[0]}</span>
              </button>
            </div>
          ) : (
            <div className="text-center py-12 text-slate-400">
              <UserCheck className="w-12 h-12 mx-auto mb-2 text-slate-300" />
              <p className="text-sm font-medium text-slate-600">Select a Customer</p>
              <p className="text-xs text-slate-400 mt-1">
                Click on any customer from the list to view their driving licence details and rental history.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
