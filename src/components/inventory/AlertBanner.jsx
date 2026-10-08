// src/components/inventory/AlertBanner.jsx
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { openModal } from '../../features/uiSlice';
import { Tag, ArrowRight } from 'lucide-react';

const AlertBanner = () => {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.inventory.items);

  // Count items needing price review (for demo, all items)
  const priceUpdateCount = items.length;

  return (
    <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-sm">
      <div className="flex items-start sm:items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center text-amber-600 shrink-0 mt-0.5 sm:mt-0">
          <Tag size={16} />
        </div>
        <p className="text-sm text-amber-800">
          <span className="font-semibold">A fresh day, a fresh price.</span> {priceUpdateCount} items require daily price updates. Keep your prices up to date.
        </p>
      </div>
      
      <button 
        onClick={() => dispatch(openModal({ modalName: 'isPriceUpdateModalOpen' }))}
        className="flex items-center gap-1 text-sm font-semibold text-amber-700 hover:text-amber-900 transition-colors shrink-0 self-start sm:self-auto ml-11 sm:ml-0"
      >
        Review prices
        <ArrowRight size={14} />
      </button>
    </div>
  );
};

export default AlertBanner;