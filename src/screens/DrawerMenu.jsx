import React from 'react';
import { getData } from '../utils/storage';

import { useLanguage } from '../contexts/LanguageContext';

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
  }
];

function DrawerMenu({ isOpen, onClose, onNavigate, activeScreen }) {
  const user = getData('user') || {};
  const { t } = useLanguage();

  const menuSections = [
    {
      label: t.menuSections.main,
      items: [
        { icon: '🏠', label: t.menuItems.homeDashboard, screen: 'dashboard' },
        { icon: '🏘', label: t.menuItems.householdEnumeration, screen: 'household' },
      ]
    },
    {
      label: t.menuSections.maternalHealth,
      items: [
        { icon: '👫', label: t.menuItems.ecRegistration, screen: 'ec' },
        { icon: '🤰', label: t.menuItems.pregnantWomanReg, screen: 'pregnant' },
        { icon: '❤️', label: t.menuItems.ancServices, screen: 'anc' },
        { icon: '🏥', label: t.menuItems.deliveryTracking, screen: 'delivery' },
        { icon: '🏠', label: t.menuItems.hbpnc, screen: 'hbpnc' },
      ]
    },
    {
      label: t.menuSections.childHealth,
      items: [
        { icon: '👶', label: t.menuItems.childRegistration, screen: 'child' },
        { icon: '💉', label: t.menuItems.vaccinationDueList, screen: 'vaccination' },
        { icon: '🍼', label: t.menuItems.hbnc, screen: 'hbnc' },
        { icon: '🌱', label: t.menuItems.hbyc, screen: 'hbyc' },
        { icon: '📊', label: t.menuItems.hbncHbycReport, screen: 'hbncreport' },
      ]
    },
    {
      label: t.menuSections.familyPlanning,
      items: [
        { icon: '💬', label: t.menuItems.fpCounseling, screen: 'fpcounseling' },
        { icon: '🏥', label: t.menuItems.fpServices, screen: 'fpservices' },
      ]
    },
    {
      label: t.menuSections.adolescentHealth,
      items: [
        { icon: '🧑', label: t.menuItems.adolescentRegistration, screen: 'adolescent' },
        { icon: '🔍', label: t.menuItems.adolescentScreening, screen: 'adolescentscreen' },
      ]
    },
    {
      label: t.menuSections.mchServices,
      items: [
        { icon: '📋', label: t.menuItems.vhsndSessions, screen: 'vhsnd' },
      ]
    },
    {
      label: t.menuSections.communicableDiseases,
      items: [
        { icon: '🫁', label: t.menuItems.tbScreening, screen: 'tbscreening' },
        { icon: '⚙️', label: t.menuItems.tbManagement, screen: 'tb' },
        { icon: '🤒', label: t.menuItems.sickPersonReport, screen: 'surveillance' },
        { icon: '🎯', label: t.menuItems.surveillance, screen: 'surveillance' },
      ]
    },
    {
      label: t.menuSections.ncds,
      items: [
        { icon: '📋', label: t.menuItems.cbacRiskAssessment, screen: 'cbac' },
        { icon: '💓', label: t.menuItems.hypertensionScreening, screen: 'hypertension' },
        { icon: '🩸', label: t.menuItems.diabetesScreening, screen: 'diabetes' },
        { icon: '👄', label: t.menuItems.oralScreening, screen: 'oralscreening' },
        { icon: '🎗️', label: t.menuItems.breastCervicalScreening, screen: 'breastcervical' },
        { icon: '🛡️', label: t.menuItems.ncdScreeningCbac, screen: 'ncd' },
      ]
    },
    {
      label: t.menuSections.geriatricCare,
      items: [
        { icon: '👴', label: t.menuItems.geriatricRegistration, screen: 'geriatricreg' },
        { icon: '🔬', label: t.menuItems.geriatricScreening, screen: 'geriatricscreen' },
      ]
    },
    {
      label: t.menuSections.palliativeCare,
      items: [
        { icon: '🕊️', label: t.menuItems.palliativeRegistration, screen: 'palliativereg' },
        { icon: '📝', label: t.menuItems.palliativeCarePlan, screen: 'palliativeplan' },
      ]
    },
    {
      label: t.menuSections.mentalHealth,
      items: [
        { icon: '🧠', label: t.menuItems.mentalHealthScreening, screen: 'mentalhealth' },
        { icon: '💭', label: t.menuItems.counselingSession, screen: 'counseling' },
      ]
    },
    {
      label: t.menuSections.oralHealth,
      items: [
        { icon: '🦷', label: t.menuItems.oralHealthEducation, screen: 'oraleducation' },
      ]
    },
    {
      label: t.menuSections.entCare,
      items: [
        { icon: '👂', label: t.menuItems.entScreening, screen: 'ent' },
      ]
    },
    {
      label: t.menuSections.emergencyTrauma,
      items: [
        { icon: '🚨', label: t.menuItems.emergencyReporting, screen: 'emergency' },
        { icon: '🩹', label: t.menuItems.firstAidGuidance, screen: 'firstaid' },
      ]
    },
    {
      label: t.menuSections.dataReports,
      items: [
        { icon: '🔄', label: t.menuItems.syncManager, screen: 'sync' },
        { icon: '📊', label: t.menuItems.reportsAnalytics, screen: 'reports' },
      ]
    }
  ];

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
          {t.drawerFooter}
        </div>
      </div>
    </>
  );
}

export default DrawerMenu;
