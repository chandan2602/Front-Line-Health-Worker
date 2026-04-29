import React from 'react';

function HomeIcon({ active }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill={active ? '#1B4F9B' : 'none'} stroke={active ? '#1B4F9B' : '#6B7280'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/>
      <polyline points="9 22 9 12 15 12 15 22"/>
    </svg>
  );
}

function BeneficiaryIcon({ active }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={active ? '#1B4F9B' : '#6B7280'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/>
      <circle cx="9" cy="7" r="4"/>
      <path d="M23 21v-2a4 4 0 00-3-3.87"/>
      <path d="M16 3.13a4 4 0 010 7.75"/>
    </svg>
  );
}

function MoreIcon({ active }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={active ? '#1B4F9B' : '#6B7280'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="5" r="1" fill={active ? '#1B4F9B' : '#6B7280'}/>
      <circle cx="12" cy="12" r="1" fill={active ? '#1B4F9B' : '#6B7280'}/>
      <circle cx="12" cy="19" r="1" fill={active ? '#1B4F9B' : '#6B7280'}/>
    </svg>
  );
}

function BottomNav({ active = 'home', onNavigate }) {
  return (
    <div className="bottom-nav">
      <button
        className={`bottom-nav-item ${active === 'home' ? 'active' : ''}`}
        onClick={() => onNavigate('dashboard')}
      >
        <HomeIcon active={active === 'home'} />
        <span>Home</span>
      </button>
      <button
        className={`bottom-nav-item ${active === 'beneficiary' ? 'active' : ''}`}
        onClick={() => onNavigate('pregnant')}
      >
        <BeneficiaryIcon active={active === 'beneficiary'} />
        <span>Beneficiary</span>
      </button>
      <button
        className={`bottom-nav-item ${active === 'more' ? 'active' : ''}`}
        onClick={() => onNavigate('sync')}
      >
        <MoreIcon active={active === 'more'} />
        <span>More</span>
      </button>
    </div>
  );
}

export default BottomNav;
