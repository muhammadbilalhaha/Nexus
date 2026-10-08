// src/components/common/ConfirmDialog.jsx
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { hideConfirm } from '../../features/uiSlice';
import { AlertTriangle, X } from 'lucide-react';

const ConfirmDialog = () => {
  const dispatch = useDispatch();
  const { isOpen, title, message, confirmLabel, cancelLabel, variant, onConfirm } = 
    useSelector((state) => state.ui.confirmDialog);

  const handleClose = () => dispatch(hideConfirm());

  const handleConfirm = () => {
    if (typeof onConfirm === 'function') onConfirm();
    handleClose();
  };

  if (!isOpen) return null;

  const isDanger = variant === 'danger';

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
      
      {/* Overlay */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={handleClose}
      />

      {/* Dialog */}
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-sm overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        
        {/* Close Button */}
        <button 
          onClick={handleClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 p-1 rounded-lg hover:bg-gray-100 transition-colors"
        >
          <X size={16} />
        </button>

        {/* Content */}
        <div className="p-6 flex flex-col items-center text-center">
          
          {/* Icon */}
          <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-4 ${
            isDanger ? 'bg-red-100 text-red-600' : 'bg-brand-50 text-brand-600'
          }`}>
            <AlertTriangle size={22} />
          </div>

          {/* Title */}
          <h3 className="text-base font-semibold text-gray-900 mb-1.5">
            {title}
          </h3>

          {/* Message */}
          {message && (
            <p className="text-sm text-gray-500 leading-relaxed">
              {message}
            </p>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 pb-6 flex gap-2">
          <button
            onClick={handleClose}
            className="flex-1 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
          >
            {cancelLabel}
          </button>
          <button
            onClick={handleConfirm}
            className={`flex-1 px-4 py-2 text-sm font-medium text-white rounded-lg transition-colors shadow-sm ${
              isDanger 
                ? 'bg-red-500 hover:bg-red-600' 
                : 'bg-brand-600 hover:bg-brand-700'
            }`}
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDialog;