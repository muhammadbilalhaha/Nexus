// src/hooks/useConfirm.js
import { useDispatch } from 'react-redux';
import { showConfirm } from '../features/uiSlice';

export const useConfirm = () => {
  const dispatch = useDispatch();

  return ({ 
    title = 'Are you sure?', 
    message = '', 
    confirmLabel = 'Confirm', 
    cancelLabel = 'Cancel',
    variant = 'danger', 
    onConfirm 
  }) => {
    dispatch(showConfirm({ 
      title, message, confirmLabel, cancelLabel, variant, onConfirm 
    }));
  };
};