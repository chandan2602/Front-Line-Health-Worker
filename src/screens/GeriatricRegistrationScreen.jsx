import React, { useState } from 'react';
import { appendData } from '../utils/storage';

function BackIcon() {
  return <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>;
}

export default function GeriatricRegistrationScreen({ onBack }) {
  const [form, setForm] = useState({ name: '', age: '', gender: '', aadhaar: '', mobile: '', village: '', subCenter: '', guardianName: '', guardianMobile: '', relationship: '', livesAlone: false, bpl: false, disability: false, disabilityType: '', chronicConditions: [], currentMedications: '', notes: '' });
  const [saved, setSaved] = useState(false);
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));
  const conditions = ['Hypertension', 'Diabetes', 'Heart Disease', 'Arthritis', 'COPD', 'Dementia', 'Depression', 'Cataract', 'Hearing Loss', 'Osteoporosis'];
  const toggleCond = (c) => setForm(f => ({ ...f, chronicConditions: f.chronicConditions.includes(c) ? f.chronicConditions.filter(x => x !== c) : [...f.chronicConditions, c] }));

  const handleSave = (e) => {
    e.preventDefault();
    appendData('geriatricPatients', { ...form, recordedAt: new Date().toISOString() });
    setSaved(true); setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="screen" style={{ background: 'var(--bg)' }}>
      <div style={{ background: 'var(--primary)', display: 'flex', alignItems: 'center', padding: '12px 16px', gap: 12, flexShrink: 0 }}>
        <button className="app-bar-icon-btn" onClick={onBack}><BackIcon /></button>
        <span style={{ flex: 1, fontSize: 17, fontWeight: 700, color: 'white', textAlign: 'center' }}>Geriatric Registration</span>
        <div style={{ width: 30 }} />
      </div>
      <div style={{ background: 'rgba(27,79,155,0.08)', padding: '8px 16px', borderBottom: '1px solid var(--border)' }}>
        <p style={{ fontSize: 12, color: 'var(--primary)', fontWeight: 600 }}>👴 Elderly Care Registration (60+ years)</p>
      </div>
      <div className="screen-content">
        {saved && <div style={{ background: '#DCFCE7', border: '1px solid #16A34A', borderRadius: 12, padding: '12px 16px', marginBottom: 16, display: 'flex', alignItems: 'center', gap: 8 }}><span>✅</span><span style={{ fontSize: 14, fontWeight: 600, color: '#16A34A' }}>Geriatric patient registered!</span></div>}
        <form onSubmit={handleSave}>
          <div className="card" style={{ marginBottom: 14 }}>
            <p style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-secondary)', marginBottom: 10, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Personal Details</p>
            <div className="form-group"><label className="form-label">Full Name <span className="required">*</span></label><input type="text" className="form-input" placeholder="Full name" value={form.name} onChange={e => set('name', e.target.value)} required /></div>
            <div className="row-2col">
              <div className="form-group"><label className="form-label">Age (60+) <span className="required">*</span></label><input type="number" min="60" className="form-input" placeholder="Years" value={form.age} onChange={e => set('age', e.target.value)} required /></div>
              <div className="form-group"><label className="form-label">Gender</label><select className="form-input" value={form.gender} onChange={e => set('gender', e.target.value)}><option value="">Select</option><option>Male</option><option>Female</option></select></div>
            </div>
            <div className="form-group"><label className="form-label">Aadhaar</label><input type="text" className="form-input" placeholder="12-digit Aadhaar" value={form.aadhaar} onChange={e => set('aadhaar', e.target.value)} /></div>
            <div className="form-group"><label className="form-label">Mobile</label><input type="tel" className="form-input" placeholder="Mobile number" value={form.mobile} onChange={e => set('mobile', e.target.value)} /></div>
            <div className="form-group" style={{ marginBottom: 0 }}><label className="form-label">Village</label><input type="text" className="form-input" placeholder="Village name" value={form.village} onChange={e => set('village', e.target.value)} /></div>
          </div>

          <div className="card" style={{ marginBottom: 14 }}>
            <p style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-secondary)', marginBottom: 10, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Guardian / Caregiver</p>
            <div className="form-group"><label className="form-label">Guardian Name</label><input type="text" className="form-input" placeholder="Guardian/caregiver name" value={form.guardianName} onChange={e => set('guardianName', e.target.value)} /></div>
            <div className="row-2col">
              <div className="form-group"><label className="form-label">Mobile</label><input type="tel" className="form-input" placeholder="Mobile" value={form.guardianMobile} onChange={e => set('guardianMobile', e.target.value)} /></div>
              <div className="form-group"><label className="form-label">Relationship</label><select className="form-input" value={form.relationship} onChange={e => set('relationship', e.target.value)}><option value="">Select</option><option>Son</option><option>Daughter</option><option>Spouse</option><option>Other</option></select></div>
            </div>
            <div className="toggle-wrapper" style={{ marginBottom: 8 }}><span className="toggle-label">Lives Alone</span><label className="toggle"><input type="checkbox" checked={form.livesAlone} onChange={e => set('livesAlone', e.target.checked)} /><span className="toggle-slider" /></label></div>
            <div className="toggle-wrapper"><span className="toggle-label">BPL Card Holder</span><label className="toggle"><input type="checkbox" checked={form.bpl} onChange={e => set('bpl', e.target.checked)} /><span className="toggle-slider" /></label></div>
          </div>

          <div className="card" style={{ marginBottom: 14 }}>
            <p style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-secondary)', marginBottom: 10, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Health Conditions</p>
            <label className="form-label" style={{ marginBottom: 8, display: 'block' }}>Chronic Conditions</label>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 12 }}>
              {conditions.map(c => <button key={c} type="button" className={`chip ${form.chronicConditions.includes(c) ? 'selected' : ''}`} onClick={() => toggleCond(c)}>{c}</button>)}
            </div>
            <div className="toggle-wrapper" style={{ marginBottom: 8 }}><span className="toggle-label">Disability</span><label className="toggle"><input type="checkbox" checked={form.disability} onChange={e => set('disability', e.target.checked)} /><span className="toggle-slider" /></label></div>
            {form.disability && <div className="form-group"><label className="form-label">Disability Type</label><select className="form-input" value={form.disabilityType} onChange={e => set('disabilityType', e.target.value)}><option value="">Select</option><option>Visual</option><option>Hearing</option><option>Locomotor</option><option>Mental</option><option>Multiple</option></select></div>}
            <div className="form-group" style={{ marginBottom: 0 }}><label className="form-label">Current Medications</label><textarea className="form-input" rows={2} placeholder="List current medications..." value={form.currentMedications} onChange={e => set('currentMedications', e.target.value)} style={{ resize: 'none' }} /></div>
          </div>

          <button type="submit" className="btn btn-primary" style={{ marginBottom: 24 }}>💾 Register Patient</button>
        </form>
      </div>
    </div>
  );
}
