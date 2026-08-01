import React from 'react';
import { cn } from '@/utils/cn';

export interface SidebarProps {
  activeTab: string;
  onSelectTab: (tab: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ activeTab, onSelectTab }) => {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard Module', icon: '📊' },
    { id: 'user-profile', label: 'User Profile Module', icon: '👤' },
    { id: 'auth', label: 'Auth Module', icon: '🔒' },
  ];

  return (
    <aside className="w-64 border-r border-slate-800 bg-slate-950/50 p-4 flex flex-col justify-between hidden md:flex min-h-[calc(100vh-4rem)]">
      <div className="space-y-1">
        <p className="px-3 text-[10px] font-semibold tracking-wider text-slate-500 uppercase mb-3">
          Feature Modules
        </p>
        {navItems.map((item) => {
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onSelectTab(item.id)}
              className={cn(
                'w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg text-xs font-medium transition-all text-left',
                isActive
                  ? 'bg-indigo-600/10 text-indigo-400 border border-indigo-500/20 font-semibold'
                  : 'text-slate-400 hover:bg-slate-900 hover:text-slate-200'
              )}
            >
              <span className="text-sm">{item.icon}</span>
              <span>{item.label}</span>
            </button>
          );
        })}
      </div>

      <div className="p-3 bg-slate-900/40 border border-slate-800/60 rounded-lg">
        <p className="text-[11px] text-slate-400 font-mono">
          Architecture: Feature-Driven
        </p>
        <p className="text-[10px] text-slate-500 mt-1">
          Encapsulated barrel exports enabled
        </p>
      </div>
    </aside>
  );
};
