// src/components/layout/Topbar.jsx
import React from 'react';
import { 
  ChevronRight, CheckCircle2, HelpCircle, Bell, User, Menu
} from 'lucide-react';

const Topbar = ({ onMenuClick }) => {
  return (
    <header className="h-16 bg-white border-b border-border-subtle flex items-center justify-between px-4 md:px-6 shrink-0">
      
      {/* Left Side: Hamburger + Breadcrumbs */}
      <div className="flex items-center gap-3">
        <button 
          onClick={onMenuClick}
          className="lg:hidden text-gray-500 hover:text-gray-900 p-1"
        >
          <Menu size={22} />
        </button>

        <div className="hidden sm:flex items-center gap-2 text-sm text-gray-500">
          <span className="hover:text-gray-900 cursor-pointer hidden md:inline">Workspace</span>
          <ChevronRight size={14} className="text-gray-300 hidden md:inline" />
          <span className="hover:text-gray-900 cursor-pointer hidden md:inline">Inventory Manager</span>
          <ChevronRight size={14} className="text-gray-300 hidden md:inline" />
          <span className="text-gray-900 font-medium">Control</span>
        </div>
      </div>

      {/* Right Side Actions */}
      <div className="flex items-center gap-3 md:gap-4">
        
        {/* Status Indicator - Hidden on small screens */}
        <div className="hidden lg:flex items-center gap-2 text-sm text-gray-500 bg-gray-50 px-3 py-1.5 rounded-full border border-gray-100">
          <CheckCircle2 size={14} className="text-emerald-500" />
          <span>All changes saved</span>
        </div>

        <div className="w-px h-6 bg-gray-200 mx-1 hidden sm:block"></div>

        <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 cursor-pointer border border-gray-300">
          <User size={16} />
        </div>
      </div>
    </header>
  );
};

export default Topbar;