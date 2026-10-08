// src/features/inventorySlice.js
import { createSlice } from '@reduxjs/toolkit';
import { initialInventory, initialMovements } from '../utils/dummyData';

const initialState = {
  items: initialInventory,
  movements: initialMovements,
  activeTab: 'Stock In', // <-- moved from local state
  filters: {
    search: '',
    category: 'All',
    product: 'All',
    datePreset: 'All time',
    itemType: 'All'
  }
};

const inventorySlice = createSlice({
  name: 'inventory',
  initialState,
  reducers: {
    addStock: (state, action) => {
      const { productId, qty, company, notes } = action.payload;
      const product = state.items.find(item => item.id === productId);
      if (product) {
        product.stock += Number(qty);
        if (product.stock === 0) product.status = 'out-of-stock';
        else if (product.stock <= product.threshold) product.status = 'low-stock';
        else product.status = 'in-stock';
        product.lastUpdated = new Date().toISOString();
        state.movements.unshift({
          id: `SIN-${Math.floor(Math.random() * 10000)}`,
          productId,
          type: "Stock In",
          qty: Number(qty),
          date: new Date().toISOString(),
          company: company || 'Unknown',
          notes: notes || ''
        });
      }
    },
    updateThreshold: (state, action) => {
      const { productId, newThreshold } = action.payload;
      const product = state.items.find(item => item.id === productId);
      if (product) {
        product.threshold = Number(newThreshold);
        if (product.stock === 0) product.status = 'out-of-stock';
        else if (product.stock <= product.threshold) product.status = 'low-stock';
        else product.status = 'in-stock';
      }
    },
    updatePrices: (state, action) => {
      const { productId, purchasePrice, sellingPrice } = action.payload;
      const product = state.items.find(item => item.id === productId);
      if (product) {
        product.purchasePrice = Number(purchasePrice);
        product.sellingPrice = Number(sellingPrice);
      }
    },
    setActiveTab: (state, action) => {
      state.activeTab = action.payload;
    },
    setFilter: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    resetFilters: (state) => {
      state.filters = initialState.filters;
    },
    // NEW: Set both tab and date preset at once (used by stat cards)
    setTabAndPreset: (state, action) => {
      const { tab, preset } = action.payload;
      state.activeTab = tab;
      state.filters.datePreset = preset;
    },
    replaceInventory: (state, action) => {
      const { items, movements } = action.payload;
      state.items = items;
      state.movements = movements;
    },
    markAsDamaged: (state, action) => {
      const { movementId } = action.payload;
      const movement = state.movements.find(m => m.id === movementId);
      if (movement && movement.type !== 'Damaged') {
        const product = state.items.find(i => i.id === movement.productId);
        if (product && movement.type === 'Stock In') {
          product.stock = Math.max(0, product.stock - movement.qty);
        }
        movement.type = 'Damaged';
        movement.qty = -Math.abs(movement.qty);
        movement.notes = (movement.notes || '') + ' — Reclassified as damaged';
        movement.date = new Date().toISOString();
      }
    },
    deleteMovements: (state, action) => {
      const { movementIds } = action.payload;
      movementIds.forEach(id => {
        const movement = state.movements.find(m => m.id === id);
        if (!movement) return;
        const product = state.items.find(i => i.id === movement.productId);
        if (product) {
          if (movement.type === 'Stock In') {
            product.stock = Math.max(0, product.stock - movement.qty);
          }
          if (['Stock Out', 'Damaged', 'Expired'].includes(movement.type)) {
            product.stock += Math.abs(movement.qty);
          }
          if (movement.type === 'Adjustment') {
            product.stock = Math.max(0, product.stock - movement.qty);
          }
          if (product.stock === 0) product.status = 'out-of-stock';
          else if (product.stock <= product.threshold) product.status = 'low-stock';
          else product.status = 'in-stock';
        }
      });
      state.movements = state.movements.filter(m => !movementIds.includes(m.id));
    }
  }
});

export const { 
  addStock, 
  updateThreshold, 
  updatePrices, 
  setActiveTab,
  setFilter, 
  resetFilters,
  setTabAndPreset,
  replaceInventory,
  markAsDamaged,
  deleteMovements
} = inventorySlice.actions;

export default inventorySlice.reducer;