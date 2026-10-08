// src/components/inventory/SettingsModal.jsx
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { closeModal } from '../../features/uiSlice';
import Modal from '../common/Modal';
import {
    Info,
    Boxes,
    Package,
    GitBranch,
    AlertTriangle
} from 'lucide-react';

const SettingsModal = () => {
    const dispatch = useDispatch();
    const isOpen = useSelector((state) => state.ui.isSettingsModalOpen);
    const items = useSelector((state) => state.inventory.items);
    const movements = useSelector((state) => state.inventory.movements);

    const handleClose = () => dispatch(closeModal({ modalName: 'isSettingsModalOpen' }));

    // Compute dynamic stats for the About section
    const totalProducts = items.length;
    const totalMovements = movements.length;
    const activeAlerts = items.filter(
        (i) => i.status === 'low-stock' || i.status === 'out-of-stock'
    ).length;

    return (
        <Modal
            isOpen={isOpen}
            onClose={handleClose}
            title="Settings"
            maxWidth="max-w-md"
        >
            {/* Section Header */}
            <div className="flex items-center gap-2 mb-4">
                <div className="w-7 h-7 rounded-lg bg-brand-50 text-brand-600 flex items-center justify-center">
                    <Info size={14} />
                </div>
                <h3 className="text-sm font-semibold text-gray-900">About Nexus Inventory</h3>
            </div>

            {/* Description */}
            <p className="text-xs text-gray-500 leading-relaxed mb-5">
                Nexus is a lightweight, browser-based inventory manager for small teams.
                It tracks products, movements, thresholds, and prices — all stored locally
                in your browser. No backend, no sign-in, no data leaving your device.
            </p>

            {/* Dynamic Stats */}
            <div className="grid grid-cols-3 gap-2 mb-5">
                <StatBox
                    icon={<Package size={14} />}
                    iconBg="bg-brand-50 text-brand-600"
                    label="Products"
                    value={totalProducts}
                />
                <StatBox
                    icon={<GitBranch size={14} />}
                    iconBg="bg-emerald-50 text-emerald-600"
                    label="Movements"
                    value={totalMovements}
                />
                <StatBox
                    icon={<AlertTriangle size={14} />}
                    iconBg="bg-orange-50 text-orange-600"
                    label="Alerts"
                    value={activeAlerts}
                />
            </div>

            {/* Meta Info */}
            <div className="border border-border-subtle rounded-xl divide-y divide-border-subtle mb-4">
                <MetaRow label="Version" value="0.1.0 (prototype)" />
                <MetaRow label="Storage" value="Local browser (LocalStorage)" />
                <MetaRow label="Workspace" value="FreshMart — Main workspace" />
                <MetaRow label="Owner" value="Olivia Parker" />
            </div>

            {/* Footnote */}
            <div className="bg-gray-50 border border-border-subtle rounded-lg p-3">
                <p className="text-[11px] text-gray-500 leading-relaxed">
                    Sales integration and warehouse transfers are not connected in this
                    prototype. Stock Transfer is planned for Phase 2. All changes persist
                    in this browser until local storage is cleared.
                </p>
            </div>
        </Modal>
    );
};

// Helper rows
const StatBox = ({ icon, iconBg, label, value }) => (
    <div className="border border-border-subtle rounded-lg p-2.5 bg-white">
        <div className={`w-6 h-6 rounded-md flex items-center justify-center mb-1.5 ${iconBg}`}>
            {icon}
        </div>
        <p className="text-[10px] text-gray-500 uppercase tracking-wider font-medium">{label}</p>
        <p className="text-base font-bold text-gray-900 mt-0.5">{value}</p>
    </div>
);

const MetaRow = ({ label, value }) => (
    <div className="flex items-center justify-between px-3 py-2">
        <span className="text-xs text-gray-500">{label}</span>
        <span className="text-xs font-medium text-gray-800">{value}</span>
    </div>
);

export default SettingsModal;