import React, { useState } from 'react';
import { X, Car, Bike, Truck, Plus, Check } from 'lucide-react';
import { Vehicle, VehicleType } from '../types/rental';

interface AddVehicleModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddVehicle: (vehicle: Vehicle) => void;
}

export const AddVehicleModal: React.FC<AddVehicleModalProps> = ({
  isOpen,
  onClose,
  onAddVehicle,
}) => {
  const [type, setType] = useState<VehicleType>('Car');
  const [vehicleNumber, setVehicleNumber] = useState('');
  const [brand, setBrand] = useState('');
  const [model, setModel] = useState('');
  const [rentPerDay, setRentPerDay] = useState(50);
  const [fuelType, setFuelType] = useState<'Petrol' | 'Diesel' | 'Electric' | 'Hybrid'>('Petrol');
  const [year, setYear] = useState(2024);
  const [imageUrl, setImageUrl] = useState('');

  // Car specifics
  const [seatingCapacity, setSeatingCapacity] = useState(5);
  const [transmission, setTransmission] = useState<'Automatic' | 'Manual'>('Automatic');
  const [airConditioned, setAirConditioned] = useState(true);

  // Bike specifics
  const [engineCC, setEngineCC] = useState(250);
  const [helmetProvided, setHelmetProvided] = useState(true);
  const [bikeCategory, setBikeCategory] = useState<'Cruiser' | 'Sport' | 'Scooter' | 'Commuter'>('Sport');

  // Van specifics
  const [cargoCapacityKg, setCargoCapacityKg] = useState(1200);
  const [passengerCapacity, setPassengerCapacity] = useState(8);
  const [vanType, setVanType] = useState<'Cargo' | 'Passenger'>('Cargo');

  if (!isOpen) return null;

  const defaultImages: Record<VehicleType, string> = {
    Car: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=800&q=80',
    Bike: 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&w=800&q=80',
    Van: 'https://images.unsplash.com/photo-1570125909232-eb263c188f7e?auto=format&fit=crop&w=800&q=80',
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const id = `veh-${type.toLowerCase()}-${Date.now().toString().slice(-4)}`;
    const finalImage = imageUrl.trim() || defaultImages[type];

    let newVehicle: Vehicle;

    if (type === 'Car') {
      newVehicle = {
        id,
        vehicleNumber: vehicleNumber.toUpperCase().trim(),
        type: 'Car',
        brand,
        model,
        rentPerDay: Number(rentPerDay),
        status: 'Available',
        year: Number(year),
        imageUrl: finalImage,
        fuelType,
        seatingCapacity: Number(seatingCapacity),
        transmission,
        airConditioned,
      };
    } else if (type === 'Bike') {
      newVehicle = {
        id,
        vehicleNumber: vehicleNumber.toUpperCase().trim(),
        type: 'Bike',
        brand,
        model,
        rentPerDay: Number(rentPerDay),
        status: 'Available',
        year: Number(year),
        imageUrl: finalImage,
        fuelType,
        engineCC: Number(engineCC),
        helmetProvided,
        bikeCategory,
      };
    } else {
      newVehicle = {
        id,
        vehicleNumber: vehicleNumber.toUpperCase().trim(),
        type: 'Van',
        brand,
        model,
        rentPerDay: Number(rentPerDay),
        status: 'Available',
        year: Number(year),
        imageUrl: finalImage,
        fuelType,
        cargoCapacityKg: Number(cargoCapacityKg),
        passengerCapacity: Number(passengerCapacity),
        vanType,
      };
    }

    onAddVehicle(newVehicle);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-lg w-full border border-slate-200 shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 p-5 text-white flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-500 text-slate-950 uppercase">
                Step 1
              </span>
              <h2 className="text-lg font-bold text-white">Add Vehicle to Fleet</h2>
            </div>
            <p className="text-xs text-slate-300 mt-0.5">
              Instantiate new vehicle object inheriting from base Vehicle class.
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[80vh] overflow-y-auto">
          {/* Subclass Selection */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              Inheritance Subclass (Vehicle Type)
            </label>
            <div className="grid grid-cols-3 gap-2">
              {(['Car', 'Bike', 'Van'] as VehicleType[]).map((t) => (
                <button
                  type="button"
                  key={t}
                  onClick={() => setType(t)}
                  className={`py-2 px-3 rounded-xl border flex flex-col items-center gap-1 font-semibold text-xs transition-all ${
                    type === t
                      ? 'bg-amber-50 border-amber-500 text-amber-900 ring-2 ring-amber-500/20'
                      : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  {t === 'Car' && <Car className="w-5 h-5 text-blue-600" />}
                  {t === 'Bike' && <Bike className="w-5 h-5 text-amber-600" />}
                  {t === 'Van' && <Truck className="w-5 h-5 text-purple-600" />}
                  <span>{t} Class</span>
                </button>
              ))}
            </div>
          </div>

          {/* Common Fields */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Brand / Make</label>
              <input
                type="text"
                required
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
                placeholder="e.g. Toyota, Honda, Ford"
                className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Model Name</label>
              <input
                type="text"
                required
                value={model}
                onChange={(e) => setModel(e.target.value)}
                placeholder="e.g. Camry, R15, Transit"
                className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Vehicle Registration Number
              </label>
              <input
                type="text"
                required
                value={vehicleNumber}
                onChange={(e) => setVehicleNumber(e.target.value)}
                placeholder="e.g. KA-01-AB-1234"
                className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 font-mono"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Rental Price Per Day ($)
              </label>
              <input
                type="number"
                required
                min="1"
                value={rentPerDay}
                onChange={(e) => setRentPerDay(Number(e.target.value))}
                className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 font-bold"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Fuel / Powertrain</label>
              <select
                value={fuelType}
                onChange={(e) => setFuelType(e.target.value as any)}
                className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300"
              >
                <option value="Petrol">Petrol</option>
                <option value="Diesel">Diesel</option>
                <option value="Electric">Electric</option>
                <option value="Hybrid">Hybrid</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Model Year</label>
              <input
                type="number"
                value={year}
                onChange={(e) => setYear(Number(e.target.value))}
                min="2015"
                max="2027"
                className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300"
              />
            </div>
          </div>

          {/* Subclass-specific polymorphism inputs */}
          <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
            <span className="text-[11px] font-bold text-indigo-700 uppercase tracking-wider block mb-2">
              {type} Subclass Specific Attributes
            </span>

            {type === 'Car' && (
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div>
                  <label className="block text-slate-600 mb-1">Seating Capacity</label>
                  <input
                    type="number"
                    value={seatingCapacity}
                    onChange={(e) => setSeatingCapacity(Number(e.target.value))}
                    min="2"
                    max="9"
                    className="w-full px-2.5 py-1.5 rounded-lg border border-slate-300 bg-white"
                  />
                </div>
                <div>
                  <label className="block text-slate-600 mb-1">Transmission</label>
                  <select
                    value={transmission}
                    onChange={(e) => setTransmission(e.target.value as any)}
                    className="w-full px-2.5 py-1.5 rounded-lg border border-slate-300 bg-white"
                  >
                    <option value="Automatic">Automatic</option>
                    <option value="Manual">Manual</option>
                  </select>
                </div>
                <div className="col-span-2 flex items-center gap-2 mt-1">
                  <input
                    type="checkbox"
                    id="ac-check"
                    checked={airConditioned}
                    onChange={(e) => setAirConditioned(e.target.checked)}
                    className="rounded text-indigo-600"
                  />
                  <label htmlFor="ac-check" className="text-slate-700 font-medium">Air Conditioned Cabin</label>
                </div>
              </div>
            )}

            {type === 'Bike' && (
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div>
                  <label className="block text-slate-600 mb-1">Engine Displacement (CC)</label>
                  <input
                    type="number"
                    value={engineCC}
                    onChange={(e) => setEngineCC(Number(e.target.value))}
                    min="0"
                    placeholder="e.g. 150 or 0 if EV"
                    className="w-full px-2.5 py-1.5 rounded-lg border border-slate-300 bg-white"
                  />
                </div>
                <div>
                  <label className="block text-slate-600 mb-1">Bike Category</label>
                  <select
                    value={bikeCategory}
                    onChange={(e) => setBikeCategory(e.target.value as any)}
                    className="w-full px-2.5 py-1.5 rounded-lg border border-slate-300 bg-white"
                  >
                    <option value="Cruiser">Cruiser</option>
                    <option value="Sport">Sport</option>
                    <option value="Scooter">Scooter</option>
                    <option value="Commuter">Commuter</option>
                  </select>
                </div>
                <div className="col-span-2 flex items-center gap-2 mt-1">
                  <input
                    type="checkbox"
                    id="helmet-check"
                    checked={helmetProvided}
                    onChange={(e) => setHelmetProvided(e.target.checked)}
                    className="rounded text-amber-600"
                  />
                  <label htmlFor="helmet-check" className="text-slate-700 font-medium">Complimentary Helmet Provided</label>
                </div>
              </div>
            )}

            {type === 'Van' && (
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div>
                  <label className="block text-slate-600 mb-1">Cargo Capacity (Kg)</label>
                  <input
                    type="number"
                    value={cargoCapacityKg}
                    onChange={(e) => setCargoCapacityKg(Number(e.target.value))}
                    min="100"
                    className="w-full px-2.5 py-1.5 rounded-lg border border-slate-300 bg-white"
                  />
                </div>
                <div>
                  <label className="block text-slate-600 mb-1">Van Purpose Type</label>
                  <select
                    value={vanType}
                    onChange={(e) => setVanType(e.target.value as any)}
                    className="w-full px-2.5 py-1.5 rounded-lg border border-slate-300 bg-white"
                  >
                    <option value="Cargo">Cargo / Freight</option>
                    <option value="Passenger">Passenger Transport</option>
                  </select>
                </div>
              </div>
            )}
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Vehicle Image URL (Optional)
            </label>
            <input
              type="url"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              placeholder="Leave empty for category default photo"
              className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300"
            />
          </div>

          {/* Submit */}
          <div className="pt-3 flex items-center justify-end gap-3 border-t border-slate-200">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm shadow-md transition-all active:scale-95 flex items-center gap-1.5"
            >
              <Plus className="w-4 h-4" />
              <span>Register Vehicle in System</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
