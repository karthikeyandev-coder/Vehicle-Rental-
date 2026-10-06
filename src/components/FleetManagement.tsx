import React, { useState } from 'react';
import { 
  Car, 
  Bike, 
  Truck, 
  Search, 
  Plus, 
  Filter, 
  CheckCircle, 
  Clock, 
  Wrench, 
  Fuel, 
  Users, 
  ShieldAlert, 
  Sparkles,
  Key
} from 'lucide-react';
import { Vehicle, VehicleType, VehicleStatus } from '../types/rental';

interface FleetManagementProps {
  vehicles: Vehicle[];
  onOpenAddVehicle: () => void;
  onOpenRentModal: (vehicleId: string) => void;
  onToggleStatus: (vehicleId: string, newStatus: VehicleStatus) => void;
}

export const FleetManagement: React.FC<FleetManagementProps> = ({
  vehicles,
  onOpenAddVehicle,
  onOpenRentModal,
  onToggleStatus
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState<VehicleType | 'All'>('All');
  const [selectedStatus, setSelectedStatus] = useState<VehicleStatus | 'All'>('All');

  const filteredVehicles = vehicles.filter((v) => {
    const matchesSearch = 
      v.model.toLowerCase().includes(searchQuery.toLowerCase()) ||
      v.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
      v.vehicleNumber.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesType = selectedType === 'All' || v.type === selectedType;
    const matchesStatus = selectedStatus === 'All' || v.status === selectedStatus;

    return matchesSearch && matchesType && matchesStatus;
  });

  const getVehicleBadgeColor = (type: VehicleType) => {
    switch (type) {
      case 'Car':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Bike':
        return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'Van':
        return 'bg-purple-100 text-purple-800 border-purple-200';
    }
  };

  const getStatusBadge = (status: VehicleStatus) => {
    switch (status) {
      case 'Available':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 border border-emerald-200">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
            Available
          </span>
        );
      case 'Rented':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-100 text-amber-800 border border-amber-200">
            <Clock className="w-3 h-3" />
            Currently Rented
          </span>
        );
      case 'Maintenance':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-rose-100 text-rose-800 border border-rose-200">
            <Wrench className="w-3 h-3" />
            Maintenance
          </span>
        );
    }
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900">Vehicle Fleet Management</h1>
            <span className="text-xs bg-slate-100 px-2.5 py-0.5 rounded-full font-semibold text-slate-600">
              {vehicles.length} Total Registered
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Store, inspect, and update vehicle specifications for Car, Bike, and Van classes (Scope Section 4).
          </p>
        </div>

        <button
          onClick={onOpenAddVehicle}
          className="flex items-center justify-center gap-2 px-4 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-semibold text-sm shadow-sm active:scale-95 transition-all self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Vehicle</span>
        </button>
      </div>

      {/* Filters and Search Bar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by model, brand, or plate (e.g., Camry, Yamaha, KA-01)..."
            className="w-full pl-9 pr-4 py-2 text-sm rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500"
          />
        </div>

        {/* Filter by Type */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0">
          {(['All', 'Car', 'Bike', 'Van'] as const).map((type) => (
            <button
              key={type}
              onClick={() => setSelectedType(type)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
                selectedType === type
                  ? 'bg-slate-900 text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {type === 'All' ? 'All Classes' : `${type}s`}
            </button>
          ))}
        </div>

        {/* Filter by Status */}
        <div className="flex items-center gap-1.5">
          {(['All', 'Available', 'Rented', 'Maintenance'] as const).map((status) => (
            <button
              key={status}
              onClick={() => setSelectedStatus(status)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
                selectedStatus === status
                  ? 'bg-amber-500 text-slate-950'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      {/* Vehicles Grid */}
      {filteredVehicles.length === 0 ? (
        <div className="bg-white rounded-2xl border border-dashed border-slate-300 p-12 text-center">
          <Car className="w-12 h-12 text-slate-300 mx-auto mb-3" />
          <h3 className="font-bold text-slate-700 text-base">No vehicles matched your search filter</h3>
          <p className="text-xs text-slate-500 mt-1">Try resetting the filters or add a new vehicle to the fleet.</p>
          <button
            onClick={() => { setSearchQuery(''); setSelectedType('All'); setSelectedStatus('All'); }}
            className="mt-4 px-4 py-2 bg-slate-900 text-white rounded-lg text-xs font-semibold"
          >
            Clear Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredVehicles.map((vehicle) => {
            const isAvailable = vehicle.status === 'Available';

            return (
              <div
                key={vehicle.id}
                className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col group"
              >
                {/* Vehicle Image & Badges */}
                <div className="relative h-48 bg-slate-100 overflow-hidden">
                  <img
                    src={vehicle.imageUrl}
                    alt={`${vehicle.brand} ${vehicle.model}`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                  <div className="absolute top-3 left-3 flex items-center gap-1.5">
                    <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold border ${getVehicleBadgeColor(vehicle.type)}`}>
                      {vehicle.type}
                    </span>
                    <span className="px-2 py-0.5 rounded-full text-[11px] font-semibold bg-black/60 text-white backdrop-blur-sm">
                      {vehicle.year}
                    </span>
                  </div>
                  <div className="absolute top-3 right-3">
                    {getStatusBadge(vehicle.status)}
                  </div>
                </div>

                {/* Vehicle Details */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                          {vehicle.brand}
                        </span>
                        <h3 className="text-base font-bold text-slate-900 leading-tight">
                          {vehicle.model}
                        </h3>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-extrabold text-slate-900">
                          ${vehicle.rentPerDay}
                        </div>
                        <div className="text-[10px] text-slate-500 uppercase tracking-wider">per day</div>
                      </div>
                    </div>

                    <div className="mt-3 flex items-center justify-between py-1.5 px-3 bg-slate-50 rounded-lg text-xs text-slate-600">
                      <span className="text-slate-500">Plate Number:</span>
                      <span className="font-mono font-bold text-slate-900">{vehicle.vehicleNumber}</span>
                    </div>

                    {/* Subclass-specific specs (OOP Polymorphic properties) */}
                    <div className="mt-3 grid grid-cols-2 gap-2 text-xs text-slate-600">
                      <div className="flex items-center gap-1.5 text-slate-600">
                        <Fuel className="w-3.5 h-3.5 text-slate-400" />
                        <span>{vehicle.fuelType}</span>
                      </div>

                      {vehicle.type === 'Car' && (
                        <>
                          <div className="flex items-center gap-1.5 text-slate-600">
                            <Users className="w-3.5 h-3.5 text-slate-400" />
                            <span>{vehicle.seatingCapacity} Seater</span>
                          </div>
                          <div className="text-[11px] text-slate-500 col-span-2">
                            {vehicle.transmission} • {vehicle.airConditioned ? 'Air Conditioned' : 'Non-A/C'}
                          </div>
                        </>
                      )}

                      {vehicle.type === 'Bike' && (
                        <>
                          <div className="flex items-center gap-1.5 text-slate-600">
                            <Sparkles className="w-3.5 h-3.5 text-slate-400" />
                            <span>{vehicle.engineCC > 0 ? `${vehicle.engineCC} cc` : 'Electric Motor'}</span>
                          </div>
                          <div className="text-[11px] text-slate-500 col-span-2">
                            {vehicle.bikeCategory} • {vehicle.helmetProvided ? 'Helmet Included' : 'No Helmet'}
                          </div>
                        </>
                      )}

                      {vehicle.type === 'Van' && (
                        <>
                          <div className="flex items-center gap-1.5 text-slate-600">
                            <Truck className="w-3.5 h-3.5 text-slate-400" />
                            <span>Payload: {vehicle.cargoCapacityKg} kg</span>
                          </div>
                          <div className="text-[11px] text-slate-500 col-span-2">
                            {vehicle.vanType} • {vehicle.passengerCapacity} Max Capacity
                          </div>
                        </>
                      )}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between gap-2">
                    {/* Maintenance toggle */}
                    <div className="flex items-center gap-1">
                      {vehicle.status === 'Maintenance' ? (
                        <button
                          onClick={() => onToggleStatus(vehicle.id, 'Available')}
                          className="px-2 py-1 text-[11px] font-medium text-emerald-700 bg-emerald-50 hover:bg-emerald-100 rounded border border-emerald-200 transition-colors"
                          title="Restore to Available"
                        >
                          Mark Ready
                        </button>
                      ) : (
                        <button
                          onClick={() => onToggleStatus(vehicle.id, 'Maintenance')}
                          disabled={vehicle.status === 'Rented'}
                          className="px-2 py-1 text-[11px] font-medium text-slate-500 hover:text-rose-700 hover:bg-rose-50 rounded border border-transparent hover:border-rose-200 transition-colors disabled:opacity-30 disabled:pointer-events-none"
                          title="Set under Maintenance"
                        >
                          Maintenance
                        </button>
                      )}
                    </div>

                    {/* Rent action */}
                    <button
                      onClick={() => onOpenRentModal(vehicle.id)}
                      disabled={!isAvailable}
                      className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-lg shadow-sm transition-all ${
                        isAvailable
                          ? 'bg-amber-500 hover:bg-amber-400 text-slate-950 active:scale-95'
                          : 'bg-slate-100 text-slate-400 cursor-not-allowed border border-slate-200'
                      }`}
                    >
                      <Key className="w-3.5 h-3.5" />
                      <span>{isAvailable ? 'Rent Vehicle' : 'Not Available'}</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
