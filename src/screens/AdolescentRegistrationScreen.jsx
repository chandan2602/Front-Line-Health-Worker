import React, { useState } from 'react';
import { appendData } from '../utils/storage';
import PatientSearchBar from '../components/PatientSearchBar';

function BackIcon() {
  return <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>;
}

export default function AdolescentRegistrationScreen({ onBack }) {
  const [form, setForm] = useState({ name: '', dob: '', age: '', gender: '', aadhaar: '', abhaId: '', mobile: '', guardianName: '', guardianMobile: '', village: '', subCenter: '', school: '', class: '', enrolled: false, rchId: '', nutritionStatus: '', anaemia: false, notes: '' });
  const [saved, setSaved] = useState(false);
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const handleSave = (e) => {
    e.preventDefault();
    appendData('adolescents', { ...form, recordedAt: new Date().toISOString() });
    setSaved(true); setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="screen" style={{ background: 'var(--bg)' }}>
      <div style={{ background: 'var(--primary)', display: 'flex', alignItems: 'center', padding: '12px 16px', gap: 12, flexShrink: 0 }}>
        <button className="app-bar-icon-btn" onClick={onBack}><BackIcon /></button>
        <span style={{ flex: 1, fontSize: 17, fontWeight: 700, color: 'white', textAlign: 'center' }}>Adolescent Registration</span>
        <div style={{ width: 30 }} />
      </div>
      <div style={{ background: 'rgba(27,79,155,0.08)', padding: '8px 16px', borderBottom: '1px solid var(--border)' }}>
        <p style={{ fontSize: 12, color: 'var(--primary)', fontWeight: 600 }}>🧑 RKSK - Rashtriya Kishor Swasthya Karyakram (10-19 years)</p>
      </div>
      <div className="screen-content">
        {saved && <div style={{ background: '#DCFCE7', border: '1px solid #16A34A', borderRadius: 12, padding: '12px 16px', marginBottom: 16, display: 'flex', alignItems: 'center', gap: 8 }}><span>✅</span><span style={{ fontSize: 14, fontWeight: 600, color: '#16A34A' }}>Adolescent registered!</span></div>}
        <PatientSearchBar onPatientFound={p => set('name', p.name) || setForm(f => ({ ...f, name: p.name, age: String(p.age), gender: p.gender, mobile: p.mobile, village: p.village, abhaId: p.abhaId }))} />
        <form onSubmit={handleSave}>
          <div className="card" style={{ marginBottom: 14 }}>
            <p style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-secondary)', marginBottom: 10, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Personal Details</p>
            <div className="form-group"><label className="form-label">Full Name <span className="required">*</span></label><input type="text" className="form-input" placeholder="Full name" value={form.name} onChange={e => set('name', e.target.value)} required /></div>
            <div className="row-2col">
              <div className="form-group"><label className="form-label">Date of Birth</label><input type="date" className="form-input" value={form.dob} onChange={e => set('dob', e.target.value)} /></div>
              <div className="form-group"><label className="form-label">Age (years) <span className="required">*</span></label><input type="number" min="10" max="19" className="form-input" placeholder="10-19" value={form.age} onChange={e => set('age', e.target.value)} required /></div>
            </div>
            <div className="form-group">
              <label className="form-label">Gender <span className="required">*</span></label>
              <div style={{ display: 'flex', gap: 10 }}>
                {['Male', 'Female', 'Other'].map(g => <button key={g} type="button" onClick={() => set('gender', g)} style={{ flex: 1, padding: '9px', borderRadius: 10, border: '2px solid', borderColor: form.gender === g ? 'var(--primary)' : 'var(--border)', background: form.gender === g ? 'rgba(27,79,155,0.08)' : 'white', color: form.gender === g ? 'var(--primary)' : 'var(--text-secondary)', fontWeight: 600, fontSize: 13, cursor: 'pointer', fontFamily: 'var(--font)' }}>{g}</button>)}
              </div>
            </div>
            <div className="form-group"><label className="form-label">Aadhaar Number</label><input type="text" className="form-input" placeholder="12-digit Aadhaar" value={form.aadhaar} onChange={e => set('aadhaar', e.target.value)} /></div>
            <div className="form-group" style={{ marginBottom: 0 }}><label className="form-label">ABHA ID</label><input type="text" className="form-input" placeholder="Ayushman Bharat Health ID" value={form.abhaId} onChange={e => set('abhaId', e.target.value)} /></div>
          </div>

          <div className="card" style={{ marginBottom: 14 }}>
            <p style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-secondary)', marginBottom: 10, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Guardian & Contact</p>
            <div className="form-group"><label className="form-label">Guardian Name <span className="required">*</span></label><input type="text" className="form-input" placeholder="Parent/Guardian name" value={form.guardianName} onChange={e => set('guardianName', e.target.value)} required /></div>
            <div className="row-2col">
              <div className="form-group"><label className="form-label">Guardian Mobile</label><input type="tel" className="form-input" placeholder="Mobile" value={form.guardianMobile} onChange={e => set('guardianMobile', e.target.value)} /></div>
              <div className="form-group"><label className="form-label">Adolescent Mobile</label><input type="tel" className="form-input" placeholder="Mobile" value={form.mobile} onChange={e => set('mobile', e.target.value)} /></div>
            </div>
            <div className="form-group" style={{ marginBottom: 0 }}><label className="form-label">Village</label><input type="text" className="form-input" placeholder="Village name" value={form.village} onChange={e => set('village', e.target.value)} /></div>
          </div>

          <div className="card" style={{ marginBottom: 14 }}>
            <p style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-secondary)', marginBottom: 10, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Education & Health</p>
            <div className="form-group"><label className="form-label">School Name</label><input type="text" className="form-input" placeholder="School/College name" value={form.school} onChange={e => set('school', e.target.value)} /></div>
            <div className="form-group"><label className="form-label">Class / Grade</label><input type="text" className="form-input" placeholder="e.g. Class 9" value={form.class} onChange={e => set('class', e.target.value)} /></div>
            <div className="form-group"><label className="form-label">Nutrition Status</label><select className="form-input" value={form.nutritionStatus} onChange={e => set('nutritionStatus', e.target.value)}><option value="">Select</option><option>Normal</option><option>Underweight</option><option>Overweight</option><option>Obese</option></select></div>
            <div className="toggle-wrapper">
              <span className="toggle-label" style={{ fontWeight: 600 }}>Anaemia Detected</span>
              <label className="toggle"><input type="checkbox" checked={form.anaemia} onChange={e => set('anaemia', e.target.checked)} /><span className="toggle-slider" /></label>
            </div>
          </div>

          <button type="submit" className="btn btn-primary" style={{ marginBottom: 24 }}>💾 Register Adolescent</button>
        </form>
      </div>
    </div>
  );
}
