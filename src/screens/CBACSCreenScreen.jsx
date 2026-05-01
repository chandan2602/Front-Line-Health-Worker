import React, { useState } from 'react';
import { appendData } from '../utils/storage';
import PatientSearchBar from '../components/PatientSearchBar';

function BackIcon() {
  return <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>;
}

export default function CBACScreen({ onBack }) {
  const [form, setForm] = useState({ name: '', age: '', gender: '', mobile: '', village: '', screeningDate: '', q1Age: '', q2Waist: '', q3Activity: '', q4FamilyHTN: false, q5FamilyDM: false, q6Tobacco: '', q7Alcohol: false, q8Stress: false, q9Diet: '', score: 0 });
  const [saved, setSaved] = useState(false);
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const calcScore = () => {
    let s = 0;
    if (form.q1Age === '45-54') s += 1; else if (form.q1Age === '55+') s += 2;
    if (form.q2Waist === 'moderate') s += 1; else if (form.q2Waist === 'high') s += 2;
    if (form.q3Activity === 'low') s += 1;
    if (form.q4FamilyHTN) s += 1;
    if (form.q5FamilyDM) s += 1;
    if (form.q6Tobacco === 'current') s += 2; else if (form.q6Tobacco === 'former') s += 1;
    if (form.q7Alcohol) s += 1;
    if (form.q8Stress) s += 1;
    if (form.q9Diet === 'poor') s += 1;
    setForm(f => ({ ...f, score: s }));
  };

  const getRiskLevel = () => {
    if (form.score >= 7) return { label: 'High Risk', color: '#DC2626', bg: '#FEE2E2' };
    if (form.score >= 4) return { label: 'Medium Risk', color: '#B45309', bg: '#FEF3C7' };
    return { label: 'Low Risk', color: '#16A34A', bg: '#DCFCE7' };
  };
  const riskLevel = getRiskLevel();

  const handleSave = (e) => {
    e.preventDefault();
    appendData('cbacScreenings', { ...form, riskLevel: riskLevel.label, recordedAt: new Date().toISOString() });
    setSaved(true); setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="screen" style={{ background: 'var(--bg)' }}>
      <div style={{ background: 'var(--primary)', display: 'flex', alignItems: 'center', padding: '12px 16px', gap: 12, flexShrink: 0 }}>
        <button className="app-bar-icon-btn" onClick={onBack}><BackIcon /></button>
        <span style={{ flex: 1, fontSize: 17, fontWeight: 700, color: 'white', textAlign: 'center' }}>CBAC Risk Assessment</span>
        <div style={{ width: 30 }} />
      </div>
      <div style={{ background: 'rgba(27,79,155,0.08)', padding: '8px 16px', borderBottom: '1px solid var(--border)' }}>
        <p style={{ fontSize: 12, color: 'var(--primary)', fontWeight: 600 }}>📋 Community Based Assessment Checklist (30+ years)</p>
      </div>
      <div className="screen-content">
        {saved && <div style={{ background: '#DCFCE7', border: '1px solid #16A34A', borderRadius: 12, padding: '12px 16px', marginBottom: 16, display: 'flex', alignItems: 'center', gap: 8 }}><span>✅</span><span style={{ fontSize: 14, fontWeight: 600, color: '#16A34A' }}>CBAC saved!</span></div>}
        <PatientSearchBar onPatientFound={p => setForm(f => ({ ...f, name: p.name, age: String(p.age), gender: p.gender, mobile: p.mobile, village: p.village, abhaId: p.abhaId }))} />
        <form onSubmit={handleSave}>
          <div className="card" style={{ marginBottom: 14 }}>
            <p style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-secondary)', marginBottom: 10, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Patient Details</p>
            <div className="form-group"><label className="form-label">Name <span className="required">*</span></label><input type="text" className="form-input" placeholder="Full name" value={form.name} onChange={e => set('name', e.target.value)} required /></div>
            <div className="row-2col">
              <div className="form-group"><label className="form-label">Age (30+)</label><input type="number" min="30" className="form-input" placeholder="Years" value={form.age} onChange={e => set('age', e.target.value)} /></div>
              <div className="form-group"><label className="form-label">Gender</label><select className="form-input" value={form.gender} onChange={e => set('gender', e.target.value)}><option value="">Select</option><option>Male</option><option>Female</option></select></div>
            </div>
            <div className="form-group" style={{ marginBottom: 0 }}><label className="form-label">Screening Date</label><input type="date" className="form-input" value={form.screeningDate} onChange={e => set('screeningDate', e.target.value)} /></div>
          </div>

          <div className="card" style={{ marginBottom: 14 }}>
            <p style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-secondary)', marginBottom: 10, textTransform: 'uppercase', letterSpacing: '0.06em' }}>CBAC Questionnaire</p>
            <div className="form-group"><label className="form-label">Q1. Age Group</label><select className="form-input" value={form.q1Age} onChange={e => { set('q1Age', e.target.value); setTimeout(calcScore, 100); }}><option value="">Select</option><option value="30-44">30-44 years</option><option value="45-54">45-54 years (+1)</option><option value="55+">55+ years (+2)</option></select></div>
            <div className="form-group"><label className="form-label">Q2. Waist Circumference</label><select className="form-input" value={form.q2Waist} onChange={e => { set('q2Waist', e.target.value); setTimeout(calcScore, 100); }}><option value="">Select</option><option value="normal">Normal (&lt;80cm F / &lt;90cm M)</option><option value="moderate">Moderate (+1)</option><option value="high">High (+2)</option></select></div>
            <div className="form-group"><label className="form-label">Q3. Physical Activity</label><select className="form-input" value={form.q3Activity} onChange={e => { set('q3Activity', e.target.value); setTimeout(calcScore, 100); }}><option value="">Select</option><option value="active">Active (30+ min/day)</option><option value="low">Low Activity (+1)</option></select></div>
            <div className="form-group"><label className="form-label">Q6. Tobacco Use</label><select className="form-input" value={form.q6Tobacco} onChange={e => { set('q6Tobacco', e.target.value); setTimeout(calcScore, 100); }}><option value="">Select</option><option value="never">Never</option><option value="former">Former (+1)</option><option value="current">Current (+2)</option></select></div>
            <div className="form-group"><label className="form-label">Q9. Diet Quality</label><select className="form-input" value={form.q9Diet} onChange={e => { set('q9Diet', e.target.value); setTimeout(calcScore, 100); }}><option value="">Select</option><option value="good">Good (fruits/vegetables daily)</option><option value="poor">Poor (+1)</option></select></div>
            {[['q4FamilyHTN', 'Q4. Family History of Hypertension (+1)'], ['q5FamilyDM', 'Q5. Family History of Diabetes (+1)'], ['q7Alcohol', 'Q7. Alcohol Use (+1)'], ['q8Stress', 'Q8. High Stress (+1)']].map(([key, label]) => (
              <div key={key} className="toggle-wrapper" style={{ marginBottom: 8 }}>
                <span className="toggle-label">{label}</span>
                <label className="toggle"><input type="checkbox" checked={form[key]} onChange={e => { set(key, e.target.checked); setTimeout(calcScore, 100); }} /><span className="toggle-slider" /></label>
              </div>
            ))}
          </div>

          {/* Risk Score Display */}
          <div style={{ background: riskLevel.bg, border: `2px solid ${riskLevel.color}40`, borderRadius: 16, padding: '20px', textAlign: 'center', marginBottom: 14 }}>
            <p style={{ fontSize: 13, color: 'var(--text-secondary)', marginBottom: 4 }}>CBAC Score</p>
            <p style={{ fontSize: 48, fontWeight: 900, color: riskLevel.color, lineHeight: 1 }}>{form.score}</p>
            <p style={{ fontSize: 16, fontWeight: 700, color: riskLevel.color, marginTop: 6 }}>{riskLevel.label}</p>
            <p style={{ fontSize: 11, color: 'var(--text-secondary)', marginTop: 4 }}>Score 0-3: Low · 4-6: Medium · 7+: High</p>
          </div>

          <button type="submit" className="btn btn-primary" style={{ marginBottom: 24 }}>💾 Save CBAC Assessment</button>
        </form>
      </div>
    </div>
  );
}
