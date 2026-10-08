// src/components/inventory/StockInTable.jsx
import React, { useState, useMemo, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deleteMovements, setActiveTab } from '../../features/inventorySlice';
import { useConfirm } from '../../hooks/useConfirm';
import InventoryFilters from './InventoryFilters';
import TableRow from './TableRow';
import { 
  ArrowDownToLine, ArrowUpFromLine, SlidersHorizontal, 
  AlertOctagon, Clock, ChevronLeft, ChevronRight, Trash2, X 
} from 'lucide-react';

const getPresetCutoff = (preset, movements) => {
  if (preset === 'All time' || !movements || movements.length === 0) return null;
  const latestTs = Math.max(...movements.map(m => new Date(m.date).getTime()));
  const now = new Date(latestTs);
  switch (preset) {
    case 'Last 7 days':   { const d = new Date(now); d.setDate(d.getDate() - 7); return d; }
    case 'Last 30 days':  { const d = new Date(now); d.setDate(d.getDate() - 30); return d; }
    case 'Last 3 months': { const d = new Date(now); d.setMonth(d.getMonth() - 3); return d; }
    case 'Last 6 months': { const d = new Date(now); d.setMonth(d.getMonth() - 6); return d; }
    case 'Last 1 year':   { const d = new Date(now); d.setFullYear(d.getFullYear() - 1); return d; }
    default:              return null;
  }
};

