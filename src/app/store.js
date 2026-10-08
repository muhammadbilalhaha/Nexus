// src/app/store.js
import { configureStore } from '@reduxjs/toolkit';
import inventoryReducer from '../features/inventorySlice';
import uiReducer from '../features/uiSlice';

export const store = configureStore({
  reducer: {
    inventory: inventoryReducer,
    ui: uiReducer,
  },
});