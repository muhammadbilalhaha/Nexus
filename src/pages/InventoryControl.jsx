// src/pages/InventoryControl.jsx
import React from 'react';
import { useDispatch } from 'react-redux';
import { openModal } from '../features/uiSlice';
import StatsCards from '../components/inventory/StatsCards';
import AlertBanner from '../components/inventory/AlertBanner';
import StockInTable from '../components/inventory/StockInTable';
import InventoryToolbar from '../components/inventory/InventoryToolbar';
import { Plus } from 'lucide-react';

const InventoryControl = () => {
  const dispatch = useDispatch();

  return (
    <div className="max-w-[1400px] mx-auto w-full">
      
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Inventory Workspace</span>
            <span className="bg-gray-200 text-gray-600 text-[10px] font-bold px-1.5 py-0.5 rounded">LIVE</span>
          </div>
          <h1 className="text-xl md:text-2xl font-bold text-gray-900">Inventory Control</h1>
          <p className="text-sm text-gray-500 mt-1">Every movement, accounted for. Keep your stock in balance.</p>
        </div>
        
        <button 
          onClick={() => dispatch(openModal({ modalName: 'isAddStockModalOpen' }))}
          className="flex items-center justify-center gap-2 bg-brand-600 hover:bg-brand-700 text-white text-sm font-medium px-4 py-2.5 rounded-lg transition-colors shadow-sm w-full sm:w-auto shrink-0"
        >
          <Plus size={16} />
          Add Stock In
        </button>
      </div>

      {/* Action Toolbar */}
      <InventoryToolbar />

      {/* Stats Cards */}
      <StatsCards />

      {/* Alert Banner */}
      <AlertBanner />

      {/* Main Table */}
      <StockInTable />

    </div>
  );
};

export default InventoryControl;