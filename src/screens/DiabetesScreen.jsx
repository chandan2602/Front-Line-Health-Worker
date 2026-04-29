import React, { useState } from 'react';
import { appendData } from '../utils/storage';

function BackIcon() {
  return <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>;
}

export default function DiabetesScreen({ onBack }) {
  const [form, setForm] = useState({ name: '', age: '', gender: '', mobile: '', village: '', screeningDate: '', fastingBs: '', randomBs: '', hba1c: '', weight: '', height: '', waist: '', familyHistory: false, polyuria: false, polydipsia: false, polyphagia: false, weightLoss: false, fatigue: false, blurredVision: false, onMedication: false, medication: '', referral: false, notes: '' });
  const [saved, setSaved] = useState(false);
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const getDiabetesRisk = () => {
    const rbs = parseFloat(form.randomBs);
    const fbs = parseFloat(form.fastingBs);
    if (rbs >= 200 || fbs >= 126) return { label: 'Diabetes (High Risk)', color: '#DC2626' };
    if (rbs >= 140 || fbs >= 100) return { label: 'Pre-Diabetes', color: '#F59E0B' };
    if (rbs > 0 || fbs > 0) return { label: 'Normal', color: '#16A34A' };
    return null;
  };
  const risk = getDiabetesRisk();

  const handleSave = (e) => {
    e.preventDefault();
    appendData('diabetesScreenings', { ...form, risk: risk?.label, recordedAt: new Date().toISOString() });
    setSaved(true); setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="screen" style={{ background: 'var(--bg)' }}>
      <div style={{ background: 'var(--primary)', display: 'flex', alignItems: 'center', padding: '12px 16px', gap: 12, flexShrink: 0 }}>
        <button className="app-bar-icon-btn" onClick={onBack}><BackIcon /></button>
        <span style={{ flex: 1, fontSize: 17, fontWeight: 700, color: 'white', textAlign: 'center' }}>Diabetes Screening</span>
        <div style={{ width: 30 }} />
      </div>
      <div className="screen-content">
        {saved && <div style={{ background: '#DCFCE7', border: '1px solid #16A34A', borderRadius: 12, padding: '12px 16px', marginBottom: 16, display: 'flex', alignItems: 'center', gap: 8 }}><span>✅</span><span style={{ fontSize: 14, fontWeight: 600, color: '#16A34A' }}>Screening saved!</span></div>}
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
            <p style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-secondary)', marginBottom: 10, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Blood Sugar Readings</p>
            <div className="row-2col">
              <div className="form-group"><label className="form-label">Fasting BS (mg/dL)</label><input type="number" className="form-input" placeholder="Normal: &lt;100" value={form.fastingBs} onChange={e => set('fastingBs', e.target.value)} /></div>
              <div className="form-group"><label className="form-label">Random BS (mg/dL)</label><input type="number" className="form-input" placeholder="Normal: &lt;140" value={form.randomBs} onChange={e => set('randomBs', e.target.value)} /></div>
            </div>
            <div className="form-group" style={{ marginBottom: 0 }}><label className="form-label">HbA1c (%)</label><input type="number" step="0.1" className="form-input" placeholder="Normal: &lt;5.7%" value={form.hba1c} onChange={e => set('hba1c', e.target.value)} /></div>
            {risk && (
              <div style={{ background: risk.color + '18', border: `1.5px solid ${risk.color}40`, borderRadius: 12, padding: '12px', textAlign: 'center', marginTop: 12 }}>
                <p style={{ fontSize: 15, fontWeight: 700, color: risk.color }}>{risk.label}</p>
              </div>
            )}
          </div>

          <div className="card" style={{ marginBottom: 14 }}>
            <p style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-secondary)', marginBottom: 10, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Symptoms</p>
            {[['polyuria', 'Frequent Urination'], ['polydipsia', 'Excessive Thirst'], ['polyphagia', 'Excessive Hunger'], ['weightLoss', 'Unexplained Weight Loss'], ['fatigue', 'Fatigue'], ['blurredVision', 'Blurred Vision'], ['familyHistory', 'Family History of Diabetes'], ['onMedication', 'On Diabetes Medication'], ['referral', 'Referred to PHC/CHC']].map(([key, label]) => (
              <div key={key} className="toggle-wrapper" style={{ marginBottom: 8 }}>
                <span className="toggle-label">{label}</span>
                <label className="toggle"><input type="checkbox" checked={form[key]} onChange={e => set(key, e.target.checked)} /><span className="toggle-slider" /></label>
              </div>
            ))}
          </div>

          <button type="submit" className="btn btn-primary" style={{ marginBottom: 24 }}>💾 Save Screening</button>
        </form>
      </div>
    </div>
  );
}