const StockInTable = () => {
  const dispatch = useDispatch();
  const confirm = useConfirm();

  // Local: pagination + selection
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [selectedIds, setSelectedIds] = useState([]);

  // Redux: activeTab + filters + data
  const activeTab = useSelector((state) => state.inventory.activeTab);
  const items = useSelector((state) => state.inventory.items);
  const movements = useSelector((state) => state.inventory.movements);
  const filters = useSelector((state) => state.inventory.filters);

  const counts = useMemo(() => ({
    'Stock In':   movements.filter(m => m.type === 'Stock In').length,
    'Stock Out':  movements.filter(m => m.type === 'Stock Out').length,
    'Adjustment': movements.filter(m => m.type === 'Adjustment').length,
    'Damaged':    movements.filter(m => m.type === 'Damaged').length,
    'Expired':    movements.filter(m => m.type === 'Expired').length,
  }), [movements]);

  const tabs = [
    { name: 'Stock In',   icon: <ArrowDownToLine size={14} /> },
    { name: 'Stock Out',  icon: <ArrowUpFromLine size={14} /> },
    { name: 'Adjustment', icon: <SlidersHorizontal size={14} /> },
    { name: 'Damaged',    icon: <AlertOctagon size={14} /> },
    { name: 'Expired',    icon: <Clock size={14} /> },
  ];

  useEffect(() => {
    setCurrentPage(1);
  }, [activeTab, filters.search, filters.category, filters.product, filters.datePreset, pageSize]);

  useEffect(() => {
    setSelectedIds([]);
  }, [activeTab, filters.search, filters.category, filters.product, filters.datePreset]);

  const filteredRows = useMemo(() => {
    let rows = movements.filter(m => m.type === activeTab);
    const cutoffDate = getPresetCutoff(filters.datePreset, movements);

    rows = rows.filter(m => {
      const product = items.find(i => i.id === m.productId);
      if (!product) return false;

      const matchesSearch = 
        product.name.toLowerCase().includes(filters.search.toLowerCase()) ||
        product.id.toLowerCase().includes(filters.search.toLowerCase()) ||
        product.barcode.includes(filters.search) ||
        m.id.toLowerCase().includes(filters.search.toLowerCase());

      const matchesCategory = filters.category === 'All' || product.category === filters.category;
      const matchesProduct  = filters.product === 'All'  || product.name === filters.product;
      const matchesDate     = !cutoffDate || new Date(m.date) >= cutoffDate;

      return matchesSearch && matchesCategory && matchesProduct && matchesDate;
    });

    rows = [...rows].sort((a, b) => new Date(b.date) - new Date(a.date));

    return rows.map(m => ({
      ...m,
      product: items.find(i => i.id === m.productId),
    }));
  }, [movements, items, activeTab, filters]);

  const totalPages = Math.max(1, Math.ceil(filteredRows.length / pageSize));
  const paginatedRows = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredRows.slice(start, start + pageSize);
  }, [filteredRows, currentPage, pageSize]);

  const pageIds = paginatedRows.map(r => r.id);
  const allOnPageSelected = pageIds.length > 0 && pageIds.every(id => selectedIds.includes(id));
  const someOnPageSelected = pageIds.some(id => selectedIds.includes(id)) && !allOnPageSelected;

  const toggleSelectAllOnPage = () => {
    if (allOnPageSelected) {
      setSelectedIds(prev => prev.filter(id => !pageIds.includes(id)));
    } else {
      setSelectedIds(prev => [...new Set([...prev, ...pageIds])]);
    }
  };

  const handleRowSelect = (id, checked) => {
    setSelectedIds(prev => 
      checked ? [...new Set([...prev, id])] : prev.filter(x => x !== id)
    );
  };

  const handleBulkDelete = () => {
    if (selectedIds.length === 0) return;
    const idsToDelete = [...selectedIds];
    confirm({
      title: `Delete ${idsToDelete.length} movement${idsToDelete.length > 1 ? 's' : ''}?`,
      message: 'This will permanently delete the selected movements and reverse their stock effects. This action cannot be undone.',
      confirmLabel: `Delete ${idsToDelete.length}`,
      variant: 'danger',
      onConfirm: () => {
        dispatch(deleteMovements({ movementIds: idsToDelete }));
        setSelectedIds([]);
      }
    });
  };

  const startRecord = filteredRows.length === 0 ? 0 : (currentPage - 1) * pageSize + 1;
  const endRecord   = Math.min(currentPage * pageSize, filteredRows.length);

  return (
    <div id="stock-table" className="bg-white border border-border-subtle rounded-xl shadow-sm overflow-hidden">
      
      {/* Tabs */}
      <div className="border-b border-border-subtle flex overflow-x-auto no-scrollbar">
        {tabs.map((tab) => (
          <button
            key={tab.name}
            onClick={() => dispatch(setActiveTab(tab.name))}
            className={`flex items-center gap-2 px-5 py-3.5 text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${
              activeTab === tab.name
                ? 'border-brand-600 text-brand-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            {tab.icon}
            {tab.name}
            <span className={`text-xs px-1.5 py-0.5 rounded-full ${
              activeTab === tab.name ? 'bg-brand-50 text-brand-600' : 'bg-gray-100 text-gray-500'
            }`}>
              {counts[tab.name] || 0}
            </span>
          </button>
        ))}
      </div>

      <InventoryFilters />

      <div className="px-4 py-3 border-b border-border-subtle flex items-center justify-between bg-white">
        <h3 className="text-sm font-semibold text-gray-900">{activeTab} History</h3>
        <span className="text-xs text-gray-500">{filteredRows.length} records</span>
      </div>

      {selectedIds.length > 0 && (
        <div className="px-4 py-2.5 bg-brand-50 border-b border-brand-100 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-sm font-medium text-brand-700">
              {selectedIds.length} selected
            </span>
            <button 
              onClick={() => setSelectedIds([])}
              className="text-xs text-brand-600 hover:text-brand-800 flex items-center gap-1"
            >
              <X size={12} />
              Clear
            </button>
          </div>
          <button
            onClick={handleBulkDelete}
            className="flex items-center gap-1.5 bg-red-500 hover:bg-red-600 text-white text-xs font-medium px-3 py-1.5 rounded-lg transition-colors shadow-sm"
          >
            <Trash2 size={13} />
            Delete Selected
          </button>
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 text-xs font-medium text-gray-500 uppercase tracking-wider">
              <th className="pl-4 pr-2 py-3 w-10">
                <input 
                  type="checkbox"
                  checked={allOnPageSelected}
                  ref={(el) => { if (el) el.indeterminate = someOnPageSelected; }}
                  onChange={toggleSelectAllOnPage}
                  className="rounded border-gray-300 text-brand-600 focus:ring-brand-500 cursor-pointer"
                />
              </th>
              <th className="px-2 py-3">Reference ID</th>
              <th className="px-4 py-3">Product Name</th>
              <th className="px-4 py-3">Category</th>
              <th className="px-4 py-3">Date & time</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Qty</th>
              <th className="px-4 py-3">Company / Supplier</th>
              <th className="px-4 py-3">Notes</th>
              <th className="px-4 py-3 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border-subtle">
            {paginatedRows.length > 0 ? (
              paginatedRows.map((row) => (
                <TableRow 
                  key={row.id} 
                  movement={row} 
                  isSelected={selectedIds.includes(row.id)}
                  onSelectChange={handleRowSelect}
                />
              ))
            ) : (
              <tr>
                <td colSpan="10" className="px-4 py-12 text-center text-gray-500 text-sm">
                  No {activeTab.toLowerCase()} records found matching your filters.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="px-4 py-3 border-t border-border-subtle flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white">
        <div className="flex items-center gap-4 text-xs text-gray-500">
          <span>
            Showing <span className="font-semibold text-gray-700">{startRecord}</span>
            {' '}to{' '}
            <span className="font-semibold text-gray-700">{endRecord}</span>
            {' '}of{' '}
            <span className="font-semibold text-gray-700">{filteredRows.length}</span>
          </span>

          <div className="flex items-center gap-1.5">
            <span>Rows per page:</span>
            <select
              value={pageSize}
              onChange={(e) => setPageSize(Number(e.target.value))}
              className="border border-gray-200 rounded-md px-1.5 py-0.5 text-xs bg-white text-gray-700 cursor-pointer focus:outline-none focus:ring-2 focus:ring-brand-500"
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={25}>25</option>
              <option value={50}>50</option>
            </select>
          </div>
        </div>

        <div className="flex items-center gap-1">
          <button
            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="p-1.5 rounded-md border border-gray-200 text-gray-500 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronLeft size={14} />
          </button>

          {(() => {
            const pages = [];
            const maxVisible = 5;
            let start = Math.max(1, currentPage - Math.floor(maxVisible / 2));
            let end = Math.min(totalPages, start + maxVisible - 1);
            if (end - start + 1 < maxVisible) start = Math.max(1, end - maxVisible + 1);

            if (start > 1) {
              pages.push(<PageBtn key={1} page={1} active={currentPage === 1} onClick={setCurrentPage} />);
              if (start > 2) pages.push(<span key="s1" className="px-1 text-gray-400 text-xs">…</span>);
            }
            for (let i = start; i <= end; i++) {
              pages.push(<PageBtn key={i} page={i} active={currentPage === i} onClick={setCurrentPage} />);
            }
            if (end < totalPages) {
              if (end < totalPages - 1) pages.push(<span key="s2" className="px-1 text-gray-400 text-xs">…</span>);
              pages.push(<PageBtn key={totalPages} page={totalPages} active={currentPage === totalPages} onClick={setCurrentPage} />);
            }
            return pages;
          })()}

          <button
            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="p-1.5 rounded-md border border-gray-200 text-gray-500 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronRight size={14} />
          </button>
        </div>
      </div>
    </div>
  );
};

const PageBtn = ({ page, active, onClick }) => (
  <button
    onClick={() => onClick(page)}
    className={`min-w-[28px] h-7 px-2 text-xs rounded-md border transition-colors ${
      active
        ? 'bg-brand-600 border-brand-600 text-white font-medium'
        : 'border-gray-200 text-gray-600 hover:bg-gray-50'
    }`}
  >
    {page}
  </button>
);

export default StockInTable;