import React, { useState } from 'react';
import { getData, saveData } from '../utils/storage';

function BackIcon() {
  return <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>;
}

// All screens available in the app
const ALL_SCREENS = [
  { key: 'dashboard',       label: 'Home Dashboard',          icon: '🏠', section: 'MAIN' },
  { key: 'household',       label: 'Household Enumeration',   icon: '🏘', section: 'MAIN' },
  { key: 'ec',              label: 'EC Registration',         icon: '👫', section: 'MATERNAL HEALTH' },
  { key: 'pregnant',        label: 'Pregnant Woman Reg.',     icon: '🤰', section: 'MATERNAL HEALTH' },
  { key: 'anc',             label: 'ANC Services',            icon: '❤️', section: 'MATERNAL HEALTH' },
  { key: 'delivery',        label: 'Delivery Tracking',       icon: '🏥', section: 'MATERNAL HEALTH' },
  { key: 'hbpnc',           label: 'HBPNC',                   icon: '🏠', section: 'MATERNAL HEALTH' },
  { key: 'child',           label: 'Child Registration',      icon: '👶', section: 'CHILD HEALTH' },
  { key: 'vaccination',     label: 'Vaccination Due List',    icon: '💉', section: 'CHILD HEALTH' },
  { key: 'hbnc',            label: 'HBNC',                    icon: '🍼', section: 'CHILD HEALTH' },
  { key: 'hbyc',            label: 'HBYC',                    icon: '🌱', section: 'CHILD HEALTH' },
  { key: 'hbncreport',      label: 'HBNC/HBYC Report',        icon: '📊', section: 'CHILD HEALTH' },
  { key: 'fpcounseling',    label: 'FP Counseling',           icon: '💬', section: 'FAMILY PLANNING' },
  { key: 'fpservices',      label: 'FP Services',             icon: '🏥', section: 'FAMILY PLANNING' },
  { key: 'adolescent',      label: 'Adolescent Registration', icon: '🧑', section: 'ADOLESCENT HEALTH' },
  { key: 'adolescentscreen',label: 'Adolescent Screening',    icon: '🔍', section: 'ADOLESCENT HEALTH' },
  { key: 'vhsnd',           label: 'VHSND Sessions',          icon: '📋', section: 'MCH SERVICES' },
  { key: 'tbscreening',     label: 'TB Screening',            icon: '🫁', section: 'COMMUNICABLE DISEASES' },
  { key: 'tb',              label: 'TB Management',           icon: '⚙️', section: 'COMMUNICABLE DISEASES' },
  { key: 'surveillance',    label: 'Surveillance',            icon: '🎯', section: 'COMMUNICABLE DISEASES' },
  { key: 'cbac',            label: 'CBAC Risk Assessment',    icon: '📋', section: 'NCDs' },
  { key: 'hypertension',    label: 'Hypertension Screening',  icon: '💓', section: 'NCDs' },
  { key: 'diabetes',        label: 'Diabetes Screening',      icon: '🩸', section: 'NCDs' },
  { key: 'oralscreening',   label: 'Oral Screening',          icon: '👄', section: 'NCDs' },
  { key: 'breastcervical',  label: 'Breast/Cervical Screening',icon: '🎗️', section: 'NCDs' },
  { key: 'ncd',             label: 'NCD Screening (CBAC)',    icon: '🛡️', section: 'NCDs' },
  { key: 'geriatricreg',    label: 'Geriatric Registration',  icon: '👴', section: 'GERIATRIC CARE' },
  { key: 'geriatricscreen', label: 'Geriatric Screening',     icon: '🔬', section: 'GERIATRIC CARE' },
  { key: 'palliativereg',   label: 'Palliative Registration', icon: '🕊️', section: 'PALLIATIVE CARE' },
  { key: 'palliativeplan',  label: 'Palliative Care Plan',    icon: '📝', section: 'PALLIATIVE CARE' },
  { key: 'mentalhealth',    label: 'Mental Health Screening', icon: '🧠', section: 'MENTAL HEALTH' },
  { key: 'counseling',      label: 'Counseling Session',      icon: '💭', section: 'MENTAL HEALTH' },
  { key: 'oraleducation',   label: 'Oral Health Education',   icon: '🦷', section: 'ORAL HEALTH' },
  { key: 'ent',             label: 'ENT Screening',           icon: '👂', section: 'ENT CARE' },
  { key: 'emergency',       label: 'Emergency Reporting',     icon: '🚨', section: 'EMERGENCY & TRAUMA' },
  { key: 'firstaid',        label: 'First Aid Guidance',      icon: '🩹', section: 'EMERGENCY & TRAUMA' },
  { key: 'sync',            label: 'Sync Manager',            icon: '🔄', section: 'DATA & REPORTS' },
  { key: 'reports',         label: 'Reports & Analytics',     icon: '📊', section: 'DATA & REPORTS' },
  { key: 'abdm',            label: 'ABDM',                    icon: '🏥', section: 'DATA & REPORTS' },
  { key: 'emr',             label: 'Electronic Medical Record',icon: '📁', section: 'DATA & REPORTS' },
  { key: 'roles',           label: 'Role Management',         icon: '🔐', section: 'ADMINISTRATION' },
];

