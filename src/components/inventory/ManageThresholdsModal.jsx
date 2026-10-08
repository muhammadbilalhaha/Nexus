// src/components/inventory/ManageThresholdsModal.jsx
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { closeModal, openModal } from '../../features/uiSlice';
import Modal from '../common/Modal';
import { Plus, Edit2, Trash2, Milk, Croissant, Coffee, Package } from 'lucide-react';

const ManageThresholdsModal = () => {
    const dispatch = useDispatch();
    const isOpen = useSelector((state) => state.ui.isThresholdModalOpen);
    const items = useSelector((state) => state.inventory.items);

    const handleClose = () => dispatch(closeModal({ modalName: 'isThresholdModalOpen' }));

    const handleEdit = (productId) => {
        dispatch(openModal({ modalName: 'isEditThresholdModalOpen', productId }));
    };

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
            case 'in-stock':
                return <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-medium bg-status-green-bg text-status-green-text border border-emerald-100">● In stock</span>;
            case 'low-stock':
                return <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-medium bg-status-orange-bg text-status-orange-text border border-orange-100">● Low stock</span>;
            case 'out-of-stock':
                return <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-medium bg-status-red-bg text-status-red-text border border-red-100">● Out of stock</span>;
            default: return null;
        }
    };

    return (
        <Modal
            isOpen={isOpen}
            onClose={handleClose}
            title="Manage Thresholds"
            subtitle="Set the right minimum for every item and variant."
            maxWidth="max-w-4xl"
        >
            {/* Header Row */}
            <div className="flex items-center justify-between mb-4">
                <p className="text-sm text-gray-500">{items.length} products & variants</p>
                <button
                    onClick={() => handleEdit(null)} // Add new threshold (mocked)
                    className="flex items-center gap-1.5 bg-brand-600 hover:bg-brand-700 text-white text-xs font-medium px-3 py-1.5 rounded-lg transition-colors"
                >
                    <Plus size={14} />
                    Add threshold
                </button>
            </div>

            {/* Table */}
            <div className="border border-border-subtle rounded-lg overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-gray-50 text-xs font-medium text-gray-500 uppercase tracking-wider">
                                <th className="px-4 py-2.5">Item / variant</th>
                                <th className="px-4 py-2.5">Category</th>
                                <th className="px-4 py-2.5">Current stock</th>
                                <th className="px-4 py-2.5">Threshold</th>
                                <th className="px-4 py-2.5">Status</th>
                                <th className="px-4 py-2.5 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border-subtle">
                            {items.map((item) => (
                                <tr key={item.id} className="hover:bg-gray-50/50 transition-colors group">
                                    <td className="px-4 py-3">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center text-gray-500 shrink-0">
                                                {getIcon(item.category)}
                                            </div>
                                            <div className="min-w-0">
                                                <p className="text-sm font-medium text-gray-900 truncate">{item.name}</p>
                                                <p className="text-xs text-gray-500 truncate">{item.variant} • {item.id}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-4 py-3 text-xs text-gray-500">
                                        <p>{item.category}</p>
                                        <p className="text-gray-400">{item.subCategory}</p>
                                    </td>
                                    <td className="px-4 py-3 text-sm font-semibold text-gray-900">{item.stock}</td>
                                    <td className="px-4 py-3 text-sm text-gray-700">{item.threshold}</td>
                                    <td className="px-4 py-3">{getStatusBadge(item.status)}</td>
                                    <td className="px-4 py-3">
                                        <div className="flex items-center justify-end gap-1">
                                            <button
                                                onClick={() => handleEdit(item.id)}
                                                className="text-xs text-brand-600 hover:text-brand-700 font-medium px-2 py-1 rounded hover:bg-brand-50 flex items-center gap-1"
                                            >
                                                <Edit2 size={12} />
                                                Edit threshold
                                            </button>
                                            <button className="text-gray-400 hover:text-red-500 p-1 rounded hover:bg-red-50 transition-colors">
                                                <Trash2 size={14} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </Modal>
    );
};

export default ManageThresholdsModal;