import React, { useState } from 'react';
import { 
  X, 
  RotateCcw, 
  CheckCircle2, 
  AlertTriangle, 
  ShieldCheck, 
  Calendar, 
  DollarSign,
  Car
} from 'lucide-react';
import { RentalRecord, Vehicle } from '../types/rental';

interface ReturnVehicleModalProps {
  isOpen: boolean;
  onClose: () => void;
  activeRentals: RentalRecord[];
  preSelectedRentalId?: string;
  onConfirmReturn: (
    rentalId: string, 
    actualReturnDate: string, 
    depositRefund: number, 
    lateFee: number, 
    conditionNotes: string
  ) => void;
}

export const ReturnVehicleModal: React.FC<ReturnVehicleModalProps> = ({
  isOpen,
  onClose,
  activeRentals,
  preSelectedRentalId,
  onConfirmReturn,
}) => {
  const [selectedRentalId, setSelectedRentalId] = useState<string>(
    preSelectedRentalId || (activeRentals[0]?.id || '')
  );

  const todayStr = new Date().toISOString().split('T')[0];
  const [actualReturnDate, setActualReturnDate] = useState<string>(todayStr);
  const [vehicleCondition, setVehicleCondition] = useState<'Excellent' | 'Good' | 'Minor Scratches' | 'Needs Cleaning'>('Excellent');
  const [damageDeduction, setDamageDeduction] = useState<number>(0);
  const [notes, setNotes] = useState<string>('Vehicle returned on time in healthy condition.');

  if (!isOpen) return null;

  const currentRental = activeRentals.find(r => r.id === selectedRentalId);

  // Late days calculation
  let lateDays = 0;
  let lateFee = 0;
  if (currentRental) {
    const agreedDue = new Date(currentRental.returnDate).getTime();
    const actual = new Date(actualReturnDate).getTime();
    const diffDays = Math.ceil((actual - agreedDue) / (1000 * 60 * 60 * 24));
    if (diffDays > 0) {
      lateDays = diffDays;
      lateFee = lateDays * (currentRental.rentPerDay * 1.5); // 1.5x daily penalty for late return
    }
  }

  const depositRefund = currentRental 
    ? Math.max(0, currentRental.securityDeposit - damageDeduction) 
    : 0;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentRental) return;

    onConfirmReturn(
      currentRental.id,
      actualReturnDate,
      depositRefund,
      lateFee,
      `Condition: ${vehicleCondition}. ${damageDeduction > 0 ? `Deposit deduction: $${damageDeduction}. ` : ''}${lateFee > 0 ? `Late penalty applied: $${lateFee}. ` : ''}${notes}`
    );

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-xl w-full border border-slate-200 shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="bg-gradient-to-r from-indigo-900 to-slate-900 p-5 text-white flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500 text-slate-950 uppercase tracking-wider">
                Step 6: Return Vehicle
              </span>
              <h2 className="text-lg font-bold text-white">Process Vehicle Return & Check-in</h2>
            </div>
            <p className="text-xs text-slate-300 mt-0.5">
              Inspect condition, calculate late charges, and restore vehicle status to 'Available'.
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {activeRentals.length === 0 ? (
            <div className="p-6 text-center text-slate-500 bg-slate-50 rounded-xl border border-dashed border-slate-300">
              <CheckCircle2 className="w-10 h-10 text-emerald-500 mx-auto mb-2" />
              <p className="font-semibold text-slate-800 text-sm">No Active Rentals Pending Return</p>
              <p className="text-xs text-slate-500 mt-1">All fleet vehicles are already checked-in and available.</p>
              <button
                type="button"
                onClick={onClose}
                className="mt-4 px-4 py-2 bg-slate-900 text-white rounded-lg text-xs font-semibold"
              >
                Close
              </button>
            </div>
          ) : (
            <>
              {/* Select Active Rental */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Select Active Rental Record
                </label>
                <select
                  value={selectedRentalId}
                  onChange={(e) => setSelectedRentalId(e.target.value)}
                  className="w-full px-3 py-2 text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  {activeRentals.map((r) => (
                    <option key={r.id} value={r.id}>
                      {r.id} — {r.vehicleModel} ({r.vehicleNumber}) | Rented to: {r.customerName}
                    </option>
                  ))}
                </select>
              </div>

              {currentRental && (
                <div className="bg-slate-50 rounded-xl p-4 border border-slate-200 text-xs space-y-2">
                  <div className="flex justify-between items-center pb-2 border-b border-slate-200">
                    <span className="font-bold text-slate-900">{currentRental.vehicleModel}</span>
                    <span className="font-mono bg-white px-2 py-0.5 rounded border border-slate-200 text-slate-700 font-bold">
                      {currentRental.vehicleNumber}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-slate-600">
                    <div>
                      <span className="text-slate-400">Customer: </span>
                      <span className="font-semibold text-slate-800">{currentRental.customerName}</span>
                    </div>
                    <div>
                      <span className="text-slate-400">Agreed Return: </span>
                      <span className="font-semibold text-slate-800">{currentRental.returnDate}</span>
                    </div>
                    <div>
                      <span className="text-slate-400">Total Charged: </span>
                      <span className="font-bold text-emerald-700">${currentRental.totalRent}</span>
                    </div>
                    <div>
                      <span className="text-slate-400">Deposit Held: </span>
                      <span className="font-bold text-indigo-700">${currentRental.securityDeposit}</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Actual Return Date & Late check */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Actual Return Date
                  </label>
                  <input
                    type="date"
                    value={actualReturnDate}
                    onChange={(e) => setActualReturnDate(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Inspection Condition
                  </label>
                  <select
                    value={vehicleCondition}
                    onChange={(e) => {
                      const cond = e.target.value as any;
                      setVehicleCondition(cond);
                      if (cond === 'Minor Scratches') setDamageDeduction(20);
                      else if (cond === 'Needs Cleaning') setDamageDeduction(10);
                      else setDamageDeduction(0);
                    }}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300"
                  >
                    <option value="Excellent">Excellent - No damage</option>
                    <option value="Good">Good - Normal wear</option>
                    <option value="Needs Cleaning">Needs Deep Cleaning (-$10)</option>
                    <option value="Minor Scratches">Minor Scratch / Scuff (-$20)</option>
                  </select>
                </div>
              </div>

              {/* Late Fee Notice if applicable */}
              {lateDays > 0 && (
                <div className="p-3 bg-amber-50 border border-amber-300 rounded-xl text-amber-900 text-xs flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
                    <span>Vehicle returned {lateDays} day(s) overdue</span>
                  </div>
                  <span className="font-bold text-amber-700">+${lateFee} Late Penalty</span>
                </div>
              )}

              {/* Settlement Summary */}
              <div className="bg-slate-900 text-white p-4 rounded-xl space-y-2 text-xs">
                <div className="flex items-center justify-between text-emerald-400 font-bold border-b border-slate-800 pb-2">
                  <span>Deposit Settlement & Return Summary</span>
                  <span>Vehicle Status → Available</span>
                </div>

                <div className="flex justify-between text-slate-300">
                  <span>Initial Security Deposit:</span>
                  <span className="font-mono">${currentRental?.securityDeposit || 0}</span>
                </div>
                {damageDeduction > 0 && (
                  <div className="flex justify-between text-rose-400">
                    <span>Cleaning / Damage Deduction:</span>
                    <span className="font-mono">-${damageDeduction}</span>
                  </div>
                )}
                {lateFee > 0 && (
                  <div className="flex justify-between text-amber-400">
                    <span>Late Fee Charged:</span>
                    <span className="font-mono">+${lateFee}</span>
                  </div>
                )}
                <div className="flex justify-between text-white font-bold text-sm pt-1 border-t border-slate-800">
                  <span>Security Deposit Refundable to Driver:</span>
                  <span className="text-emerald-400 font-mono text-base">${depositRefund}</span>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Return Inspection Remarks
                </label>
                <input
                  type="text"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300"
                />
              </div>

              {/* Submit Buttons */}
              <div className="pt-2 flex items-center justify-end gap-3 border-t border-slate-200">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={!currentRental}
                  className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 active:scale-95 text-white font-bold text-xs sm:text-sm shadow-md transition-all"
                >
                  Confirm Return & Release Vehicle
                </button>
              </div>
            </>
          )}
        </form>
      </div>
    </div>
  );
};
