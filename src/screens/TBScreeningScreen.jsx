import React, { useState } from 'react';
import { appendData } from '../utils/storage';
import PatientSearchBar from '../components/PatientSearchBar';

function BackIcon() {
  return <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>;
}

const tbSymptoms = ['Cough > 2 weeks', 'Blood in sputum', 'Fever > 2 weeks', 'Night sweats', 'Weight loss', 'Loss of appetite', 'Chest pain', 'Breathlessness'];
const riskFactors = ['HIV positive', 'Diabetes', 'Malnutrition', 'Smoker', 'Alcoholic', 'Close contact with TB patient', 'Immunocompromised', 'Prisoner/Migrant'];

export default function TBScreeningScreen({ onBack }) {
  const [form, setForm] = useState({ name: '', age: '', gender: '', mobile: '', village: '', screeningDate: '', symptoms: [], riskFactors: [], coughDuration: '', sputumTest: false, xray: false, cbnaat: false, presumptiveTB: false, referredToNikshay: false, notes: '' });
  const [saved, setSaved] = useState(false);
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));
  const toggleArr = (key, val) => setForm(f => ({ ...f, [key]: f[key].includes(val) ? f[key].filter(x => x !== val) : [...f[key], val] }));

  const handleSave = (e) => {
    e.preventDefault();
    appendData('tbScreenings', { ...form, recordedAt: new Date().toISOString() });
    setSaved(true); setTimeout(() => setSaved(false), 2500);
  };

  const isPresumed = form.symptoms.length >= 2 || form.symptoms.includes('Cough > 2 weeks');

  return (
    <div className="screen" style={{ background: 'var(--bg)' }}>
      <div style={{ background: 'var(--primary)', display: 'flex', alignItems: 'center', padding: '12px 16px', gap: 12, flexShrink: 0 }}>
        <button className="app-bar-icon-btn" onClick={onBack}><BackIcon /></button>
        <span style={{ flex: 1, fontSize: 17, fontWeight: 700, color: 'white', textAlign: 'center' }}>TB Screening</span>
        <div style={{ width: 30 }} />
      </div>
      <div style={{ background: 'rgba(27,79,155,0.08)', padding: '8px 16px', borderBottom: '1px solid var(--border)' }}>
        <p style={{ fontSize: 12, color: 'var(--primary)', fontWeight: 600 }}>🫁 Nikshay - TB Presumptive Case Screening</p>
      </div>
      <div className="screen-content">
        {saved && <div style={{ background: '#DCFCE7', border: '1px solid #16A34A', borderRadius: 12, padding: '12px 16px', marginBottom: 16, display: 'flex', alignItems: 'center', gap: 8 }}><span>✅</span><span style={{ fontSize: 14, fontWeight: 600, color: '#16A34A' }}>TB screening saved!</span></div>}
        {isPresumed && <div style={{ background: '#FEF3C7', border: '1px solid #F59E0B', borderRadius: 12, padding: '12px 16px', marginBottom: 16, display: 'flex', alignItems: 'center', gap: 8 }}><span>⚠️</span><span style={{ fontSize: 13, fontWeight: 600, color: '#B45309' }}>Presumptive TB case detected! Refer for testing.</span></div>}
        <PatientSearchBar onPatientFound={p => setForm(f => ({ ...f, name: p.name, age: String(p.age), gender: p.gender, mobile: p.mobile, village: p.village, abhaId: p.abhaId }))} />
        <form onSubmit={handleSave}>
          <div className="card" style={{ marginBottom: 14 }}>
            <p style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-secondary)', marginBottom: 10, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Patient Details</p>
            <div className="form-group"><label className="form-label">Name <span className="required">*</span></label><input type="text" className="form-input" placeholder="Full name" value={form.name} onChange={e => set('name', e.target.value)} required /></div>
            <div className="row-2col">
              <div className="form-group"><label className="form-label">Age</label><input type="number" className="form-input" placeholder="Years" value={form.age} onChange={e => set('age', e.target.value)} /></div>
              <div className="form-group"><label className="form-label">Gender</label><select className="form-input" value={form.gender} onChange={e => set('gender', e.target.value)}><option value="">Select</option><option>Male</option><option>Female</option><option>Other</option></select></div>
            </div>
            <div className="form-group"><label className="form-label">Mobile</label><input type="tel" className="form-input" placeholder="Mobile number" value={form.mobile} onChange={e => set('mobile', e.target.value)} /></div>
            <div className="form-group" style={{ marginBottom: 0 }}><label className="form-label">Village</label><input type="text" className="form-input" placeholder="Village name" value={form.village} onChange={e => set('village', e.target.value)} /></div>
          </div>

          <div className="card" style={{ marginBottom: 14 }}>
            <p style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-secondary)', marginBottom: 10, textTransform: 'uppercase', letterSpacing: '0.06em' }}>TB Symptoms</p>
            <div className="form-group"><label className="form-label">Screening Date</label><input type="date" className="form-input" value={form.screeningDate} onChange={e => set('screeningDate', e.target.value)} /></div>
            <div className="form-group"><label className="form-label">Cough Duration</label><select className="form-input" value={form.coughDuration} onChange={e => set('coughDuration', e.target.value)}><option value="">Select</option><option>No cough</option><option>Less than 2 weeks</option><option>2-4 weeks</option><option>More than 4 weeks</option></select></div>
            <label className="form-label" style={{ marginBottom: 8, display: 'block' }}>Symptoms Present</label>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {tbSymptoms.map(s => <button key={s} type="button" className={`chip ${form.symptoms.includes(s) ? 'selected' : ''}`} style={form.symptoms.includes(s) ? { background: '#EF4444', borderColor: '#EF4444' } : {}} onClick={() => toggleArr('symptoms', s)}>{s}</button>)}
            </div>
          </div>

          <div className="card" style={{ marginBottom: 14 }}>
            <p style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-secondary)', marginBottom: 10, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Risk Factors</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {riskFactors.map(r => <button key={r} type="button" className={`chip ${form.riskFactors.includes(r) ? 'selected' : ''}`} onClick={() => toggleArr('riskFactors', r)}>{r}</button>)}
            </div>
          </div>

          <div className="card" style={{ marginBottom: 14 }}>
            <p style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-secondary)', marginBottom: 10, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Tests & Referral</p>
            {[['sputumTest', 'Sputum Test Ordered'], ['xray', 'Chest X-Ray Ordered'], ['cbnaat', 'CBNAAT/TrueNat Ordered'], ['referredToNikshay', 'Referred to Nikshay']].map(([key, label]) => (
              <div key={key} className="toggle-wrapper" style={{ marginBottom: 8 }}>
                <span className="toggle-label">{label}</span>
                <label className="toggle"><input type="checkbox" checked={form[key]} onChange={e => set(key, e.target.checked)} /><span className="toggle-slider" /></label>
              </div>
            ))}
          </div>

          <button type="submit" className="btn btn-primary" style={{ marginBottom: 24 }}>💾 Save TB Screening</button>
        </form>
      </div>
    </div>
  );
}
