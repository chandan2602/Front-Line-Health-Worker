import React, { useState } from 'react';
import { appendData } from '../utils/storage';

function BackIcon() {
  return <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>;
}

const phq9Questions = [
  'Little interest or pleasure in doing things',
  'Feeling down, depressed, or hopeless',
  'Trouble falling or staying asleep, or sleeping too much',
  'Feeling tired or having little energy',
  'Poor appetite or overeating',
  'Feeling bad about yourself',
  'Trouble concentrating on things',
  'Moving or speaking slowly / being fidgety or restless',
  'Thoughts of being better off dead or hurting yourself'
];

export default function MentalHealthScreen({ onBack }) {
  const [form, setForm] = useState({ name: '', age: '', gender: '', mobile: '', village: '', screeningDate: '', phq9Scores: Array(9).fill(0), anxietyPresent: false, substanceUse: false, suicidalIdeation: false, previousHistory: false, referral: false, notes: '' });
  const [saved, setSaved] = useState(false);
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));
  const setScore = (i, v) => setForm(f => { const s = [...f.phq9Scores]; s[i] = parseInt(v); return { ...f, phq9Scores: s }; });

  const totalScore = form.phq9Scores.reduce((a, b) => a + b, 0);
  const getSeverity = () => {
    if (totalScore >= 20) return { label: 'Severe Depression', color: '#DC2626' };
    if (totalScore >= 15) return { label: 'Moderately Severe', color: '#EF4444' };
    if (totalScore >= 10) return { label: 'Moderate Depression', color: '#F59E0B' };
    if (totalScore >= 5) return { label: 'Mild Depression', color: '#B45309' };
    return { label: 'Minimal / None', color: '#16A34A' };
  };
  const severity = getSeverity();

  const handleSave = (e) => {
    e.preventDefault();
    appendData('mentalHealthScreenings', { ...form, totalScore, severity: severity.label, recordedAt: new Date().toISOString() });
    setSaved(true); setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="screen" style={{ background: 'var(--bg)' }}>
      <div style={{ background: 'var(--primary)', display: 'flex', alignItems: 'center', padding: '12px 16px', gap: 12, flexShrink: 0 }}>
        <button className="app-bar-icon-btn" onClick={onBack}><BackIcon /></button>
        <span style={{ flex: 1, fontSize: 17, fontWeight: 700, color: 'white', textAlign: 'center' }}>Mental Health Screening</span>
        <div style={{ width: 30 }} />
      </div>
      <div style={{ background: 'rgba(27,79,155,0.08)', padding: '8px 16px', borderBottom: '1px solid var(--border)' }}>
        <p style={{ fontSize: 12, color: 'var(--primary)', fontWeight: 600 }}>🧠 PHQ-9 Depression Screening Tool</p>
      </div>
      <div className="screen-content">
        {saved && <div style={{ background: '#DCFCE7', border: '1px solid #16A34A', borderRadius: 12, padding: '12px 16px', marginBottom: 16, display: 'flex', alignItems: 'center', gap: 8 }}><span>✅</span><span style={{ fontSize: 14, fontWeight: 600, color: '#16A34A' }}>Screening saved!</span></div>}
        {form.suicidalIdeation && <div style={{ background: '#FEE2E2', border: '1px solid #DC2626', borderRadius: 12, padding: '12px 16px', marginBottom: 16 }}><p style={{ fontSize: 13, fontWeight: 700, color: '#DC2626' }}>⚠️ Suicidal Ideation Reported - Immediate Referral Required!</p></div>}
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
            <p style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-secondary)', marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.06em' }}>PHQ-9 Questionnaire</p>
            <p style={{ fontSize: 11, color: 'var(--text-secondary)', marginBottom: 12 }}>Over the last 2 weeks, how often have you been bothered by:</p>
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 4, marginBottom: 6 }}>
              {['Not at all', 'Several days', 'More than half', 'Nearly every day'].map((l, i) => (
                <div key={i} style={{ width: 44, textAlign: 'center', fontSize: 9, color: 'var(--text-secondary)', lineHeight: 1.2 }}>{l}</div>
              ))}
            </div>
            {phq9Questions.map((q, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '8px 0', borderBottom: '1px solid var(--border)' }}>
                <span style={{ flex: 1, fontSize: 12, color: 'var(--text-primary)' }}>{i + 1}. {q}</span>
                <div style={{ display: 'flex', gap: 4 }}>
                  {[0, 1, 2, 3].map(v => (
                    <button key={v} type="button" onClick={() => setScore(i, v)}
                      style={{ width: 44, height: 32, borderRadius: 8, border: '2px solid', borderColor: form.phq9Scores[i] === v ? 'var(--primary)' : 'var(--border)', background: form.phq9Scores[i] === v ? 'var(--primary)' : 'white', color: form.phq9Scores[i] === v ? 'white' : 'var(--text-secondary)', fontWeight: 700, fontSize: 13, cursor: 'pointer', fontFamily: 'var(--font)' }}>
                      {v}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Score Display */}
          <div style={{ background: severity.color + '18', border: `2px solid ${severity.color}40`, borderRadius: 16, padding: '16px', textAlign: 'center', marginBottom: 14 }}>
            <p style={{ fontSize: 13, color: 'var(--text-secondary)' }}>PHQ-9 Total Score</p>
            <p style={{ fontSize: 48, fontWeight: 900, color: severity.color, lineHeight: 1 }}>{totalScore}</p>
            <p style={{ fontSize: 15, fontWeight: 700, color: severity.color, marginTop: 4 }}>{severity.label}</p>
          </div>

          <div className="card" style={{ marginBottom: 14 }}>
            <p style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-secondary)', marginBottom: 10, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Additional Assessment</p>
            {[['anxietyPresent', 'Anxiety Symptoms Present'], ['substanceUse', 'Substance Use Detected'], ['suicidalIdeation', '⚠️ Suicidal Ideation'], ['previousHistory', 'Previous Mental Health History'], ['referral', 'Referred to DMHP/Psychiatrist']].map(([key, label]) => (
              <div key={key} className="toggle-wrapper" style={{ marginBottom: 8 }}>
                <span className="toggle-label" style={key === 'suicidalIdeation' ? { color: '#DC2626', fontWeight: 700 } : {}}>{label}</span>
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
