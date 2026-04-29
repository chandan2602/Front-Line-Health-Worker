import React, { useState } from 'react';
import { getData } from '../utils/storage';
import DrawerMenu from './DrawerMenu';
import BottomNav from '../components/BottomNav';

function HamburgerIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round">
      <line x1="3" y1="6" x2="21" y2="6"/>
      <line x1="3" y1="12" x2="21" y2="12"/>
      <line x1="3" y1="18" x2="21" y2="18"/>
    </svg>
  );
}

function BellIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9"/>
      <path d="M13.73 21a2 2 0 01-3.46 0"/>
    </svg>
  );
}

const quickActions = [
  { icon: '📝', label: 'New Registration', screen: 'pregnant', color: '#EFF6FF', iconBg: '#DBEAFE' },
  { icon: '🤰', label: 'ANC Visit', screen: 'anc', color: '#F0FDF4', iconBg: '#DCFCE7' },
  { icon: '🏥', label: 'Delivery', screen: 'delivery', color: '#FFF7ED', iconBg: '#FED7AA' },
  { icon: '👶', label: 'HBPNC Visit', screen: 'hbpnc', color: '#FDF4FF', iconBg: '#F3E8FF' },
  { icon: '🩺', label: 'NCD Screening', screen: 'ncd', color: '#FFF1F2', iconBg: '#FFE4E6' },
  { icon: '💊', label: 'TB Enrollment', screen: 'tb', color: '#F0FDFA', iconBg: '#CCFBF1' },
];

