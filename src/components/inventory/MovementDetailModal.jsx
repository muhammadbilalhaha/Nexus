// src/components/inventory/MovementDetailModal.jsx
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { closeModal } from '../../features/uiSlice';
import Modal from '../common/Modal';
import { 
  Milk, Croissant, Coffee, Package, 
  User, MapPin, Hash, Calendar, Building2, 
  Tag, FileText, Barcode
} from 'lucide-react';

const MovementDetailModal = () => {
  const dispatch = useDispatch();
  const isOpen = useSelector((state) => state.ui.isMovementDetailModalOpen);
  const movementId = useSelector((state) => state.ui.selectedMovementId);
  
  // Find movement and related product
  const movement = useSelector((state) => 
    state.inventory.movements.find(m => m.id === movementId)
  );
  const product = useSelector((state) => 
    movement ? state.inventory.items.find(i => i.id === movement.productId) : null
  );

  const handleClose = () => dispatch(closeModal({ modalName: 'isMovementDetailModalOpen' }));

  if (!movement || !product) return null;

  const getIcon = (category) => {
    const props = { size: 20, strokeWidth: 1.5 };
    switch (category) {
      case 'Dairy & Eggs': return <Milk {...props} />;
      case 'Bakery': return <Croissant {...props} />;
      case 'Beverages': return <Coffee {...props} />;
      default: return <Package {...props} />;
    }
  };

  const formatDate = (isoString) => {
    const d = new Date(isoString);
    return {
      date: d.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
      time: d.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })
    };
  };

  const { date, time } = formatDate(movement.date);

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title="Movement Details"
      maxWidth="max-w-lg"
    >
      {/* Product Card Header */}
      <div className="border border-border-subtle rounded-xl p-4 mb-5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center text-gray-500">
            {getIcon(product.category)}
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-900">{product.name}</p>
            <p className="text-xs text-gray-500">
              {product.variant} • {product.id} • {product.stock} units available
            </p>
          </div>
        </div>
        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-medium bg-status-green-bg text-status-green-text border border-emerald-100">
          ● In stock
        </span>
      </div>

      {/* Details Grid */}
      <div className="border border-border-subtle rounded-xl divide-y divide-border-subtle mb-5">
        
        {/* Row 1: Reference + Movement Type */}
        <div className="grid grid-cols-2 divide-x divide-border-subtle">
          <DetailCell icon={<Hash size={12} />} label="Reference" value={movement.id} />
          <DetailCell icon={<Tag size={12} />} label="Movement" value={movement.type} />
        </div>

        {/* Row 2: Quantity + Date & Time */}
        <div className="grid grid-cols-2 divide-x divide-border-subtle">
          <DetailCell icon={<Package size={12} />} label="Quantity" value={`+${movement.qty}`} valueClass="text-emerald-600 font-semibold" />
          <DetailCell icon={<Calendar size={12} />} label="Date & time" value={`${date}, ${time}`} />
        </div>

        {/* Row 3: Company + Type */}
        <div className="grid grid-cols-2 divide-x divide-border-subtle">
          <DetailCell icon={<Building2 size={12} />} label="Company / supplier" value={movement.company} />
          <DetailCell icon={<Tag size={12} />} label="Type" value="Single Item" />
        </div>

        {/* Row 4: Category + Sub Category */}
        <div className="grid grid-cols-2 divide-x divide-border-subtle">
          <DetailCell icon={<FileText size={12} />} label="Category" value={product.category} />
          <DetailCell icon={<FileText size={12} />} label="Sub category" value={product.subCategory} />
        </div>

        {/* Row 5: Barcode + Notes */}
        <div className="grid grid-cols-2 divide-x divide-border-subtle">
          <DetailCell icon={<Barcode size={12} />} label="Barcode" value={product.barcode} />
          <DetailCell icon={<FileText size={12} />} label="Notes / reason" value={movement.notes || '—'} />
        </div>
      </div>

      {/* Record History */}
      <div>
        <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
          Record history
        </h4>
        <div className="relative pl-5">
          <div className="absolute left-1.5 top-1.5 bottom-1.5 w-px bg-gray-200"></div>
          <div className="relative flex items-start gap-3">
            <div className="absolute -left-3.5 top-1 w-3 h-3 rounded-full bg-brand-600 border-2 border-white shadow-sm"></div>
            <div>
              <p className="text-xs text-gray-700">
                Created by <span className="font-semibold">Olivia Parker</span>
              </p>
              <p className="text-[11px] text-gray-400 mt-0.5">{date}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons at Bottom */}
      <div className="flex items-center gap-2 mt-6 pt-5 border-t border-border-subtle">
        <button className="px-3.5 py-2 text-xs font-medium text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
          Update threshold
        </button>
        <button className="px-3.5 py-2 text-xs font-medium text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
          Update price
        </button>
      </div>
    </Modal>
  );
};

// Reusable Detail Cell
const DetailCell = ({ icon, label, value, valueClass = '' }) => (
  <div className="p-3">
    <div className="flex items-center gap-1.5 mb-1">
      <span className="text-gray-400">{icon}</span>
      <span className="text-[11px] font-medium text-gray-500 uppercase tracking-wider">
        {label}
      </span>
    </div>
    <p className={`text-sm text-gray-900 truncate ${valueClass}`}>{value}</p>
  </div>
);

export default MovementDetailModal;