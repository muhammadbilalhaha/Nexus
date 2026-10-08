// src/features/uiSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isAddStockModalOpen: false,
  isThresholdModalOpen: false,
  isEditThresholdModalOpen: false,
  isPriceUpdateModalOpen: false,
  isGuideModalOpen: false,
  isAlertsModalOpen: false,
  isGlanceModalOpen: false,
  isMovementDetailModalOpen: false,
  selectedProductId: null,
  selectedMovementId: null,
  isSettingsModalOpen: false,

  // Confirm dialog state
  confirmDialog: {
    isOpen: false,
    title: '',
    message: '',
    confirmLabel: 'Confirm',
    cancelLabel: 'Cancel',
    variant: 'danger', // 'danger' | 'default'
    onConfirm: null,   // callback function
  }
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    openModal: (state, action) => {
      const { modalName, productId = null, movementId = null } = action.payload;
      state[modalName] = true;
      if (productId) state.selectedProductId = productId;
      if (movementId) state.selectedMovementId = movementId;
    },
    closeModal: (state, action) => {
      const { modalName } = action.payload;
      state[modalName] = false;
      if (modalName === 'isEditThresholdModalOpen' || modalName === 'isMovementDetailModalOpen') {
        state.selectedProductId = null;
        state.selectedMovementId = null;
      }
    },
    closeAllModals: () => initialState,

    // Confirm dialog actions
    showConfirm: (state, action) => {
      const { 
        title = 'Are you sure?', 
        message = '', 
        confirmLabel = 'Confirm', 
        cancelLabel = 'Cancel',
        variant = 'danger',
        onConfirm 
      } = action.payload;
      
      // Note: Redux Toolkit allows non-serializable values like functions in state 
      // as long as you don't need devtools time-travel on them.
      state.confirmDialog = {
        isOpen: true,
        title,
        message,
        confirmLabel,
        cancelLabel,
        variant,
        onConfirm
      };
    },
    hideConfirm: (state) => {
      state.confirmDialog = initialState.confirmDialog;
    }
  }
});

export const { 
  openModal, 
  closeModal, 
  closeAllModals,
  showConfirm,
  hideConfirm
} = uiSlice.actions;

export default uiSlice.reducer;