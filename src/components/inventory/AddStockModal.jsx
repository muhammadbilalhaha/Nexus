// src/components/inventory/AddStockModal.jsx
import React, { useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { closeModal } from '../../features/uiSlice';
import { addStock } from '../../features/inventorySlice';
import Modal from '../common/Modal';
import { Search, ChevronDown, Plus, Minus, Trash2, Milk, Croissant, Coffee, Package, Egg } from 'lucide-react';

const AddStockModal = () => {
    const dispatch = useDispatch();
    const isOpen = useSelector((state) => state.ui.isAddStockModalOpen);
    const items = useSelector((state) => state.inventory.items);

    // Local state for the modal
    const [mode, setMode] = useState('manual'); // 'manual' | 'supplier'
    const [search, setSearch] = useState('');
    const [selectedItems, setSelectedItems] = useState([]); // [{ id, qty }]
    const [supplier, setSupplier] = useState('');
    const [notes, setNotes] = useState('');

    const handleClose = () => {
        dispatch(closeModal({ modalName: 'isAddStockModalOpen' }));
        // Reset state
        setSearch('');
        setSelectedItems([]);
        setSupplier('');
        setNotes('');
        setMode('manual');
    };

    // Filter products based on search
    const filteredItems = useMemo(() => {
        return items.filter(item =>
            item.name.toLowerCase().includes(search.toLowerCase()) ||
            item.id.toLowerCase().includes(search.toLowerCase()) ||
            item.barcode.includes(search)
        );
    }, [items, search]);

    // Toggle item selection
    const toggleItem = (itemId) => {
        setSelectedItems(prev => {
            const exists = prev.find(i => i.id === itemId);
            if (exists) return prev.filter(i => i.id !== itemId);
            return [...prev, { id: itemId, qty: 1 }];
        });
    };

    // Update quantity for selected item
    const updateQty = (itemId, newQty) => {
        if (newQty < 1) return;
        setSelectedItems(prev => prev.map(i =>
            i.id === itemId ? { ...i, qty: newQty } : i
        ));
    };

    // Handle form submission
    const handleSubmit = () => {
        if (selectedItems.length === 0 || !supplier) return;

        selectedItems.forEach(selItem => {
            dispatch(addStock({
                productId: selItem.id,
                qty: selItem.qty,
                company: supplier,
                notes: notes
            }));
        });

        handleClose();
    };

    // Icon helper
    const getIcon = (category) => {
        const props = { size: 16, strokeWidth: 1.5 };
        switch (category) {
            case 'Dairy & Eggs': return <Milk {...props} />;
            case 'Bakery': return <Croissant {...props} />;
            case 'Beverages': return <Coffee {...props} />;
            default: return <Package {...props} />;
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
                onClick={handleSubmit}
                disabled={selectedItems.length === 0 || !supplier}
                className="px-4 py-2 text-sm font-medium text-white bg-brand-600 rounded-lg hover:bg-brand-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
                Receive Items
                {selectedItems.length > 0 && (
                    <span className="bg-white/20 text-white text-xs px-1.5 py-0.5 rounded-full">
                        {selectedItems.length}
                    </span>
                )}
            </button>
        </>
    );

    return (
        <Modal
            isOpen={isOpen}
            onClose={handleClose}
            title="Add Stock In"
            subtitle="Receive individual items, bundles, or a complete supplier delivery."
            footer={footer}
            maxWidth="max-w-lg"
        >
            {/* Mode Tabs */}
            <div className="flex bg-gray-50 rounded-lg p-1 mb-5">
                <button
                    onClick={() => setMode('manual')}
                    className={`flex-1 py-2 text-xs font-medium rounded-md transition-colors ${mode === 'manual' ? 'bg-white text-brand-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'
                        }`}
                >
                    Manual stock addition
                </button>
                <button
                    onClick={() => setMode('supplier')}
                    className={`flex-1 py-2 text-xs font-medium rounded-md transition-colors ${mode === 'supplier' ? 'bg-white text-brand-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'
                        }`}
                >
                    From supplier order
                </button>
            </div>

            {/* Products Section */}
            <div className="mb-5">
                <div className="flex items-center justify-between mb-2">
                    <label className="text-sm font-medium text-gray-900">
                        Products & variants <span className="text-gray-400 font-normal">({selectedItems.length} selected)</span>
                    </label>
                    <div className="relative">
                        <select className="appearance-none text-xs border border-gray-200 rounded-lg pl-2 pr-6 py-1 focus:outline-none focus:ring-2 focus:ring-brand-500 bg-white">
                            <option>All categories</option>
                        </select>
                        <ChevronDown size={12} className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                    </div>
                </div>

                {/* Search Input */}
                <div className="relative mb-3">
                    <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search products, variants, or item codes..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full pl-9 pr-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500 bg-white"
                    />
                </div>

                {/* Product List */}
                <div className="border border-gray-200 rounded-lg max-h-56 overflow-y-auto divide-y divide-gray-100">
                    {filteredItems.length > 0 ? (
                        filteredItems.map(item => {
                            const isSelected = selectedItems.some(i => i.id === item.id);
                            const selectedItem = selectedItems.find(i => i.id === item.id);

                            return (
                                <div
                                    key={item.id}
                                    className={`flex items-center gap-3 p-3 transition-colors ${isSelected ? 'bg-brand-50/50' : 'hover:bg-gray-50'
                                        }`}
                                >
                                    <input
                                        type="checkbox"
                                        checked={isSelected}
                                        onChange={() => toggleItem(item.id)}
                                        className="rounded border-gray-300 text-brand-600 focus:ring-brand-500 cursor-pointer"
                                    />
                                    <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center text-gray-500 shrink-0">
                                        {getIcon(item.category)}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-medium text-gray-900 truncate">{item.name}</p>
                                        <p className="text-xs text-gray-500 truncate">{item.variant} • {item.id}</p>
                                    </div>

                                    {/* Quantity Control (Only if selected) */}
                                    {isSelected && (
                                        <div className="flex items-center gap-1 shrink-0">
                                            <button
                                                onClick={() => updateQty(item.id, selectedItem.qty - 1)}
                                                className="w-6 h-6 rounded bg-white border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-gray-100"
                                            >
                                                <Minus size={12} />
                                            </button>
                                            <input
                                                type="number"
                                                value={selectedItem.qty}
                                                onChange={(e) => updateQty(item.id, parseInt(e.target.value) || 1)}
                                                className="w-12 text-center text-sm border border-gray-200 rounded py-0.5 focus:outline-none focus:ring-1 focus:ring-brand-500"
                                            />
                                            <button
                                                onClick={() => updateQty(item.id, selectedItem.qty + 1)}
                                                className="w-6 h-6 rounded bg-white border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-gray-100"
                                            >
                                                <Plus size={12} />
                                            </button>
                                        </div>
                                    )}
                                </div>
                            );
                        })
                    ) : (
                        <div className="p-6 text-center text-sm text-gray-500">
                            No products found
                        </div>
                    )}
                </div>
            </div>

            {/* Supplier Input */}
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-900 mb-1.5">
                    Company / supplier <span className="text-red-500">*</span>
                </label>
                <input
                    type="text"
                    value={supplier}
                    onChange={(e) => setSupplier(e.target.value)}
                    placeholder="Select or enter a supplier"
                    className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500 bg-white"
                />
            </div>

            {/* Notes Input */}
            <div>
                <label className="block text-sm font-medium text-gray-900 mb-1.5">
                    Notes <span className="text-gray-400 font-normal">(optional)</span>
                </label>
                <textarea
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Delivery reference, batch information, or a helpful note..."
                    rows={3}
                    className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500 bg-white resize-none"
                />
            </div>
        </Modal>
    );
};

export default AddStockModal;