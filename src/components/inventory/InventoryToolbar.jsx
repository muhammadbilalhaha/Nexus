// src/components/inventory/InventoryToolbar.jsx
import React, { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { openModal } from '../../features/uiSlice';
import { replaceInventory } from '../../features/inventorySlice';
import { 
  SlidersHorizontal, 
  Bell, 
  Download, 
  Upload 
} from 'lucide-react';

const InventoryToolbar = () => {
  const dispatch = useDispatch();
  const fileInputRef = useRef(null);

  const items = useSelector((state) => state.inventory.items);
  const movements = useSelector((state) => state.inventory.movements);

  const alertCount = items.filter(
    (item) => item.status === 'low-stock' || item.status === 'out-of-stock'
  ).length;

  // --- Export Handler ---
  const handleExport = () => {
    const data = {
      version: 1,
      exportedAt: new Date().toISOString(),
      items,
      movements,
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `nexus-inventory-${new Date().toISOString().slice(0, 10)}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  // --- Import Handlers ---
  const handleImportClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const parsed = JSON.parse(e.target.result);
        
        // Validate structure
        if (!parsed.items || !Array.isArray(parsed.items) || !parsed.movements || !Array.isArray(parsed.movements)) {
          alert('Invalid file: must contain "items" and "movements" arrays.');
          return;
        }

        // Basic field validation on first item
        const sample = parsed.items[0];
        if (!sample.id || !sample.name || typeof sample.stock !== 'number') {
          alert('Invalid file: items are missing required fields (id, name, stock).');
          return;
        }

        dispatch(replaceInventory({
          items: parsed.items,
          movements: parsed.movements,
        }));

        alert(`Successfully imported ${parsed.items.length} items and ${parsed.movements.length} movements.`);
      } catch (err) {
        console.error('Import error:', err);
        alert('Failed to parse file. Please ensure it is valid JSON.');
      } finally {
        // Reset input so same file can be selected again
        event.target.value = '';
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="flex flex-wrap items-center justify-end gap-2 mb-5">
      
      {/* Manage Thresholds */}
      <button 
        onClick={() => dispatch(openModal({ modalName: 'isThresholdModalOpen' }))}
        className="flex items-center gap-2 bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 text-sm font-medium px-3.5 py-2 rounded-lg transition-colors shadow-sm"
      >
        <SlidersHorizontal size={15} className="text-gray-500" />
        Manage Thresholds
      </button>

      {/* Stock Alerts */}
      <button 
        onClick={() => dispatch(openModal({ modalName: 'isAlertsModalOpen' }))}
        className="flex items-center gap-2 bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 text-sm font-medium px-3.5 py-2 rounded-lg transition-colors shadow-sm"
      >
        <Bell size={15} className="text-gray-500" />
        Stock Alerts
        {alertCount > 0 && (
          <span className="bg-orange-100 text-orange-700 text-[11px] font-bold px-1.5 py-0.5 rounded">
            {alertCount}
          </span>
        )}
      </button>

      <div className="w-px h-7 bg-gray-200 mx-1 hidden sm:block"></div>

      {/* Export */}
      <button 
        onClick={handleExport}
        className="flex items-center gap-2 bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 text-sm font-medium px-3.5 py-2 rounded-lg transition-colors shadow-sm"
      >
        <Download size={15} className="text-gray-500" />
        Export
      </button>

      {/* Import */}
      <button 
        onClick={handleImportClick}
        className="flex items-center gap-2 bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 text-sm font-medium px-3.5 py-2 rounded-lg transition-colors shadow-sm"
      >
        <Upload size={15} className="text-gray-500" />
        Import
      </button>

      {/* Hidden File Input for Import */}
      <input 
        ref={fileInputRef}
        type="file"
        accept="application/json,.json"
        onChange={handleFileChange}
        className="hidden"
      />
    </div>
  );
};

export default InventoryToolbar;