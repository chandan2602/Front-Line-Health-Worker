import React, { useState } from 'react';
import { getData, appendData } from '../utils/storage';
import PatientSearchBar from '../components/PatientSearchBar';

function BackIcon() {
  return <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>;
}

export default function AdolescentScreeningScreen({ onBack }) {
  const adolescents = getData('adolescents') || [];
  const [selectedAdolescent, setSelectedAdolescent] = useState('');
  const [form, setForm] = useState({ screeningDate: '', height: '', weight: '', bmi: '', hb: '', bp: '', vision: '', hearing: '', dental: '', skinCondition: '', menstrualIrregularity: false, substanceUse: false, mentalHealthConcern: false, nutritionCounseling: false, ifaGiven: false, referral: false, referralReason: '', notes: '' });
  const [saved, setSaved] = useState(false);
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const calcBMI = () => {
    if (form.height && form.weight) {
      const h = parseFloat(form.height) / 100;
      const bmi = (parseFloat(form.weight) / (h * h)).toFixed(1);
      setForm(f => ({ ...f, bmi }));
    }
  };

  const handleSave = (e) => {
    e.preventDefault();
    appendData('adolescentScreenings', { ...form, adolescentId: selectedAdolescent, recordedAt: new Date().toISOString() });
    setSaved(true); setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="screen" style={{ background: 'var(--bg)' }}>
      <div style={{ background: 'var(--primary)', display: 'flex', alignItems: 'center', padding: '12px 16px', gap: 12, flexShrink: 0 }}>
        <button className="app-bar-icon-btn" onClick={onBack}><BackIcon /></button>
        <span style={{ flex: 1, fontSize: 17, fontWeight: 700, color: 'white', textAlign: 'center' }}>Adolescent Screening</span>
        <div style={{ width: 30 }} />
      </div>
      <div style={{ background: 'rgba(27,79,155,0.08)', padding: '8px 16px', borderBottom: '1px solid var(--border)' }}>
        <p style={{ fontSize: 12, color: 'var(--primary)', fontWeight: 600 }}>🔍 Annual Health Check-up for Adolescents</p>
      </div>
      <div className="screen-content">
        {saved && <div style={{ background: '#DCFCE7', border: '1px solid #16A34A', borderRadius: 12, padding: '12px 16px', marginBottom: 16, display: 'flex', alignItems: 'center', gap: 8 }}><span>✅</span><span style={{ fontSize: 14, fontWeight: 600, color: '#16A34A' }}>Screening saved!</span></div>}
        <PatientSearchBar onPatientFound={p => {
          const match = adolescents.find(a => a.name === p.name || a.mobile === p.mobile);
          if (match) setSelectedAdolescent(String(match.id));
        }} />
        <form onSubmit={handleSave}>
          <div className="card" style={{ marginBottom: 14 }}>
            <label className="form-label">Select Adolescent <span className="required">*</span></label>
            <select className="form-input" value={selectedAdolescent} onChange={e => setSelectedAdolescent(e.target.value)} required>
              <option value="">-- Select --</option>
              {adolescents.map(a => <option key={a.id} value={a.id}>{a.name}</option>)}
              <option value="demo">Rahul Sharma (Demo, 15 yrs)</option>
            </select>
          </div>

          <div className="card" style={{ marginBottom: 14 }}>
            <p style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-secondary)', marginBottom: 10, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Anthropometry</p>
            <div className="form-group"><label className="form-label">Screening Date <span className="required">*</span></label><input type="date" className="form-input" value={form.screeningDate} onChange={e => set('screeningDate', e.target.value)} required /></div>
            <div className="row-2col">
              <div className="form-group"><label className="form-label">Height (cm)</label><input type="number" className="form-input" placeholder="cm" value={form.height} onChange={e => set('height', e.target.value)} onBlur={calcBMI} /></div>
              <div className="form-group"><label className="form-label">Weight (kg)</label><input type="number" className="form-input" placeholder="kg" value={form.weight} onChange={e => set('weight', e.target.value)} onBlur={calcBMI} /></div>
            </div>
            {form.bmi && <div style={{ background: 'rgba(27,79,155,0.08)', borderRadius: 10, padding: '10px', textAlign: 'center', marginBottom: 10 }}><span style={{ fontSize: 13, fontWeight: 700, color: 'var(--primary)' }}>BMI: {form.bmi} kg/m²</span></div>}
            <div className="row-2col">
              <div className="form-group"><label className="form-label">Hb (g/dL)</label><input type="number" step="0.1" className="form-input" placeholder="e.g. 11.5" value={form.hb} onChange={e => set('hb', e.target.value)} /></div>
              <div className="form-group"><label className="form-label">BP (mmHg)</label><input type="text" className="form-input" placeholder="120/80" value={form.bp} onChange={e => set('bp', e.target.value)} /></div>
            </div>
          </div>

          <div className="card" style={{ marginBottom: 14 }}>
            <p style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-secondary)', marginBottom: 10, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Clinical Examination</p>
            {[['vision', 'Vision', ['Normal', 'Defective', 'Needs Glasses']], ['hearing', 'Hearing', ['Normal', 'Impaired']], ['dental', 'Dental', ['Normal', 'Caries', 'Needs Treatment']]].map(([key, label, opts]) => (
              <div key={key} className="form-group"><label className="form-label">{label}</label><select className="form-input" value={form[key]} onChange={e => set(key, e.target.value)}><option value="">Select</option>{opts.map(o => <option key={o}>{o}</option>)}</select></div>
            ))}
          </div>

          <div className="card" style={{ marginBottom: 14 }}>
            <p style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-secondary)', marginBottom: 10, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Health Concerns</p>
            {[['menstrualIrregularity', 'Menstrual Irregularity (Girls)'], ['substanceUse', 'Substance Use Detected'], ['mentalHealthConcern', 'Mental Health Concern'], ['nutritionCounseling', 'Nutrition Counseling Given'], ['ifaGiven', 'IFA Tablets Given'], ['referral', 'Referral Needed']].map(([key, label]) => (
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
