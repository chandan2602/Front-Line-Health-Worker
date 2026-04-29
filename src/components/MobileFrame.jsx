import React from 'react';

function StatusBar() {
  const now = new Date();
  const time = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false });

  return (
    <div className="status-bar">
      <span className="status-bar-time">{time}</span>
      <div className="status-bar-icons">
        {/* Signal */}
        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <rect x="1" y="15" width="3" height="6" rx="1" fill="white"/>
          <rect x="6" y="11" width="3" height="10" rx="1" fill="white"/>
          <rect x="11" y="7" width="3" height="14" rx="1" fill="white"/>
          <rect x="16" y="3" width="3" height="18" rx="1" fill="white" opacity="0.4"/>
        </svg>
        {/* WiFi */}
        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 18.5a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" fill="white"/>
          <path d="M8.5 15a5 5 0 017 0" stroke="white" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
          <path d="M5.5 12a9 9 0 0113 0" stroke="white" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
        </svg>
        {/* Battery */}
        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <rect x="2" y="7" width="18" height="10" rx="2" stroke="white" strokeWidth="1.5" fill="none"/>
          <rect x="20" y="10" width="2" height="4" rx="1" fill="white"/>
          <rect x="3.5" y="8.5" width="13" height="7" rx="1" fill="white"/>
        </svg>
      </div>
    </div>
  );
}

function MobileFrame({ children }) {
  return (
    <div className="mobile-frame">
      <StatusBar />
      {children}
    </div>
  );
}

export default MobileFrame;
