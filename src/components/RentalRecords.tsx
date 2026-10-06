import React, { useState } from 'react';
import { 
  FileText, 
  Search, 
  Calendar, 
  Car, 
  Users, 
  DollarSign, 
  RotateCcw, 
  Printer, 
  CheckCircle2, 
  Clock, 
  ArrowUpDown,
  Filter
} from 'lucide-react';
import { RentalRecord, RentalStatus } from '../types/rental';

interface RentalRecordsProps {
  rentals: RentalRecord[];
  onViewInvoice: (rental: RentalRecord) => void;
  onOpenReturnModal: (rentalId: string) => void;
  onOpenRentModal: () => void;
}

export const RentalRecords: React.FC<RentalRecordsProps> = ({
  rentals,
  onViewInvoice,
  onOpenReturnModal,
  onOpenRentModal,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<RentalStatus | 'All'>('All');

  const filteredRentals = rentals.filter((r) => {
    const q = searchQuery.toLowerCase();
    const matchesSearch =
      r.id.toLowerCase().includes(q) ||
      r.customerName.toLowerCase().includes(q) ||
      r.vehicleModel.toLowerCase().includes(q) ||
      r.vehicleNumber.toLowerCase().includes(q) ||
      r.customerLicence.toLowerCase().includes(q);

    const matchesStatus = statusFilter === 'All' || r.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6 pb-12">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900">Rental Records & Billing Logs</h1>
            <span className="text-xs bg-amber-500/10 text-amber-800 px-2.5 py-0.5 rounded-full font-semibold border border-amber-500/20">
              Step 7: Display Rental Record
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Historical and active records tracking customer info, rental days, daily rates, and final amounts.
          </p>
        </div>

        <button
          onClick={onOpenRentModal}
          className="flex items-center justify-center gap-2 px-4 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 rounded-xl font-bold text-sm shadow-sm active:scale-95 transition-all self-start sm:self-auto"
        >
          <span>New Rental Booking</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by Rental ID, customer name, vehicle plate or model..."
            className="w-full pl-9 pr-4 py-2 text-sm rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-amber-500/50"
          />
        </div>

        <div className="flex items-center gap-2">
          {(['All', 'Active', 'Completed'] as const).map((status) => (
            <button
              key={status}
              onClick={() => setStatusFilter(status)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
                statusFilter === status
                  ? 'bg-slate-900 text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {status === 'All' ? 'All Records' : status}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
        {filteredRentals.length === 0 ? (
          <div className="text-center py-12 text-slate-400">
            <FileText className="w-12 h-12 mx-auto mb-2 text-slate-300" />
            <p className="font-semibold text-slate-700 text-sm">No rental records found</p>
            <p className="text-xs text-slate-500 mt-1">Try adjusting your filters or initiate a new booking.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="bg-slate-50 text-slate-600 uppercase text-[11px] font-semibold border-b border-slate-200">
                <tr>
                  <th className="py-3.5 px-4">Rental ID</th>
                  <th className="py-3.5 px-4">Vehicle</th>
                  <th className="py-3.5 px-4">Customer Details</th>
                  <th className="py-3.5 px-4">Rental Duration</th>
                  <th className="py-3.5 px-4">Rate Breakdown</th>
                  <th className="py-3.5 px-4">Total Amount</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredRentals.map((r) => {
                  const isActive = r.status === 'Active';

                  return (
                    <tr key={r.id} className="hover:bg-slate-50/70 transition-colors">
                      <td className="py-3.5 px-4 font-mono font-bold text-indigo-600 whitespace-nowrap">
                        {r.id}
                      </td>
                      <td className="py-3.5 px-4">
                        <div className="font-bold text-slate-900">{r.vehicleModel}</div>
                        <div className="text-xs text-slate-500 flex items-center gap-1.5 mt-0.5">
                          <span className="font-mono bg-slate-100 px-1.5 py-0.2 rounded text-[11px] font-semibold">
                            {r.vehicleNumber}
                          </span>
                          <span className="text-[10px] uppercase font-bold text-slate-400">
                            {r.vehicleType}
                          </span>
                        </div>
                      </td>
                      <td className="py-3.5 px-4">
                        <div className="font-semibold text-slate-900">{r.customerName}</div>
                        <div className="text-xs text-slate-500">{r.customerPhone}</div>
                        <div className="text-[11px] font-mono text-slate-400">DL: {r.customerLicence}</div>
                      </td>
                      <td className="py-3.5 px-4 whitespace-nowrap">
                        <div className="font-semibold text-slate-800">
                          {r.rentalDays} {r.rentalDays === 1 ? 'Day' : 'Days'}
                        </div>
                        <div className="text-xs text-slate-500">
                          {r.rentalDate} → {r.actualReturnDate || r.returnDate}
                        </div>
                      </td>
                      <td className="py-3.5 px-4 text-xs text-slate-600 whitespace-nowrap">
                        <div>Base: ${r.baseRent} (${r.rentPerDay}/d)</div>
                        <div className="text-slate-400">Spec fee: +${r.typeSpecialFee}</div>
                      </td>
                      <td className="py-3.5 px-4 whitespace-nowrap">
                        <div className="text-base font-extrabold text-slate-900">${r.totalRent}</div>
                        <div className="text-[10px] text-emerald-600 font-semibold uppercase">
                          {r.paymentMethod} • {r.paymentStatus}
                        </div>
                      </td>
                      <td className="py-3.5 px-4 whitespace-nowrap">
                        <span
                          className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold ${
                            isActive
                              ? 'bg-amber-100 text-amber-800 border border-amber-200'
                              : 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                          }`}
                        >
                          {isActive ? <Clock className="w-3 h-3" /> : <CheckCircle2 className="w-3 h-3" />}
                          {r.status}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-right whitespace-nowrap">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => onViewInvoice(r)}
                            className="px-2.5 py-1 text-xs font-medium rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors flex items-center gap-1"
                            title="Generate Official Invoice"
                          >
                            <Printer className="w-3 h-3" />
                            <span>Invoice</span>
                          </button>
                          {isActive && (
                            <button
                              onClick={() => onOpenReturnModal(r.id)}
                              className="px-2.5 py-1 text-xs font-bold rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white transition-colors shadow-sm"
                              title="Return Vehicle & Settle Bill"
                            >
                              Return
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};
