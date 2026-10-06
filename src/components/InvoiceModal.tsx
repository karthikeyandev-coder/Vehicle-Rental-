import React from 'react';
import { 
  X, 
  Printer, 
  Car, 
  CheckCircle2, 
  ShieldCheck, 
  Download, 
  FileText,
  Calendar,
  User,
  CreditCard
} from 'lucide-react';
import { RentalRecord } from '../types/rental';

interface InvoiceModalProps {
  rental: RentalRecord | null;
  isOpen: boolean;
  onClose: () => void;
}

export const InvoiceModal: React.FC<InvoiceModalProps> = ({
  rental,
  isOpen,
  onClose,
}) => {
  if (!isOpen || !rental) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full border border-slate-200 shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Modal Top Bar (Hidden during print) */}
        <div className="bg-slate-900 p-4 text-white flex items-center justify-between print:hidden">
          <div className="flex items-center gap-2">
            <FileText className="w-4 h-4 text-amber-400" />
            <span className="font-bold text-sm">Rental Agreement & Tax Invoice</span>
            <span className="font-mono text-xs bg-slate-800 px-2 py-0.5 rounded text-slate-300">
              {rental.id}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow-sm transition-all"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / Save PDF</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Invoice Container */}
        <div className="p-8 space-y-6 text-slate-800 bg-white" id="printable-invoice">
          {/* Invoice Company Header */}
          <div className="flex flex-col sm:flex-row justify-between sm:items-start gap-4 border-b border-slate-200 pb-6">
            <div>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-slate-900 text-amber-400 flex items-center justify-center font-bold">
                  <Car className="w-5 h-5" />
                </div>
                <div>
                  <h1 className="font-extrabold text-xl text-slate-900 tracking-tight">
                    AUTORENT MANAGEMENT
                  </h1>
                  <span className="text-[10px] text-slate-500 uppercase tracking-widest font-semibold block">
                    Java OOP Vehicle Rental System
                  </span>
                </div>
              </div>
              <p className="text-xs text-slate-500 mt-2">
                Assignment - 1 Implementation<br />
                Fleet Operations & Billing Division
              </p>
            </div>

            <div className="text-right sm:text-right">
              <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-2 ${
                rental.status === 'Completed'
                  ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                  : 'bg-amber-100 text-amber-800 border border-amber-300'
              }`}>
                {rental.status === 'Completed' ? 'PAID & RETURNED' : 'ACTIVE RENTAL'}
              </span>
              <div className="font-mono text-xs text-slate-500">
                Invoice No: <span className="font-bold text-slate-900">{rental.id}</span>
              </div>
              <div className="text-xs text-slate-500">
                Date Issued: {rental.rentalDate}
              </div>
            </div>
          </div>

          {/* Customer & Vehicle Metadata Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-1">
              <div className="font-bold text-slate-900 flex items-center gap-1.5 text-sm mb-2">
                <User className="w-4 h-4 text-indigo-600" />
                <span>Customer Information</span>
              </div>
              <div><span className="text-slate-400">Name:</span> <strong className="text-slate-800">{rental.customerName}</strong></div>
              <div><span className="text-slate-400">Contact:</span> {rental.customerPhone}</div>
              <div><span className="text-slate-400">Driving Licence:</span> <code className="font-mono font-bold text-indigo-700">{rental.customerLicence}</code></div>
              <div><span className="text-slate-400">Customer ID:</span> {rental.customerId}</div>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-1">
              <div className="font-bold text-slate-900 flex items-center gap-1.5 text-sm mb-2">
                <Car className="w-4 h-4 text-indigo-600" />
                <span>Vehicle Specifications</span>
              </div>
              <div><span className="text-slate-400">Model:</span> <strong className="text-slate-800">{rental.vehicleModel}</strong></div>
              <div><span className="text-slate-400">Class Type:</span> <strong className="text-indigo-600">{rental.vehicleType} Subclass</strong></div>
              <div><span className="text-slate-400">Registration Plate:</span> <code className="font-mono font-bold text-slate-900">{rental.vehicleNumber}</code></div>
              <div><span className="text-slate-400">Rate:</span> ${rental.rentPerDay} / day</div>
            </div>
          </div>

          {/* Rental Duration Bar */}
          <div className="p-3 bg-indigo-50 border border-indigo-200 rounded-xl text-xs flex flex-col sm:flex-row justify-between items-center gap-2">
            <div className="flex items-center gap-2 text-indigo-900 font-semibold">
              <Calendar className="w-4 h-4 text-indigo-600" />
              <span>Rental Window:</span>
              <span>{rental.rentalDate}</span>
              <span>→</span>
              <span>{rental.actualReturnDate || rental.returnDate}</span>
            </div>
            <div className="bg-indigo-600 text-white font-bold px-3 py-1 rounded-lg">
              Total Duration: {rental.rentalDays} {rental.rentalDays === 1 ? 'Day' : 'Days'}
            </div>
          </div>

          {/* Calculation Table */}
          <div>
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-100 text-slate-700 font-bold uppercase text-[10px] border-y border-slate-200">
                <tr>
                  <th className="py-2.5 px-3">Description</th>
                  <th className="py-2.5 px-3 text-center">Unit Rate</th>
                  <th className="py-2.5 px-3 text-center">Qty / Days</th>
                  <th className="py-2.5 px-3 text-right">Amount</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                <tr>
                  <td className="py-2.5 px-3 font-semibold text-slate-900">
                    Base Rental Charges ({rental.vehicleModel})
                    <span className="block text-[10px] text-slate-400 font-normal">
                      Formula: Rental Days × Rent Per Day ({rental.rentalDays} × ${rental.rentPerDay})
                    </span>
                  </td>
                  <td className="py-2.5 px-3 text-center font-mono">${rental.rentPerDay}</td>
                  <td className="py-2.5 px-3 text-center">{rental.rentalDays}</td>
                  <td className="py-2.5 px-3 text-right font-mono font-bold">${rental.baseRent}</td>
                </tr>

                {rental.typeSpecialFee > 0 && (
                  <tr>
                    <td className="py-2.5 px-3 text-slate-700">
                      OOP Subclass Supplement ({rental.vehicleType === 'Car' ? 'Comprehensive Passenger Insurance' : rental.vehicleType === 'Bike' ? 'Protective Helmet & Riding Pack' : 'Commercial Cargo & Transit Permit'})
                    </td>
                    <td className="py-2.5 px-3 text-center font-mono">—</td>
                    <td className="py-2.5 px-3 text-center">1</td>
                    <td className="py-2.5 px-3 text-right font-mono font-medium">${rental.typeSpecialFee}</td>
                  </tr>
                )}

                {rental.securityDeposit > 0 && (
                  <tr>
                    <td className="py-2.5 px-3 text-slate-600 italic">
                      Security Deposit (Refundable upon vehicle return check)
                    </td>
                    <td className="py-2.5 px-3 text-center font-mono">—</td>
                    <td className="py-2.5 px-3 text-center">1</td>
                    <td className="py-2.5 px-3 text-right font-mono">${rental.securityDeposit}</td>
                  </tr>
                )}

                {rental.discount > 0 && (
                  <tr>
                    <td className="py-2.5 px-3 text-emerald-600 font-semibold">
                      Promotional / Extended Rental Discount
                    </td>
                    <td className="py-2.5 px-3 text-center font-mono">—</td>
                    <td className="py-2.5 px-3 text-center">1</td>
                    <td className="py-2.5 px-3 text-right font-mono text-emerald-600">-${rental.discount}</td>
                  </tr>
                )}
              </tbody>
              <tfoot className="border-t-2 border-slate-900">
                <tr>
                  <td colSpan={3} className="py-3 px-3 text-right font-bold text-slate-900 text-sm">
                    Grand Total Charged:
                  </td>
                  <td className="py-3 px-3 text-right font-mono font-black text-lg text-slate-900">
                    ${rental.totalRent}
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>

          {/* Payment & Verification footer */}
          <div className="border-t border-slate-200 pt-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 text-xs">
            <div className="flex items-center gap-2 text-slate-600">
              <CreditCard className="w-4 h-4 text-emerald-600" />
              <span>Paid via <strong>{rental.paymentMethod}</strong></span>
              <span className="w-1.5 h-1.5 rounded-full bg-slate-300"></span>
              <span className="text-emerald-700 font-semibold">Status: {rental.paymentStatus}</span>
            </div>
            <div className="text-[11px] text-slate-400 font-mono">
              System Ref: OOP-SYS-VRS-2026
            </div>
          </div>

          {/* Notes */}
          {rental.notes && (
            <div className="p-3 bg-slate-50 rounded-lg text-xs text-slate-500 border border-slate-100">
              <strong>Notes & Remarks:</strong> {rental.notes}
            </div>
          )}

          {/* Signatures for Print */}
          <div className="hidden print:grid grid-cols-2 gap-12 pt-8 text-xs border-t border-slate-200">
            <div>
              <div className="border-b border-slate-400 pb-8"></div>
              <p className="mt-1 font-semibold text-slate-700">Customer Signature ({rental.customerName})</p>
            </div>
            <div>
              <div className="border-b border-slate-400 pb-8"></div>
              <p className="mt-1 font-semibold text-slate-700">Authorized Officer (AutoRent)</p>
            </div>
          </div>
        </div>

        {/* Modal Bottom Close */}
        <div className="bg-slate-50 p-4 border-t border-slate-200 flex justify-end print:hidden">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold rounded-xl"
          >
            Close Receipt
          </button>
        </div>
      </div>
    </div>
  );
};
