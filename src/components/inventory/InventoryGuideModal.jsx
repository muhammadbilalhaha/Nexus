// src/components/inventory/InventoryGuideModal.jsx
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { closeModal } from '../../features/uiSlice';
import Modal from '../common/Modal';
import { 
  BookOpen, 
  ArrowDownToLine, 
  SlidersHorizontal, 
  AlertTriangle, 
  Clock, 
  Layers, 
  Info 
} from 'lucide-react';

const InventoryGuideModal = () => {
  const dispatch = useDispatch();
  const isOpen = useSelector((state) => state.ui.isGuideModalOpen);

  const handleClose = () => dispatch(closeModal({ modalName: 'isGuideModalOpen' }));

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title="Your Inventory Guide"
      maxWidth="max-w-2xl"
    >
      {/* Intro banner */}
      <div className="bg-brand-50 border border-brand-100 rounded-xl p-4 flex items-start gap-3 mb-6">
        <div className="w-8 h-8 rounded-lg bg-white text-brand-600 flex items-center justify-center shrink-0 shadow-sm">
          <BookOpen size={16} />
        </div>
        <div>
          <p className="text-sm font-semibold text-gray-900">A place for every item. A record for every movement.</p>
          <p className="text-xs text-gray-600 mt-0.5">
            Use this guide to understand how Nexus keeps your inventory organized and in balance.
          </p>
        </div>
      </div>

      {/* Sections */}
      <div className="space-y-5">
        <GuideSection
          icon={<ArrowDownToLine size={16} />}
          iconBg="bg-emerald-50 text-emerald-600"
          title="Receive stock"
          description="Use Add Stock In to receive one item, multiple variants, or a complete supplier order. Stock and alerts update immediately."
        />

        <GuideSection
          icon={<SlidersHorizontal size={16} />}
          iconBg="bg-brand-50 text-brand-600"
          title="Correct a count"
          description="Create an adjustment with the corrected quantity and a mandatory reason. This replaces the current stock count."
        />

        <GuideSection
          icon={<AlertTriangle size={16} />}
          iconBg="bg-orange-50 text-orange-600"
          title="Track stock loss"
          description="Record damage with an employee, location, and reason, or record expired stock. Quantities are deducted from available inventory."
        />

        <GuideSection
          icon={<Clock size={16} />}
          iconBg="bg-blue-50 text-blue-600"
          title="Stay ahead of low stock"
          description="Configure a threshold for each variant. Alerts are generated at or below the minimum and automatically resolve when stock is replenished."
        />

        <GuideSection
          icon={<Layers size={16} />}
          iconBg="bg-purple-50 text-purple-600"
          title="Work in bulk"
          description="Select table rows for bulk updates or choose items in Bulk Operations. Export filtered records and validate CSV or Excel imports before applying."
        />

        <GuideSection
          icon={<Info size={16} />}
          iconBg="bg-gray-100 text-gray-600"
          title="About this workspace"
          description="This is an interactive local workspace with example products and history. Changes persist in this browser. Sales integration and warehouse transfers are not connected; Stock Transfer is planned for Phase 2."
        />
      </div>
    </Modal>
  );
};

// Reusable section row
const GuideSection = ({ icon, iconBg, title, description }) => (
  <div className="flex items-start gap-3">
    <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 mt-0.5 ${iconBg}`}>
      {icon}
    </div>
    <div className="flex-1">
      <h4 className="text-sm font-semibold text-gray-900">{title}</h4>
      <p className="text-xs text-gray-500 mt-1 leading-relaxed">{description}</p>
    </div>
  </div>
);

export default InventoryGuideModal;