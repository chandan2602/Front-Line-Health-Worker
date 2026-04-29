import React, { useState } from 'react';
import { getData, appendData } from '../utils/storage';

function BackIcon() {
  return <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>;
}

export default function ChildRegistrationScreen({ onBack }) {
  const mothers = getData('pregnantWomen') || [];
  const [form, setForm] = useState({
    motherId: '', childName: '', dob: '', gender: '',
    birthWeight: '', birthOrder: '', birthType: '',
    abhaId: '', aadhaar: '', mobile: '',
    subCenter: '', village: '', immunizationStarted: false
  });
  const [saved, setSaved] = useState(false);
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const handleSave = (e) => {
    e.preventDefault();
    appendData('children', { ...form, recordedAt: new Date().toISOString() });
    setSaved(true); setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="screen" style={{ background: 'var(--bg)' }}>
      <div style={{ background: 'var(--primary)', display: 'flex', alignItems: 'center', padding: '12px 16px', gap: 12, flexShrink: 0 }}>
        <button className="app-bar-icon-btn" onClick={onBack}><BackIcon /></button>
        <span style={{ flex: 1, fontSize: 17, fontWeight: 700, color: 'white', textAlign: 'center' }}>Child Registration</span>
        <div style={{ width: 30 }} />
      </div>
      <div style={{ background: 'rgba(27,79,155,0.08)', padding: '8px 16px', borderBottom: '1px solid var(--border)' }}>
        <p style={{ fontSize: 12, color: 'var(--primary)', fontWeight: 600 }}>👶 Child Health Registration</p>
      </div>
      <div className="screen-content">
        {saved && <div style={{ background: '#DCFCE7', border: '1px solid #16A34A', borderRadius: 12, padding: '12px 16px', marginBottom: 16, display: 'flex', alignItems: 'center', gap: 8 }}><span>✅</span><span style={{ fontSize: 14, fontWeight: 600, color: '#16A34A' }}>Child registered successfully!</span></div>}
        <form onSubmit={handleSave}>
          <div className="card" style={{ marginBottom: 14 }}>
            <p style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-secondary)', marginBottom: 10, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Link to Mother</p>
            <div className="form-group" style={{ marginBottom: 0 }}><label className="form-label">Mother's Name <span className="required">*</span></label>
              <select className="form-input" value={form.motherId} onChange={e => set('motherId', e.target.value)} required>
                <option value="">-- Select Mother --</option>
                {mothers.map(m => <option key={m.id} value={m.id}>{m.name}</option>)}
              </select>
            </div>
          </div>

          <div className="card" style={{ marginBottom: 14 }}>
            <p style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-secondary)', marginBottom: 10, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Child Details</p>
            <div className="form-group"><label className="form-label">Child's Name <span className="required">*</span></label><input type="text" className="form-input" placeholder="Full name" value={form.childName} onChange={e => set('childName', e.target.value)} required /></div>
            <div className="row-2col">
              <div className="form-group"><label className="form-label">Date of Birth <span className="required">*</span></label><input type="date" className="form-input" value={form.dob} onChange={e => set('dob', e.target.value)} required /></div>
              <div className="form-group"><label className="form-label">Gender <span className="required">*</span></label>
                <select className="form-input" value={form.gender} onChange={e => set('gender', e.target.value)} required>
                  <option value="">Select</option><option>Male</option><option>Female</option><option>Other</option>
                </select>
              </div>
            </div>
            <div className="row-2col">
              <div className="form-group"><label className="form-label">Birth Weight (g)</label><input type="number" className="form-input" placeholder="e.g. 2800" value={form.birthWeight} onChange={e => set('birthWeight', e.target.value)} /></div>
              <div className="form-group"><label className="form-label">Birth Order</label><input type="number" className="form-input" placeholder="1st, 2nd..." value={form.birthOrder} onChange={e => set('birthOrder', e.target.value)} /></div>
            </div>
            <div className="form-group"><label className="form-label">Birth Type</label>
              <select className="form-input" value={form.birthType} onChange={e => set('birthType', e.target.value)}>
                <option value="">Select</option><option>Singleton</option><option>Twin</option><option>Triplet</option>
              </select>
            </div>
            <div className="form-group"><label className="form-label">ABHA ID</label><input type="text" className="form-input" placeholder="Ayushman Bharat Health ID" value={form.abhaId} onChange={e => set('abhaId', e.target.value)} /></div>
            <div className="form-group" style={{ marginBottom: 0 }}><label className="form-label">Aadhaar Number</label><input type="text" className="form-input" placeholder="12-digit Aadhaar" value={form.aadhaar} onChange={e => set('aadhaar', e.target.value)} /></div>
          </div>

          <div className="card" style={{ marginBottom: 14 }}>
            <p style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-secondary)', marginBottom: 10, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Location</p>
            <div className="form-group"><label className="form-label">Sub-Center</label><select className="form-input" value={form.subCenter} onChange={e => set('subCenter', e.target.value)}><option value="">Select</option><option>Ward-7 Sub-Center</option><option>Ward-12 Sub-Center</option></select></div>
            <div className="form-group" style={{ marginBottom: 0 }}><label className="form-label">Village</label><select className="form-input" value={form.village} onChange={e => set('village', e.target.value)}><option value="">Select</option><option>Arera Colony</option><option>Kolar Road</option></select></div>
          </div>

          <div className="card" style={{ marginBottom: 14 }}>
            <div className="toggle-wrapper">
              <span className="toggle-label" style={{ fontWeight: 600 }}>Immunization Started</span>
              <label className="toggle"><input type="checkbox" checked={form.immunizationStarted} onChange={e => set('immunizationStarted', e.target.checked)} /><span className="toggle-slider" /></label>
            </div>
          </div>

          <button type="submit" className="btn btn-primary" style={{ marginBottom: 24 }}>💾 Register Child</button>
        </form>
      </div>
    </div>
  );
}
