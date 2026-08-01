import React from 'react';

export interface NavbarProps {
  userEmail?: string;
  onLogout?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ userEmail, onLogout }) => {
  return (
    <header className="h-16 border-b border-slate-800 bg-slate-900/60 backdrop-blur-md px-6 flex items-center justify-between sticky top-0 z-40">
      <div className="flex items-center space-x-3">
        <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center font-bold text-white shadow-lg shadow-indigo-600/30">
          P
        </div>
        <span className="font-semibold text-slate-100 tracking-tight">Pathway Platform</span>
      </div>

      <div className="flex items-center space-x-4">
        {userEmail ? (
          <>
            <span className="text-xs text-slate-400 font-medium">{userEmail}</span>
            <button
              onClick={onLogout}
              className="text-xs px-3 py-1.5 rounded-md bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
            >
              Sign Out
            </button>
          </>
        ) : (
          <span className="text-xs px-2.5 py-1 rounded bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 font-mono">
            Modular Architecture
          </span>
        )}
      </div>
    </header>
  );
};
