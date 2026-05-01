import React, { useState } from 'react';
import { appendData } from '../utils/storage';
import PatientSearchBar from '../components/PatientSearchBar';

function BackIcon() {
  return <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>;
}

export default function OralScreeningScreen({ onBack }) {
  const [form, setForm] = useState({ name: '', age: '', gender: '', mobile: '', village: '', screeningDate: '', tobaccoUse: '', alcoholUse: false, oralHygiene: '', ulcers: false, ulcerDuration: '', whitePatch: false, redPatch: false, swelling: false, bleedingGums: false, looseTooth: false, difficulty: false, suspectedOralCancer: false, referral: false, notes: '' });
  const [saved, setSaved] = useState(false);
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const handleSave = (e) => {
    e.preventDefault();
    appendData('oralScreenings', { ...form, recordedAt: new Date().toISOString() });
    setSaved(true); setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="screen" style={{ background: 'var(--bg)' }}>
      <div style={{ background: 'var(--primary)', display: 'flex', alignItems: 'center', padding: '12px 16px', gap: 12, flexShrink: 0 }}>
        <button className="app-bar-icon-btn" onClick={onBack}><BackIcon /></button>
        <span style={{ flex: 1, fontSize: 17, fontWeight: 700, color: 'white', textAlign: 'center' }}>Oral Screening</span>
        <div style={{ width: 30 }} />
      </div>
      <div className="screen-content">
        {saved && <div style={{ background: '#DCFCE7', border: '1px solid #16A34A', borderRadius: 12, padding: '12px 16px', marginBottom: 16, display: 'flex', alignItems: 'center', gap: 8 }}><span>✅</span><span style={{ fontSize: 14, fontWeight: 600, color: '#16A34A' }}>Oral screening saved!</span></div>}
        {form.suspectedOralCancer && <div style={{ background: '#FEE2E2', border: '1px solid #DC2626', borderRadius: 12, padding: '12px 16px', marginBottom: 16 }}><p style={{ fontSize: 13, fontWeight: 700, color: '#DC2626' }}>⚠️ Suspected Oral Cancer - Immediate Referral Required!</p></div>}
        <PatientSearchBar onPatientFound={p => setForm(f => ({ ...f, name: p.name, age: String(p.age), gender: p.gender, mobile: p.mobile, village: p.village, abhaId: p.abhaId }))} />
        <form onSubmit={handleSave}>
          <div className="card" style={{ marginBottom: 14 }}>
            <p style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-secondary)', marginBottom: 10, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Patient Details</p>
            <div className="form-group"><label className="form-label">Name <span className="required">*</span></label><input type="text" className="form-input" placeholder="Full name" value={form.name} onChange={e => set('name', e.target.value)} required /></div>
            <div className="row-2col">
              <div className="form-group"><label className="form-label">Age</label><input type="number" className="form-input" placeholder="Years" value={form.age} onChange={e => set('age', e.target.value)} /></div>
              <div className="form-group"><label className="form-label">Gender</label><select className="form-input" value={form.gender} onChange={e => set('gender', e.target.value)}><option value="">Select</option><option>Male</option><option>Female</option></select></div>
            </div>
            <div className="form-group" style={{ marginBottom: 0 }}><label className="form-label">Screening Date</label><input type="date" className="form-input" value={form.screeningDate} onChange={e => set('screeningDate', e.target.value)} /></div>
          </div>

          <div className="card" style={{ marginBottom: 14 }}>
            <p style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-secondary)', marginBottom: 10, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Risk Factors</p>
            <div className="form-group"><label className="form-label">Tobacco Use</label><select className="form-input" value={form.tobaccoUse} onChange={e => set('tobaccoUse', e.target.value)}><option value="">Select</option><option>None</option><option>Smoking</option><option>Chewing Tobacco</option><option>Both</option></select></div>
            <div className="toggle-wrapper"><span className="toggle-label">Alcohol Use</span><label className="toggle"><input type="checkbox" checked={form.alcoholUse} onChange={e => set('alcoholUse', e.target.checked)} /><span className="toggle-slider" /></label></div>
          </div>

          <div className="card" style={{ marginBottom: 14 }}>
            <p style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-secondary)', marginBottom: 10, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Oral Examination</p>
            <div className="form-group"><label className="form-label">Oral Hygiene</label><select className="form-input" value={form.oralHygiene} onChange={e => set('oralHygiene', e.target.value)}><option value="">Select</option><option>Good</option><option>Fair</option><option>Poor</option></select></div>
            {[['ulcers', 'Oral Ulcers'], ['whitePatch', 'White Patch (Leukoplakia)'], ['redPatch', 'Red Patch (Erythroplakia)'], ['swelling', 'Swelling in Mouth/Neck'], ['bleedingGums', 'Bleeding Gums'], ['looseTooth', 'Loose Teeth'], ['difficulty', 'Difficulty Swallowing/Opening Mouth'], ['suspectedOralCancer', '⚠️ Suspected Oral Cancer'], ['referral', 'Referred to Higher Facility']].map(([key, label]) => (
              <div key={key} className="toggle-wrapper" style={{ marginBottom: 8 }}>
                <span className="toggle-label" style={key === 'suspectedOralCancer' ? { color: '#DC2626', fontWeight: 700 } : {}}>{label}</span>
                <label className="toggle"><input type="checkbox" checked={form[key]} onChange={e => set(key, e.target.checked)} /><span className="toggle-slider" /></label>
              </div>
            ))}
          </div>

          <button type="submit" className="btn btn-primary" style={{ marginBottom: 24 }}>💾 Save Oral Screening</button>
        </form>
      </div>
    </div>
  );
}
