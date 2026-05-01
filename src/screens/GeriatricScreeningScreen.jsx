import React, { useState } from 'react';
import { getData, appendData } from '../utils/storage';
import PatientSearchBar from '../components/PatientSearchBar';

function BackIcon() {
  return <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>;
}

export default function GeriatricScreeningScreen({ onBack }) {
  const patients = getData('geriatricPatients') || [];
  const [selectedPatient, setSelectedPatient] = useState('');
  const [form, setForm] = useState({ screeningDate: '', weight: '', height: '', bp: '', bloodSugar: '', vision: '', hearing: '', mobility: '', fallRisk: false, cognitiveDecline: false, depression: false, malnutrition: false, polypharmacy: false, urinaryIncontinence: false, bedsore: false, referral: false, notes: '' });
  const [saved, setSaved] = useState(false);
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const handleSave = (e) => {
    e.preventDefault();
    appendData('geriatricScreenings', { ...form, patientId: selectedPatient, recordedAt: new Date().toISOString() });
    setSaved(true); setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="screen" style={{ background: 'var(--bg)' }}>
      <div style={{ background: 'var(--primary)', display: 'flex', alignItems: 'center', padding: '12px 16px', gap: 12, flexShrink: 0 }}>
        <button className="app-bar-icon-btn" onClick={onBack}><BackIcon /></button>
        <span style={{ flex: 1, fontSize: 17, fontWeight: 700, color: 'white', textAlign: 'center' }}>Geriatric Screening</span>
        <div style={{ width: 30 }} />
      </div>
      <div className="screen-content">
        {saved && <div style={{ background: '#DCFCE7', border: '1px solid #16A34A', borderRadius: 12, padding: '12px 16px', marginBottom: 16, display: 'flex', alignItems: 'center', gap: 8 }}><span>✅</span><span style={{ fontSize: 14, fontWeight: 600, color: '#16A34A' }}>Screening saved!</span></div>}
        <PatientSearchBar onPatientFound={p => {
          const match = patients.find(pt => pt.name === p.name || pt.mobile === p.mobile);
          if (match) setSelectedPatient(String(match.id));
        }} />
        <form onSubmit={handleSave}>
          <div className="card" style={{ marginBottom: 14 }}>
            <label className="form-label">Select Patient <span className="required">*</span></label>
            <select className="form-input" value={selectedPatient} onChange={e => setSelectedPatient(e.target.value)} required>
              <option value="">-- Select Patient --</option>
              {patients.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
              <option value="demo">Ramesh Lal (Demo, 68 yrs)</option>
            </select>
          </div>

          <div className="card" style={{ marginBottom: 14 }}>
            <p style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-secondary)', marginBottom: 10, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Vitals</p>
            <div className="form-group"><label className="form-label">Screening Date</label><input type="date" className="form-input" value={form.screeningDate} onChange={e => set('screeningDate', e.target.value)} /></div>
            <div className="row-2col">
              <div className="form-group"><label className="form-label">Weight (kg)</label><input type="number" step="0.1" className="form-input" placeholder="kg" value={form.weight} onChange={e => set('weight', e.target.value)} /></div>
              <div className="form-group"><label className="form-label">Height (cm)</label><input type="number" className="form-input" placeholder="cm" value={form.height} onChange={e => set('height', e.target.value)} /></div>
            </div>
            <div className="row-2col">
              <div className="form-group"><label className="form-label">BP (mmHg)</label><input type="text" className="form-input" placeholder="120/80" value={form.bp} onChange={e => set('bp', e.target.value)} /></div>
              <div className="form-group"><label className="form-label">Blood Sugar</label><input type="number" className="form-input" placeholder="mg/dL" value={form.bloodSugar} onChange={e => set('bloodSugar', e.target.value)} /></div>
            </div>
          </div>

          <div className="card" style={{ marginBottom: 14 }}>
            <p style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-secondary)', marginBottom: 10, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Functional Assessment</p>
            {[['vision', 'Vision', ['Normal', 'Impaired', 'Blind']], ['hearing', 'Hearing', ['Normal', 'Impaired', 'Deaf']], ['mobility', 'Mobility', ['Independent', 'With Support', 'Bedridden']]].map(([key, label, opts]) => (
              <div key={key} className="form-group"><label className="form-label">{label}</label><select className="form-input" value={form[key]} onChange={e => set(key, e.target.value)}><option value="">Select</option>{opts.map(o => <option key={o}>{o}</option>)}</select></div>
            ))}
          </div>

          <div className="card" style={{ marginBottom: 14 }}>
            <p style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-secondary)', marginBottom: 10, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Geriatric Syndromes</p>
            {[['fallRisk', 'Fall Risk'], ['cognitiveDecline', 'Cognitive Decline'], ['depression', 'Depression/Loneliness'], ['malnutrition', 'Malnutrition'], ['polypharmacy', 'Polypharmacy (5+ drugs)'], ['urinaryIncontinence', 'Urinary Incontinence'], ['bedsore', 'Bedsore/Pressure Ulcer'], ['referral', 'Referred to Higher Facility']].map(([key, label]) => (
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
