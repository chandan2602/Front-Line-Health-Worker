import React, { useState } from 'react';

function BackIcon() {
  return <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>;
}

const LINKED_RECORDS = [
  {
    facility: 'PHC Bhopal Urban',
    type: 'OPD Visit',
    date: '2024-03-10',
    doctor: 'Dr. Meera Joshi',
    summary: 'Fever & cough — Prescribed paracetamol, cough syrup. Follow-up in 5 days.',
    docType: 'Prescription',
  },
  {
    facility: 'District Hospital Bhopal',
    type: 'Lab Report',
    date: '2024-02-18',
    doctor: 'Lab Technician',
    summary: 'CBC: Hb 11.2 g/dL, WBC 7800, Platelets 2.1 lakh. Blood Sugar (F): 98 mg/dL.',
    docType: 'Diagnostic Report',
  },
  {
    facility: 'PHC Bhopal Urban',
    type: 'ANC Visit',
    date: '2024-01-15',
    doctor: 'ANM Priya Sharma',
    summary: 'ANC Visit 1 — BP 116/74, Weight 55 kg, Hb 10.8. IFA & TT given.',
    docType: 'Clinical Note',
  },
  {
    facility: 'Sub-District Hospital',
    type: 'Delivery',
    date: '2024-06-02',
    doctor: 'Dr. Anita Rao',
    summary: 'Normal vaginal delivery. Live birth, male, 3.1 kg. APGAR 9/10.',
    docType: 'Discharge Summary',
  },
];

const CONSENT_REQUESTS = [
  { id: 'c1', requester: 'District Hospital Bhopal', purpose: 'Treatment', status: 'Approved', date: '2024-03-08', expiry: '2024-09-08' },
  { id: 'c2', requester: 'PMJAY Insurance', purpose: 'Health Insurance Claim', status: 'Pending', date: '2024-04-01', expiry: '2024-04-15' },
  { id: 'c3', requester: 'State Health Dept.', purpose: 'Research', status: 'Denied', date: '2024-02-10', expiry: '2024-02-20' },
];

const ABHA_PROFILE = {
  name: 'Sunita Devi',
  abhaId: '91-1234-5678-9012',
  abhaAddress: 'sunita.devi@abdm',
  dob: '1996-04-15',
  gender: 'Female',
  mobile: '9876543210',
  state: 'Madhya Pradesh',
  district: 'Bhopal',
  linkedFacilities: 3,
  healthDocuments: 4,
};

const TABS = ['Profile', 'Health Records', 'Consent'];

