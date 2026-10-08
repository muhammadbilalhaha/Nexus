// src/components/inventory/TableRow.jsx
import React from 'react';
import { useDispatch } from 'react-redux';
import { openModal } from '../../features/uiSlice';
import RowActionMenu from './RowActionMenu';
import { Milk, Croissant, Coffee, Package, Plus } from 'lucide-react';

const TableRow = ({ movement, isSelected, onSelectChange }) => {
  const dispatch = useDispatch();
  const { product, ...mov } = movement;

  const handleRowClick = () => {
    dispatch(openModal({ 
      modalName: 'isMovementDetailModalOpen', 
      movementId: mov.id 
    }));
  };

  const handleQuickAdd = (e) => {
    e.stopPropagation();
    dispatch(openModal({ modalName: 'isAddStockModalOpen', productId: product.id }));
  };

  const getIcon = (category) => {
    const props = { size: 20, strokeWidth: 1.5 };
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
        return <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-medium bg-status-green-bg text-status-green-text border border-emerald-100">In stock</span>;
      case 'low-stock':
        return <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-medium bg-status-orange-bg text-status-orange-text border border-orange-100">Low stock</span>;
      case 'out-of-stock':
        return <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-medium bg-status-red-bg text-status-red-text border border-red-100">Out of stock</span>;
      default: return null;
    }
  };

  const formatQty = () => {
    if (mov.type === 'Stock In')   return { text: `+${mov.qty}`, cls: 'text-emerald-600' };
    if (mov.type === 'Stock Out')  return { text: `-${mov.qty}`, cls: 'text-red-500' };
    if (mov.type === 'Adjustment') return { text: mov.qty >= 0 ? `+${mov.qty}` : `${mov.qty}`, cls: 'text-blue-600' };
    if (mov.type === 'Damaged')    return { text: `${mov.qty}`, cls: 'text-red-500' };
    if (mov.type === 'Expired')    return { text: `${mov.qty}`, cls: 'text-red-500' };
    return { text: mov.qty, cls: 'text-gray-700' };
  };

  const qty = formatQty();

  return (
    <tr 
      onClick={handleRowClick}
      className={`transition-colors group cursor-pointer ${
        isSelected ? 'bg-brand-50/40' : 'hover:bg-gray-50/50'
      }`}
    >
      <td className="pl-4 pr-2 py-3 w-10" onClick={(e) => e.stopPropagation()}>
        <input 
          type="checkbox"
          checked={isSelected}
          onChange={(e) => onSelectChange(mov.id, e.target.checked)}
          className="rounded border-gray-300 text-brand-600 focus:ring-brand-500 cursor-pointer" 
        />
      </td>
      
      <td className="px-2 py-3 text-xs text-gray-500 font-mono whitespace-nowrap">
        #{mov.id}
      </td>
      
      <td className="px-4 py-3 min-w-[200px]">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-gray-100 flex items-center justify-center text-gray-500 shrink-0">
            {getIcon(product.category)}
          </div>
          <div>
            <p className="text-sm font-medium text-gray-900">{product.name}</p>
            <p className="text-xs text-gray-500">{product.variant} • {product.id}</p>
          </div>
        </div>
      </td>
      
      <td className="px-4 py-3 text-sm text-gray-600 whitespace-nowrap">
        <p>{product.category}</p>
        <p className="text-xs text-gray-400">{product.subCategory}</p>
      </td>
      
      <td className="px-4 py-3 text-sm text-gray-600 whitespace-nowrap">
        <p>{new Date(mov.date).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}</p>
        <p className="text-xs text-gray-400">{new Date(mov.date).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })}</p>
      </td>
      
      <td className="px-4 py-3 whitespace-nowrap">
        {getStatusBadge(product.status)}
      </td>
      
      <td className={`px-4 py-3 text-sm font-medium whitespace-nowrap ${qty.cls}`}>
        {qty.text}
      </td>
      
      <td className="px-4 py-3 text-sm text-gray-600 whitespace-nowrap">
        {mov.company}
      </td>
      
      <td className="px-4 py-3 text-sm text-gray-500 max-w-[150px] truncate">
        {mov.notes || '—'}
      </td>
      
      <td className="px-4 py-3 text-right" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-end gap-1">
          <button 
            onClick={handleQuickAdd}
            title="Add stock"
            className="p-1.5 rounded-md text-brand-600 bg-brand-50 hover:bg-brand-100 transition-colors"
          >
            <Plus size={14} />
          </button>
          
          <RowActionMenu movement={mov} product={product} />
        </div>
      </td>
    </tr>
  );
};

export default TableRow;