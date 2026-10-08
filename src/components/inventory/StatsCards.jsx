// src/components/inventory/StatsCards.jsx
import React, { useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { openModal } from '../../features/uiSlice';
import { setTabAndPreset } from '../../features/inventorySlice';
import { Boxes, ArrowDownToLine, ArrowUpFromLine, AlertTriangle, ArrowRight } from 'lucide-react';

const StatsCards = () => {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.inventory.items);
  const movements = useSelector((state) => state.inventory.movements);

  const totalStock = items.reduce((sum, item) => sum + item.stock, 0);
  const totalProducts = items.length;

  const itemsNeedingAttention = items.filter(
    (item) => item.status === 'low-stock' || item.status === 'out-of-stock'
  );
  const lowStockCount = items.filter(i => i.status === 'low-stock').length;
  const outOfStockCount = items.filter(i => i.status === 'out-of-stock').length;

  // Today's movements
  const latestDate = useMemo(() => {
    if (movements.length === 0) return null;
    const latestTs = Math.max(...movements.map(m => new Date(m.date).getTime()));
    return new Date(latestTs).toDateString();
  }, [movements]);

  const stockInToday = useMemo(() => {
    if (!latestDate) return 0;
    return movements
      .filter(m => m.type === 'Stock In')
      .filter(m => new Date(m.date).toDateString() === latestDate)
      .reduce((sum, m) => sum + m.qty, 0);
  }, [movements, latestDate]);

  const stockOutToday = useMemo(() => {
    if (!latestDate) return 0;
    return movements
      .filter(m => m.type === 'Stock Out')
      .filter(m => new Date(m.date).toDateString() === latestDate)
      .reduce((sum, m) => sum + Math.abs(m.qty), 0);
  }, [movements, latestDate]);

  const stockInTodayCount = useMemo(() => {
    if (!latestDate) return 0;
    return movements
      .filter(m => m.type === 'Stock In')
      .filter(m => new Date(m.date).toDateString() === latestDate).length;
  }, [movements, latestDate]);

  const stockOutTodayCount = useMemo(() => {
    if (!latestDate) return 0;
    return movements
      .filter(m => m.type === 'Stock Out')
      .filter(m => new Date(m.date).toDateString() === latestDate).length;
  }, [movements, latestDate]);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      <StatCard 
        title="Total stock on hand"
        value={totalStock}
        unit="units"
        subtext={`${totalProducts} products & variants`}
        icon={<Boxes size={18} />}
        iconBg="bg-brand-50 text-brand-600"
        onClick={() => dispatch(openModal({ modalName: 'isGlanceModalOpen' }))}
      />
      <StatCard 
        title="Stock in today"
        value={stockInToday}
        unit="units"
        subtext={`${stockInTodayCount} movements received`}
        icon={<ArrowDownToLine size={18} />}
        iconBg="bg-emerald-50 text-emerald-600"
        onClick={() => {
          dispatch(setTabAndPreset({ tab: 'Stock In', preset: 'Last 7 days' }));
          document.getElementById('stock-table')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }}
      />
      <StatCard 
        title="Stock out today"
        value={stockOutToday}
        unit="units"
        subtext={`${stockOutTodayCount} movements sold`}
        icon={<ArrowUpFromLine size={18} />}
        iconBg="bg-blue-50 text-blue-600"
        onClick={() => {
          dispatch(setTabAndPreset({ tab: 'Stock Out', preset: 'Last 7 days' }));
          document.getElementById('stock-table')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }}
      />
      <StatCard 
        title="Items needing attention"
        value={itemsNeedingAttention.length.toString().padStart(2, '0')}
        unit="Items"
        subtext={`${lowStockCount} low stock - ${outOfStockCount} out of stock`}
        icon={<AlertTriangle size={18} />}
        iconBg="bg-orange-50 text-orange-600"
        isAlert={true}
        onClick={() => dispatch(openModal({ modalName: 'isThresholdModalOpen' }))}
      />
    </div>
  );
};

const StatCard = ({ title, value, unit, subtext, icon, iconBg, isAlert, onClick }) => {
  const isClickable = !!onClick;
  return (
    <div 
      onClick={onClick}
      className={`
        bg-white border border-border-subtle rounded-xl p-4 md:p-5 shadow-sm 
        transition-all duration-200
        ${isClickable 
          ? 'cursor-pointer hover:shadow-lg hover:border-brand-300 hover:-translate-y-0.5' 
          : 'hover:shadow-md'
        }
      `}
    >
      <div className="flex justify-between items-start mb-3 md:mb-4">
        <p className="text-xs md:text-sm font-medium text-gray-500 pr-2">{title}</p>
        <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${iconBg}`}>
          {icon}
        </div>
      </div>
      
      <div className="flex items-baseline gap-1.5 md:gap-2 mb-1.5 md:mb-2">
        <h3 className="text-2xl md:text-3xl font-bold text-gray-900">{value}</h3>
        <span className="text-xs md:text-sm font-medium text-gray-500">{unit}</span>
      </div>
      
      <div className="flex items-center justify-between">
        <p className={`text-[11px] md:text-xs truncate pr-2 ${isAlert && value !== '00' ? 'text-orange-600 font-medium' : 'text-gray-400'}`}>
          {subtext}
        </p>
        {isClickable && (
          <div className="text-gray-400 shrink-0">
            <ArrowRight size={14} />
          </div>
        )}
      </div>
    </div>
  );
};

export default StatsCards;