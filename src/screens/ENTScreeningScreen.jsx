import React, { useState } from 'react';
import { appendData } from '../utils/storage';
import PatientSearchBar from '../components/PatientSearchBar';

function BackIcon() {
  return <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>;
}

export default function ENTScreeningScreen({ onBack }) {
  const [form, setForm] = useState({ name: '', age: '', gender: '', mobile: '', village: '', screeningDate: '', earPain: false, hearingLoss: false, earDischarge: false, tinnitus: false, hearingResult: '', noseCongestion: false, noseBleed: false, sinusPain: false, noseResult: '', throatPain: false, hoarseness: false, swallowingDifficulty: false, throatResult: '', referral: false, notes: '' });
  const [saved, setSaved] = useState(false);
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const handleSave = (e) => {
    e.preventDefault();
    appendData('entScreenings', { ...form, recordedAt: new Date().toISOString() });
    setSaved(true); setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="screen" style={{ background: 'var(--bg)' }}>
      <div style={{ background: 'var(--primary)', display: 'flex', alignItems: 'center', padding: '12px 16px', gap: 12, flexShrink: 0 }}>
        <button className="app-bar-icon-btn" onClick={onBack}><BackIcon /></button>
        <span style={{ flex: 1, fontSize: 17, fontWeight: 700, color: 'white', textAlign: 'center' }}>ENT Screening</span>
        <div style={{ width: 30 }} />
      </div>
      <div style={{ background: 'rgba(27,79,155,0.08)', padding: '8px 16px', borderBottom: '1px solid var(--border)' }}>
        <p style={{ fontSize: 12, color: 'var(--primary)', fontWeight: 600 }}>👂 Ear, Nose & Throat Screening</p>
      </div>
      <div className="screen-content">
        {saved && <div style={{ background: '#DCFCE7', border: '1px solid #16A34A', borderRadius: 12, padding: '12px 16px', marginBottom: 16, display: 'flex', alignItems: 'center', gap: 8 }}><span>✅</span><span style={{ fontSize: 14, fontWeight: 600, color: '#16A34A' }}>ENT screening saved!</span></div>}
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
            <p style={{ fontSize: 13, fontWeight: 700, color: 'var(--primary)', marginBottom: 10 }}>👂 Ear Examination</p>
            {[['earPain', 'Ear Pain'], ['hearingLoss', 'Hearing Loss'], ['earDischarge', 'Ear Discharge'], ['tinnitus', 'Tinnitus (Ringing)']].map(([key, label]) => (
              <div key={key} className="toggle-wrapper" style={{ marginBottom: 8 }}><span className="toggle-label">{label}</span><label className="toggle"><input type="checkbox" checked={form[key]} onChange={e => set(key, e.target.checked)} /><span className="toggle-slider" /></label></div>
            ))}
            <div className="form-group" style={{ marginBottom: 0 }}><label className="form-label">Ear Examination Result</label><select className="form-input" value={form.hearingResult} onChange={e => set('hearingResult', e.target.value)}><option value="">Select</option><option>Normal</option><option>Wax Impaction</option><option>Otitis Media</option><option>Perforated Eardrum</option><option>Refer to ENT</option></select></div>
          </div>

          <div className="card" style={{ marginBottom: 14 }}>
            <p style={{ fontSize: 13, fontWeight: 700, color: 'var(--primary)', marginBottom: 10 }}>👃 Nose Examination</p>
            {[['noseCongestion', 'Nasal Congestion'], ['noseBleed', 'Nose Bleed (Epistaxis)'], ['sinusPain', 'Sinus Pain/Pressure']].map(([key, label]) => (
              <div key={key} className="toggle-wrapper" style={{ marginBottom: 8 }}><span className="toggle-label">{label}</span><label className="toggle"><input type="checkbox" checked={form[key]} onChange={e => set(key, e.target.checked)} /><span className="toggle-slider" /></label></div>
            ))}
            <div className="form-group" style={{ marginBottom: 0 }}><label className="form-label">Nose Examination Result</label><select className="form-input" value={form.noseResult} onChange={e => set('noseResult', e.target.value)}><option value="">Select</option><option>Normal</option><option>Allergic Rhinitis</option><option>Sinusitis</option><option>Deviated Septum</option><option>Refer to ENT</option></select></div>
          </div>

          <div className="card" style={{ marginBottom: 14 }}>
            <p style={{ fontSize: 13, fontWeight: 700, color: 'var(--primary)', marginBottom: 10 }}>🗣️ Throat Examination</p>
            {[['throatPain', 'Throat Pain'], ['hoarseness', 'Hoarseness of Voice'], ['swallowingDifficulty', 'Difficulty Swallowing']].map(([key, label]) => (
              <div key={key} className="toggle-wrapper" style={{ marginBottom: 8 }}><span className="toggle-label">{label}</span><label className="toggle"><input type="checkbox" checked={form[key]} onChange={e => set(key, e.target.checked)} /><span className="toggle-slider" /></label></div>
            ))}
            <div className="form-group" style={{ marginBottom: 0 }}><label className="form-label">Throat Examination Result</label><select className="form-input" value={form.throatResult} onChange={e => set('throatResult', e.target.value)}><option value="">Select</option><option>Normal</option><option>Tonsillitis</option><option>Pharyngitis</option><option>Laryngitis</option><option>Refer to ENT</option></select></div>
          </div>

          <div className="card" style={{ marginBottom: 14 }}>
            <div className="toggle-wrapper"><span className="toggle-label" style={{ fontWeight: 600 }}>Referred to ENT Specialist</span><label className="toggle"><input type="checkbox" checked={form.referral} onChange={e => set('referral', e.target.checked)} /><span className="toggle-slider" /></label></div>
          </div>

          <button type="submit" className="btn btn-primary" style={{ marginBottom: 24 }}>💾 Save ENT Screening</button>
        </form>
      </div>
    </div>
  );
}
