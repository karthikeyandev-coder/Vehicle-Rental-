import React from 'react';
import { 
  Car, 
  Bike, 
  Truck, 
  Users, 
  CalendarClock, 
  FileText, 
  Code2, 
  LayoutDashboard, 
  PlusCircle, 
  RotateCcw,
  BookOpen
} from 'lucide-react';

export type NavTab = 
  | 'dashboard' 
  | 'fleet' 
  | 'customers' 
  | 'rentals' 
  | 'oop' 
  | 'assignment';

interface NavbarProps {
  activeTab: NavTab;
  setActiveTab: (tab: NavTab) => void;
  onOpenRentModal: () => void;
  onOpenReturnModal: () => void;
  availableCount: number;
  activeRentalsCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  onOpenRentModal,
  onOpenReturnModal,
  availableCount,
  activeRentalsCount
}) => {
  const navItems = [
    { id: 'dashboard' as NavTab, label: 'Dashboard', icon: LayoutDashboard },
    { id: 'fleet' as NavTab, label: 'Fleet Management', icon: Car, badge: `${availableCount} Avail` },
    { id: 'customers' as NavTab, label: 'Customers', icon: Users },
    { id: 'rentals' as NavTab, label: 'Rental Records', icon: FileText, badge: activeRentalsCount > 0 ? `${activeRentalsCount} Active` : undefined },
    { id: 'oop' as NavTab, label: 'Java OOP Architecture', icon: Code2, highlight: true },
    { id: 'assignment' as NavTab, label: 'Assignment Report', icon: BookOpen },
  ];

  return (
    <header className="sticky top-0 z-40 bg-slate-900 border-b border-slate-800 text-white shadow-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Brand */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => setActiveTab('dashboard')}>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500 via-orange-500 to-red-500 flex items-center justify-center shadow-lg shadow-orange-500/20">
              <Car className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-lg tracking-tight bg-gradient-to-r from-white via-slate-100 to-slate-300 bg-clip-text text-transparent">
                  AutoRent OOP
                </span>
                <span className="px-2 py-0.5 text-[10px] font-semibold bg-amber-500/20 text-amber-300 border border-amber-500/30 rounded-full uppercase tracking-wider">
                  Assignment-1
                </span>
              </div>
              <p className="text-xs text-slate-400 hidden sm:block">Vehicle Rental Management System</p>
            </div>
          </div>

          {/* Quick Action Buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={onOpenRentModal}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs sm:text-sm font-semibold rounded-lg bg-emerald-600 hover:bg-emerald-500 active:scale-95 text-white shadow-sm transition-all"
              title="Rent a vehicle (Step 4 in Methodology)"
            >
              <PlusCircle className="w-4 h-4" />
              <span className="hidden sm:inline">Rent Vehicle</span>
              <span className="sm:hidden">Rent</span>
            </button>
            <button
              onClick={onOpenReturnModal}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs sm:text-sm font-semibold rounded-lg bg-indigo-600 hover:bg-indigo-500 active:scale-95 text-white shadow-sm transition-all"
              title="Return a rented vehicle (Step 6 in Methodology)"
            >
              <RotateCcw className="w-4 h-4" />
              <span className="hidden sm:inline">Return Vehicle</span>
              <span className="sm:hidden">Return</span>
            </button>
          </div>
        </div>

        {/* Navigation Tabs Bar */}
        <nav className="flex space-x-1 overflow-x-auto py-2 scrollbar-none border-t border-slate-800/80">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center gap-2 px-3 py-1.5 text-xs sm:text-sm font-medium rounded-lg whitespace-nowrap transition-all ${
                  isActive
                    ? 'bg-amber-500 text-slate-950 font-semibold shadow-md'
                    : item.highlight
                    ? 'text-amber-300 hover:bg-slate-800/70 border border-amber-500/30'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-slate-950' : item.highlight ? 'text-amber-400' : 'text-slate-400'}`} />
                <span>{item.label}</span>
                {item.badge && (
                  <span
                    className={`text-[10px] px-1.5 py-0.2 rounded-full font-semibold ${
                      isActive
                        ? 'bg-slate-950/20 text-slate-900'
                        : 'bg-slate-800 text-slate-300 border border-slate-700'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>
    </header>
  );
};
