import React, { useState } from 'react';
import { appendData } from '../utils/storage';
import PatientSearchBar from '../components/PatientSearchBar';

function BackIcon() {
  return <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>;
}

export default function HypertensionScreen({ onBack }) {
  const [form, setForm] = useState({ name: '', age: '', gender: '', mobile: '', village: '', screeningDate: '', bp1Sys: '', bp1Dia: '', bp2Sys: '', bp2Dia: '', weight: '', height: '', waist: '', familyHistory: false, smoking: false, alcohol: false, physicalActivity: '', diabetes: false, onMedication: false, medication: '', referral: false, notes: '' });
  const [saved, setSaved] = useState(false);
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const avgSys = form.bp1Sys && form.bp2Sys ? Math.round((+form.bp1Sys + +form.bp2Sys) / 2) : null;
  const avgDia = form.bp1Dia && form.bp2Dia ? Math.round((+form.bp1Dia + +form.bp2Dia) / 2) : null;
  const getRisk = () => { if (!avgSys) return null; if (avgSys >= 180 || avgDia >= 110) return { label: 'Stage 3 (Severe)', color: '#DC2626' }; if (avgSys >= 160 || avgDia >= 100) return { label: 'Stage 2', color: '#EF4444' }; if (avgSys >= 140 || avgDia >= 90) return { label: 'Stage 1', color: '#F59E0B' }; if (avgSys >= 130 || avgDia >= 80) return { label: 'Pre-Hypertension', color: '#B45309' }; return { label: 'Normal', color: '#16A34A' }; };
  const risk = getRisk();

  const handleSave = (e) => {
    e.preventDefault();
    appendData('hypertensionScreenings', { ...form, avgBP: avgSys ? `${avgSys}/${avgDia}` : '', risk: risk?.label, recordedAt: new Date().toISOString() });
    setSaved(true); setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="screen" style={{ background: 'var(--bg)' }}>
      <div style={{ background: 'var(--primary)', display: 'flex', alignItems: 'center', padding: '12px 16px', gap: 12, flexShrink: 0 }}>
        <button className="app-bar-icon-btn" onClick={onBack}><BackIcon /></button>
        <span style={{ flex: 1, fontSize: 17, fontWeight: 700, color: 'white', textAlign: 'center' }}>Hypertension Screening</span>
        <div style={{ width: 30 }} />
      </div>
      <div className="screen-content">
        {saved && <div style={{ background: '#DCFCE7', border: '1px solid #16A34A', borderRadius: 12, padding: '12px 16px', marginBottom: 16, display: 'flex', alignItems: 'center', gap: 8 }}><span>✅</span><span style={{ fontSize: 14, fontWeight: 600, color: '#16A34A' }}>Screening saved!</span></div>}
        <PatientSearchBar onPatientFound={p => setForm(f => ({ ...f, name: p.name, age: String(p.age), gender: p.gender, mobile: p.mobile, village: p.village, abhaId: p.abhaId }))} />
        <form onSubmit={handleSave}>
          <div className="card" style={{ marginBottom: 14 }}>
            <p style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-secondary)', marginBottom: 10, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Patient Details</p>
            <div className="form-group"><label className="form-label">Name <span className="required">*</span></label><input type="text" className="form-input" placeholder="Full name" value={form.name} onChange={e => set('name', e.target.value)} required /></div>
            <div className="row-2col">
              <div className="form-group"><label className="form-label">Age</label><input type="number" className="form-input" placeholder="Years" value={form.age} onChange={e => set('age', e.target.value)} /></div>
              <div className="form-group"><label className="form-label">Gender</label><select className="form-input" value={form.gender} onChange={e => set('gender', e.target.value)}><option value="">Select</option><option>Male</option><option>Female</option></select></div>
            </div>
            <div className="form-group"><label className="form-label">Mobile</label><input type="tel" className="form-input" placeholder="Mobile" value={form.mobile} onChange={e => set('mobile', e.target.value)} /></div>
            <div className="form-group" style={{ marginBottom: 0 }}><label className="form-label">Screening Date</label><input type="date" className="form-input" value={form.screeningDate} onChange={e => set('screeningDate', e.target.value)} /></div>
          </div>

          <div className="card" style={{ marginBottom: 14 }}>
            <p style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-secondary)', marginBottom: 10, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Blood Pressure Readings</p>
            <p style={{ fontSize: 12, color: 'var(--text-secondary)', marginBottom: 10 }}>Take 2 readings, 5 minutes apart</p>
            <div className="row-2col">
              <div className="form-group"><label className="form-label">Reading 1 - Systolic</label><input type="number" className="form-input" placeholder="mmHg" value={form.bp1Sys} onChange={e => set('bp1Sys', e.target.value)} /></div>
              <div className="form-group"><label className="form-label">Reading 1 - Diastolic</label><input type="number" className="form-input" placeholder="mmHg" value={form.bp1Dia} onChange={e => set('bp1Dia', e.target.value)} /></div>
              <div className="form-group"><label className="form-label">Reading 2 - Systolic</label><input type="number" className="form-input" placeholder="mmHg" value={form.bp2Sys} onChange={e => set('bp2Sys', e.target.value)} /></div>
              <div className="form-group"><label className="form-label">Reading 2 - Diastolic</label><input type="number" className="form-input" placeholder="mmHg" value={form.bp2Dia} onChange={e => set('bp2Dia', e.target.value)} /></div>
            </div>
            {risk && (
              <div style={{ background: risk.color + '18', border: `1.5px solid ${risk.color}40`, borderRadius: 12, padding: '12px', textAlign: 'center' }}>
                <p style={{ fontSize: 13, color: 'var(--text-secondary)' }}>Average BP: <strong>{avgSys}/{avgDia} mmHg</strong></p>
                <p style={{ fontSize: 15, fontWeight: 700, color: risk.color, marginTop: 4 }}>{risk.label}</p>
              </div>
            )}
          </div>

          <div className="card" style={{ marginBottom: 14 }}>
            <p style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-secondary)', marginBottom: 10, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Risk Factors</p>
            {[['familyHistory', 'Family History of HTN'], ['smoking', 'Smoker'], ['alcohol', 'Alcohol Use'], ['diabetes', 'Diabetes'], ['onMedication', 'On BP Medication'], ['referral', 'Referred to PHC/CHC']].map(([key, label]) => (
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
