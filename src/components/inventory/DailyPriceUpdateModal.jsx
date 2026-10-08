// src/components/inventory/DailyPriceUpdateModal.jsx
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { closeModal } from '../../features/uiSlice';
import { updatePrices } from '../../features/inventorySlice';
import Modal from '../common/Modal';
import { Check, Milk, Croissant, Coffee, Package, Egg } from 'lucide-react';

const DailyPriceUpdateModal = () => {
  const dispatch = useDispatch();
  const isOpen = useSelector((state) => state.ui.isPriceUpdateModalOpen);
  const items = useSelector((state) => state.inventory.items);

  // Local state to track editable values and saved status per item
  const [priceDrafts, setPriceDrafts] = useState({});
  const [savedStatus, setSavedStatus] = useState({});

  // Sync local state when modal opens
  useEffect(() => {
    if (isOpen) {
      const drafts = {};
      items.forEach(item => {
        drafts[item.id] = {
          purchasePrice: item.purchasePrice,
          sellingPrice: item.sellingPrice
        };
      });
      setPriceDrafts(drafts);
      setSavedStatus({});
    }
  }, [isOpen, items]);

  const handleClose = () => dispatch(closeModal({ modalName: 'isPriceUpdateModalOpen' }));

  const handleChange = (productId, field, value) => {
    setPriceDrafts(prev => ({
      ...prev,
      [productId]: {
        ...prev[productId],
        [field]: value
      }
    }));
    // Reset saved status when a value changes
    setSavedStatus(prev => ({ ...prev, [productId]: false }));
  };

  const handleSave = (productId) => {
    const draft = priceDrafts[productId];
    if (!draft) return;

    dispatch(updatePrices({
      productId,
      purchasePrice: parseFloat(draft.purchasePrice) || 0,
      sellingPrice: parseFloat(draft.sellingPrice) || 0
    }));

    setSavedStatus(prev => ({ ...prev, [productId]: true }));

    // Optionally reset after a short delay
    setTimeout(() => {
      setSavedStatus(prev => ({ ...prev, [productId]: false }));
    }, 1500);
  };

  const getIcon = (category) => {
    const props = { size: 18, strokeWidth: 1.5 };
    switch (category) {
      case 'Dairy & Eggs': return <Milk {...props} />;
      case 'Bakery': return <Croissant {...props} />;
      case 'Beverages': return <Coffee {...props} />;
      default: return <Package {...props} />;
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title="Daily Price Updates"
      subtitle="Review and save each item's prices. The banner clears when all items are up to date."
      maxWidth="max-w-3xl"
    >
      <div className="space-y-3">
        {items.map((item) => {
          const draft = priceDrafts[item.id] || {
            purchasePrice: item.purchasePrice,
            sellingPrice: item.sellingPrice
          };
          const isSaved = savedStatus[item.id];

          return (
            <div 
              key={item.id}
              className="border border-border-subtle rounded-xl p-4 flex flex-col sm:flex-row sm:items-center gap-4 hover:bg-gray-50/50 transition-colors"
            >
              {/* Product Info */}
              <div className="flex items-center gap-3 flex-1 min-w-0">
                <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center text-gray-500 shrink-0">
                  {getIcon(item.category)}
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-gray-900 truncate">{item.name}</p>
                  <p className="text-xs text-gray-500">{item.variant}</p>
                </div>
              </div>

              {/* Price Inputs */}
              <div className="grid grid-cols-2 gap-3 sm:w-auto w-full">
                <div>
                  <label className="block text-[11px] font-medium text-gray-500 mb-1">Purchase ($)</label>
                  <input
                    type="number"
                    step="0.01"
                    value={draft.purchasePrice}
                    onChange={(e) => handleChange(item.id, 'purchasePrice', e.target.value)}
                    className="w-full sm:w-24 px-2.5 py-1.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500 bg-white"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-medium text-gray-500 mb-1">Selling ($)</label>
                  <input
                    type="number"
                    step="0.01"
                    value={draft.sellingPrice}
                    onChange={(e) => handleChange(item.id, 'sellingPrice', e.target.value)}
                    className="w-full sm:w-24 px-2.5 py-1.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500 bg-white"
                  />
                </div>
              </div>

              {/* Save Button */}
              <button
                onClick={() => handleSave(item.id)}
                className={`flex items-center justify-center gap-1.5 text-xs font-medium px-4 py-2 rounded-lg transition-all shrink-0 sm:w-auto w-full ${
                  isSaved 
                    ? 'bg-emerald-500 text-white' 
                    : 'bg-brand-600 hover:bg-brand-700 text-white'
                }`}
              >
                <Check size={14} />
                {isSaved ? 'Saved' : 'Save'}
              </button>
            </div>
          );
        })}
      </div>
    </Modal>
  );
};

export default DailyPriceUpdateModal;