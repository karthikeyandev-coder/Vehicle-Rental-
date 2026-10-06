import React, { useState, useId } from 'react';
import { 
  X, 
  Calendar, 
  DollarSign, 
  Car, 
  Bike, 
  Truck, 
  Users, 
  CreditCard, 
  ShieldCheck, 
  CheckCircle2, 
  AlertCircle,
  Plus
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { Vehicle, Customer, RentalRecord, PaymentMethod } from '../types/rental';

interface RentVehicleModalProps {
  isOpen: boolean;
  onClose: () => void;
  vehicles: Vehicle[];
  customers: Customer[];
  preSelectedVehicleId?: string;
  preSelectedCustomerId?: string;
  onConfirmRental: (newRental: RentalRecord) => void;
  onOpenAddCustomer: () => void;
}

export const RentVehicleModal: React.FC<RentVehicleModalProps> = ({
  isOpen,
  onClose,
  vehicles,
  customers,
  preSelectedVehicleId,
  preSelectedCustomerId,
  onConfirmRental,
  onOpenAddCustomer,
}) => {
  const availableVehicles = vehicles.filter(v => v.status === 'Available');

  // Form states
  const [selectedVehicleId, setSelectedVehicleId] = useState<string>(
    preSelectedVehicleId || (availableVehicles[0]?.id || '')
  );
  const [selectedCustomerId, setSelectedCustomerId] = useState<string>(
    preSelectedCustomerId || (customers[0]?.id || '')
  );

  // Default dates: Today and 3 days later
  const todayStr = new Date().toISOString().split('T')[0];
  const threeDaysLater = new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];

  const [rentalDate, setRentalDate] = useState<string>(todayStr);
  const [returnDate, setReturnDate] = useState<string>(threeDaysLater);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('Online');
  const [notes, setNotes] = useState<string>('');

  if (!isOpen) return null;

  const currentVehicle = vehicles.find(v => v.id === selectedVehicleId);
  const currentCustomer = customers.find(c => c.id === selectedCustomerId);

  // Calculate rental days
  const start = new Date(rentalDate);
  const end = new Date(returnDate);
  const diffTime = end.getTime() - start.getTime();
  const calculatedDays = Math.max(1, Math.ceil(diffTime / (1000 * 60 * 60 * 24)));

  // OOP Polymorphic calculations according to vehicle type
  const rentPerDay = currentVehicle ? currentVehicle.rentPerDay : 0;
  const baseRent = calculatedDays * rentPerDay;

  let typeSpecialFee = 0;
  let typeFeeLabel = '';
  let securityDeposit = 50;

  if (currentVehicle) {
    switch (currentVehicle.type) {
      case 'Car':
        typeSpecialFee = 20;
        typeFeeLabel = 'Comprehensive Passenger Insurance';
        securityDeposit = 50;
        break;
      case 'Bike':
        typeSpecialFee = 10;
        typeFeeLabel = 'Safety Helmet & Riding Gear Cover';
        securityDeposit = 25;
        break;
      case 'Van':
        typeSpecialFee = 35;
        typeFeeLabel = 'Commercial Transit & Cargo Permit';
        securityDeposit = 100;
        break;
    }
  }

  const discount = calculatedDays >= 7 ? 25 : 0; // Discount for week-long rentals
  const totalRent = baseRent + typeSpecialFee + securityDeposit - discount;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentVehicle || !currentCustomer) return;

    const newRentalId = `RENT-${new Date().getFullYear()}-${Math.floor(100 + Math.random() * 900)}`;

    const newRecord: RentalRecord = {
      id: newRentalId,
      rentalDate,
      returnDate,
      rentalDays: calculatedDays,
      vehicleId: currentVehicle.id,
      vehicleNumber: currentVehicle.vehicleNumber,
      vehicleModel: `${currentVehicle.brand} ${currentVehicle.model}`,
      vehicleType: currentVehicle.type,
      rentPerDay: currentVehicle.rentPerDay,
      customerId: currentCustomer.id,
      customerName: currentCustomer.name,
      customerPhone: currentCustomer.contactNumber,
      customerLicence: currentCustomer.drivingLicence,
      baseRent,
      typeSpecialFee,
      securityDeposit,
      discount,
      totalRent,
      status: 'Active',
      paymentMethod,
      paymentStatus: 'Paid',
      notes: notes || `Booked for ${calculatedDays} days via ${paymentMethod} payment.`
    };

    onConfirmRental(newRecord);

    // Fire celebratory confetti
    try {
      confetti({
        particleCount: 70,
        spread: 60,
        origin: { y: 0.6 }
      });
    } catch {
      // fallback safe
    }

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full border border-slate-200 shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 p-5 text-white flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-500 text-slate-950 uppercase tracking-wider">
                Step 4 & 5
              </span>
              <h2 className="text-lg font-bold text-white">Rent a Vehicle (Booking Engine)</h2>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Select vehicle, customer, rental dates and calculate automated rental charges.
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Step 1: Vehicle Selection */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              1. Select Vehicle to Rent (Step 3: Check Availability)
            </label>
            {availableVehicles.length === 0 ? (
              <div className="p-4 bg-rose-50 border border-rose-200 rounded-xl text-rose-800 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>No vehicles currently available! All vehicles are rented or in maintenance.</span>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-48 overflow-y-auto p-1">
                {availableVehicles.map((v) => {
                  const isChosen = v.id === selectedVehicleId;
                  return (
                    <div
                      key={v.id}
                      onClick={() => setSelectedVehicleId(v.id)}
                      className={`p-3 rounded-xl border cursor-pointer transition-all flex items-center gap-3 ${
                        isChosen
                          ? 'border-amber-500 bg-amber-50/60 ring-2 ring-amber-500/20'
                          : 'border-slate-200 hover:border-slate-300 bg-white'
                      }`}
                    >
                      <img
                        src={v.imageUrl}
                        alt={v.model}
                        className="w-12 h-12 rounded-lg object-cover"
                      />
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-xs text-slate-900 truncate">
                            {v.brand} {v.model}
                          </span>
                          <span className="text-[10px] font-semibold px-1.5 py-0.2 rounded bg-slate-100 text-slate-600">
                            {v.type}
                          </span>
                        </div>
                        <div className="text-[11px] font-mono text-slate-500">{v.vehicleNumber}</div>
                        <div className="text-xs font-bold text-emerald-700 mt-0.5">
                          ${v.rentPerDay}/day
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Step 2: Customer Selection */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                2. Select Customer (Driving Licence Verification)
              </label>
              <button
                type="button"
                onClick={onOpenAddCustomer}
                className="text-xs text-indigo-600 hover:text-indigo-800 font-semibold flex items-center gap-1"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Quick Register Customer</span>
              </button>
            </div>
            <select
              value={selectedCustomerId}
              onChange={(e) => setSelectedCustomerId(e.target.value)}
              className="w-full px-3 py-2 text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-amber-500"
            >
              {customers.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name} — DL: {c.drivingLicence} ({c.contactNumber})
                </option>
              ))}
            </select>
          </div>

          {/* Step 3: Rental Dates */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-slate-50 p-4 rounded-xl border border-slate-200">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Rental Start Date
              </label>
              <input
                type="date"
                value={rentalDate}
                onChange={(e) => setRentalDate(e.target.value)}
                className="w-full px-3 py-2 text-xs sm:text-sm rounded-lg border border-slate-300 bg-white"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Return Due Date
              </label>
              <input
                type="date"
                min={rentalDate}
                value={returnDate}
                onChange={(e) => setReturnDate(e.target.value)}
                className="w-full px-3 py-2 text-xs sm:text-sm rounded-lg border border-slate-300 bg-white"
                required
              />
            </div>
            <div className="sm:col-span-2 flex items-center justify-between text-xs pt-1 border-t border-slate-200">
              <span className="text-slate-500">Calculated Rental Duration:</span>
              <span className="font-bold text-indigo-700 bg-indigo-50 px-2.5 py-0.5 rounded-full border border-indigo-200">
                {calculatedDays} {calculatedDays === 1 ? 'Day' : 'Days'}
              </span>
            </div>
          </div>

          {/* Step 4 & 5: OOP Rental Calculation Breakdown */}
          <div className="bg-slate-900 text-white rounded-xl p-4 space-y-2">
            <div className="flex items-center justify-between text-xs text-amber-400 font-bold uppercase tracking-wider border-b border-slate-800 pb-2">
              <span>Rental Charge Calculation (Step 5)</span>
              <span>OOP Method: calculateRentalCharges()</span>
            </div>

            <div className="text-xs space-y-1.5 text-slate-300 pt-1">
              <div className="flex justify-between">
                <span>Base Rent ({calculatedDays} days × ${rentPerDay}):</span>
                <span className="font-mono font-medium">${baseRent}</span>
              </div>
              <div className="flex justify-between text-indigo-300">
                <span>{typeFeeLabel || 'Type Specific Fee'}:</span>
                <span className="font-mono font-medium">+${typeSpecialFee}</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Refundable Security Deposit:</span>
                <span className="font-mono font-medium">+${securityDeposit}</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-emerald-400">
                  <span>Weekly Rental Discount:</span>
                  <span className="font-mono font-medium">-${discount}</span>
                </div>
              )}
            </div>

            <div className="border-t border-slate-700 pt-2 flex items-center justify-between font-bold text-base text-amber-300">
              <span>Total Payable Rent:</span>
              <span className="text-xl">${totalRent}</span>
            </div>
          </div>

          {/* Step 6: Payment Method & Notes */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Payment Method
              </label>
              <div className="grid grid-cols-3 gap-2">
                {(['Online', 'Card', 'Cash'] as PaymentMethod[]).map((method) => (
                  <button
                    type="button"
                    key={method}
                    onClick={() => setPaymentMethod(method)}
                    className={`py-2 px-2 text-xs font-semibold rounded-lg border transition-all text-center ${
                      paymentMethod === method
                        ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm'
                        : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    {method}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Rental Notes / Purpose (Optional)
              </label>
              <input
                type="text"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="e.g. Outstation city trip, cargo moving"
                className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300"
              />
            </div>
          </div>

          {/* Footer Submit Buttons */}
          <div className="pt-2 flex items-center justify-end gap-3 border-t border-slate-200">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!currentVehicle || availableVehicles.length === 0}
              className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 active:scale-95 text-slate-950 font-bold text-sm shadow-md transition-all disabled:opacity-50 disabled:pointer-events-none"
            >
              Confirm & Rent Vehicle (${totalRent})
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
