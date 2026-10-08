// src/App.jsx
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/layout/Layout';
import InventoryControl from './pages/InventoryControl';
import AddStockModal from './components/inventory/AddStockModal';
import ManageThresholdsModal from './components/inventory/ManageThresholdsModal';
import EditThresholdModal from './components/inventory/EditThresholdModal';
import DailyPriceUpdateModal from './components/inventory/DailyPriceUpdateModal';
import StockAlertsModal from './components/inventory/StockAlertsModal';
import InventoryGlanceModal from './components/inventory/InventoryGlanceModal';
import MovementDetailModal from './components/inventory/MovementDetailModal';
import InventoryGuideModal from './components/inventory/InventoryGuideModal';
import SettingsModal from './components/inventory/SettingsModal'; // <-- NEW
import ConfirmDialog from './components/common/ConfirmDialog';

function App() {
  return (
    <BrowserRouter>
      {/* Primary Modals */}
      <AddStockModal />
      <ManageThresholdsModal />
      <DailyPriceUpdateModal />
      <StockAlertsModal />
      <InventoryGlanceModal />
      <MovementDetailModal />
      <InventoryGuideModal />
      <SettingsModal />

      {/* Sub-modal (renders on top) */}
      <EditThresholdModal />

      {/* Global Confirm Dialog (always on top) */}
      <ConfirmDialog />

      <Routes>
        <Route element={<Layout />}>
          <Route path="/inventory/control" element={<InventoryControl />} />
          <Route path="/" element={<Navigate to="/inventory/control" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;