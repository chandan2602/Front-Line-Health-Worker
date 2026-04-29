import React from 'react';

function BackIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M19 12H5M12 5l-7 7 7 7"/>
    </svg>
  );
}

function AppBar({ title, onBack, rightContent }) {
  return (
    <div className="app-bar">
      {onBack ? (
        <button className="app-bar-icon-btn" onClick={onBack} aria-label="Go back">
          <BackIcon />
        </button>
      ) : (
        <div style={{ width: 32 }} />
      )}
      <span className="app-bar-title">{title}</span>
      {rightContent ? rightContent : <div style={{ width: 32 }} />}
    </div>
  );
}

export default AppBar;