function DashboardScreen({ onNavigate }) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const user = getData('user') || {};
  const pregnantWomen = getData('pregnantWomen') || [];
  const ancVisits = getData('ancVisits') || [];
  const syncQueue = getData('syncQueue') || [];

  const now = new Date();
  const hour = now.getHours();
  const greeting = hour < 12 ? 'Good Morning' : hour < 17 ? 'Good Afternoon' : 'Good Evening';
  const dateStr = now.toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });

  const hrpCases = pregnantWomen.filter(w => w.isHRP).length;

  const dueList = [
    { name: 'Sunita Devi', type: 'ANC Visit', isHRP: true, scheduled: '2nd Visit', id: 1 },
    { name: 'Kavita Singh', type: 'ANC Visit', isHRP: true, scheduled: '1st Visit', id: 3 },
    { name: 'Meena Bai', type: 'PNC Visit', isHRP: false, scheduled: 'Scheduled', id: 2 },
  ];

  return (
    <div className="screen" style={{ background: 'var(--bg)', position: 'relative' }}>
      {/* App Bar */}
      <div style={{
        background: 'var(--primary)', color: 'white',
        display: 'flex', alignItems: 'center', padding: '12px 16px',
        gap: 10, flexShrink: 0
      }}>
        <button className="app-bar-icon-btn" onClick={() => setDrawerOpen(true)} aria-label="Open menu">
          <HamburgerIcon />
        </button>
        <span style={{ flex: 1, fontSize: 17, fontWeight: 700, textAlign: 'center' }}>FLHW App</span>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{
            background: 'rgba(255,255,255,0.2)', borderRadius: 20,
            padding: '3px 10px', fontSize: 12, fontWeight: 600
          }}>
            {user.role || 'ANM'}
          </span>
          <div style={{ position: 'relative' }}>
            <button className="app-bar-icon-btn" aria-label="Notifications">
              <BellIcon />
            </button>
            <span style={{
              position: 'absolute', top: -2, right: -2,
              background: '#EF4444', color: 'white',
              width: 16, height: 16, borderRadius: 50,
              fontSize: 9, fontWeight: 700,
              display: 'flex', alignItems: 'center', justifyContent: 'center'
            }}>3</span>
          </div>
        </div>
      </div>

      {/* Sync Banner */}
      <div style={{
        background: 'var(--primary)', padding: '0 16px 12px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{
            width: 8, height: 8, borderRadius: 50,
            background: syncQueue.length > 0 ? '#FCD34D' : '#4ADE80'
          }} />
          <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.85)' }}>
            {syncQueue.length > 0 ? `${syncQueue.length} records pending sync` : 'All data synced'}
          </span>
        </div>
        <button
          className="btn btn-accent btn-sm"
          onClick={() => onNavigate('sync')}
          style={{ fontSize: 12, padding: '6px 14px' }}
        >
          🔄 Sync Now
        </button>
      </div>

      {/* Scrollable Content */}
      <div className="screen-content">
        {/* Greeting */}
        <div style={{ marginBottom: 16 }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, color: 'var(--text-primary)' }}>
            {greeting}, {user.name?.split(' ')[0] || 'Priya'} 👋
          </h2>
          <p style={{ fontSize: 12, color: 'var(--text-secondary)', marginTop: 2 }}>{dateStr}</p>
        </div>

        {/* Stats Row */}
        <div className="stats-row">
          <div className="stat-card">
            <div className="stat-card-value" style={{ color: 'var(--primary)' }}>
              {dueList.length}
            </div>
            <div className="stat-card-label">Today's Tasks</div>
          </div>
          <div className="stat-card">
            <div className="stat-card-value" style={{ color: '#B45309' }}>
              {syncQueue.length || 5}
            </div>
            <div className="stat-card-label">Pending Sync</div>
          </div>
          <div className="stat-card">
            <div className="stat-card-value" style={{ color: 'var(--danger)' }}>
              <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 3 }}>
                <span style={{ width: 8, height: 8, borderRadius: 50, background: 'var(--danger)', display: 'inline-block' }} />
                {hrpCases}
              </span>
            </div>
            <div className="stat-card-label">HRP Cases</div>
          </div>
        </div>

        {/* Today's Due List */}
        <div style={{ marginBottom: 20 }}>
          <div className="section-header">
            <span className="section-title">Today's Due List</span>
            <button className="section-link">See all</button>
          </div>

          {dueList.map((item) => (
            <div key={item.id} className="due-list-item">
              <div className="due-list-avatar">
                {item.name.charAt(0)}
              </div>
              <div className="due-list-info">
                <div className="due-list-name">{item.name}</div>
                <div className="due-list-meta">
                  <span className="badge badge-primary" style={{ fontSize: 10, padding: '2px 8px' }}>
                    {item.type}
                  </span>
                  {item.isHRP && (
                    <span className="badge badge-danger" style={{ fontSize: 10, padding: '2px 8px' }}>
                      HRP
                    </span>
                  )}
                  <span className="badge badge-grey" style={{ fontSize: 10, padding: '2px 8px' }}>
                    {item.scheduled}
                  </span>
                </div>
              </div>
              <button
                className="btn btn-primary btn-sm"
                onClick={() => onNavigate('anc')}
                style={{ fontSize: 11, padding: '6px 10px', width: 'auto', flexShrink: 0 }}
              >
                Start
              </button>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div style={{ marginBottom: 20 }}>
          <div className="section-header">
            <span className="section-title">Quick Actions</span>
          </div>
          <div className="quick-actions-grid">
            {quickActions.map((action) => (
              <button
                key={action.screen}
                className="quick-action-item"
                onClick={() => onNavigate(action.screen)}
              >
                <div className="quick-action-icon" style={{ background: action.iconBg }}>
                  {action.icon}
                </div>
                <span className="quick-action-label">{action.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div style={{ marginBottom: 20 }}>
          <div className="section-header">
            <span className="section-title">Recent Activity</span>
          </div>
          <div className="card">
            {[
              { text: 'ANC Visit recorded for Sunita Devi', time: '2h ago', icon: '✅' },
              { text: 'New HH registered: Ramesh Kumar', time: '4h ago', icon: '🏠' },
              { text: 'TB adherence updated: Mohan Lal', time: 'Yesterday', icon: '💊' },
            ].map((item, i) => (
              <div key={i} style={{
                display: 'flex', alignItems: 'center', gap: 12,
                padding: '10px 0',
                borderBottom: i < 2 ? '1px solid var(--border)' : 'none'
              }}>
                <span style={{ fontSize: 18 }}>{item.icon}</span>
                <div style={{ flex: 1 }}>
                  <p style={{ fontSize: 13, color: 'var(--text-primary)', fontWeight: 500 }}>{item.text}</p>
                  <p style={{ fontSize: 11, color: 'var(--text-secondary)', marginTop: 2 }}>{item.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Nav */}
      <BottomNav active="home" onNavigate={onNavigate} />

      {/* Drawer */}
      <DrawerMenu
        isOpen={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        onNavigate={onNavigate}
        activeScreen="dashboard"
      />
    </div>
  );
}

export default DashboardScreen;
