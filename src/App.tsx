/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar, NavTab } from './components/Navbar';
import { Dashboard } from './components/Dashboard';
import { FleetManagement } from './components/FleetManagement';
import { CustomerManagement } from './components/CustomerManagement';
import { RentalRecords } from './components/RentalRecords';
import { OOPDemonstrator } from './components/OOPDemonstrator';
import { AssignmentDocs } from './components/AssignmentDocs';
import { RentVehicleModal } from './components/RentVehicleModal';
import { ReturnVehicleModal } from './components/ReturnVehicleModal';
import { AddVehicleModal } from './components/AddVehicleModal';
import { AddCustomerModal } from './components/AddCustomerModal';
import { InvoiceModal } from './components/InvoiceModal';

import { Vehicle, Customer, RentalRecord, VehicleStatus } from './types/rental';
import { INITIAL_VEHICLES, INITIAL_CUSTOMERS, INITIAL_RENTALS } from './data/initialData';
import { RotateCcw, Sparkles } from 'lucide-react';

export default function App() {
  // Persistent state for Vehicles, Customers, and Rentals
  const [vehicles, setVehicles] = useState<Vehicle[]>(() => {
    try {
      const saved = localStorage.getItem('autorent_vehicles');
      return saved ? JSON.parse(saved) : INITIAL_VEHICLES;
    } catch {
      return INITIAL_VEHICLES;
    }
  });

  const [customers, setCustomers] = useState<Customer[]>(() => {
    try {
      const saved = localStorage.getItem('autorent_customers');
      return saved ? JSON.parse(saved) : INITIAL_CUSTOMERS;
    } catch {
      return INITIAL_CUSTOMERS;
    }
  });

  const [rentals, setRentals] = useState<RentalRecord[]>(() => {
    try {
      const saved = localStorage.getItem('autorent_rentals');
      return saved ? JSON.parse(saved) : INITIAL_RENTALS;
    } catch {
      return INITIAL_RENTALS;
    }
  });

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('autorent_vehicles', JSON.stringify(vehicles));
    } catch (e) {
      console.error(e);
    }
  }, [vehicles]);

  useEffect(() => {
    try {
      localStorage.setItem('autorent_customers', JSON.stringify(customers));
    } catch (e) {
      console.error(e);
    }
  }, [customers]);

  useEffect(() => {
    try {
      localStorage.setItem('autorent_rentals', JSON.stringify(rentals));
    } catch (e) {
      console.error(e);
    }
  }, [rentals]);

  // Tab Navigation
  const [activeTab, setActiveTab] = useState<NavTab>('dashboard');

  // Modals state
  const [isRentModalOpen, setIsRentModalOpen] = useState(false);
  const [rentVehicleId, setRentVehicleId] = useState<string | undefined>();
  const [rentCustomerId, setRentCustomerId] = useState<string | undefined>();

  const [isReturnModalOpen, setIsReturnModalOpen] = useState(false);
  const [returnRentalId, setReturnRentalId] = useState<string | undefined>();

  const [isAddVehicleOpen, setIsAddVehicleOpen] = useState(false);
  const [isAddCustomerOpen, setIsAddCustomerOpen] = useState(false);

  const [isInvoiceOpen, setIsInvoiceOpen] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState<RentalRecord | null>(null);

  // Quick Notification Toast
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Action Handlers
  const handleOpenRentModal = (vehicleId?: string, customerId?: string) => {
    setRentVehicleId(vehicleId);
    setRentCustomerId(customerId);
    setIsRentModalOpen(true);
  };

  const handleOpenReturnModal = (rentalId?: string) => {
    setReturnRentalId(rentalId);
    setIsReturnModalOpen(true);
  };

  const handleConfirmRental = (newRental: RentalRecord) => {
    // 1. Add rental record
    setRentals((prev) => [newRental, ...prev]);

    // 2. Mark vehicle status as Rented
    setVehicles((prev) =>
      prev.map((v) => (v.id === newRental.vehicleId ? { ...v, status: 'Rented' } : v))
    );

    showToast(`Vehicle rented successfully! Rental ID: ${newRental.id}`);

    // Prompt invoice
    setSelectedInvoice(newRental);
    setIsInvoiceOpen(true);
  };

  const handleConfirmReturn = (
    rentalId: string,
    actualReturnDate: string,
    depositRefund: number,
    lateFee: number,
    conditionNotes: string
  ) => {
    const targetRental = rentals.find((r) => r.id === rentalId);
    if (!targetRental) return;

    // 1. Update Rental Record to Completed
    const updatedRental: RentalRecord = {
      ...targetRental,
      status: 'Completed',
      actualReturnDate,
      totalRent: targetRental.totalRent + lateFee,
      notes: conditionNotes,
    };

    setRentals((prev) =>
      prev.map((r) => (r.id === rentalId ? updatedRental : r))
    );

    // 2. Mark vehicle as Available
    setVehicles((prev) =>
      prev.map((v) =>
        v.id === targetRental.vehicleId ? { ...v, status: 'Available' } : v
      )
    );

    showToast(`Vehicle returned and released to Available! Deposit refund: $${depositRefund}`);

    // Show updated invoice
    setSelectedInvoice(updatedRental);
    setIsInvoiceOpen(true);
  };

  const handleAddVehicle = (newVehicle: Vehicle) => {
    setVehicles((prev) => [newVehicle, ...prev]);
    showToast(`Added ${newVehicle.brand} ${newVehicle.model} (${newVehicle.vehicleNumber}) to fleet`);
  };

  const handleAddCustomer = (newCustomer: Customer) => {
    setCustomers((prev) => [newCustomer, ...prev]);
    showToast(`Registered driver: ${newCustomer.name} (DL: ${newCustomer.drivingLicence})`);
  };

  const handleToggleVehicleStatus = (vehicleId: string, newStatus: VehicleStatus) => {
    setVehicles((prev) =>
      prev.map((v) => (v.id === vehicleId ? { ...v, status: newStatus } : v))
    );
    showToast(`Vehicle status updated to: ${newStatus}`);
  };

  const handleViewInvoice = (rental: RentalRecord) => {
    setSelectedInvoice(rental);
    setIsInvoiceOpen(true);
  };

  const handleResetData = () => {
    if (window.confirm('Reset all vehicle fleet and rental data back to default Assignment-1 demonstration seed?')) {
      setVehicles(INITIAL_VEHICLES);
      setCustomers(INITIAL_CUSTOMERS);
      setRentals(INITIAL_RENTALS);
      localStorage.removeItem('autorent_vehicles');
      localStorage.removeItem('autorent_customers');
      localStorage.removeItem('autorent_rentals');
      showToast('All system data reset to initial assignment seeds.');
    }
  };

  const availableCount = vehicles.filter((v) => v.status === 'Available').length;
  const activeRentalsCount = rentals.filter((r) => r.status === 'Active').length;

  return (
    <div className="min-h-screen bg-slate-100/80 text-slate-900 flex flex-col font-sans antialiased selection:bg-amber-500 selection:text-slate-950">
      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-950 text-white px-4 py-3 rounded-xl shadow-2xl border border-slate-800 text-xs sm:text-sm font-medium flex items-center gap-3 animate-in fade-in slide-in-from-bottom-5 duration-200">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Main Navigation Header */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenRentModal={() => handleOpenRentModal()}
        onOpenReturnModal={() => handleOpenReturnModal()}
        availableCount={availableCount}
        activeRentalsCount={activeRentalsCount}
      />

      {/* Main Content Viewport */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        {activeTab === 'dashboard' && (
          <Dashboard
            vehicles={vehicles}
            customers={customers}
            rentals={rentals}
            setActiveTab={setActiveTab}
            onOpenRentModal={handleOpenRentModal}
            onOpenReturnModal={handleOpenReturnModal}
            onOpenAddVehicle={() => setIsAddVehicleOpen(true)}
            onOpenAddCustomer={() => setIsAddCustomerOpen(true)}
            onViewInvoice={handleViewInvoice}
          />
        )}

        {activeTab === 'fleet' && (
          <FleetManagement
            vehicles={vehicles}
            onOpenAddVehicle={() => setIsAddVehicleOpen(true)}
            onOpenRentModal={handleOpenRentModal}
            onToggleStatus={handleToggleVehicleStatus}
          />
        )}

        {activeTab === 'customers' && (
          <CustomerManagement
            customers={customers}
            rentals={rentals}
            onOpenAddCustomer={() => setIsAddCustomerOpen(true)}
            onOpenRentModal={handleOpenRentModal}
            onViewInvoice={handleViewInvoice}
          />
        )}

        {activeTab === 'rentals' && (
          <RentalRecords
            rentals={rentals}
            onViewInvoice={handleViewInvoice}
            onOpenReturnModal={handleOpenReturnModal}
            onOpenRentModal={() => handleOpenRentModal()}
          />
        )}

        {activeTab === 'oop' && <OOPDemonstrator />}

        {activeTab === 'assignment' && <AssignmentDocs />}
      </main>

      {/* Modals */}
      <RentVehicleModal
        isOpen={isRentModalOpen}
        onClose={() => setIsRentModalOpen(false)}
        vehicles={vehicles}
        customers={customers}
        preSelectedVehicleId={rentVehicleId}
        preSelectedCustomerId={rentCustomerId}
        onConfirmRental={handleConfirmRental}
        onOpenAddCustomer={() => {
          setIsRentModalOpen(false);
          setIsAddCustomerOpen(true);
        }}
      />

      <ReturnVehicleModal
        isOpen={isReturnModalOpen}
        onClose={() => setIsReturnModalOpen(false)}
        activeRentals={rentals.filter((r) => r.status === 'Active')}
        preSelectedRentalId={returnRentalId}
        onConfirmReturn={handleConfirmReturn}
      />

      <AddVehicleModal
        isOpen={isAddVehicleOpen}
        onClose={() => setIsAddVehicleOpen(false)}
        onAddVehicle={handleAddVehicle}
      />

      <AddCustomerModal
        isOpen={isAddCustomerOpen}
        onClose={() => setIsAddCustomerOpen(false)}
        onAddCustomer={handleAddCustomer}
      />

      <InvoiceModal
        rental={selectedInvoice}
        isOpen={isInvoiceOpen}
        onClose={() => setIsInvoiceOpen(false)}
      />

      {/* Footer */}
      <footer className="mt-auto border-t border-slate-200 bg-white py-6 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <span className="font-bold text-slate-800">Vehicle Rental Management System</span> — Assignment 1 Implementation (Java OOP Architecture)
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => setActiveTab('assignment')}
              className="hover:text-indigo-600 transition-colors"
            >
              Assignment Specification
            </button>
            <button
              onClick={() => setActiveTab('oop')}
              className="hover:text-indigo-600 transition-colors font-medium text-amber-700"
            >
              OOP Code Viewer
            </button>
            <button
              onClick={handleResetData}
              className="flex items-center gap-1 text-slate-400 hover:text-rose-600 transition-colors"
              title="Reset fleet data to initial state"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset Demo Seeds</span>
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
