// src/components/inventory/RowActionMenu.jsx
import React, { useState, useRef, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { openModal } from '../../features/uiSlice';
import { markAsDamaged, deleteMovements } from '../../features/inventorySlice';
import { useConfirm } from '../../hooks/useConfirm';
import { Edit2, AlertTriangle, Trash2, Eye, MoreHorizontal } from 'lucide-react';

const RowActionMenu = ({ movement, product }) => {
  const dispatch = useDispatch();
  const confirm = useConfirm();
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleAction = (action) => {
    setIsOpen(false);
    switch (action) {
      case 'view':
        dispatch(openModal({ modalName: 'isMovementDetailModalOpen', movementId: movement.id }));
        break;

      case 'threshold':
        dispatch(openModal({ modalName: 'isEditThresholdModalOpen', productId: product.id }));
        break;

      case 'damaged':
        if (movement.type === 'Damaged') return;
        confirm({
          title: 'Mark as damaged?',
          message: `Movement ${movement.id} (${product.name}) will be reclassified as damaged. Stock levels will be adjusted accordingly.`,
          confirmLabel: 'Mark as damaged',
          variant: 'danger',
          onConfirm: () => dispatch(markAsDamaged({ movementId: movement.id }))
        });
        break;

      case 'delete':
        confirm({
          title: 'Delete this movement?',
          message: `Movement ${movement.id} (${product.name}, qty ${movement.qty}) will be permanently deleted and its stock effect reversed.`,
          confirmLabel: 'Delete',
          variant: 'danger',
          onConfirm: () => dispatch(deleteMovements({ movementIds: [movement.id] }))
        });
        break;

      default:
        break;
    }
  };

  return (
    <div className="relative" ref={menuRef}>
      <button 
        onClick={(e) => { e.stopPropagation(); setIsOpen(!isOpen); }}
        title="More actions"
        className="p-1.5 rounded-md text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-colors"
      >
        <MoreHorizontal size={14} />
      </button>

      {isOpen && (
        <div className="absolute right-0 top-full mt-1 w-44 bg-white border border-border-subtle rounded-lg shadow-lg z-20 py-1">
          <MenuItem 
            icon={<Eye size={14} />}      
            label="View details"      
            onClick={() => handleAction('view')} 
          />
          <MenuItem 
            icon={<Edit2 size={14} />}    
            label="Edit threshold"    
            onClick={() => handleAction('threshold')} 
          />
          <MenuItem 
            icon={<AlertTriangle size={14} />} 
            label="Mark as damaged"  
            onClick={() => handleAction('damaged')} 
            disabled={movement.type === 'Damaged'}
          />
          <div className="my-1 border-t border-border-subtle" />
          <MenuItem 
            icon={<Trash2 size={14} />}   
            label="Delete"            
            onClick={() => handleAction('delete')} 
            danger 
          />
        </div>
      )}
    </div>
  );
};

const MenuItem = ({ icon, label, onClick, danger, disabled }) => (
  <button 
    onClick={disabled ? undefined : onClick}
    disabled={disabled}
    className={`w-full flex items-center gap-2 px-3 py-1.5 text-xs text-left transition-colors ${
      disabled
        ? 'text-gray-300 cursor-not-allowed'
        : danger 
          ? 'text-red-600 hover:bg-red-50' 
          : 'text-gray-700 hover:bg-gray-50'
    }`}
  >
    {icon}
    {label}
  </button>
);

export default RowActionMenu;