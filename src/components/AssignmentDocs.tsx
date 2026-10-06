import React from 'react';
import { 
  BookOpen, 
  Printer, 
  CheckCircle, 
  Layers, 
  Cpu, 
  HelpCircle, 
  ArrowRight,
  BookmarkCheck,
  FileText
} from 'lucide-react';

export const AssignmentDocs: React.FC = () => {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-8 pb-16">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white p-6 sm:p-8 rounded-2xl border border-slate-800 shadow-xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
            Official Course Submission
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold mt-2">
            ASSIGNMENT - 1: VEHICLE RENTAL SYSTEM
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 mt-1">
            Complete Project Specification & Architectural Documentation (Sections 1 – 10)
          </p>
        </div>

        <button
          onClick={handlePrint}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs sm:text-sm shadow-md transition-all active:scale-95 shrink-0"
        >
          <Printer className="w-4 h-4" />
          <span>Print / Export PDF</span>
        </button>
      </div>

      {/* Structured Document Body */}
      <div className="bg-white rounded-2xl border border-slate-200 p-8 sm:p-12 shadow-sm space-y-10 max-w-4xl mx-auto text-slate-800">
        
        {/* Title & Assignment Header */}
        <div className="text-center border-b border-slate-200 pb-8">
          <span className="text-xs font-bold tracking-widest uppercase text-slate-400">
            Academic Report
          </span>
          <h2 className="text-3xl font-black text-slate-900 mt-1 tracking-tight">
            ASSIGNMENT - 1
          </h2>
          <h3 className="text-xl font-bold text-indigo-700 mt-1">
            VEHICLE RENTAL SYSTEM
          </h3>
          <p className="text-xs text-slate-500 mt-2">
            Course Module: Object-Oriented Programming (Java)
          </p>
        </div>

        {/* 1. Project Title */}
        <section className="space-y-2">
          <h4 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <span className="text-amber-600">1.</span> PROJECT TITLE
          </h4>
          <p className="text-sm font-semibold text-slate-800 pl-4 border-l-2 border-amber-500">
            Vehicle Rental Management System
          </p>
        </section>

        {/* 2. Introduction & Problem Statement */}
        <section className="space-y-4">
          <h4 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <span className="text-amber-600">2.</span> INTRODUCTION &amp; PROBLEM STATEMENT
          </h4>
          <div className="text-sm text-slate-600 leading-relaxed space-y-3 pl-4">
            <p>
              The <strong>Vehicle Rental Management System</strong> is a software application designed to manage the process of renting vehicles such as cars, bikes, vans, and other vehicles. The system helps maintain vehicle details, customer information, rental duration, availability, and rental charges.
            </p>
            <p>
              In a traditional rental system, vehicle details and customer records may be maintained manually in notebooks or spreadsheets. Checking vehicle availability, calculating rental charges, and maintaining previous rental records can take more time and may lead to errors.
            </p>
            <p className="bg-indigo-50 p-3 rounded-lg border border-indigo-100 text-indigo-900 font-medium">
              This project uses <strong>Object-Oriented Programming (OOP)</strong> concepts in Java to make the rental process simple, organized, and efficient.
            </p>

            <div className="pt-2">
              <strong className="text-slate-900 block mb-2">Problem Statement:</strong>
              <p className="mb-2">
                The main problem is the difficulty of managing vehicles and rental information manually. The system should provide a simple method to:
              </p>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 list-disc list-inside text-xs text-slate-700 bg-slate-50 p-4 rounded-xl border border-slate-200">
                <li>Store vehicle details.</li>
                <li>Store customer details.</li>
                <li>Check vehicle availability.</li>
                <li>Rent a vehicle.</li>
                <li>Return a vehicle.</li>
                <li>Calculate rental charges.</li>
                <li>Maintain rental records.</li>
              </ul>
            </div>
          </div>
        </section>

        {/* 3. Need and Objectives */}
        <section className="space-y-4">
          <h4 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <span className="text-amber-600">3.</span> NEED AND OBJECTIVES
          </h4>
          <div className="text-sm text-slate-600 leading-relaxed space-y-3 pl-4">
            <div>
              <strong className="text-slate-900 block mb-1">Need of the Project:</strong>
              <p className="mb-2">
                A Vehicle Rental System is needed to reduce manual work and make vehicle rental operations easier. The system helps:
              </p>
              <ul className="list-disc list-inside text-xs text-slate-700 space-y-1">
                <li>Reduce paperwork.</li>
                <li>Avoid duplicate records.</li>
                <li>Quickly check vehicle availability.</li>
                <li>Calculate rental charges automatically.</li>
                <li>Maintain customer and vehicle information.</li>
                <li>Improve the overall rental process.</li>
              </ul>
            </div>

            <div className="pt-2">
              <strong className="text-slate-900 block mb-1">Objectives:</strong>
              <p className="mb-2">The main objectives are:</p>
              <ol className="list-decimal list-inside text-xs text-slate-700 space-y-1 bg-slate-50 p-4 rounded-xl border border-slate-200">
                <li>To maintain vehicle information.</li>
                <li>To maintain customer information.</li>
                <li>To check available vehicles.</li>
                <li>To allow customers to rent vehicles.</li>
                <li>To record vehicle return details.</li>
                <li>To calculate rental charges based on rental duration.</li>
                <li>To demonstrate OOP concepts using Java.</li>
                <li>To provide an easy-to-use rental management system.</li>
              </ol>
            </div>
          </div>
        </section>

        {/* 4. Scope of the Project */}
        <section className="space-y-4">
          <h4 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <span className="text-amber-600">4.</span> SCOPE OF THE PROJECT
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pl-4 text-xs">
            <div className="p-4 rounded-xl border border-slate-200 bg-slate-50">
              <strong className="text-sm text-slate-900 block mb-2">Vehicle Management</strong>
              <p className="text-slate-500 mb-2">The system can store:</p>
              <ul className="list-disc list-inside space-y-1 text-slate-700">
                <li>Vehicle ID</li>
                <li>Vehicle number</li>
                <li>Vehicle type (Car, Bike, Van)</li>
                <li>Brand</li>
                <li>Model</li>
                <li>Rental price per day</li>
                <li>Availability status</li>
              </ul>
            </div>

            <div className="p-4 rounded-xl border border-slate-200 bg-slate-50">
              <strong className="text-sm text-slate-900 block mb-2">Customer Management</strong>
              <p className="text-slate-500 mb-2">The system can store:</p>
              <ul className="list-disc list-inside space-y-1 text-slate-700">
                <li>Customer ID</li>
                <li>Customer name</li>
                <li>Contact number</li>
                <li>Address</li>
                <li>Driving licence details</li>
              </ul>
            </div>

            <div className="p-4 rounded-xl border border-slate-200 bg-slate-50">
              <strong className="text-sm text-slate-900 block mb-2">Rental Management</strong>
              <p className="text-slate-500 mb-2">The system can manage:</p>
              <ul className="list-disc list-inside space-y-1 text-slate-700">
                <li>Vehicle selection</li>
                <li>Rental date</li>
                <li>Return date</li>
                <li>Number of rental days</li>
                <li>Rental charges</li>
                <li>Vehicle return status</li>
              </ul>
            </div>
          </div>

          <div className="pl-4">
            <strong className="text-xs text-indigo-700 font-bold uppercase tracking-wider block mb-1">
              Future Scope Extensions (Included in this Web App):
            </strong>
            <p className="text-xs text-slate-600">
              Online vehicle booking, Online payment simulation, Database connectivity / LocalStorage sync, Login system, SMS/email simulation, GPS vehicle tracking view, and Mobile application support.
            </p>
          </div>
        </section>

        {/* 5. Literature Review / Existing System */}
        <section className="space-y-4">
          <h4 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <span className="text-amber-600">5.</span> LITERATURE REVIEW / EXISTING SYSTEM
          </h4>
          <div className="text-sm text-slate-600 leading-relaxed pl-4 space-y-3">
            <p>
              In many small vehicle rental businesses, vehicle and customer information is maintained manually or using simple spreadsheets. The existing system generally involves:
            </p>
            <ol className="list-decimal list-inside text-xs text-slate-700 space-y-1">
              <li>Customer visits the rental office.</li>
              <li>Staff checks available vehicles.</li>
              <li>Customer selects a vehicle.</li>
              <li>Staff records customer details.</li>
              <li>Rental amount is calculated manually.</li>
              <li>Vehicle is given to the customer.</li>
              <li>Return information is recorded later.</li>
            </ol>

            <div className="pt-2">
              <strong className="text-slate-900 block mb-1">Problems in Existing System:</strong>
              <div className="grid grid-cols-2 gap-2 text-xs text-rose-800 bg-rose-50 p-4 rounded-xl border border-rose-200">
                <div>• More paperwork</div>
                <div>• Time-consuming</div>
                <div>• Manual calculation errors</div>
                <div>• Difficult to search old records</div>
                <div>• Difficult to track vehicle availability</div>
                <div>• Duplicate records may occur</div>
                <div>• Updating information is difficult</div>
              </div>
            </div>
          </div>
        </section>

        {/* 6. Project Gap */}
        <section className="space-y-4">
          <h4 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <span className="text-amber-600">6.</span> PROJECT GAP
          </h4>
          <div className="text-sm text-slate-600 leading-relaxed pl-4 space-y-2">
            <p>
              The existing manual system does not provide an efficient and automated method for managing vehicle rentals. The major gaps are:
            </p>
            <ul className="list-disc list-inside text-xs text-slate-700 space-y-1">
              <li>No automatic rental calculation.</li>
              <li>Difficult vehicle availability tracking.</li>
              <li>Manual customer record management.</li>
              <li>No proper rental history.</li>
              <li>Higher possibility of human errors.</li>
              <li>Difficult management of different vehicle types.</li>
            </ul>
            <p className="font-semibold text-slate-800 pt-1">
              The proposed system addresses these gaps by providing a simple computerized system based on Object-Oriented Programming.
            </p>
          </div>
        </section>

        {/* 7. Proposed Solution & Methodology */}
        <section className="space-y-4">
          <h4 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <span className="text-amber-600">7.</span> PROPOSED SOLUTION &amp; METHODOLOGY
          </h4>
          <div className="text-sm text-slate-600 leading-relaxed pl-4 space-y-3">
            <p>
              The proposed Vehicle Rental Management System is developed using <strong>Java and OOP concepts</strong> with different classes for different entities:
            </p>

            <div className="p-4 bg-slate-900 text-white rounded-xl font-mono text-xs">
              <div className="font-bold text-amber-400 mb-1">Main Classes Hierarchy:</div>
              <div>Vehicle (Superclass)</div>
              <div>├── Car (Subclass)</div>
              <div>├── Bike (Subclass)</div>
              <div>└── Van (Subclass)</div>
              <div className="mt-2 text-indigo-300">Customer</div>
              <div className="text-indigo-300">Rental</div>
              <div className="text-indigo-300">Payment</div>
            </div>

            <div className="pt-2">
              <strong className="text-slate-900 block mb-2">5 OOP Concepts Used:</strong>
              <div className="space-y-2 text-xs">
                <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                  <strong>1. Class and Object:</strong> Classes are created for vehicles, customers, and rentals.
                </div>
                <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                  <strong>2. Encapsulation:</strong> Vehicle and customer data can be protected using private variables and accessed through methods.
                </div>
                <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                  <strong>3. Inheritance:</strong> Different vehicle types can inherit common properties from the Vehicle class (Vehicle → Car, Bike, Van).
                </div>
                <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                  <strong>4. Polymorphism:</strong> Different vehicle types can have different rental calculations.
                </div>
                <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                  <strong>5. Abstraction:</strong> Common vehicle operations can be defined using abstract classes or interfaces.
                </div>
              </div>
            </div>

            <div className="pt-2">
              <strong className="text-slate-900 block mb-2">Working Methodology (Steps 1 – 7):</strong>
              <ol className="list-decimal list-inside text-xs text-slate-700 space-y-1.5 bg-slate-50 p-4 rounded-xl border border-slate-200">
                <li><strong>Step 1 – Add Vehicle:</strong> The administrator enters vehicle details.</li>
                <li><strong>Step 2 – Add Customer:</strong> Customer information is entered into the system.</li>
                <li><strong>Step 3 – Check Availability:</strong> The system checks whether the selected vehicle is available.</li>
                <li><strong>Step 4 – Rent Vehicle:</strong> If the vehicle is available, the system records the rental details.</li>
                <li><strong>Step 5 – Calculate Rent:</strong> The rental amount is calculated using: <code className="font-mono font-bold bg-white px-2 py-0.5 rounded border border-slate-300">Total Rent = Rental Days × Rent Per Day</code></li>
                <li><strong>Step 6 – Return Vehicle:</strong> When the customer returns the vehicle, the system updates the vehicle status to Available.</li>
                <li><strong>Step 7 – Display Rental Record:</strong> The system displays customer, vehicle, rental duration, and total rental amount.</li>
              </ol>
            </div>
          </div>
        </section>

        {/* 8. Technologies / Tools Required */}
        <section className="space-y-4">
          <h4 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <span className="text-amber-600">8.</span> TECHNOLOGIES / TOOLS REQUIRED
          </h4>
          <div className="pl-4">
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left border border-slate-200 rounded-lg">
                <thead className="bg-slate-100 font-bold uppercase text-[10px] text-slate-600">
                  <tr>
                    <th className="p-2.5">Technology / Tool</th>
                    <th className="p-2.5">Purpose</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  <tr>
                    <td className="p-2.5 font-bold">Java</td>
                    <td className="p-2.5">Programming language</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-bold">JDK</td>
                    <td className="p-2.5">Java development environment</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-bold">VS Code / Eclipse</td>
                    <td className="p-2.5">Code development</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-bold">OOP</td>
                    <td className="p-2.5">Program design</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-bold">Git / GitHub</td>
                    <td className="p-2.5">Version control</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-bold">MySQL (optional)</td>
                    <td className="p-2.5">Database storage</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="mt-3 text-xs text-slate-600">
              <strong>Hardware Requirements:</strong> Computer/Laptop • Minimum 4 GB RAM • Keyboard & mouse • Storage space for project files.
            </div>
          </div>
        </section>

        {/* 9. Expected Outcome */}
        <section className="space-y-3">
          <h4 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <span className="text-amber-600">9.</span> EXPECTED OUTCOME
          </h4>
          <div className="pl-4 text-xs text-slate-700 space-y-1.5">
            <p className="text-sm text-slate-600 mb-2">
              The expected outcome of this project is a simple and efficient Vehicle Rental Management System. The system is able to:
            </p>
            <ul className="list-disc list-inside space-y-1">
              <li>Add and manage vehicles.</li>
              <li>Add and manage customers.</li>
              <li>Display available vehicles.</li>
              <li>Rent vehicles.</li>
              <li>Return vehicles.</li>
              <li>Calculate rental charges.</li>
              <li>Maintain rental records.</li>
              <li>Reduce manual work and errors.</li>
            </ul>
            <p className="font-semibold text-slate-900 pt-2">
              The project also demonstrates the practical use of important Java OOP concepts.
            </p>
          </div>
        </section>

        {/* 10. References & Conclusion */}
        <section className="space-y-4 border-t border-slate-200 pt-6">
          <h4 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <span className="text-amber-600">10.</span> REFERENCES
          </h4>
          <div className="pl-4 text-xs text-slate-600 space-y-1">
            <p>1. Oracle Java Documentation</p>
            <p>2. Herbert Schildt, <em>Java: The Complete Reference</em></p>
            <p>3. E. Balagurusamy, <em>Programming with Java</em></p>
            <p>4. Java Tutorials – The expected and efficient Vehicle Rental Management System</p>
            <p>5. Object-Oriented Programming concepts and Java study materials</p>
          </div>

          <div className="bg-slate-900 text-white p-6 rounded-2xl mt-6 space-y-2">
            <h5 className="font-bold text-amber-400 text-sm uppercase tracking-wider">
              CONCLUSION
            </h5>
            <p className="text-xs text-slate-300 leading-relaxed">
              The Vehicle Rental Management System is a useful application for managing vehicle rental activities in an organized manner. It reduces manual work and makes it easier to manage vehicle and customer information.
            </p>
            <p className="text-xs text-slate-300 leading-relaxed">
              The project demonstrates important OOP concepts such as classes, objects, encapsulation, inheritance, polymorphism, and abstraction. The system can also be extended in the future with database connectivity, online booking, online payment, and mobile application support.
            </p>
          </div>
        </section>

      </div>
    </div>
  );
};
