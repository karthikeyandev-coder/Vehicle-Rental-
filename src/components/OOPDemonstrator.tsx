import React, { useState } from 'react';
import { 
  Code2, 
  Layers, 
  ShieldCheck, 
  GitFork, 
  Sparkles, 
  Play, 
  Copy, 
  Check, 
  Terminal, 
  FileCode, 
  BookOpen,
  ArrowRight
} from 'lucide-react';
import { JAVA_OOP_SNIPPETS, OOPCar, OOPBike, OOPVan } from '../utils/oopEngine';

type OOPConcept = 'classAndObject' | 'encapsulation' | 'inheritance' | 'polymorphism' | 'abstraction';

export const OOPDemonstrator: React.FC = () => {
  const [activeConcept, setActiveConcept] = useState<OOPConcept>('inheritance');
  const [copied, setCopied] = useState(false);

  // Interactive Simulator States
  const [simType, setSimType] = useState<'Car' | 'Bike' | 'Van'>('Car');
  const [simDays, setSimDays] = useState<number>(3);
  const [simRate, setSimRate] = useState<number>(50);
  const [consoleLogs, setConsoleLogs] = useState<string[]>([
    '// AutoRent Java Runtime Environment ready.',
    '// Choose vehicle class and click "Execute Polymorphic Method" to test.'
  ]);

  const conceptMetadata: Record<OOPConcept, {
    title: string;
    number: number;
    icon: any;
    summary: string;
    javaSnippet: string;
    keyTakeaway: string;
  }> = {
    classAndObject: {
      title: 'Class and Object',
      number: 1,
      icon: Layers,
      summary: 'Blueprints created for Vehicle, Customer, Rental, and Payment entities, instantiated as stateful runtime objects.',
      javaSnippet: JAVA_OOP_SNIPPETS.classAndObject,
      keyTakeaway: 'Separates data schemas into modular real-world models. Every car or customer in the fleet is a distinct object in heap memory.'
    },
    encapsulation: {
      title: 'Encapsulation',
      number: 2,
      icon: ShieldCheck,
      summary: 'Vehicle and customer data are protected using private variables with access tightly controlled through validated getters & setters.',
      javaSnippet: JAVA_OOP_SNIPPETS.encapsulation,
      keyTakeaway: 'Prevents direct unauthorized modification of sensitive vehicle rates or driving licence strings from outside classes.'
    },
    inheritance: {
      title: 'Inheritance',
      number: 3,
      icon: GitFork,
      summary: 'Subclasses Car, Bike, and Van inherit common attributes (id, regNumber, rentPerDay, availability) from the base Vehicle superclass.',
      javaSnippet: JAVA_OOP_SNIPPETS.inheritance,
      keyTakeaway: 'Promotes code reusability (DRY) while allowing each category to specialize (e.g. Seating for Cars, CC for Bikes, Payload for Vans).'
    },
    polymorphism: {
      title: 'Polymorphism',
      number: 4,
      icon: Sparkles,
      summary: 'Different vehicle subclasses provide their own dynamic implementation of calculateRentalCharges() at runtime (method overriding).',
      javaSnippet: JAVA_OOP_SNIPPETS.polymorphism,
      keyTakeaway: 'The rental engine can invoke vehicle.calculateRentalCharges(days) on any Vehicle reference without needing explicit if/else type checks.'
    },
    abstraction: {
      title: 'Abstraction',
      number: 5,
      icon: Code2,
      summary: 'Essential vehicle operations are declared in abstract class Vehicle and interface IVehicleOperations without exposing internal complexity.',
      javaSnippet: JAVA_OOP_SNIPPETS.abstraction,
      keyTakeaway: 'Enforces a strict architectural contract for all future vehicle types (e.g. Electric Buses, Trucks) to implement standard operations.'
    }
  };

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const runSimulation = () => {
    let outputLog: string[] = [];
    const timestamp = new Date().toLocaleTimeString();

    outputLog.push(`[${timestamp}] >>> Instantiating object: new ${simType}(...)`);

    if (simType === 'Car') {
      const carObj = new OOPCar('V-SIM-01', 'KA-01-EXP-1122', 'Toyota', 'Camry', simRate, 5, true, true);
      outputLog.push(`[${timestamp}] Class: Car extends Vehicle`);
      outputLog.push(`[${timestamp}] State: model="${carObj.model}", dailyRate=$${carObj.rentPerDay}, seats=5, AC=true`);
      outputLog.push(`[${timestamp}] Invoking polymorphic method: carObj.calculateRentalCharges(${simDays})`);
      const res = carObj.calculateRentalCharges(simDays);
      res.breakdown.forEach(b => outputLog.push(`    → ${b}`));
      outputLog.push(`[${timestamp}] SUCCESS: Return Total Rent = $${res.total}`);
    } else if (simType === 'Bike') {
      const bikeObj = new OOPBike('V-SIM-02', 'KA-05-EXP-3344', 'Royal Enfield', 'Classic 350', simRate, 350, true, true);
      outputLog.push(`[${timestamp}] Class: Bike extends Vehicle`);
      outputLog.push(`[${timestamp}] State: model="${bikeObj.model}", dailyRate=$${bikeObj.rentPerDay}, engineCC=350cc, helmet=true`);
      outputLog.push(`[${timestamp}] Invoking polymorphic method: bikeObj.calculateRentalCharges(${simDays})`);
      const res = bikeObj.calculateRentalCharges(simDays);
      res.breakdown.forEach(b => outputLog.push(`    → ${b}`));
      outputLog.push(`[${timestamp}] SUCCESS: Return Total Rent = $${res.total}`);
    } else {
      const vanObj = new OOPVan('V-SIM-03', 'KA-02-EXP-9900', 'Ford', 'Transit', simRate, 1400, 9, true);
      outputLog.push(`[${timestamp}] Class: Van extends Vehicle`);
      outputLog.push(`[${timestamp}] State: model="${vanObj.model}", dailyRate=$${vanObj.rentPerDay}, cargo=1400kg`);
      outputLog.push(`[${timestamp}] Invoking polymorphic method: vanObj.calculateRentalCharges(${simDays})`);
      const res = vanObj.calculateRentalCharges(simDays);
      res.breakdown.forEach(b => outputLog.push(`    → ${b}`));
      outputLog.push(`[${timestamp}] SUCCESS: Return Total Rent = $${res.total}`);
    }

    setConsoleLogs(outputLog);
  };

  const current = conceptMetadata[activeConcept];

  return (
    <div className="space-y-8 pb-12">
      {/* Hero Header */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white p-6 sm:p-8 rounded-2xl border border-slate-800 shadow-xl">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold mb-3">
            <span>Assignment-1 Specification Section 7</span>
            <span>•</span>
            <span>Core Java OOP Pillars</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Java Object-Oriented Architecture Explorer
          </h1>
          <p className="text-slate-300 text-sm sm:text-base mt-2 leading-relaxed">
            Demonstrating how <span className="text-amber-300 font-semibold">Classes & Objects, Encapsulation, Inheritance, Polymorphism, and Abstraction</span> are engineered into the Vehicle Rental Management System.
          </p>
        </div>
      </div>

      {/* Visual OOP Class Hierarchy Tree Diagram */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
        <h2 className="text-base font-bold text-slate-900 mb-1">Architectural Class Diagram (UML Representation)</h2>
        <p className="text-xs text-slate-500 mb-6">
          Inheritance hierarchy described in Section 7 of the specification document:
        </p>

        <div className="bg-slate-900 text-white rounded-xl p-6 font-mono text-xs overflow-x-auto">
          <div className="flex flex-col items-center">
            {/* Interface / Abstract Vehicle */}
            <div className="border-2 border-indigo-400 bg-indigo-950/80 px-6 py-3 rounded-xl text-center shadow-lg w-64">
              <span className="text-[10px] text-amber-400 font-bold block uppercase tracking-wider">&lt;&lt;Abstract Superclass&gt;&gt;</span>
              <span className="text-sm font-bold text-white">Vehicle</span>
              <div className="text-[11px] text-slate-300 text-left mt-2 pt-2 border-t border-indigo-800 space-y-0.5">
                <div>- vehicleId: String</div>
                <div>- vehicleNumber: String</div>
                <div>- rentPerDay: double</div>
                <div>- isAvailable: boolean</div>
                <div className="text-amber-300 font-semibold pt-1">+ abstract calculateRentalCharges(days)</div>
              </div>
            </div>

            {/* Tree Branch Line */}
            <div className="w-0.5 h-6 bg-indigo-400 my-1"></div>
            <div className="w-96 h-0.5 bg-indigo-400 hidden sm:block"></div>

            {/* Subclasses */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-1 w-full max-w-2xl">
              {/* Car */}
              <div className="border border-blue-400/60 bg-blue-950/40 p-3 rounded-xl text-center">
                <span className="text-[10px] text-blue-300 uppercase block font-semibold">extends Vehicle</span>
                <span className="font-bold text-white text-sm">Car</span>
                <div className="text-[10px] text-slate-400 text-left mt-2 pt-1 border-t border-blue-900 space-y-0.5">
                  <div>- seatingCapacity: int</div>
                  <div>- airConditioned: boolean</div>
                  <div className="text-blue-300">+ calculateRentalCharges()</div>
                </div>
              </div>

              {/* Bike */}
              <div className="border border-amber-400/60 bg-amber-950/40 p-3 rounded-xl text-center">
                <span className="text-[10px] text-amber-300 uppercase block font-semibold">extends Vehicle</span>
                <span className="font-bold text-white text-sm">Bike</span>
                <div className="text-[10px] text-slate-400 text-left mt-2 pt-1 border-t border-amber-900 space-y-0.5">
                  <div>- engineCC: int</div>
                  <div>- helmetProvided: boolean</div>
                  <div className="text-amber-300">+ calculateRentalCharges()</div>
                </div>
              </div>

              {/* Van */}
              <div className="border border-purple-400/60 bg-purple-950/40 p-3 rounded-xl text-center">
                <span className="text-[10px] text-purple-300 uppercase block font-semibold">extends Vehicle</span>
                <span className="font-bold text-white text-sm">Van</span>
                <div className="text-[10px] text-slate-400 text-left mt-2 pt-1 border-t border-purple-900 space-y-0.5">
                  <div>- cargoCapacityKg: int</div>
                  <div>- vanType: String</div>
                  <div className="text-purple-300">+ calculateRentalCharges()</div>
                </div>
              </div>
            </div>

            {/* Associate Classes: Customer & Rental */}
            <div className="mt-6 pt-4 border-t border-slate-800 grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-xl text-left">
              <div className="bg-slate-800/80 p-3 rounded-xl border border-slate-700">
                <span className="text-[10px] text-emerald-400 font-bold block uppercase">&lt;&lt;Encapsulated Class&gt;&gt;</span>
                <span className="font-bold text-white text-xs">Customer</span>
                <p className="text-[10px] text-slate-400 mt-1">
                  Private fields: name, contact, drivingLicence. Protected via getters.
                </p>
              </div>

              <div className="bg-slate-800/80 p-3 rounded-xl border border-slate-700">
                <span className="text-[10px] text-amber-400 font-bold block uppercase">&lt;&lt;Association Controller&gt;&gt;</span>
                <span className="font-bold text-white text-xs">Rental & Payment</span>
                <p className="text-[10px] text-slate-400 mt-1">
                  Binds Customer and Vehicle objects with duration and calculated charges.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 5 OOP Concepts Tabs & Java Code Inspector */}
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
        <div className="p-6 border-b border-slate-200">
          <h2 className="text-base font-bold text-slate-900">The 5 OOP Principles in Code</h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Select any concept to view its architectural rationale and production Java implementation.
          </p>

          {/* Concept Tabs */}
          <div className="flex space-x-2 overflow-x-auto mt-4 pb-1">
            {(Object.keys(conceptMetadata) as OOPConcept[]).map((key) => {
              const item = conceptMetadata[key];
              const Icon = item.icon;
              const isActive = activeConcept === key;

              return (
                <button
                  key={key}
                  onClick={() => setActiveConcept(key)}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                    isActive
                      ? 'bg-slate-900 text-white shadow-sm'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  <span className={`w-4 h-4 rounded-full text-[10px] font-bold flex items-center justify-center ${
                    isActive ? 'bg-amber-400 text-slate-950' : 'bg-slate-300 text-slate-700'
                  }`}>
                    {item.number}
                  </span>
                  <span>{item.title}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Concept Detail Body */}
        <div className="p-6 grid grid-cols-1 lg:grid-cols-12 gap-6 bg-slate-50/50">
          {/* Explanation Column */}
          <div className="lg:col-span-5 space-y-4">
            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
              <div className="flex items-center gap-2 mb-2">
                <span className="w-6 h-6 rounded-full bg-amber-500/10 text-amber-600 font-bold text-xs flex items-center justify-center border border-amber-500/20">
                  {current.number}
                </span>
                <h3 className="font-bold text-slate-900 text-base">{current.title}</h3>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                {current.summary}
              </p>

              <div className="mt-4 p-3 bg-amber-50/60 rounded-lg border border-amber-200/60 text-xs text-amber-900">
                <strong className="block text-[11px] uppercase tracking-wider text-amber-800 mb-1">
                  Why it matters in this project:
                </strong>
                {current.keyTakeaway}
              </div>
            </div>

            {/* Quick OOP Quiz / Info card */}
            <div className="bg-indigo-900 text-white p-4 rounded-xl text-xs space-y-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-300 block">
                Assignment Specification Requirement
              </span>
              <p className="text-slate-200">
                "The project demonstrates important OOP concepts such as classes, objects, encapsulation, inheritance, polymorphism, and abstraction." (Conclusion Page 7)
              </p>
            </div>
          </div>

          {/* Java Source Code View */}
          <div className="lg:col-span-7 bg-slate-900 rounded-xl overflow-hidden shadow-lg border border-slate-800 flex flex-col">
            <div className="bg-slate-950 px-4 py-2.5 border-b border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs text-slate-400 font-mono">
                <FileCode className="w-4 h-4 text-amber-400" />
                <span>{current.title.replace(/\s+/g, '')}.java</span>
              </div>
              <button
                onClick={() => handleCopyCode(current.javaSnippet)}
                className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-mono transition-colors"
                title="Copy Java code to clipboard"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied!' : 'Copy Code'}</span>
              </button>
            </div>
            <div className="p-4 overflow-x-auto text-xs font-mono text-slate-200 leading-relaxed max-h-96">
              <pre className="text-emerald-400 whitespace-pre-wrap">{current.javaSnippet}</pre>
            </div>
          </div>
        </div>
      </div>

      {/* Live Interactive Polymorphism Sandbox */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
        <div className="flex items-center gap-2 mb-1">
          <Terminal className="w-5 h-5 text-indigo-600" />
          <h2 className="text-base font-bold text-slate-900">
            Interactive Polymorphism & Rental Calculation Simulator
          </h2>
        </div>
        <p className="text-xs text-slate-500 mb-6">
          Execute runtime method dispatch for <code className="font-mono bg-slate-100 px-1 py-0.5 rounded text-indigo-700">calculateRentalCharges(days)</code> and observe the simulated JVM console trace.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Controls */}
          <div className="lg:col-span-5 space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1 uppercase tracking-wider">
                1. Select Vehicle Subclass
              </label>
              <div className="grid grid-cols-3 gap-2">
                {(['Car', 'Bike', 'Van'] as const).map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setSimType(t)}
                    className={`py-2 px-3 text-xs font-bold rounded-xl border transition-all ${
                      simType === t
                        ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm'
                        : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    {t} Subclass
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Rental Days
                </label>
                <input
                  type="number"
                  min="1"
                  max="30"
                  value={simDays}
                  onChange={(e) => setSimDays(Math.max(1, Number(e.target.value)))}
                  className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Base Daily Rate ($)
                </label>
                <input
                  type="number"
                  min="10"
                  max="500"
                  value={simRate}
                  onChange={(e) => setSimRate(Math.max(10, Number(e.target.value)))}
                  className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300"
                />
              </div>
            </div>

            <button
              onClick={runSimulation}
              className="w-full py-2.5 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs sm:text-sm shadow-md transition-all active:scale-95 flex items-center justify-center gap-2"
            >
              <Play className="w-4 h-4 fill-white" />
              <span>Execute Polymorphic Method</span>
            </button>
          </div>

          {/* Console Output Screen */}
          <div className="lg:col-span-7 bg-slate-950 rounded-xl border border-slate-800 p-4 font-mono text-xs text-emerald-400 flex flex-col justify-between shadow-inner min-h-[220px]">
            <div>
              <div className="flex items-center justify-between pb-2 border-b border-slate-800 text-[11px] text-slate-400 mb-3">
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
                  <span>JVM Console Output Stream</span>
                </span>
                <span className="text-slate-500">Method Dispatch Monitor</span>
              </div>
              <div className="space-y-1.5 max-h-52 overflow-y-auto">
                {consoleLogs.map((log, index) => (
                  <div key={index} className="leading-relaxed">
                    {log}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
