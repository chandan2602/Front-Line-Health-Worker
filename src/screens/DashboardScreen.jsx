import React, { useState } from 'react';
import { getData } from '../utils/storage';
import { useLanguage } from '../contexts/LanguageContext';
import LanguageSelector from '../components/LanguageSelector';
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
  { icon: '📝', label: 'newRegistration', screen: 'pregnant', color: '#EFF6FF', iconBg: '#DBEAFE' },
  { icon: '🤰', label: 'ancVisit', screen: 'anc', color: '#F0FDF4', iconBg: '#DCFCE7' },
  { icon: '🏥', label: 'delivery', screen: 'delivery', color: '#FFF7ED', iconBg: '#FED7AA' },
  { icon: '👶', label: 'hbpncVisit', screen: 'hbpnc', color: '#FDF4FF', iconBg: '#F3E8FF' },
  { icon: '🩺', label: 'ncdScreening', screen: 'ncd', color: '#FFF1F2', iconBg: '#FFE4E6' },
  { icon: '💊', label: 'tbEnrollment', screen: 'tb', color: '#F0FDFA', iconBg: '#CCFBF1' },
];

function DashboardScreen({ onNavigate }) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [roleMenuOpen, setRoleMenuOpen] = useState(false);
  const [notificationPanelOpen, setNotificationPanelOpen] = useState(false);
  const { t } = useLanguage();
  const user = getData('user') || {};
  const pregnantWomen = getData('pregnantWomen') || [];
  const ancVisits = getData('ancVisits') || [];
  const syncQueue = getData('syncQueue') || [];

  const now = new Date();
  const hour = now.getHours();
  const greeting = hour < 12 ? t.goodMorning : hour < 17 ? t.goodAfternoon : t.goodEvening;
  const dateStr = now.toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });

  const hrpCases = pregnantWomen.filter(w => w.isHRP).length;

  const notifications = [
    { id: 1, message: t.notificationMessages.hrpAlert, time: '10 min ago', unread: true, icon: '🚨' },
    { id: 2, message: t.notificationMessages.ancRecorded, time: '2h ago', unread: true, icon: '✅' },
    { id: 3, message: t.notificationMessages.vaccineReminder, time: '3h ago', unread: true, icon: '💉' },
    { id: 4, message: t.notificationMessages.hhRegistered, time: '4h ago', unread: false, icon: '🏠' },
    { id: 5, message: t.notificationMessages.tbUpdated, time: 'Yesterday', unread: false, icon: '💊' },
    { id: 6, message: t.notificationMessages.syncComplete, time: 'Yesterday', unread: false, icon: '🔄' },
  ];

  const unreadCount = notifications.filter(n => n.unread).length;

  const handleLogout = () => {
    if (confirm('Are you sure you want to logout?')) {
      onNavigate('login');
    }
  };

  // Close dropdowns when clicking outside
  React.useEffect(() => {
    const handleClickOutside = (event) => {
      if (roleMenuOpen && !event.target.closest('.role-menu-container')) {
        setRoleMenuOpen(false);
      }
      if (notificationPanelOpen && !event.target.closest('.notification-container')) {
        setNotificationPanelOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [roleMenuOpen, notificationPanelOpen]);

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
        <span style={{ flex: 1, fontSize: 17, fontWeight: 700, textAlign: 'center' }}>{t.appTitle}</span>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <LanguageSelector variant="transparent" />
          
          {/* Role Badge with Dropdown */}
          <div className="role-menu-container" style={{ position: 'relative' }}>
            <button
              onClick={() => setRoleMenuOpen(!roleMenuOpen)}
              style={{
                background: 'rgba(255,255,255,0.2)', borderRadius: 20,
                padding: '3px 10px', fontSize: 12, fontWeight: 600,
                border: 'none', color: 'white', cursor: 'pointer',
                fontFamily: 'var(--font)', display: 'flex', alignItems: 'center', gap: 4
              }}
            >
              {user.role || 'ANM'}
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M6 9l6 6 6-6"/>
              </svg>
            </button>
            
            {/* Role Dropdown Menu */}
            {roleMenuOpen && (
              <div style={{
                position: 'absolute',
                top: '36px',
                right: '0',
                background: 'white',
                border: '1px solid var(--border)',
                borderRadius: 12,
                boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                overflow: 'hidden',
                zIndex: 1000,
                minWidth: '160px'
              }}>
                <button
                  onClick={() => {
                    setRoleMenuOpen(false);
                    onNavigate('profile');
                  }}
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    background: 'white',
                    border: 'none',
                    textAlign: 'left',
                    fontSize: 13,
                    fontWeight: 500,
                    color: 'var(--text-primary)',
                    cursor: 'pointer',
                    fontFamily: 'var(--font)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 10,
                    borderBottom: '1px solid var(--border)'
                  }}
                  onMouseEnter={(e) => e.target.style.background = 'rgba(0,0,0,0.03)'}
                  onMouseLeave={(e) => e.target.style.background = 'white'}
                >
                  <span style={{ fontSize: 16 }}>👤</span>
                  {t.profile}
                </button>
                <button
                  onClick={() => {
                    setRoleMenuOpen(false);
                    alert('Settings feature coming soon!');
                  }}
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    background: 'white',
                    border: 'none',
                    textAlign: 'left',
                    fontSize: 13,
                    fontWeight: 500,
                    color: 'var(--text-primary)',
                    cursor: 'pointer',
                    fontFamily: 'var(--font)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 10,
                    borderBottom: '1px solid var(--border)'
                  }}
                  onMouseEnter={(e) => e.target.style.background = 'rgba(0,0,0,0.03)'}
                  onMouseLeave={(e) => e.target.style.background = 'white'}
                >
                  <span style={{ fontSize: 16 }}>⚙️</span>
                  {t.settings}
                </button>
                <button
                  onClick={handleLogout}
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    background: 'white',
                    border: 'none',
                    textAlign: 'left',
                    fontSize: 13,
                    fontWeight: 600,
                    color: '#EF4444',
                    cursor: 'pointer',
                    fontFamily: 'var(--font)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 10
                  }}
                  onMouseEnter={(e) => e.target.style.background = 'rgba(239,68,68,0.05)'}
                  onMouseLeave={(e) => e.target.style.background = 'white'}
                >
                  <span style={{ fontSize: 16 }}>🚪</span>
                  {t.logout}
                </button>
              </div>
            )}
          </div>
          
          {/* Notification Bell */}
          <div className="notification-container" style={{ position: 'relative' }}>
            <button 
              className="app-bar-icon-btn" 
              aria-label="Notifications"
              onClick={() => setNotificationPanelOpen(!notificationPanelOpen)}
            >
              <BellIcon />
            </button>
            {unreadCount > 0 && (
              <span style={{
                position: 'absolute', top: -2, right: -2,
                background: '#EF4444', color: 'white',
                width: 16, height: 16, borderRadius: 50,
                fontSize: 9, fontWeight: 700,
                display: 'flex', alignItems: 'center', justifyContent: 'center'
              }}>{unreadCount}</span>
            )}
            
            {/* Notification Panel */}
            {notificationPanelOpen && (
              <div style={{
                position: 'absolute',
                top: '40px',
                right: '0',
                background: 'white',
                border: '1px solid var(--border)',
                borderRadius: 12,
                boxShadow: '0 4px 16px rgba(0,0,0,0.15)',
                overflow: 'hidden',
                zIndex: 1000,
                width: '320px',
                maxHeight: '400px'
              }}>
                {/* Header */}
                <div style={{
                  padding: '12px 16px',
                  borderBottom: '1px solid var(--border)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  background: 'var(--bg)'
                }}>
                  <span style={{ fontSize: 14, fontWeight: 700, color: 'var(--text-primary)' }}>
                    {t.notifications}
                  </span>
                  <button
                    onClick={() => alert('Mark all as read')}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: 'var(--primary)',
                      fontSize: 11,
                      fontWeight: 600,
                      cursor: 'pointer',
                      fontFamily: 'var(--font)'
                    }}
                  >
                    {t.markAllRead}
                  </button>
                </div>
                
                {/* Notification List */}
                <div style={{ maxHeight: '340px', overflowY: 'auto' }}>
                  {notifications.map((notif) => (
                    <div
                      key={notif.id}
                      style={{
                        padding: '12px 16px',
                        borderBottom: '1px solid var(--border)',
                        background: notif.unread ? 'rgba(27,79,155,0.03)' : 'white',
                        cursor: 'pointer',
                        transition: 'background 0.2s'
                      }}
                      onMouseEnter={(e) => e.target.style.background = 'rgba(0,0,0,0.03)'}
                      onMouseLeave={(e) => e.target.style.background = notif.unread ? 'rgba(27,79,155,0.03)' : 'white'}
                    >
                      <div style={{ display: 'flex', gap: 10 }}>
                        <span style={{ fontSize: 20, flexShrink: 0 }}>{notif.icon}</span>
                        <div style={{ flex: 1 }}>
                          <p style={{ 
                            fontSize: 13, 
                            color: 'var(--text-primary)', 
                            fontWeight: notif.unread ? 600 : 500,
                            marginBottom: 4
                          }}>
                            {notif.message}
                          </p>
                          <p style={{ fontSize: 11, color: 'var(--text-secondary)' }}>
                            {notif.time}
                          </p>
                        </div>
                        {notif.unread && (
                          <div style={{
                            width: 8,
                            height: 8,
                            borderRadius: 50,
                            background: 'var(--primary)',
                            flexShrink: 0,
                            marginTop: 4
                          }} />
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
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
            {syncQueue.length > 0 ? `${syncQueue.length} ${t.recordsPendingSync}` : t.allDataSynced}
          </span>
        </div>
        <button
          className="btn btn-accent btn-sm"
          onClick={() => onNavigate('sync')}
          style={{ fontSize: 12, padding: '6px 14px' }}
        >
          {t.syncNow}
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
            <div className="stat-card-label">{t.todaysTasks}</div>
          </div>
          <div className="stat-card">
            <div className="stat-card-value" style={{ color: '#B45309' }}>
              {syncQueue.length || 5}
            </div>
            <div className="stat-card-label">{t.pendingSync}</div>
          </div>
          <div className="stat-card">
            <div className="stat-card-value" style={{ color: 'var(--danger)' }}>
              <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 3 }}>
                <span style={{ width: 8, height: 8, borderRadius: 50, background: 'var(--danger)', display: 'inline-block' }} />
                {hrpCases}
              </span>
            </div>
            <div className="stat-card-label">{t.hrpCases}</div>
          </div>
        </div>

        {/* Today's Due List */}
        <div style={{ marginBottom: 20 }}>
          <div className="section-header">
            <span className="section-title">{t.todaysDueList}</span>
            <button className="section-link">{t.seeAll}</button>
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
                {t.start}
              </button>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div style={{ marginBottom: 20 }}>
          <div className="section-header">
            <span className="section-title">{t.quickActions}</span>
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
                <span className="quick-action-label">{t.quickActionLabels[action.label]}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div style={{ marginBottom: 20 }}>
          <div className="section-header">
            <span className="section-title">{t.recentActivity}</span>
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
