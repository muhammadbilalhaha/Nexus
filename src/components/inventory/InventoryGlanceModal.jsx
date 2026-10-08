// src/components/inventory/InventoryGlanceModal.jsx
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { closeModal } from '../../features/uiSlice';
import Modal from '../common/Modal';
import { 
  Boxes, 
  DollarSign, 
  TrendingUp, 
  AlertTriangle 
} from 'lucide-react';

const InventoryGlanceModal = () => {
  const dispatch = useDispatch();
  const isOpen = useSelector((state) => state.ui.isGlanceModalOpen);
  const items = useSelector((state) => state.inventory.items);

  const handleClose = () => dispatch(closeModal({ modalName: 'isGlanceModalOpen' }));

  // --- Dynamic Calculations ---
  const totalUnits = items.reduce((sum, item) => sum + item.stock, 0);
  
  const inventoryValue = items.reduce(
    (sum, item) => sum + (item.stock * item.purchasePrice), 0
  );
  
  const retailValue = items.reduce(
    (sum, item) => sum + (item.stock * item.sellingPrice), 0
  );
  
  const alertCount = items.filter(
    (item) => item.status === 'low-stock' || item.status === 'out-of-stock'
  ).length;

  // Group by category
  const categoryBreakdown = items.reduce((acc, item) => {
    if (!acc[item.category]) {
      acc[item.category] = { units: 0, variants: 0 };
    }
    acc[item.category].units += item.stock;
    acc[item.category].variants += 1;
    return acc;
  }, {});

  // Format currency
  const formatCurrency = (val) => 
    `$${val.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title="Inventory at a Glance"
      maxWidth="max-w-lg"
    >
      {/* Summary Cards Grid */}
      <div className="grid grid-cols-2 gap-3 mb-6">
        
        <SummaryCard 
          label="Stock on hand"
          value={`${totalUnits} units`}
          icon={<Boxes size={16} />}
          iconBg="bg-brand-50 text-brand-600"
        />
        
        <SummaryCard 
          label="Inventory value (cost)"
          value={formatCurrency(inventoryValue)}
          icon={<DollarSign size={16} />}
          iconBg="bg-emerald-50 text-emerald-600"
        />
        
        <SummaryCard 
          label="Potential retail value"
          value={formatCurrency(retailValue)}
          icon={<TrendingUp size={16} />}
          iconBg="bg-blue-50 text-blue-600"
        />
        
        <SummaryCard 
          label="Active stock alerts"
          value={alertCount.toString()}
          icon={<AlertTriangle size={16} />}
          iconBg="bg-orange-50 text-orange-600"
          isAlert={alertCount > 0}
        />
      </div>

      {/* Category Breakdown */}
      <div>
        <h4 className="text-sm font-semibold text-gray-900 mb-3">Stock by category</h4>
        <div className="border border-border-subtle rounded-lg divide-y divide-border-subtle">
          {Object.entries(categoryBreakdown).map(([category, data]) => (
            <div 
              key={category} 
              className="flex items-center justify-between px-4 py-3"
            >
              <div>
                <p className="text-sm font-medium text-gray-800">{category}</p>
                <p className="text-xs text-gray-500">{data.variants} variants</p>
              </div>
              <p className="text-sm font-semibold text-gray-900">{data.units} units</p>
            </div>
          ))}
        </div>
      </div>

      {/* Footer Note */}
      <p className="text-[11px] text-gray-400 mt-4 leading-relaxed">
        All values are calculated from current inventory in this browser.
      </p>
    </Modal>
  );
};

// Reusable Summary Card
const SummaryCard = ({ label, value, icon, iconBg, isAlert }) => (
  <div className={`bg-gray-50/70 border border-border-subtle rounded-lg p-3 ${isAlert ? 'bg-orange-50/50 border-orange-100' : ''}`}>
    <div className="flex items-center gap-2 mb-2">
      <div className={`w-6 h-6 rounded-md flex items-center justify-center ${iconBg}`}>
        {icon}
      </div>
      <p className="text-[11px] font-medium text-gray-500">{label}</p>
    </div>
    <p className={`text-lg font-bold ${isAlert ? 'text-orange-700' : 'text-gray-900'}`}>{value}</p>
  </div>
);

export default InventoryGlanceModal;