export default function ABDMScreen({ onBack, onNavigate }) {
  const [activeTab, setActiveTab] = useState('Profile');
  const [searchAbha, setSearchAbha] = useState('');
  const [profileLoaded, setProfileLoaded] = useState(false);
  const [creating, setCreating] = useState(false);
  const [newForm, setNewForm] = useState({ name: '', dob: '', gender: '', mobile: '', aadhaar: '', email: '', state: '', district: '', photo: null, consentShare: false, consentTerms: false });
  const [created, setCreated] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchAbha.trim()) setProfileLoaded(true);
  };

  const handleCreate = (e) => {
    e.preventDefault();
    if (!newForm.consentShare || !newForm.consentTerms) return;
    setCreated(true);
    setTimeout(() => { setCreated(false); setCreating(false); }, 2500);
  };

  const statusColor = (s) => s === 'Approved' ? '#16A34A' : s === 'Pending' ? '#B45309' : '#DC2626';
  const statusBg = (s) => s === 'Approved' ? '#F0FDF4' : s === 'Pending' ? '#FFFBEB' : '#FFF1F2';

  return (
    <div className="screen" style={{ background: 'var(--bg)' }}>
      {/* App Bar */}
      <div style={{ background: 'var(--primary)', display: 'flex', alignItems: 'center', padding: '12px 16px', gap: 12, flexShrink: 0 }}>
        <button className="app-bar-icon-btn" onClick={onBack}><BackIcon /></button>
        <span style={{ flex: 1, fontSize: 17, fontWeight: 700, color: 'white', textAlign: 'center' }}>ABDM</span>
        <div style={{ width: 30 }} />
      </div>

      <div style={{ background: 'rgba(27,79,155,0.08)', padding: '8px 16px', borderBottom: '1px solid var(--border)' }}>
        <p style={{ fontSize: 12, color: 'var(--primary)', fontWeight: 600 }}>🏥 Ayushman Bharat Digital Mission</p>
      </div>

      {/* Tabs */}
      <div className="tabs" style={{ margin: '0 16px', paddingTop: 12 }}>
        {TABS.map(t => (
          <button key={t} className={`tab-btn ${activeTab === t ? 'active' : ''}`} onClick={() => setActiveTab(t)}>
            {t}
          </button>
        ))}
      </div>

      <div className="screen-content">

        {/* ── PROFILE TAB ── */}
        {activeTab === 'Profile' && (
          <>
            {/* Search ABHA */}
            {!profileLoaded && !creating && (
              <>
                <div className="card" style={{ marginBottom: 14 }}>
                  <p style={{ fontSize: 13, fontWeight: 700, color: 'var(--primary)', marginBottom: 10 }}>🔍 Search by ABHA ID / Mobile</p>
                  <form onSubmit={handleSearch}>
                    <input
                      type="text"
                      className="form-input"
                      placeholder="Enter ABHA ID or Mobile Number"
                      value={searchAbha}
                      onChange={e => setSearchAbha(e.target.value)}
                      style={{ marginBottom: 10 }}
                    />
                    <button type="submit" className="btn btn-primary">Search</button>
                  </form>
                </div>
                <div style={{ textAlign: 'center', margin: '8px 0 14px', color: 'var(--text-secondary)', fontSize: 13 }}>— or —</div>
                <button className="btn btn-primary" style={{ background: '#16A34A', marginBottom: 14 }} onClick={() => setCreating(true)}>
                  ➕ Create New ABHA ID
                </button>
              </>
            )}

            {/* Create ABHA Form */}
            {creating && !created && (
              <div className="card" style={{ marginBottom: 14 }}>
                <p style={{ fontSize: 13, fontWeight: 700, color: '#16A34A', marginBottom: 12 }}>➕ Create ABHA ID</p>
                <form onSubmit={handleCreate}>
                  {/* Required Fields */}
                  {[
                    { label: 'Full Name', key: 'name', type: 'text', placeholder: 'As per Aadhaar' },
                    { label: 'Date of Birth', key: 'dob', type: 'date', placeholder: '' },
                    { label: 'Mobile Number', key: 'mobile', type: 'tel', placeholder: '10-digit mobile' },
                    { label: 'Aadhaar Number', key: 'aadhaar', type: 'text', placeholder: 'XXXX-XXXX-XXXX' },
                  ].map(f => (
                    <div className="form-group" key={f.key}>
                      <label className="form-label">{f.label} <span className="required">*</span></label>
                      <input type={f.type} className="form-input" placeholder={f.placeholder} required
                        value={newForm[f.key]} onChange={e => setNewForm(p => ({ ...p, [f.key]: e.target.value }))} />
                    </div>
                  ))}
                  <div className="form-group">
                    <label className="form-label">Gender <span className="required">*</span></label>
                    <select className="form-input" required value={newForm.gender} onChange={e => setNewForm(p => ({ ...p, gender: e.target.value }))}>
                      <option value="">Select</option>
                      <option>Male</option><option>Female</option><option>Other</option>
                    </select>
                  </div>

                  {/* Optional Details */}
                  <div style={{ margin: '14px 0 10px', borderTop: '1px solid var(--border)', paddingTop: 14 }}>
                    <p style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 12 }}>
                      Optional Details
                    </p>

                    {/* Profile Photo */}
                    <div className="form-group">
                      <label className="form-label">Profile Photo</label>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                        <div style={{
                          width: 56, height: 56, borderRadius: 28,
                          background: newForm.photo ? 'transparent' : '#EFF6FF',
                          border: '2px dashed #BFDBFE',
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          overflow: 'hidden', flexShrink: 0
                        }}>
                          {newForm.photo
                            ? <img src={URL.createObjectURL(newForm.photo)} alt="preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                            : <span style={{ fontSize: 22 }}>👤</span>
                          }
                        </div>
                        <label style={{
                          flex: 1, padding: '9px 14px', borderRadius: 10,
                          border: '1.5px solid var(--border)', background: '#F9FAFB',
                          fontSize: 13, color: 'var(--primary)', fontWeight: 600,
                          cursor: 'pointer', textAlign: 'center'
                        }}>
                          📷 {newForm.photo ? 'Change Photo' : 'Upload Photo'}
                          <input type="file" accept="image/*" style={{ display: 'none' }}
                            onChange={e => setNewForm(p => ({ ...p, photo: e.target.files[0] || null }))} />
                        </label>
                      </div>
                    </div>

                    <div className="form-group">
                      <label className="form-label">Email ID</label>
                      <input type="email" className="form-input" placeholder="example@email.com"
                        value={newForm.email} onChange={e => setNewForm(p => ({ ...p, email: e.target.value }))} />
                    </div>

                    <div className="row-2col">
                      <div className="form-group">
                        <label className="form-label">State</label>
                        <select className="form-input" value={newForm.state} onChange={e => setNewForm(p => ({ ...p, state: e.target.value }))}>
                          <option value="">Select State</option>
                          {['Madhya Pradesh','Uttar Pradesh','Rajasthan','Maharashtra','Bihar','Gujarat','Karnataka','Tamil Nadu','West Bengal','Other'].map(s => (
                            <option key={s}>{s}</option>
                          ))}
                        </select>
                      </div>
                      <div className="form-group">
                        <label className="form-label">District</label>
                        <input type="text" className="form-input" placeholder="District name"
                          value={newForm.district} onChange={e => setNewForm(p => ({ ...p, district: e.target.value }))} />
                      </div>
                    </div>
                  </div>

                  {/* Consent & Declaration */}
                  <div style={{ margin: '4px 0 14px', borderTop: '1px solid var(--border)', paddingTop: 14 }}>
                    <p style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 12 }}>
                      Consent & Declaration
                    </p>

                    <label style={{ display: 'flex', alignItems: 'flex-start', gap: 10, marginBottom: 12, cursor: 'pointer' }}>
                      <input type="checkbox" checked={newForm.consentShare}
                        onChange={e => setNewForm(p => ({ ...p, consentShare: e.target.checked }))}
                        style={{ marginTop: 2, width: 16, height: 16, accentColor: 'var(--primary)', flexShrink: 0 }} />
                      <span style={{ fontSize: 12, color: 'var(--text-primary)', lineHeight: 1.5 }}>
                        I consent to share my health records digitally through the ABDM network with authorised healthcare providers. <span className="required">*</span>
                      </span>
                    </label>

                    <label style={{ display: 'flex', alignItems: 'flex-start', gap: 10, cursor: 'pointer' }}>
                      <input type="checkbox" checked={newForm.consentTerms}
                        onChange={e => setNewForm(p => ({ ...p, consentTerms: e.target.checked }))}
                        style={{ marginTop: 2, width: 16, height: 16, accentColor: 'var(--primary)', flexShrink: 0 }} />
                      <span style={{ fontSize: 12, color: 'var(--text-primary)', lineHeight: 1.5 }}>
                        I agree to the <span style={{ color: 'var(--primary)', fontWeight: 600 }}>ABDM Terms & Conditions</span> and confirm that the information provided is accurate. <span className="required">*</span>
                      </span>
                    </label>

                    {(!newForm.consentShare || !newForm.consentTerms) && (
                      <p style={{ fontSize: 11, color: '#B45309', marginTop: 10, background: '#FFFBEB', borderRadius: 8, padding: '8px 10px', border: '1px solid #FDE68A' }}>
                        ⚠️ Both consents are required to create an ABHA ID.
                      </p>
                    )}
                  </div>

                  <div style={{ display: 'flex', gap: 10, marginTop: 4 }}>
                    <button type="button" className="btn" style={{ flex: 1, background: '#F3F4F6', color: 'var(--text-primary)' }} onClick={() => setCreating(false)}>Cancel</button>
                    <button type="submit" className="btn btn-primary" style={{ flex: 1, background: '#16A34A', opacity: (newForm.consentShare && newForm.consentTerms) ? 1 : 0.5 }}>Create ABHA</button>
                  </div>
                </form>
              </div>
            )}

            {created && (
              <div style={{ background: '#DCFCE7', border: '1px solid #16A34A', borderRadius: 12, padding: '14px', marginBottom: 14, textAlign: 'center' }}>
                <p style={{ fontSize: 15, fontWeight: 700, color: '#16A34A' }}>✅ ABHA ID Created Successfully!</p>
                <p style={{ fontSize: 12, color: '#166534', marginTop: 4 }}>ABHA ID: 91-9999-8888-7777</p>
              </div>
            )}

            {/* ABHA Profile Card */}
            {profileLoaded && (
              <>
                <div style={{
                  background: 'linear-gradient(135deg, #1B4F9B 0%, #2563EB 100%)',
                  borderRadius: 16, padding: '18px', marginBottom: 14, color: 'white'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 14 }}>
                    <div style={{
                      width: 52, height: 52, borderRadius: 26,
                      background: 'rgba(255,255,255,0.2)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: 22, fontWeight: 700
                    }}>
                      {ABHA_PROFILE.name.charAt(0)}
                    </div>
                    <div>
                      <p style={{ fontSize: 16, fontWeight: 700 }}>{ABHA_PROFILE.name}</p>
                      <p style={{ fontSize: 12, opacity: 0.85, marginTop: 2 }}>{ABHA_PROFILE.abhaAddress}</p>
                    </div>
                  </div>
                  <div style={{ background: 'rgba(255,255,255,0.15)', borderRadius: 10, padding: '10px 12px', marginBottom: 12 }}>
                    <p style={{ fontSize: 11, opacity: 0.8, marginBottom: 2 }}>ABHA Number</p>
                    <p style={{ fontSize: 16, fontWeight: 700, letterSpacing: '0.08em' }}>{ABHA_PROFILE.abhaId}</p>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
                    {[
                      { label: 'DOB', value: ABHA_PROFILE.dob },
                      { label: 'Gender', value: ABHA_PROFILE.gender },
                      { label: 'Mobile', value: ABHA_PROFILE.mobile },
                      { label: 'District', value: ABHA_PROFILE.district },
                    ].map(item => (
                      <div key={item.label}>
                        <p style={{ fontSize: 10, opacity: 0.75 }}>{item.label}</p>
                        <p style={{ fontSize: 13, fontWeight: 600 }}>{item.value}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Linked Stats */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 14 }}>
                  {[
                    { label: 'Linked Facilities', value: ABHA_PROFILE.linkedFacilities, icon: '🏥', color: '#EFF6FF', border: '#BFDBFE' },
                    { label: 'Health Documents', value: ABHA_PROFILE.healthDocuments, icon: '📄', color: '#F0FDF4', border: '#BBF7D0' },
                  ].map(s => (
                    <div key={s.label} style={{ background: s.color, border: `1px solid ${s.border}`, borderRadius: 12, padding: '14px', textAlign: 'center' }}>
                      <p style={{ fontSize: 22 }}>{s.icon}</p>
                      <p style={{ fontSize: 20, fontWeight: 700, color: 'var(--primary)' }}>{s.value}</p>
                      <p style={{ fontSize: 11, color: 'var(--text-secondary)' }}>{s.label}</p>
                    </div>
                  ))}
                </div>

                <button className="btn btn-primary" style={{ marginBottom: 8 }} onClick={() => setActiveTab('Health Records')}>
                  📋 View Health Records
                </button>
                <button className="btn" style={{ background: '#F3F4F6', color: 'var(--text-primary)', marginBottom: 14 }} onClick={() => { setProfileLoaded(false); setSearchAbha(''); }}>
                  🔍 Search Another Patient
                </button>
              </>
            )}
          </>
        )}

        {/* ── HEALTH RECORDS TAB ── */}
        {activeTab === 'Health Records' && (
          <>
            <div style={{ background: '#EFF6FF', border: '1px solid #BFDBFE', borderRadius: 12, padding: '12px 14px', marginBottom: 14 }}>
              <p style={{ fontSize: 13, fontWeight: 600, color: 'var(--primary)' }}>
                👤 Sunita Devi — ABHA: {ABHA_PROFILE.abhaId}
              </p>
              <p style={{ fontSize: 11, color: 'var(--text-secondary)', marginTop: 2 }}>
                {LINKED_RECORDS.length} records from {new Set(LINKED_RECORDS.map(r => r.facility)).size} facilities
              </p>
            </div>

            {LINKED_RECORDS.map((rec, i) => (
              <div key={i} style={{
                background: 'white', border: '1px solid var(--border)',
                borderRadius: 12, padding: '14px', marginBottom: 10
              }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 8 }}>
                  <div>
                    <p style={{ fontSize: 14, fontWeight: 700, color: 'var(--text-primary)' }}>{rec.type}</p>
                    <p style={{ fontSize: 11, color: 'var(--text-secondary)', marginTop: 2 }}>{rec.facility}</p>
                  </div>
                  <span style={{
                    background: '#EFF6FF', color: 'var(--primary)',
                    borderRadius: 20, padding: '3px 10px', fontSize: 11, fontWeight: 600, flexShrink: 0
                  }}>
                    {rec.docType}
                  </span>
                </div>
                <p style={{ fontSize: 13, color: 'var(--text-primary)', lineHeight: 1.5, marginBottom: 8 }}>{rec.summary}</p>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <p style={{ fontSize: 11, color: 'var(--primary)', fontWeight: 600 }}>📅 {rec.date}</p>
                  <p style={{ fontSize: 11, color: 'var(--text-secondary)' }}>By: {rec.doctor}</p>
                </div>
              </div>
            ))}
          </>
        )}

        {/* ── CONSENT TAB ── */}
        {activeTab === 'Consent' && (
          <>
            <div style={{ background: '#FFFBEB', border: '1px solid #FDE68A', borderRadius: 12, padding: '12px 14px', marginBottom: 14 }}>
              <p style={{ fontSize: 13, fontWeight: 600, color: '#92400E' }}>
                🔐 Consent Manager — Control who accesses your health data
              </p>
            </div>

            {CONSENT_REQUESTS.map(req => (
              <div key={req.id} style={{
                background: 'white', border: '1px solid var(--border)',
                borderRadius: 12, padding: '14px', marginBottom: 10
              }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 8 }}>
                  <p style={{ fontSize: 14, fontWeight: 700, color: 'var(--text-primary)' }}>{req.requester}</p>
                  <span style={{
                    background: statusBg(req.status), color: statusColor(req.status),
                    borderRadius: 20, padding: '3px 10px', fontSize: 11, fontWeight: 700
                  }}>
                    {req.status}
                  </span>
                </div>
                <p style={{ fontSize: 12, color: 'var(--text-secondary)', marginBottom: 6 }}>
                  Purpose: <span style={{ color: 'var(--text-primary)', fontWeight: 600 }}>{req.purpose}</span>
                </p>
                <div style={{ display: 'flex', gap: 16 }}>
                  <p style={{ fontSize: 11, color: 'var(--text-secondary)' }}>Requested: {req.date}</p>
                  <p style={{ fontSize: 11, color: 'var(--text-secondary)' }}>Expires: {req.expiry}</p>
                </div>
                {req.status === 'Pending' && (
                  <div style={{ display: 'flex', gap: 8, marginTop: 10 }}>
                    <button className="btn btn-primary" style={{ flex: 1, padding: '8px', fontSize: 13, background: '#16A34A' }}>
                      ✅ Approve
                    </button>
                    <button className="btn" style={{ flex: 1, padding: '8px', fontSize: 13, background: '#FFF1F2', color: '#DC2626', border: '1px solid #FECDD3' }}>
                      ❌ Deny
                    </button>
                  </div>
                )}
              </div>
            ))}
          </>
        )}

        <div style={{ height: 16 }} />
      </div>
    </div>
  );
}
