import React from 'react';
import { Download, Plus, Sun, Moon, RotateCcw, CheckCircle2, AlertCircle } from 'lucide-react';

export default function Header({
  isOnline,
  theme,
  toggleTheme,
  onAddClick,
  onExportClick,
  onResetClick
}) {
  return (
    <header className="header-container">
      <div className="header-content">
        <div className="logo-section">
          <div className="logo-badge">
            <span style={{ fontWeight: 800, fontSize: '1rem', color: '#fff' }}>HDFC</span>
          </div>
          <div>
            <div className="logo-title">
              HDFC <span>Career HUB</span>
            </div>
          </div>
          <div className="logo-subtitle">
            Powered by NIIT &bull; Live Tracker
          </div>
        </div>

        <div className="header-actions">
          {/* Connection Status Pill */}
          <div className="live-pill" title={isOnline ? 'Connected to Backend API' : 'Using Local Storage Cache'}>
            <div className={`pulse-dot ${isOnline ? '' : 'offline'}`} />
            <span>{isOnline ? 'Live API' : 'Local Mode'}</span>
          </div>

          {/* Theme Toggle */}
          <button 
            className="btn btn-ghost-dark" 
            onClick={toggleTheme} 
            title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} mode`}
          >
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          {/* Reset to Default */}
          <button 
            className="btn btn-secondary" 
            onClick={onResetClick}
            title="Reset tracker to original seed data"
          >
            <RotateCcw size={15} />
            <span>Reset</span>
          </button>

          {/* Export to CSV */}
          <button 
            className="btn btn-secondary" 
            onClick={onExportClick}
            title="Download tracker data as CSV"
          >
            <Download size={15} />
            <span>Export CSV</span>
          </button>

          {/* Add Activity */}
          <button 
            className="btn btn-primary" 
            onClick={onAddClick}
            title="Add new activity or milestone deliverable"
          >
            <Plus size={16} />
            <span>Add Activity</span>
          </button>
        </div>
      </div>
    </header>
  );
}