// Default role templates
const DEFAULT_ROLES = [
  {
    id: 'anm',
    name: 'ANM',
    fullName: 'Auxiliary Nurse Midwife',
    color: '#1B4F9B',
    icon: '👩‍⚕️',
    screens: ['dashboard','household','ec','pregnant','anc','delivery','hbpnc','child','vaccination','hbnc','hbyc','hbncreport','fpcounseling','fpservices','adolescent','adolescentscreen','vhsnd','tbscreening','surveillance','cbac','hypertension','diabetes','oralscreening','breastcervical','ncd','emergency','firstaid','sync','reports','abdm','emr'],
  },
  {
    id: 'asha',
    name: 'ASHA',
    fullName: 'Accredited Social Health Activist',
    color: '#16A34A',
    icon: '👩‍🦱',
    screens: ['dashboard','household','ec','pregnant','anc','hbpnc','child','vaccination','hbnc','hbyc','fpcounseling','adolescent','vhsnd','tbscreening','surveillance','emergency','firstaid','sync'],
  },
  {
    id: 'mo',
    name: 'MO',
    fullName: 'Medical Officer',
    color: '#7C3AED',
    icon: '👨‍⚕️',
    screens: ALL_SCREENS.map(s => s.key),
  },
  {
    id: 'supervisor',
    name: 'Supervisor',
    fullName: 'Block / District Supervisor',
    color: '#B45309',
    icon: '👤',
    screens: ['dashboard','reports','sync','emr','abdm','roles','surveillance','tbscreening','tb','hypertension','diabetes','ncd','cbac'],
  },
];

const SECTIONS = [...new Set(ALL_SCREENS.map(s => s.section))];

function initRoles() {
  const stored = getData('roles');
  if (!stored) { saveData('roles', DEFAULT_ROLES); return DEFAULT_ROLES; }
  return stored;
}

