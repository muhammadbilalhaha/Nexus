// src/components/layout/Sidebar.jsx
import React from 'react';
import { useDispatch } from 'react-redux';
import { openModal } from '../../features/uiSlice';
import {
  Boxes, Settings, ChevronDown, Sparkles, User, X
} from 'lucide-react';

const Sidebar = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();

  const handleOpenGuide = () => {
    dispatch(openModal({ modalName: 'isGuideModalOpen' }));
  };

  const handleOpenSettings = () => {
    dispatch(openModal({ modalName: 'isSettingsModalOpen' }));
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar Container */}
      <aside className={`
        fixed inset-y-0 left-0 z-50 w-[260px] bg-white border-r border-border-subtle flex flex-col h-full shrink-0
        transform transition-transform duration-300 ease-in-out
        lg:relative lg:translate-x-0
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>

        {/* Logo Section */}
        <div className="h-16 flex items-center justify-between px-6 border-b border-border-subtle shrink-0">
          <div className="flex items-center gap-2 text-brand-600">
            <Boxes size={28} strokeWidth={2.5} />
            <span className="text-xl font-bold text-gray-900 tracking-tight">nexus.</span>
          </div>
          <button onClick={onClose} className="lg:hidden text-gray-400 hover:text-gray-600">
            <X size={20} />
          </button>
        </div>

        {/* Workspace Switcher */}
        <div className="p-4 border-b border-border-subtle shrink-0">
          <button className="w-full flex items-center justify-between p-2 rounded-lg bg-gray-50 border border-gray-200 hover:bg-gray-100 transition-colors">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded bg-brand-100 text-brand-600 flex items-center justify-center font-bold text-sm">
                FM
              </div>
              <div className="text-left">
                <p className="text-sm font-semibold text-gray-900 leading-tight">FreshMart</p>
                <p className="text-xs text-gray-500">Main workspace</p>
              </div>
            </div>
            <ChevronDown size={16} className="text-gray-400" />
          </button>
        </div>

        {/* Navigation */}
        <div className="flex-1 overflow-y-auto py-4 px-3">
          <div className="px-3 mb-2">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Workspace</p>
          </div>

          <button className="w-full flex items-center gap-3 px-3 py-2.5 bg-brand-50 text-brand-600 font-medium rounded-lg transition-colors">
            <Boxes size={18} />
            <span>Inventory Manager</span>
          </button>
        </div>

        {/* Guide Promo Card */}
        <div className="p-4 shrink-0">
          <div className="bg-brand-50 border border-brand-100 rounded-xl p-4 relative overflow-hidden">
            <h4 className="text-sm font-semibold text-gray-900 mb-1">A little help goes a long way.</h4>
            <p className="text-xs text-gray-600 mb-3">Your guide to keeping inventory organized and in balance.</p>
            <button
              onClick={handleOpenGuide}
              className="text-xs font-semibold text-brand-600 hover:text-brand-700 flex items-center gap-1"
            >
              Explore the help center →
            </button>
          </div>
        </div>

        {/* User Profile */}
        <div className="p-4 border-t border-border-subtle flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-500">
              <User size={16} />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900">Olivia Parker</p>
              <p className="text-xs text-gray-500">Inventory Manager</p>
            </div>
          </div>
          <button
            onClick={handleOpenSettings}
            title="Settings"
            className="p-1 rounded-md text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors"
          >
            <Settings size={16} />
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;