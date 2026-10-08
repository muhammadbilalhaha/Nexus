// src/components/inventory/StockAlertsModal.jsx
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { closeModal, openModal } from '../../features/uiSlice';
import Modal from '../common/Modal';
import { Plus, Milk, Croissant, Coffee, Package } from 'lucide-react';

const StockAlertsModal = () => {
  const dispatch = useDispatch();
  const isOpen = useSelector((state) => state.ui.isAlertsModalOpen);
  const items = useSelector((state) => state.inventory.items);

  const handleClose = () => dispatch(closeModal({ modalName: 'isAlertsModalOpen' }));

  const handleEditThreshold = (productId) => {
    dispatch(openModal({ modalName: 'isEditThresholdModalOpen', productId }));
  };

  // Filter only items that need attention
  const alertItems = items.filter(
    (item) => item.status === 'low-stock' || item.status === 'out-of-stock'
  );

  const getIcon = (category) => {
    const props = { size: 16, strokeWidth: 1.5 };
    switch (category) {
      case 'Dairy & Eggs': return <Milk {...props} />;
      case 'Bakery': return <Croissant {...props} />;
      case 'Beverages': return <Coffee {...props} />;
      default: return <Package {...props} />;
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'low-stock':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-medium bg-status-orange-bg text-status-orange-text border border-orange-100 whitespace-nowrap">
            ● Low stock
          </span>
        );
      case 'out-of-stock':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-medium bg-status-red-bg text-status-red-text border border-red-100 whitespace-nowrap">
            ● Out of stock
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title="Stock Alerts"
      subtitle={`${alertItems.length} items need attention. Alerts resolve automatically when stock is replenished.`}
      maxWidth="max-w-4xl"
    >
      {alertItems.length > 0 ? (
        <>
          {/* Active alerts count */}
          <div className="flex items-center justify-between mb-3">
            <p className="text-sm font-semibold text-gray-900">
              {alertItems.length} active alert{alertItems.length > 1 ? 's' : ''}
            </p>
          </div>

          {/* Alerts Table */}
          <div className="border border-border-subtle rounded-xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-50 border-b border-border-subtle">
                    <th className="px-4 py-3 text-[11px] font-semibold text-gray-500 uppercase tracking-wider">
                      Item / variant
                    </th>
                    <th className="px-4 py-3 text-[11px] font-semibold text-gray-500 uppercase tracking-wider">
                      Category
                    </th>
                    <th className="px-4 py-3 text-[11px] font-semibold text-gray-500 uppercase tracking-wider text-right">
                      Current stock
                    </th>
                    <th className="px-4 py-3 text-[11px] font-semibold text-gray-500 uppercase tracking-wider text-right">
                      Threshold
                    </th>
                    <th className="px-4 py-3 text-[11px] font-semibold text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-4 py-3 text-[11px] font-semibold text-gray-500 uppercase tracking-wider text-right">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border-subtle bg-white">
                  {alertItems.map((item) => (
                    <tr 
                      key={item.id} 
                      className="hover:bg-gray-50/60 transition-colors"
                    >
                      {/* Item */}
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-lg bg-gray-100 flex items-center justify-center text-gray-500 shrink-0">
                            {getIcon(item.category)}
                          </div>
                          <div className="min-w-0">
                            <p className="text-sm font-medium text-gray-900 truncate">
                              {item.name}
                            </p>
                            <p className="text-xs text-gray-500 truncate">
                              {item.variant} • {item.id}
                            </p>
                          </div>
                        </div>
                      </td>

                      {/* Category */}
                      <td className="px-4 py-3">
                        <p className="text-sm text-gray-700">{item.category}</p>
                        <p className="text-xs text-gray-400">{item.subCategory}</p>
                      </td>

                      {/* Current stock */}
                      <td className="px-4 py-3 text-right">
                        <span className="text-sm font-semibold text-gray-900">
                          {item.stock}
                        </span>
                      </td>

                      {/* Threshold */}
                      <td className="px-4 py-3 text-right">
                        <span className="text-sm text-gray-700">
                          {item.threshold}
                        </span>
                      </td>

                      {/* Status */}
                      <td className="px-4 py-3">
                        {getStatusBadge(item.status)}
                      </td>

                      {/* Actions */}
                      <td className="px-4 py-3 text-right">
                        <button
                          onClick={() => handleEditThreshold(item.id)}
                          className="inline-flex items-center gap-1 text-xs font-medium text-brand-600 hover:text-brand-700 px-2.5 py-1.5 rounded-lg hover:bg-brand-50 transition-colors whitespace-nowrap"
                        >
                          <Plus size={12} />
                          Threshold
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      ) : (
        /* Empty State */
        <div className="border-2 border-dashed border-gray-200 rounded-xl p-12 text-center">
          <div className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto mb-3">
            <Package size={20} />
          </div>
          <p className="text-sm font-medium text-gray-900">No active alerts</p>
          <p className="text-xs text-gray-500 mt-1">Everything is stocked up!</p>
        </div>
      )}
    </Modal>
  );
};

export default StockAlertsModal;