export default function RoleManagementScreen({ onBack }) {
  const [roles, setRoles] = useState(initRoles);
  const [activeTab, setActiveTab] = useState('roles'); // 'roles' | 'edit' | 'create'
  const [editingRole, setEditingRole] = useState(null);
  const [newRole, setNewRole] = useState({ name: '', fullName: '', color: '#1B4F9B', icon: '👤', screens: [] });
  const [saved, setSaved] = useState(false);
  const [expandedSection, setExpandedSection] = useState(null);

  const persist = (updated) => {
    setRoles(updated);
    saveData('roles', updated);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const startEdit = (role) => {
    setEditingRole({ ...role, screens: [...role.screens] });
    setExpandedSection(null);
    setActiveTab('edit');
  };

  const startCreate = () => {
    setNewRole({ name: '', fullName: '', color: '#1B4F9B', icon: '👤', screens: ['dashboard'] });
    setExpandedSection(null);
    setActiveTab('create');
  };

  const toggleScreen = (form, setForm, key) => {
    setForm(f => ({
      ...f,
      screens: f.screens.includes(key) ? f.screens.filter(s => s !== key) : [...f.screens, key]
    }));
  };

  const toggleSection = (form, setForm, section) => {
    const sectionKeys = ALL_SCREENS.filter(s => s.section === section).map(s => s.key);
    const allOn = sectionKeys.every(k => form.screens.includes(k));
    setForm(f => ({
      ...f,
      screens: allOn
        ? f.screens.filter(k => !sectionKeys.includes(k))
        : [...new Set([...f.screens, ...sectionKeys])]
    }));
  };

  const saveEdit = () => {
    const updated = roles.map(r => r.id === editingRole.id ? editingRole : r);
    persist(updated);
    setActiveTab('roles');
  };

  const saveCreate = () => {
    if (!newRole.name.trim()) return;
    const created = { ...newRole, id: `role_${Date.now()}` };
    persist([...roles, created]);
    setActiveTab('roles');
  };

  const deleteRole = (id) => {
    if (['anm', 'mo'].includes(id)) return; // protect core roles
    persist(roles.filter(r => r.id !== id));
  };

  const COLORS = ['#1B4F9B','#16A34A','#7C3AED','#DC2626','#B45309','#0891B2','#6B7280','#DB2777'];
  const ICONS  = ['👩‍⚕️','👨‍⚕️','👩‍🦱','👤','🧑‍💼','👩‍💼','🏥','🔐'];

  // ── Screen permission editor — inlined to avoid remount focus loss ────────
  const renderPermissionEditor = (form, setForm) => (
    <div>
      {SECTIONS.map(section => {
        const sectionScreens = ALL_SCREENS.filter(s => s.section === section);
        const allOn = sectionScreens.every(s => form.screens.includes(s.key));
        const someOn = sectionScreens.some(s => form.screens.includes(s.key));
        const isOpen = expandedSection === section;
        return (
          <div key={section} style={{ marginBottom: 8 }}>
            <button
              type="button"
              onClick={() => setExpandedSection(isOpen ? null : section)}
              style={{ width: '100%', background: allOn ? '#EFF6FF' : someOn ? '#FFFBEB' : '#F9FAFB', border: `1.5px solid ${allOn ? '#BFDBFE' : someOn ? '#FDE68A' : '#E5E7EB'}`, borderRadius: isOpen ? '10px 10px 0 0' : 10, padding: '10px 12px', display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer', textAlign: 'left' }}
            >
              <div style={{ width: 18, height: 18, borderRadius: 4, border: `2px solid ${allOn ? 'var(--primary)' : '#D1D5DB'}`, background: allOn ? 'var(--primary)' : someOn ? '#FEF3C7' : 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, cursor: 'pointer' }}
                onClick={e => { e.stopPropagation(); toggleSection(form, setForm, section); }}>
                {allOn && <span style={{ color: 'white', fontSize: 11, lineHeight: 1 }}>✓</span>}
                {!allOn && someOn && <span style={{ color: '#B45309', fontSize: 11, lineHeight: 1 }}>–</span>}
              </div>
              <span style={{ flex: 1, fontSize: 12, fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{section}</span>
              <span style={{ fontSize: 11, color: 'var(--text-secondary)' }}>{sectionScreens.filter(s => form.screens.includes(s.key)).length}/{sectionScreens.length}</span>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ transform: isOpen ? 'rotate(90deg)' : 'none', transition: 'transform 0.2s' }}><polyline points="9 18 15 12 9 6"/></svg>
            </button>
            {isOpen && (
              <div style={{ background: 'white', border: '1.5px solid #E5E7EB', borderTop: 'none', borderRadius: '0 0 10px 10px', padding: '6px 0' }}>
                {sectionScreens.map(s => (
                  <label key={s.key} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 14px', cursor: 'pointer', borderBottom: '1px solid #F3F4F6' }}>
                    <div style={{ width: 18, height: 18, borderRadius: 4, border: `2px solid ${form.screens.includes(s.key) ? 'var(--primary)' : '#D1D5DB'}`, background: form.screens.includes(s.key) ? 'var(--primary)' : 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}
                      onClick={() => toggleScreen(form, setForm, s.key)}>
                      {form.screens.includes(s.key) && <span style={{ color: 'white', fontSize: 11, lineHeight: 1 }}>✓</span>}
                    </div>
                    <span style={{ fontSize: 14 }}>{s.icon}</span>
                    <span style={{ fontSize: 13, color: 'var(--text-primary)', flex: 1 }}>{s.label}</span>
                  </label>
                ))}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );

  // ── Role form fields — inlined to avoid remount focus loss ──────────────
  const renderRoleFields = (form, setForm) => (
    <div className="card" style={{ marginBottom: 14 }}>
      <div className="form-group">
        <label className="form-label">Role Short Name <span className="required">*</span></label>
        <input type="text" className="form-input" placeholder="e.g. ANM, ASHA, MO" maxLength={10}
          value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value.toUpperCase() }))} />
      </div>
      <div className="form-group">
        <label className="form-label">Full Role Name</label>
        <input type="text" className="form-input" placeholder="e.g. Auxiliary Nurse Midwife"
          value={form.fullName} onChange={e => setForm(f => ({ ...f, fullName: e.target.value }))} />
      </div>
    </div>
  );

  return (
    <div className="screen" style={{ background: 'var(--bg)' }}>
      <div style={{ background: 'var(--primary)', display: 'flex', alignItems: 'center', padding: '12px 16px', gap: 12, flexShrink: 0 }}>
        <button className="app-bar-icon-btn" onClick={activeTab === 'roles' ? onBack : () => setActiveTab('roles')}><BackIcon /></button>
        <span style={{ flex: 1, fontSize: 17, fontWeight: 700, color: 'white', textAlign: 'center' }}>
          {activeTab === 'roles' ? 'Role Management' : activeTab === 'edit' ? `Edit: ${editingRole?.name}` : 'Create Role'}
        </span>
        <div style={{ width: 30 }} />
      </div>

      <div style={{ background: 'rgba(27,79,155,0.08)', padding: '8px 16px', borderBottom: '1px solid var(--border)' }}>
        <p style={{ fontSize: 12, color: 'var(--primary)', fontWeight: 600 }}>🔐 User Roles & Screen Permissions</p>
      </div>

      <div className="screen-content">
        {saved && <div style={{ background: '#DCFCE7', border: '1px solid #16A34A', borderRadius: 12, padding: '12px 16px', marginBottom: 14, display: 'flex', alignItems: 'center', gap: 8 }}><span>✅</span><span style={{ fontSize: 14, fontWeight: 600, color: '#16A34A' }}>Saved successfully!</span></div>}

        {/* ── ROLES LIST ── */}
        {activeTab === 'roles' && (
          <>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 14 }}>
              {[
                { label: 'Total Roles', value: roles.length, color: 'var(--primary)', bg: '#EFF6FF' },
                { label: 'Total Screens', value: ALL_SCREENS.length, color: '#16A34A', bg: '#F0FDF4' },
              ].map(s => (
                <div key={s.label} style={{ background: s.bg, borderRadius: 12, padding: '12px', textAlign: 'center' }}>
                  <p style={{ fontSize: 24, fontWeight: 800, color: s.color }}>{s.value}</p>
                  <p style={{ fontSize: 11, color: 'var(--text-secondary)' }}>{s.label}</p>
                </div>
              ))}
            </div>

            {roles.map(role => (
              <div key={role.id} style={{ background: 'white', border: '1px solid var(--border)', borderRadius: 14, padding: '14px', marginBottom: 10 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 10 }}>
                  <div style={{ width: 44, height: 44, borderRadius: 22, background: role.color + '18', border: `2px solid ${role.color}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, flexShrink: 0 }}>
                    {role.icon}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <p style={{ fontSize: 15, fontWeight: 700, color: 'var(--text-primary)' }}>{role.name}</p>
                      <span style={{ background: role.color + '18', color: role.color, borderRadius: 20, padding: '2px 10px', fontSize: 10, fontWeight: 700 }}>{role.screens.length} screens</span>
                    </div>
                    <p style={{ fontSize: 12, color: 'var(--text-secondary)', marginTop: 2 }}>{role.fullName}</p>
                  </div>
                </div>

                {/* Screen count by section */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5, marginBottom: 12 }}>
                  {SECTIONS.map(sec => {
                    const total = ALL_SCREENS.filter(s => s.section === sec).length;
                    const granted = ALL_SCREENS.filter(s => s.section === sec && role.screens.includes(s.key)).length;
                    if (granted === 0) return null;
                    return (
                      <span key={sec} style={{ background: granted === total ? '#DCFCE7' : '#FEF3C7', color: granted === total ? '#16A34A' : '#B45309', borderRadius: 20, padding: '2px 8px', fontSize: 9, fontWeight: 600 }}>
                        {sec.split(' ')[0]} {granted}/{total}
                      </span>
                    );
                  })}
                </div>

                <div style={{ display: 'flex', gap: 8 }}>
                  <button onClick={() => startEdit(role)}
                    style={{ flex: 1, padding: '9px', borderRadius: 10, border: `1.5px solid ${role.color}`, background: role.color + '10', color: role.color, fontWeight: 700, fontSize: 13, cursor: 'pointer', fontFamily: 'var(--font)' }}>
                    ✏️ Edit Permissions
                  </button>
                  {!['anm', 'mo'].includes(role.id) && (
                    <button onClick={() => deleteRole(role.id)}
                      style={{ padding: '9px 14px', borderRadius: 10, border: '1.5px solid #FECDD3', background: '#FFF1F2', color: '#DC2626', fontWeight: 700, fontSize: 13, cursor: 'pointer', fontFamily: 'var(--font)' }}>
                      🗑️
                    </button>
                  )}
                </div>
              </div>
            ))}

            <button onClick={startCreate} className="btn btn-primary" style={{ background: '#16A34A', marginBottom: 24 }}>
              ➕ Create New Role
            </button>
          </>
        )}

        {/* ── EDIT ROLE ── */}
        {activeTab === 'edit' && editingRole && (
          <>
            {renderRoleFields(editingRole, setEditingRole)}
            <div className="card" style={{ marginBottom: 14 }}>
              <p style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-secondary)', marginBottom: 4, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Screen Permissions</p>
              <p style={{ fontSize: 11, color: 'var(--text-secondary)', marginBottom: 12 }}>
                {editingRole.screens.length} of {ALL_SCREENS.length} screens enabled
              </p>
              <div style={{ height: 6, background: '#E5E7EB', borderRadius: 3, overflow: 'hidden', marginBottom: 14 }}>
                <div style={{ height: '100%', width: `${(editingRole.screens.length / ALL_SCREENS.length) * 100}%`, background: editingRole.color, borderRadius: 3 }} />
              </div>
              {renderPermissionEditor(editingRole, setEditingRole)}
            </div>
            <div style={{ display: 'flex', gap: 10, marginBottom: 24 }}>
              <button onClick={() => setActiveTab('roles')} className="btn" style={{ flex: 1, background: '#F3F4F6', color: 'var(--text-primary)' }}>Cancel</button>
              <button onClick={saveEdit} className="btn btn-primary" style={{ flex: 1 }}>💾 Save Changes</button>
            </div>
          </>
        )}

        {/* ── CREATE ROLE ── */}
        {activeTab === 'create' && (
          <>
            {renderRoleFields(newRole, setNewRole)}
            <div className="card" style={{ marginBottom: 14 }}>
              <p style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-secondary)', marginBottom: 4, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Screen Permissions</p>
              <p style={{ fontSize: 11, color: 'var(--text-secondary)', marginBottom: 12 }}>
                {newRole.screens.length} of {ALL_SCREENS.length} screens enabled
              </p>
              <div style={{ height: 6, background: '#E5E7EB', borderRadius: 3, overflow: 'hidden', marginBottom: 14 }}>
                <div style={{ height: '100%', width: `${(newRole.screens.length / ALL_SCREENS.length) * 100}%`, background: newRole.color, borderRadius: 3 }} />
              </div>
              {renderPermissionEditor(newRole, setNewRole)}
            </div>
            <div style={{ display: 'flex', gap: 10, marginBottom: 24 }}>
              <button onClick={() => setActiveTab('roles')} className="btn" style={{ flex: 1, background: '#F3F4F6', color: 'var(--text-primary)' }}>Cancel</button>
              <button onClick={saveCreate} className="btn btn-primary" style={{ flex: 1, background: '#16A34A', opacity: newRole.name ? 1 : 0.5 }}>➕ Create Role</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
