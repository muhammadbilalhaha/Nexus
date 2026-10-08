// src/components/inventory/EditThresholdModal.jsx
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { closeModal } from '../../features/uiSlice';
import { updateThreshold } from '../../features/inventorySlice';
import Modal from '../common/Modal';
import { Milk, Croissant, Coffee, Package, Check } from 'lucide-react';

const EditThresholdModal = () => {
    const dispatch = useDispatch();
    const isOpen = useSelector((state) => state.ui.isEditThresholdModalOpen);
    const productId = useSelector((state) => state.ui.selectedProductId);
    const product = useSelector((state) =>
        state.inventory.items.find(i => i.id === productId)
    );

    const [threshold, setThreshold] = useState('');

    // Sync threshold state when product changes
    useEffect(() => {
        if (product) setThreshold(product.threshold.toString());
    }, [product]);

    const handleClose = () => dispatch(closeModal({ modalName: 'isEditThresholdModalOpen' }));

    const handleSave = () => {
        if (!product || !threshold) return;
        dispatch(updateThreshold({
            productId: product.id,
            newThreshold: parseInt(threshold)
        }));
        handleClose();
    };

    const getIcon = (category) => {
        const props = { size: 20, strokeWidth: 1.5 };
        switch (category) {
            case 'Dairy & Eggs': return <Milk {...props} />;
            case 'Bakery': return <Croissant {...props} />;
            case 'Beverages': return <Coffee {...props} />;
            default: return <Package {...props} />;
        }
    };

    if (!product) return null;

    const getStatusBadge = (status) => {
        switch (status) {
            case 'in-stock':
                return <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-medium bg-status-green-bg text-status-green-text">● In stock</span>;
            case 'low-stock':
                return <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-medium bg-status-orange-bg text-status-orange-text">● Low stock</span>;
            case 'out-of-stock':
                return <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-medium bg-status-red-bg text-status-red-text">● Out of stock</span>;
        }
    };

    const footer = (
        <>
            <button
                onClick={handleClose}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            >
                Cancel
            </button>
            <button
                onClick={handleSave}
                className="px-4 py-2 text-sm font-medium text-white bg-brand-600 rounded-lg hover:bg-brand-700 transition-colors flex items-center gap-2"
            >
                <Check size={14} />
                Save changes
            </button>
        </>
    );

    return (
        <Modal
            isOpen={isOpen}
            onClose={handleClose}
            title="Update Stock Threshold"
            footer={footer}
            maxWidth="max-w-md"
        >
            {/* Product Info Card */}
            <div className="border border-border-subtle rounded-xl p-4 mb-5 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center text-gray-500">
                        {getIcon(product.category)}
                    </div>
                    <div>
                        <p className="text-sm font-semibold text-gray-900">{product.name}</p>
                        <p className="text-xs text-gray-500">{product.variant} • {product.id} • {product.stock} units available</p>
                    </div>
                </div>
                {getStatusBadge(product.status)}
            </div>

            {/* Threshold Input */}
            <div>
                <label className="block text-sm font-medium text-gray-900 mb-1.5">
                    Minimum threshold quantity <span className="text-red-500">*</span>
                </label>
                <input
                    type="number"
                    value={threshold}
                    onChange={(e) => setThreshold(e.target.value)}
                    className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500 bg-white"
                />
                <p className="text-xs text-gray-500 mt-2 leading-relaxed">
                    A low-stock alert is generated when available stock falls to or below this level.
                </p>
            </div>
        </Modal>
    );
};

export default EditThresholdModal;