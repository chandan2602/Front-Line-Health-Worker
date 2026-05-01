import React, { useState } from 'react';
import { appendData } from '../utils/storage';
import PatientSearchBar from '../components/PatientSearchBar';

function BackIcon() {
  return <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>;
}

export default function PalliativeRegistrationScreen({ onBack }) {
  const [form, setForm] = useState({ name: '', age: '', gender: '', aadhaar: '', mobile: '', village: '', diagnosis: '', diagnosisDate: '', stage: '', treatingDoctor: '', hospital: '', guardianName: '', guardianMobile: '', relationship: '', livesAlone: false, bpl: false, painLevel: '', functionalStatus: '', notes: '' });
  const [saved, setSaved] = useState(false);
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const handleSave = (e) => {
    e.preventDefault();
    appendData('palliativePatients', { ...form, recordedAt: new Date().toISOString() });
    setSaved(true); setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="screen" style={{ background: 'var(--bg)' }}>
      <div style={{ background: 'var(--primary)', display: 'flex', alignItems: 'center', padding: '12px 16px', gap: 12, flexShrink: 0 }}>
        <button className="app-bar-icon-btn" onClick={onBack}><BackIcon /></button>
        <span style={{ flex: 1, fontSize: 17, fontWeight: 700, color: 'white', textAlign: 'center' }}>Palliative Registration</span>
        <div style={{ width: 30 }} />
      </div>
      <div style={{ background: 'rgba(27,79,155,0.08)', padding: '8px 16px', borderBottom: '1px solid var(--border)' }}>
        <p style={{ fontSize: 12, color: 'var(--primary)', fontWeight: 600 }}>🕊️ Palliative & End-of-Life Care</p>
      </div>
      <div className="screen-content">
        {saved && <div style={{ background: '#DCFCE7', border: '1px solid #16A34A', borderRadius: 12, padding: '12px 16px', marginBottom: 16, display: 'flex', alignItems: 'center', gap: 8 }}><span>✅</span><span style={{ fontSize: 14, fontWeight: 600, color: '#16A34A' }}>Patient registered!</span></div>}
        <PatientSearchBar onPatientFound={p => setForm(f => ({ ...f, name: p.name, age: String(p.age), gender: p.gender, mobile: p.mobile, village: p.village }))} />
        <form onSubmit={handleSave}>
          <div className="card" style={{ marginBottom: 14 }}>
            <p style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-secondary)', marginBottom: 10, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Patient Details</p>
            <div className="form-group"><label className="form-label">Full Name <span className="required">*</span></label><input type="text" className="form-input" placeholder="Full name" value={form.name} onChange={e => set('name', e.target.value)} required /></div>
            <div className="row-2col">
              <div className="form-group"><label className="form-label">Age</label><input type="number" className="form-input" placeholder="Years" value={form.age} onChange={e => set('age', e.target.value)} /></div>
              <div className="form-group"><label className="form-label">Gender</label><select className="form-input" value={form.gender} onChange={e => set('gender', e.target.value)}><option value="">Select</option><option>Male</option><option>Female</option></select></div>
            </div>
            <div className="form-group"><label className="form-label">Mobile</label><input type="tel" className="form-input" placeholder="Mobile" value={form.mobile} onChange={e => set('mobile', e.target.value)} /></div>
            <div className="form-group" style={{ marginBottom: 0 }}><label className="form-label">Village</label><input type="text" className="form-input" placeholder="Village name" value={form.village} onChange={e => set('village', e.target.value)} /></div>
          </div>

          <div className="card" style={{ marginBottom: 14 }}>
            <p style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-secondary)', marginBottom: 10, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Diagnosis</p>
            <div className="form-group"><label className="form-label">Primary Diagnosis <span className="required">*</span></label><select className="form-input" value={form.diagnosis} onChange={e => set('diagnosis', e.target.value)} required><option value="">Select</option><option>Cancer</option><option>End-Stage Renal Disease</option><option>End-Stage Liver Disease</option><option>Advanced Heart Failure</option><option>Advanced COPD</option><option>Advanced Neurological Disease</option><option>HIV/AIDS (Advanced)</option><option>Other Terminal Illness</option></select></div>
            <div className="row-2col">
              <div className="form-group"><label className="form-label">Diagnosis Date</label><input type="date" className="form-input" value={form.diagnosisDate} onChange={e => set('diagnosisDate', e.target.value)} /></div>
              <div className="form-group"><label className="form-label">Stage</label><select className="form-input" value={form.stage} onChange={e => set('stage', e.target.value)}><option value="">Select</option><option>Stage I</option><option>Stage II</option><option>Stage III</option><option>Stage IV</option><option>Terminal</option></select></div>
            </div>
            <div className="form-group"><label className="form-label">Treating Doctor</label><input type="text" className="form-input" placeholder="Doctor name" value={form.treatingDoctor} onChange={e => set('treatingDoctor', e.target.value)} /></div>
            <div className="form-group" style={{ marginBottom: 0 }}><label className="form-label">Hospital</label><input type="text" className="form-input" placeholder="Hospital name" value={form.hospital} onChange={e => set('hospital', e.target.value)} /></div>
          </div>

          <div className="card" style={{ marginBottom: 14 }}>
            <p style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-secondary)', marginBottom: 10, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Current Status</p>
            <div className="form-group"><label className="form-label">Pain Level (0-10)</label><input type="range" min="0" max="10" className="form-input" style={{ padding: '4px 0', background: 'transparent', border: 'none' }} value={form.painLevel || 0} onChange={e => set('painLevel', e.target.value)} /><div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: 'var(--text-secondary)' }}><span>0 (No pain)</span><span style={{ fontWeight: 700, color: 'var(--primary)' }}>Level: {form.painLevel || 0}</span><span>10 (Severe)</span></div></div>
            <div className="form-group" style={{ marginBottom: 0 }}><label className="form-label">Functional Status</label><select className="form-input" value={form.functionalStatus} onChange={e => set('functionalStatus', e.target.value)}><option value="">Select</option><option>Fully Active</option><option>Restricted but ambulatory</option><option>Ambulatory, self-care only</option><option>Limited self-care</option><option>Completely disabled</option></select></div>
          </div>

          <button type="submit" className="btn btn-primary" style={{ marginBottom: 24 }}>💾 Register Patient</button>
        </form>
      </div>
    </div>
  );
}
