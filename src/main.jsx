// src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './app/store';
import App from './App.jsx';
import './index.css';

// Sync Redux state to LocalStorage
store.subscribe(() => {
  const state = store.getState();
  try {
    localStorage.setItem('stockly_inventory', JSON.stringify(state.inventory.items));
    localStorage.setItem('stockly_movements', JSON.stringify(state.inventory.movements));
  } catch (error) {
    console.error("Failed to save state to local storage", error);
  }
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
);