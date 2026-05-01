import React from 'react';
import { getData } from '../utils/storage';

const menuSections = [
  {
    label: 'MAIN',
    items: [
      { icon: '🏠', label: 'Home Dashboard', screen: 'dashboard' },
      { icon: '🏘', label: 'Household Enumeration', screen: 'household' },
    ]
  },
  {
    label: 'MATERNAL HEALTH',
    items: [
      { icon: '👫', label: 'EC Registration', screen: 'ec' },
      { icon: '🤰', label: 'Pregnant Woman Reg.', screen: 'pregnant' },
      { icon: '❤️', label: 'ANC Services', screen: 'anc' },
      { icon: '🏥', label: 'Delivery Tracking', screen: 'delivery' },
      { icon: '🏠', label: 'HBPNC', screen: 'hbpnc' },
    ]
  },
  {
    label: 'CHILD HEALTH',
    items: [
      { icon: '👶', label: 'Child Registration', screen: 'child' },
      { icon: '💉', label: 'Vaccination Due List', screen: 'vaccination' },
      { icon: '🍼', label: 'HBNC', screen: 'hbnc' },
      { icon: '🌱', label: 'HBYC', screen: 'hbyc' },
      { icon: '📊', label: 'HBNC/HBYC Report', screen: 'hbncreport' },
    ]
  },
  {
    label: 'FAMILY PLANNING',
    items: [
      { icon: '💬', label: 'FP Counseling', screen: 'fpcounseling' },
      { icon: '🏥', label: 'FP Services', screen: 'fpservices' },
    ]
  },
  {
    label: 'ADOLESCENT HEALTH',
    items: [
      { icon: '🧑', label: 'Adolescent Registration', screen: 'adolescent' },
      { icon: '🔍', label: 'Adolescent Screening', screen: 'adolescentscreen' },
    ]
  },
  {
    label: 'MCH SERVICES',
    items: [
      { icon: '📋', label: 'VHSND Sessions', screen: 'vhsnd' },
    ]
  },
  {
    label: 'COMMUNICABLE DISEASES',
    items: [
      { icon: '🫁', label: 'TB Screening', screen: 'tbscreening' },
      { icon: '⚙️', label: 'TB Management', screen: 'tb' },
      { icon: '🤒', label: 'Sick Person Report', screen: 'surveillance' },
      { icon: '🎯', label: 'Surveillance', screen: 'surveillance' },
    ]
  },
  {
    label: 'NCDs',
    items: [
      { icon: '📋', label: 'CBAC Risk Assessment', screen: 'cbac' },
      { icon: '💓', label: 'Hypertension Screening', screen: 'hypertension' },
      { icon: '🩸', label: 'Diabetes Screening', screen: 'diabetes' },
      { icon: '👄', label: 'Oral Screening', screen: 'oralscreening' },
      { icon: '🎗️', label: 'Breast/Cervical Screening', screen: 'breastcervical' },
      { icon: '🛡️', label: 'NCD Screening (CBAC)', screen: 'ncd' },
    ]
  },
  {
    label: 'GERIATRIC CARE',
    items: [
      { icon: '👴', label: 'Geriatric Registration', screen: 'geriatricreg' },
      { icon: '🔬', label: 'Geriatric Screening', screen: 'geriatricscreen' },
    ]
  },
  {
    label: 'PALLIATIVE CARE',
    items: [
      { icon: '🕊️', label: 'Palliative Registration', screen: 'palliativereg' },
      { icon: '📝', label: 'Palliative Care Plan', screen: 'palliativeplan' },
    ]
  },
  {
    label: 'MENTAL HEALTH',
    items: [
      { icon: '🧠', label: 'Mental Health Screening', screen: 'mentalhealth' },
      { icon: '💭', label: 'Counseling Session', screen: 'counseling' },
    ]
  },
  {
    label: 'ORAL HEALTH',
    items: [
      { icon: '🦷', label: 'Oral Health Education', screen: 'oraleducation' },
    ]
  },
  {
    label: 'ENT CARE',
    items: [
      { icon: '👂', label: 'ENT Screening', screen: 'ent' },
    ]
  },
  {
    label: 'EMERGENCY & TRAUMA',
    items: [
      { icon: '🚨', label: 'Emergency Reporting', screen: 'emergency' },
      { icon: '🩹', label: 'First Aid Guidance', screen: 'firstaid' },
    ]
  },
  {
    label: 'DATA & REPORTS',
    items: [
      { icon: '🔄', label: 'Sync Manager', screen: 'sync' },
      { icon: '📊', label: 'Reports & Analytics', screen: 'reports' },
      { icon: '🏥', label: 'ABDM', screen: 'abdm' },
      { icon: '📁', label: 'Electronic Medical Record', screen: 'emr' },
    ]
  },
  {
    label: 'ADMINISTRATION',
    items: [
      { icon: '🔐', label: 'Role Management', screen: 'roles' },
    ]
  }
];

function DrawerMenu({ isOpen, onClose, onNavigate, activeScreen }) {
  const user = getData('user') || {};

  const handleItemClick = (screen) => {
    onClose();
    onNavigate(screen);
  };

  return (
    <>
      {/* Overlay */}
      <div
        className="drawer-overlay"
        style={{ opacity: isOpen ? 1 : 0, pointerEvents: isOpen ? 'all' : 'none' }}
        onClick={onClose}
      />

      {/* Drawer */}
      <div className={`drawer ${isOpen ? 'open' : ''}`}>
        {/* Header */}
        <div className="drawer-header">
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
            <div>
              <div className="drawer-avatar">
                {(user.name || 'P').charAt(0)}
              </div>
              <div className="drawer-name">{user.name || 'Priya Sharma'}</div>
              <div className="drawer-meta">
                <span className="drawer-role-badge">{user.role || 'ANM'}</span>
                <span className="drawer-id">{user.id || 'ANM-MP-2024-00142'}</span>
              </div>
              <div className="drawer-center">{user.center || 'PHC Bhopal Urban, Sub-Center Ward-7'}</div>
            </div>
            <button
              onClick={onClose}
              style={{
                background: 'rgba(255,255,255,0.2)', border: 'none', color: 'white',
                width: 32, height: 32, borderRadius: 8, cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontFamily: 'var(--font)', fontSize: 18
              }}
            >×</button>
          </div>
        </div>

        {/* Menu Body */}
        <div style={{ flex: 1, overflowY: 'auto', scrollbarWidth: 'none' }}>
          {menuSections.map((section) => (
            <div key={section.label}>
              <div className="drawer-section-label">{section.label}</div>
              {section.items.map((item, idx) => (
                <button
                  key={`${item.screen}-${idx}`}
                  className={`drawer-menu-item ${activeScreen === item.screen ? 'active' : ''}`}
                  onClick={() => handleItemClick(item.screen)}
                >
                  <span className="drawer-menu-icon">{item.icon}</span>
                  <span className="drawer-menu-label">{item.label}</span>
                  {activeScreen === item.screen && (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginLeft: 'auto' }}>
                      <polyline points="9 18 15 12 9 6"/>
                    </svg>
                  )}
                </button>
              ))}
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="drawer-footer">
          FLHW App v2.0 · MoHFW, GoI
        </div>
      </div>
    </>
  );
}

export default DrawerMenu;
